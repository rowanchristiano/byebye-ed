import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Sparkles, AlertCircle, RefreshCw, Key, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanionAvatar from '../components/CompanionAvatar';
import BottomNav from '../components/BottomNav';
import { sendChatMessage, AI_DISCLAIMER } from '../services/aiChat';

/**
 * ChatScreen: Dedicated "Talk to Mimi" AI Chatbot Screen
 * Features:
 * - Real-time chat history stream with gentle soft bubbles
 * - Interactive quick-action pills: "Breathing exercise", "Learn more", "Grounding technique"
 * - Visible disclaimer: "Mimi is a supportive companion, not a medical professional, and cannot diagnose or prescribe."
 * - Connected to Google Gemini 2.0 Flash-Lite / Ollama phi-4-mini with empathetic offline recovery fallback
 */
export function ChatScreen({ onNavigate, onClose }) {
  const { companion, userProfile, chatHistory, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeEngine, setActiveEngine] = useState('gemini-2.0-flash-lite');
  const messagesEndRef = useRef(null);

  const companionName = companion?.name || 'Mimi';
  const companionType = companion?.type || 'dog';
  const userName = userProfile?.name || 'Jane';

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    addChatMessage({ sender: 'user', text });
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(text, chatHistory, {
        companionName,
        companionType,
        userName,
      });

      if (response?.source) {
        setActiveEngine(response.source);
      }

      addChatMessage({
        sender: 'mimi',
        text: response.text,
      });
    } catch (err) {
      console.error('Failed to get chat response:', err);
      addChatMessage({
        sender: 'mimi',
        text: `*rests close beside you* I'm right here with you, ${userName}. Even when technology stumbles, my support for you doesn't waver. Let's take a slow, gentle breath together.`,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPill = (action) => {
    switch (action) {
      case 'breathing':
        handleSendMessage('Can you guide me through a gentle breathing exercise?');
        break;
      case 'learn':
        // Option to navigate to learn screen or ask Mimi
        onNavigate ? onNavigate('learn') : handleSendMessage('What are some gentle reminders for recovering from food guilt?');
        break;
      case 'grounding':
        handleSendMessage('Can you guide me through a 5-4-3-2-1 grounding technique?');
        break;
      case 'guilt':
        handleSendMessage('I feel guilty about what I ate, can you help me?');
        break;
      case 'urge':
        handleSendMessage('I am experiencing an urge to restrict, can we sit together?');
        break;
      default:
        handleSendMessage(action);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-200 overflow-hidden select-none">
      {/* HEADER */}
      <div className="px-4 pt-6 pb-2.5 bg-[#FAF4EA] border-b border-[#F0E6D8] flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (onClose ? onClose() : onNavigate ? onNavigate('home') : null)}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-[#EAE0D0] flex items-center justify-center text-[#553E31] cursor-pointer transition-transform active:scale-90"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E8DFC9] p-0.5 overflow-hidden shadow-2xs">
              <CompanionAvatar
                type={companionType}
                outfit={companion?.equippedOutfit || 'green_bandana'}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold text-[#3B3029]">{companionName}</h2>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#EBF4EE] text-[#2A5C3D] border border-[#CFE4D6]">
                  <Zap className="w-2.5 h-2.5 text-[#52946A]" /> Flash-Lite
                </span>
              </div>
              <p className="text-[10px] text-[#7DAE8B] font-semibold leading-tight">
                Gentle recovery companion
              </p>
            </div>
          </div>
        </div>

        {/* Action / Reset */}
        <button
          type="button"
          onClick={() => handleSendMessage('Hello Mimi, can you give me an affirmation for today?')}
          title="Gentle affirmation"
          className="p-1.5 rounded-full text-amber-700 bg-amber-100/70 hover:bg-amber-200/80 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
        </button>
      </div>

      {/* VISIBLE DISCLAIMER BANNER */}
      <div className="px-3 py-1.5 bg-[#FFF8EB] border-b border-[#F6E6C9] flex items-start gap-1.5 text-[10px] text-[#8C6228] shrink-0">
        <AlertCircle className="w-3.5 h-3.5 text-[#B87B2E] shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Friendly Notice:</strong> {AI_DISCLAIMER}
        </p>
      </div>

      {/* CHAT BUBBLE STREAM */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 bg-[#FAF6F0]">
        {/* Intro Card */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D5] text-center shadow-2xs space-y-1">
          <p className="text-xs font-bold text-[#3B3029]">
            Talk privately with {companionName} 🐾
          </p>
          <p className="text-[11px] text-[#7A6A5E] leading-relaxed">
            I am here to offer a calm, non-judgmental space. You can share meal feelings, breathe through an urge, or practice self-compassion.
          </p>
        </div>

        {/* Message Stream */}
        {(chatHistory || []).map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={idx}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-150`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-[#3D2D3E] text-white rounded-tr-xs'
                    : 'bg-white text-[#382E26] border border-[#EBE1D2] rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start animate-in fade-in">
            <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl bg-white border border-[#EBE1D2] rounded-tl-xs text-xs text-[#7A6B60] flex items-center gap-2 shadow-2xs">
              <span className="italic">{companionName} is thinking gently</span>
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce" />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK-ACTION PILLS */}
      <div className="px-3 py-1.5 bg-[#F5ECE0]/80 border-t border-[#EFE3D3] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <button
          type="button"
          onClick={() => handleQuickPill('breathing')}
          disabled={isTyping}
          className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E2D5C3] rounded-full text-[10px] font-semibold text-[#544336] shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          🌿 Breathing exercise
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill('grounding')}
          disabled={isTyping}
          className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E2D5C3] rounded-full text-[10px] font-semibold text-[#544336] shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          ⚓ Grounding technique
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill('learn')}
          disabled={isTyping}
          className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E2D5C3] rounded-full text-[10px] font-semibold text-[#544336] shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          📚 Learn more
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill('guilt')}
          disabled={isTyping}
          className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E2D5C3] rounded-full text-[10px] font-semibold text-[#544336] shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          🌸 Food guilt
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill('urge')}
          disabled={isTyping}
          className="shrink-0 px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E2D5C3] rounded-full text-[10px] font-semibold text-[#544336] shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          🤍 Urge surfing
        </button>
      </div>

      {/* INPUT AREA */}
      <div className="p-2.5 bg-white border-t border-[#EFE3D3] flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Talk gently with ${companionName}...`}
          disabled={isTyping}
          className="flex-1 px-3.5 py-2 bg-[#FAF6F0] rounded-full border border-[#E8DFC9] text-xs text-[#382E26] placeholder-[#A49386] focus:outline-none focus:border-[#7DAE8B] transition-colors disabled:opacity-50"
        />
        <button
          type="button"
          disabled={isTyping || !inputText.trim()}
          onClick={() => handleSendMessage()}
          className="px-3.5 py-2 bg-[#7DAE8B] hover:bg-[#6CA07B] disabled:opacity-40 text-white text-xs font-bold rounded-full cursor-pointer transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>

      {/* OPTIONAL BOTTOM NAV (If accessed via tab) */}
      {onNavigate && (
        <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4 shrink-0">
          <BottomNav activeTab="home" onTabChange={onNavigate} isHomeOverlay={true} />
        </div>
      )}
    </div>
  );
}

export default ChatScreen;
