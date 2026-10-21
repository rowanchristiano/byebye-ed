import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  ChevronLeft,
  Sparkles,
  User,
  Share2,
  X,
  ShieldCheck,
  Zap,
  Key,
  Send,
} from 'lucide-react';
import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import OnboardingModal from './components/OnboardingModal';
import CompanionAvatar from './components/CompanionAvatar';
import HomeScreen from './screens/HomeScreen';
import MealLogScreen from './screens/MealLogScreen';
import JournalScreen from './screens/JournalScreen';
import LearnScreen from './screens/LearnScreen';
import {
  generateCompanionReply,
  getApiKey,
  setApiKey,
  hasApiKey,
} from './services/gemini';
import dogImg from './assets/dog.png';
import meadowBg from './assets/meadow_bg.jpg';

export function App() {
  const {
    userProfile,
    companion,
    journalEntries,
    progress,
    chatHistory,
    toggleOutfit,
    updateCompanion,
    addMealLog,
    addJournalEntry,
    addChatMessage,
  } = useApp();

  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getApiKey());
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeySavedNotice, setApiKeySavedNotice] = useState(false);
  const chatMessagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (showChatModal) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isAiTyping, showChatModal]);

  // Interactive micro-animations
  const [dogHeartPop, setDogHeartPop] = useState(false);
  const [wardrobeMenuOpen, setWardrobeMenuOpen] = useState(false);

  // Screen-specific state
  const [logMode, setLogMode] = useState('photo');
  const [progressTab, setProgressTab] = useState('overview');
  const [communityTab, setCommunityTab] = useState('groups');
  const [likedPosts, setLikedPosts] = useState({});
  const [newThought, setNewThought] = useState('');
  const [selectedMood, setSelectedMood] = useState('Reflective');

  const handleDogClick = () => {
    setDogHeartPop(true);
    setTimeout(() => setDogHeartPop(false), 1200);
  };

  const handleSendChat = async (text) => {
    const userText = text || chatInput;
    if (!userText.trim() || isAiTyping) return;

    const trimmed = userText.trim();
    addChatMessage({ sender: 'user', text: trimmed });
    setChatInput('');
    setIsAiTyping(true);

    try {
      const response = await generateCompanionReply({
        userMessage: trimmed,
        history: chatHistory,
        companionName: companion?.name || 'Mimi',
        companionType: companion?.type || 'dog',
        userName: userProfile?.name || 'friend',
      });
      addChatMessage({ sender: 'mimi', text: response.text });
    } catch (err) {
      console.error('Gemini chat error:', err);
      addChatMessage({
        sender: 'mimi',
        text: "I'm right here beside you. You are doing so well, and whatever you're feeling right now, we can take it one gentle step at a time.",
      });
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput);
    setApiKeySavedNotice(true);
    setTimeout(() => {
      setApiKeySavedNotice(false);
      setShowKeyConfig(false);
    }, 1200);
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    if (!newThought.trim()) return;
    addJournalEntry({
      mood: selectedMood,
      thoughtText: newThought.trim(),
      savedCopingStrategy: 'Self-compassion break & 5-4-3-2-1 Grounding',
    });
    setNewThought('');
  };

  return (
    <div className="min-h-screen bg-[#F0EBE1] flex items-center justify-center p-2 sm:p-6 font-sans select-none">
      {/* Phone Mockup Frame matching Image 2 */}
      <div className="relative w-full max-w-[390px] h-[780px] sm:h-[810px] bg-[#FFF6DB] rounded-[48px] p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(70,55,40,0.22)] border-[8px] sm:border-[10px] border-[#FFF6DB] flex flex-col justify-between overflow-hidden">

        {/* Top Speaker / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#23201F] rounded-full z-40 flex items-center justify-center">
          <div className="w-8 h-1 bg-[#3A3532] rounded-full" />
        </div>

        {/* SCREEN CONTENT AREA */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between bg-stone-100">

          {/* TAB 1: HOME SCREEN (MY MIMI DASHBOARD) */}
          {activeTab === 'home' && (
            <HomeScreen
              onNavigate={setActiveTab}
              onOpenProfile={() => setShowOnboarding(true)}
              onOpenChat={() => setShowChatModal(true)}
            />
          )}

          {/* TAB 2: DIGITAL JOURNAL (MY FEELINGS) */}
          {activeTab === 'journal' && (
            <JournalScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 3: LEARN & GROW LIBRARY */}
          {activeTab === 'learn' && (
            <LearnScreen onNavigate={setActiveTab} />
          )}

          {/* TAB: MEAL LOGGING SCREEN */}
          {activeTab === 'log-meal' && (
            <MealLogScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 4: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7]">
              <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0]">
                <h2 className="text-base font-bold text-[#3B3029]">My community</h2>
                <p className="text-xs text-[#8C7A70]">Safe, moderated peer support</p>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <div className="p-1 rounded-full bg-[#EAE3D5] flex items-center">
                  <button
                    type="button"
                    onClick={() => setCommunityTab('groups')}
                    className={`flex-1 py-1 text-xs font-bold rounded-full ${communityTab === 'groups' ? 'bg-white text-[#2F2925] shadow-xs' : 'text-[#7D6F65]'
                      }`}
                  >
                    Groups
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommunityTab('friends')}
                    className={`flex-1 py-1 text-xs font-bold rounded-full ${communityTab === 'friends' ? 'bg-white text-[#2F2925] shadow-xs' : 'text-[#7D6F65]'
                      }`}
                  >
                    Friends
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] flex items-center justify-between shadow-xs">
                    <div>
                      <h3 className="text-xs font-bold text-[#3B3029]">Anonymous support group</h3>
                      <p className="text-[10px] text-[#8C7A70]">1.2k members • Motivate each other</p>
                    </div>
                    <button className="px-3.5 py-1 rounded-full bg-[#7DAE8B] text-white text-[11px] font-bold">
                      Joined
                    </button>
                  </div>

                  <div className="p-3.5 rounded-3xl bg-white border border-[#EAE1D2] flex items-center justify-between shadow-xs">
                    <div>
                      <h3 className="text-xs font-bold text-[#3B3029]">Progress buddies</h3>
                      <p className="text-[10px] text-[#8C7A70]">125 members • Share meals & recipes</p>
                    </div>
                    <button className="px-3.5 py-1 rounded-full bg-[#7DAE8B] text-white text-[11px] font-bold">
                      Joined
                    </button>
                  </div>
                </div>

                {/* Forum post */}
                <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">
                      QR
                    </div>
                    <span className="text-xs font-bold text-[#3B3029]">QuietRiver</span>
                  </div>
                  <p className="text-xs text-[#4F4138]">
                    “Today I tried a new recipe and it actually made me feel so good.”
                  </p>
                  <div className="w-full h-32 rounded-2xl bg-[#FFF6EE] border border-[#F6E1D2] flex items-center justify-center text-3xl shadow-inner">
                    🍲
                  </div>
                  <div className="flex items-center justify-between pt-1 text-xs text-[#806E63]">
                    <button
                      onClick={() =>
                        setLikedPosts((prev) => ({ ...prev, post_1: !prev.post_1 }))
                      }
                      className={`flex items-center gap-1 cursor-pointer ${likedPosts.post_1 ? 'text-[#DE6852]' : ''
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts.post_1 ? 'fill-[#DE6852]' : ''}`} />
                      <span>{likedPosts.post_1 ? 232 : 231}</span>
                    </button>
                    <span>💬 14 comments</span>
                    <Share2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4">
                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isHomeOverlay={true} />
              </div>
            </div>
          )}

          {/* TAB 5: PROGRESS / SETTINGS */}
          {activeTab === 'progress' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7]">
              <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#3B3029]">My progress</h2>
                  <p className="text-xs text-[#827166]">Gentle, non-punitive consistency</p>
                </div>
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="px-2.5 py-1 rounded-full bg-[#EBF4EE] border border-[#CFE4D6] text-[11px] font-bold text-[#2A5C3D] cursor-pointer"
                >
                  Personalise 🌷
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <div className="p-1 rounded-full bg-[#EAE3D5] flex items-center">
                  {['overview', 'achievements', 'streaks'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setProgressTab(tab)}
                      className={`flex-1 py-1 text-xs font-bold capitalize rounded-full cursor-pointer ${progressTab === tab ? 'bg-white text-[#2F2925] shadow-xs' : 'text-[#7D6F65]'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-3xl bg-[#FEF7EB] border border-[#FCE2B8] text-center space-y-1">
                  <span className="text-sm font-extrabold text-[#A66C1A]">You’re doing great!</span>
                  <p className="text-xs text-[#7A5420] font-medium">
                    Keep going, every healthy choice makes a difference.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] text-center shadow-xs">
                    <span className="text-[11px] font-semibold text-[#8C7A70] uppercase">
                      Meals logged
                    </span>
                    <div className="text-3xl font-black text-[#3D2D3E] mt-1">
                      {progress?.totalMealsLogged || 18}
                    </div>
                  </div>
                  <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] text-center shadow-xs">
                    <span className="text-[11px] font-semibold text-[#8C7A70] uppercase">
                      Healthy days
                    </span>
                    <div className="text-3xl font-black text-[#7DAE8B] mt-1">
                      {progress?.healthyDays || 15}
                    </div>
                    <span className="text-[10px] text-[#A66C1A] font-semibold">
                      {progress?.streakDays || 4} days 🔥
                    </span>
                  </div>
                </div>

                {/* Safe Streak Note */}
                <div className="p-3.5 rounded-2xl bg-[#EBF4EE] border border-[#CFE4D6] flex items-center gap-2.5 text-xs text-[#2A5C3D]">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-[#7DAE8B]" />
                  <p className="leading-snug">
                    <strong>Safe Streak:</strong> Missed days never reset your count to zero.
                  </p>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4">
                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isHomeOverlay={true} />
              </div>
            </div>
          )}

        </div>

        {/* Mimi Chat Modal with Gemini Flash-Lite Integration */}
        {showChatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-[#FFFDF9] rounded-[2rem] shadow-2xl border border-amber-100 flex flex-col h-[75vh] overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 bg-[#FBF5EB] border-b border-[#F0E6D8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CompanionAvatar type={companion?.type || 'dog'} className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-[#3B3029]">
                        {companion?.name || 'Mimi'}
                      </h3>
                      {hasApiKey() ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                          <Zap className="w-2.5 h-2.5 text-emerald-600" /> Flash-Lite
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowKeyConfig(true)}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200 transition cursor-pointer"
                        >
                          <Key className="w-2.5 h-2.5" /> Connect Key
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-[#7DAE8B] font-semibold">
                      Gentle recovery companion
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowKeyConfig(!showKeyConfig)}
                    title="Gemini API Key Settings"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      showKeyConfig ? 'bg-amber-200 text-amber-900' : 'text-stone-500 hover:bg-stone-200/60'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChatModal(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Collapsible API Key Drawer */}
              {showKeyConfig && (
                <div className="p-3 bg-[#FFF3DC] border-b border-[#F4DCB0] text-xs space-y-2 animate-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#6D4B18] flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Gemini Flash-Lite API
                    </span>
                    <a
                      href="https://aistudio.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-700 underline font-semibold"
                    >
                      Get free key ↗
                    </a>
                  </div>
                  <p className="text-[11px] text-[#7A5B2B] leading-tight">
                    Uses Google's lowest-usage model (<strong>gemini-2.0-flash-lite</strong>) for fast, compassionate companion support.
                  </p>
                  <div className="flex gap-1.5">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Paste Gemini API key (AIza...)"
                      className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#E4C896] rounded-xl focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveApiKey}
                      className="px-3 py-1 bg-[#7DAE8B] hover:bg-[#6C9E7A] text-white text-xs font-bold rounded-xl cursor-pointer transition"
                    >
                      {apiKeySavedNotice ? 'Saved! ✓' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-[#FAF6F0]">
                {(!chatHistory || chatHistory.length === 0) && (
                  <div className="text-center py-6 text-xs text-stone-500">
                    <p className="font-semibold text-stone-700">Say hello to {companion?.name || 'Mimi'} 🐾</p>
                    <p className="text-[11px] mt-1 text-stone-400">Ask for grounding, share meal feelings, or take a deep breath.</p>
                  </div>
                )}

                {(chatHistory || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#3D2D3E] text-white rounded-tr-xs'
                          : 'bg-white text-[#382E26] border border-[#EDE2D2] rounded-tl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isAiTyping && (
                  <div className="flex items-start">
                    <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl bg-white border border-[#EDE2D2] rounded-tl-xs text-xs text-[#7A6B60] flex items-center gap-2 shadow-xs">
                      <span className="italic">{companion?.name || 'Mimi'} is thinking</span>
                      <span className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7DAE8B] animate-bounce" />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatMessagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-3 py-1.5 bg-[#FAF6F0] flex gap-1.5 overflow-x-auto no-scrollbar border-t border-[#F0E6D8]/60">
                <button
                  type="button"
                  onClick={() => handleSendChat("I feel guilty after eating")}
                  disabled={isAiTyping}
                  className="shrink-0 px-2.5 py-1 text-[10px] bg-white text-stone-600 rounded-full border border-stone-200 hover:bg-stone-50 transition cursor-pointer disabled:opacity-50"
                >
                  🌸 Food guilt
                </button>
                <button
                  type="button"
                  onClick={() => handleSendChat("Can you guide me through a grounding breath?")}
                  disabled={isAiTyping}
                  className="shrink-0 px-2.5 py-1 text-[10px] bg-white text-stone-600 rounded-full border border-stone-200 hover:bg-stone-50 transition cursor-pointer disabled:opacity-50"
                >
                  🌿 Box breathing
                </button>
                <button
                  type="button"
                  onClick={() => handleSendChat("I have an urge to restrict right now")}
                  disabled={isAiTyping}
                  className="shrink-0 px-2.5 py-1 text-[10px] bg-white text-stone-600 rounded-full border border-stone-200 hover:bg-stone-50 transition cursor-pointer disabled:opacity-50"
                >
                  🤍 Urge surfing
                </button>
              </div>

              {/* Chat Input */}
              <div className="p-2.5 bg-white border-t border-[#F0E6D8] flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder={`Talk gently with ${companion?.name || 'Mimi'}...`}
                  disabled={isAiTyping}
                  className="flex-1 px-3 py-1.5 bg-[#FAF6F0] rounded-full border border-[#E8DFC9] text-xs focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={isAiTyping || !chatInput.trim()}
                  onClick={() => handleSendChat()}
                  className="px-3.5 py-1.5 bg-[#7DAE8B] hover:bg-[#6C9E7A] disabled:opacity-40 text-white text-xs font-bold rounded-full cursor-pointer transition flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onboarding Modal */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </div>
    </div>
  );
}

export default App;
