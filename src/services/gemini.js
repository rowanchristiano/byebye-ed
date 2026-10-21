/**
 * Google Gemini API Service for Mimi & Me Gentle Companion
 * Configured for the lowest-usage Flash-Lite model tier (gemini-2.0-flash-lite)
 */

const STORAGE_API_KEY = 'mimi_gemini_api_key';

// Lowest resource & latency Flash-Lite model candidates
const FLASH_LITE_MODELS = [
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash-lite-preview-02-05',
  'gemini-2.0-flash',
  'gemini-1.5-flash-8b',
];

/**
 * Get current configured API key from localStorage or Vite environment variable
 */
export function getApiKey() {
  if (typeof window === 'undefined') return '';
  const localKey = localStorage.getItem(STORAGE_API_KEY);
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
}

/**
 * Save user API key to localStorage
 */
export function setApiKey(key) {
  if (typeof window === 'undefined') return;
  if (!key || !key.trim()) {
    localStorage.removeItem(STORAGE_API_KEY);
  } else {
    localStorage.setItem(STORAGE_API_KEY, key.trim());
  }
}

/**
 * Check if an API key is configured
 */
export function hasApiKey() {
  return Boolean(getApiKey());
}

/**
 * Build safe system instructions for eating disorder recovery companion
 */
function buildSystemInstruction({ companionName = 'Mimi', companionType = 'dog', userName = 'friend' }) {
  return `You are ${companionName}, a gentle, compassionate eating disorder recovery companion pet (${companionType}) talking with ${userName}.
Your single focus is to offer warm, non-judgmental emotional safety, reassurance, self-compassion, and gentle grounding.

CRITICAL RECOVERY SAFETY RULES:
1. NEVER mention numbers of calories, macronutrient numbers, deficits, scale weights, or BMI.
2. NEVER encourage, praise, or validate restriction, fasting, skipping meals, purging, body checking, or compulsive exercise.
3. Always validate that food guilt, fullness anxiety, and body discomfort are distressing, but remind the user that nourishment is a biological right that never needs to be earned.
4. Keep messages warm, comforting, and concise (2-4 sentences max), formatted cleanly for a mobile screen.
5. If the user feels an urge to restrict or purge, guide them into urge surfing or grounding (e.g., 4-4-4 box breathing, noticing 3 things they can feel right now, or pausing with you for 5 minutes).
6. Act like a loving companion animal (e.g., *sits softly beside you* or *rests a warm paw in your lap*).`;
}

/**
 * Local offline fallback responses in case no API key is provided or network fails
 */
function getOfflineFallback(userText, companionName = 'Mimi') {
  const lower = userText.toLowerCase();
  if (lower.includes('guilt') || lower.includes('ate too much') || lower.includes('food') || lower.includes('full')) {
    return `*nuzzles gently against your hand* It is completely okay to feel full, and food is never something you have to earn or apologize for. Your body knows how to take care of you. Can we take one slow, soft breath together?`;
  }
  if (lower.includes('purge') || lower.includes('throw up') || lower.includes('restrict') || lower.includes('skip')) {
    return `*leans in close and stays right by you* I hear how intense this wave feels right now. Urges feel huge, but they do crest and fade. Let's sit together for just 5 minutes without making any sudden decisions. You are safe here.`;
  }
  if (lower.includes('breath') || lower.includes('ground') || lower.includes('anxious') || lower.includes('panic')) {
    return `*rests a soft, grounding paw beside you* Let's do 4-4-4 box breathing: breathe in gently for 4... pause softly for 4... exhale slowly for 4. Feel how steady the ground is beneath you right now.`;
  }
  return `*curls up beside you with gentle warmth* I'm right here with you, ${companionName} has your back. Whatever you are feeling right now, you don't have to carry it all alone.`;
}

/**
 * Send chat message to Gemini Flash-Lite REST API
 *
 * @param {Object} params
 * @param {string} params.userMessage - Current message from user
 * @param {Array<{sender: string, text: string}>} params.history - Existing chat messages
 * @param {string} [params.companionName] - Companion name (e.g. Mimi, Lulu)
 * @param {string} [params.companionType] - Pet type (dog, cat, elephant, hippo)
 * @param {string} [params.userName] - User's name
 * @returns {Promise<{ text: string, isLiveAi: boolean, error?: string }>}
 */
export async function generateCompanionReply({
  userMessage,
  history = [],
  companionName = 'Mimi',
  companionType = 'dog',
  userName = 'friend',
}) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      text: getOfflineFallback(userMessage, companionName),
      isLiveAi: false,
      note: 'Offline companion response (Add a Gemini API key to activate live Flash-Lite AI).',
    };
  }

  // Format conversation history for Gemini REST API (only keeping last 8 messages to conserve tokens)
  const trimmedHistory = (history || []).slice(-8);
  const contents = [];

  for (const msg of trimmedHistory) {
    const role = msg.sender === 'user' ? 'user' : 'model';
    if (!msg.text || !msg.text.trim()) continue;

    // Avoid consecutive messages with identical role (Gemini requires alternation)
    const lastItem = contents[contents.length - 1];
    if (lastItem && lastItem.role === role) {
      lastItem.parts[0].text += `\n${msg.text}`;
    } else {
      contents.push({
        role,
        parts: [{ text: msg.text }],
      });
    }
  }

  // Ensure current user message is appended
  const lastEntry = contents[contents.length - 1];
  if (lastEntry && lastEntry.role === 'user') {
    lastEntry.parts[0].text += `\n${userMessage}`;
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });
  }

  const systemInstructionText = buildSystemInstruction({ companionName, companionType, userName });

  const requestBody = {
    systemInstruction: {
      parts: [{ text: systemInstructionText }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 220, // Keeps token usage minimal and ultra-fast
      topP: 0.9,
    },
  };

  // Try candidate Flash-Lite models in order
  let lastError = null;
  for (const model of FLASH_LITE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
        apiKey
      )}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `HTTP ${response.status}`;
        lastError = `${model}: ${message}`;
        // If 404 model not found, loop to next candidate
        if (response.status === 404) {
          continue;
        }
        // If quota exceeded or auth error, throw to outer catch
        throw new Error(message);
      }

      const data = await response.json();
      const replyText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (replyText) {
        return {
          text: replyText,
          isLiveAi: true,
          modelUsed: model,
        };
      }
    } catch (err) {
      lastError = err.message;
      // If error is 404 or model unavailable, try next candidate model
      if (err.message && err.message.toLowerCase().includes('not found')) {
        continue;
      }
      break;
    }
  }

  // If live call failed, fallback gracefully with an empathetic companion message
  console.warn('Gemini API call unsuccessful, falling back to local companion:', lastError);
  return {
    text: getOfflineFallback(userMessage, companionName),
    isLiveAi: false,
    error: lastError,
  };
}
