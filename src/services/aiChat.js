/**
 * AI Chat Service for Mimi & Me
 * Supporting:
 * 1. Google Gemini Flash-Lite (gemini-2.0-flash-lite) using free API Key
 * 2. Ollama local inference endpoint (/api/ollama/api/chat with 'phi-4-mini')
 * 3. Warm, empathetic fallback handler for offline / recovery-safe grounding
 */

import { generateCompanionReply, getApiKey, setApiKey } from './gemini';

export const AI_DISCLAIMER =
  "Mimi is a supportive companion, not a medical professional, and cannot diagnose or prescribe.";

export const USER_PROVIDED_GEMINI_KEY = 'AIzaSyBxZKL1RbpBzTm9gr51wVHCVxnGNhEX8Ao';

// Ensure the provided key is set if none already exists in storage
if (typeof window !== 'undefined' && !getApiKey()) {
  setApiKey(USER_PROVIDED_GEMINI_KEY);
}

/**
 * Empathetic, trauma-informed recovery fallback handler
 * Triggered when neither Gemini nor Ollama is reachable
 *
 * @param {string} prompt
 * @param {string} companionName
 * @returns {string}
 */
export function getEmpatheticFallback(prompt = '', companionName = 'Mimi') {
  const lower = prompt.toLowerCase();

  if (lower.includes('breath') || lower.includes('box breath') || lower.includes('exercise')) {
    return `*gently sits right next to you* Let's take a slow, soft breath together. Inhale gently for 4... pause softly for 4... exhale smoothly for 4. Feel your feet resting firmly on the floor. You are safe in this moment.`;
  }

  if (lower.includes('ground') || lower.includes('5-4-3-2-1') || lower.includes('technique')) {
    return `*rests a comforting, steady paw near you* Let's try 5-4-3-2-1 grounding: Look around and name 5 colors you can see, 4 textures you can touch, 3 sounds around you, 2 scents, and 1 slow breath you can feel in your chest.`;
  }

  if (lower.includes('guilt') || lower.includes('ate too much') || lower.includes('full') || lower.includes('food')) {
    return `*nuzzles gently against your hand* Food guilt can feel so heavy, but please remember: eating is a biological right, not a moral reward you have to earn. Your body knows how to safely process nourishment. Can we stay seated together for a few quiet minutes?`;
  }

  if (lower.includes('purge') || lower.includes('restrict') || lower.includes('skip') || lower.includes('fast')) {
    return `*leans in warmly and stays right by your side* I hear how intense that urge feels right now. Urges rise like ocean waves—they feel overwhelming, but they peak and naturally ebb away. Let's surf this wave together for just 5 minutes without acting.`;
  }

  if (lower.includes('learn') || lower.includes('guide') || lower.includes('help')) {
    return `*tilts head supportively* I'm always here to walk beside you. We also have gentle evidence-informed guides in our Learn Library whenever you want to explore coping with guilt or setting body boundaries.`;
  }

  return `*curls up softly beside you* I'm right here with you. Whatever thoughts or feelings you are holding right now, you don't have to carry them all by yourself. You are doing so well just by being here today.`;
}

/**
 * Call Ollama local /api/ollama/api/chat for 'phi-4-mini'
 */
async function callOllamaPhi4Mini(prompt, history = []) {
  const messages = [
    {
      role: 'system',
      content: `You are Mimi, a gentle eating disorder recovery companion pet. Never mention calorie numbers, weight, or diets. Keep answers short, comforting (2-3 sentences), warm, and non-judgmental.`,
    },
    ...history.slice(-6).map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    })),
    { role: 'user', content: prompt },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500); // Fast timeout for Ollama

  try {
    const response = await fetch('/api/ollama/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi-4-mini',
        messages,
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.message?.content?.trim();
    if (reply) {
      return {
        text: reply,
        source: 'ollama (phi-4-mini)',
        isLive: true,
      };
    }
    throw new Error('Empty response from Ollama');
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Send chat message to AI Chatbot.
 * Tries:
 * 1. Google Gemini 2.0 Flash-Lite (using user's provided free Gemini API key)
 * 2. Ollama /api/ollama/api/chat for 'phi-4-mini' if Gemini is unavailable
 * 3. Graceful empathetic recovery fallback if offline or service is unreachable
 *
 * @param {string} prompt - User's prompt text
 * @param {Array<{sender: string, text: string}>} [history=[]] - Chat history
 * @param {Object} [options={}] - Custom options (companionName, companionType, userName, preferredEngine)
 * @returns {Promise<{ text: string, source: string, isLive: boolean, disclaimer: string }>}
 */
export async function sendChatMessage(prompt, history = [], options = {}) {
  const companionName = options.companionName || 'Mimi';
  const companionType = options.companionType || 'dog';
  const userName = options.userName || 'friend';
  const preferredEngine = options.preferredEngine || 'gemini'; // 'gemini' | 'ollama'

  // Ensure prompt is valid
  const trimmedPrompt = (prompt || '').trim();
  if (!trimmedPrompt) {
    return {
      text: "I'm listening softly whenever you're ready to share.",
      source: 'fallback',
      isLive: false,
      disclaimer: AI_DISCLAIMER,
    };
  }

  // 1. If Ollama preferred, try Ollama first
  if (preferredEngine === 'ollama') {
    try {
      const ollamaRes = await callOllamaPhi4Mini(trimmedPrompt, history);
      return {
        ...ollamaRes,
        disclaimer: AI_DISCLAIMER,
      };
    } catch {
      // Fall through to Gemini or fallback
    }
  }

  // 2. Try Gemini Flash-Lite (using free key)
  try {
    const key = getApiKey() || USER_PROVIDED_GEMINI_KEY;
    const geminiRes = await generateCompanionReply({
      userMessage: trimmedPrompt,
      history,
      companionName,
      companionType,
      userName,
      apiKey: key,
    });

    if (geminiRes && geminiRes.text && geminiRes.isLiveAi) {
      return {
        text: geminiRes.text,
        source: `gemini-2.0-flash-lite`,
        modelUsed: geminiRes.modelUsed || 'gemini-2.0-flash-lite',
        isLive: true,
        disclaimer: AI_DISCLAIMER,
      };
    }
  } catch (geminiErr) {
    console.warn('Gemini chat attempt failed, trying Ollama or fallback:', geminiErr);
  }

  // 3. Try Ollama 'phi-4-mini' as secondary live provider
  try {
    const ollamaRes = await callOllamaPhi4Mini(trimmedPrompt, history);
    return {
      ...ollamaRes,
      disclaimer: AI_DISCLAIMER,
    };
  } catch {
    // Ollama not running or timed out
  }

  // 4. Return warm, empathetic grounding fallback
  return {
    text: getEmpatheticFallback(trimmedPrompt, companionName),
    source: 'empathetic-fallback',
    isLive: false,
    disclaimer: AI_DISCLAIMER,
  };
}

export default sendChatMessage;
