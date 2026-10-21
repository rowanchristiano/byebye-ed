import React, { useState } from 'react';
import {
  Heart,
  ChevronLeft,
  Sparkles,
  User,
  Share2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import OnboardingModal from './components/OnboardingModal';
import CompanionAvatar from './components/CompanionAvatar';
import HomeScreen from './screens/HomeScreen';
import MealLogScreen from './screens/MealLogScreen';
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

  const handleSendChat = (text) => {
    const userText = text || chatInput;
    if (!userText.trim()) return;

    addChatMessage({ sender: 'user', text: userText.trim() });
    setChatInput('');

    setTimeout(() => {
      let reply =
        "I'm always right here with you. Remember that nourishment is your body's right, and you are doing so well today.";
      const lower = userText.toLowerCase();
      if (lower.includes('guilt') || lower.includes('ate too much') || lower.includes('food')) {
        reply =
          "It's completely normal to feel that way, but please remember that food is fuel, not a punishment. You deserve to nourish your body. Would you like to try a quick grounding breath?";
      } else if (lower.includes('breath') || lower.includes('grounding') || lower.includes('exercise')) {
        reply =
          "Let's do 4-4-4 box breathing together: Inhale gently for 4... Hold for 4... Exhale slowly for 4. Feel your feet resting firmly on the ground.";
      } else if (lower.includes('purge') || lower.includes('restrict')) {
        reply =
          "I hear how hard this moment feels. Urges are like waves—they peak and then they pass. Can you sit with me for 5 minutes before deciding?";
      }

      addChatMessage({ sender: 'mimi', text: reply });
    }, 600);
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

          {/* TAB 2: DIGITAL JOURNAL */}
          {activeTab === 'journal' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7]">
              <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#3B3029]">My digital journal</h2>
                  <p className="text-xs text-[#8C7A70]">Safe reflections without judgment</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-[#6B5B52] border border-stone-200">
                  16 october 2026
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Journal input form */}
                <form onSubmit={handleSaveJournal} className="p-4 rounded-3xl bg-white border border-[#EFE8DD] shadow-xs space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7A675B]">
                    My thoughts / moods:
                  </label>
                  <textarea
                    value={newThought}
                    onChange={(e) => setNewThought(e.target.value)}
                    placeholder="I keep feeling guilty about eating large portions, but..."
                    rows={3}
                    className="w-full p-3 rounded-2xl bg-[#FAF7F0] border border-[#E9E0D2] focus:outline-none focus:border-[#7DAE8B] text-xs leading-relaxed"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {['Overwhelmed', 'Reflective', 'Proud', 'Calm'].map((mood) => (
                        <button
                          type="button"
                          key={mood}
                          onClick={() => setSelectedMood(mood)}
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${selectedMood === mood
                            ? 'bg-[#EBF5EF] border-[#7DAE8B] text-[#2D5A3D] font-bold'
                            : 'bg-white border-[#E5DCce] text-[#736357]'
                            }`}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1 rounded-full bg-[#7DAE8B] text-white text-xs font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>

                {/* Existing entries */}
                {(journalEntries || []).map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-3xl bg-[#FDF0EC] border border-[#F6D0C7] shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#A84A38] bg-white/70 px-2 py-0.5 rounded-full border border-[#F4BEB3]">
                        {entry.mood}
                      </span>
                      <span className="text-[11px] text-[#A66F64]">{entry.date}</span>
                    </div>
                    <p className="text-xs text-[#4F3630] leading-relaxed">
                      “{entry.thoughtText}”
                    </p>
                    {entry.savedCopingStrategy && (
                      <div className="pt-2 border-t border-[#F5C7BE]/60 text-[11px] text-[#8E4D3E] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#DE725F]" />
                        <span><strong>Coping tool:</strong> {entry.savedCopingStrategy}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Nav */}
              <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4">
                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isHomeOverlay={true} />
              </div>
            </div>
          )}

          {/* TAB 3: LOG MEAL */}
          {/* TAB 3: MEAL LOGGING SCREEN */}
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

        {/* Mimi Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-[#FFFDF9] rounded-[2rem] shadow-2xl border border-amber-100 flex flex-col h-[75vh] overflow-hidden">
              <div className="px-4 py-3 bg-[#FBF5EB] border-b border-[#F0E6D8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CompanionAvatar type={companion?.type || 'dog'} className="w-8 h-8" />
                  <div>
                    <h3 className="text-xs font-bold text-[#3B3029]">
                      {companion?.name || 'Mimi'}
                    </h3>
                    <span className="text-[10px] text-[#7DAE8B] font-semibold">
                      Gentle companion online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-[#FAF6F0]">
                {(chatHistory || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed shadow-xs ${msg.sender === 'user'
                        ? 'bg-[#3D2D3E] text-white rounded-tr-xs'
                        : 'bg-white text-[#382E26] border border-[#EDE2D2] rounded-tl-xs'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-white border-t border-[#F0E6D8] flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Type a message to Mimi..."
                  className="flex-1 px-3 py-1.5 bg-[#FAF6F0] rounded-full border border-[#E8DFC9] text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSendChat()}
                  className="px-3.5 py-1.5 bg-[#7DAE8B] text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  Send
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
