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

          {/* TAB 1: HOME SCREEN MATCHING IMAGE 2 EXACTLY */}
          {activeTab === 'home' && (
            <div
              className="relative w-full h-full flex flex-col justify-between bg-cover bg-bottom animate-in fade-in duration-300 select-none overflow-hidden"
              style={{ backgroundImage: `url(${meadowBg})` }}
            >
              {/* 20% Background Dimming Overlay */}
              <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

              {/* Floating Breeze Petals Animations */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <div className="absolute top-1/4 left-10 w-3 h-3 bg-white/90 rounded-full blur-[0.3px] petal-1" />
                <div className="absolute top-1/3 right-12 w-3.5 h-3.5 bg-sky-100/80 rounded-full blur-[0.4px] petal-2" />
                <div className="absolute top-1/2 left-20 w-2.5 h-2.5 bg-yellow-100/90 rounded-full blur-[0.3px] petal-3" />
                <div className="absolute top-2/3 right-20 w-3 h-3 bg-white/80 rounded-full blur-[0.3px] petal-1" />
              </div>

              {/* Top Controls Header */}
              <div className="relative z-20 px-4 pt-7 flex items-start justify-between">
                {/* Profile Circle Icon (Left) */}
                <button
                  type="button"
                  onClick={() => setShowOnboarding(true)}
                  aria-label="Profile & Personalisation"
                  className="w-10 h-10 rounded-full bg-[#5B2942] hover:bg-[#481E33] border-2 border-white/80 shadow-md flex items-center justify-center text-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <User className="w-5 h-5 fill-white/80" />
                </button>

                {/* Stacked Pills (Right) */}
                <div className="flex flex-col gap-2 items-end">
                  {/* Day 4 Together Pill */}
                  <div
                    onClick={() => setActiveTab('progress')}
                    className="bg-[#FFF6DC]/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#F6E3B8] shadow-sm flex items-center gap-2 cursor-pointer hover:bg-white transition-all group"
                  >
                    <span className="text-base animate-leaf-sway inline-block">🌿</span>
                    <div className="text-right leading-none">
                      <span className="text-xs font-bold text-[#453023] block">
                        Day {progress?.streakDays || 4}
                      </span>
                      <span className="text-[10px] font-semibold text-[#8C7563] block">
                        Together &gt;
                      </span>
                    </div>
                  </div>

                  {/* My Progress Pill */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('progress')}
                    className="bg-[#FFF6DC]/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#F6E3B8] shadow-sm flex items-center gap-2 cursor-pointer hover:bg-white transition-all group"
                  >
                    <span className="text-base animate-star-shine inline-block">⭐</span>
                    <span className="text-xs font-bold text-[#453023]">
                      My progress &gt;
                    </span>
                  </button>
                </div>
              </div>

              {/* Center Scene: Mimi Dog + Attached Speech Bubble + Wardrobe */}
              <div className="relative flex-1 flex flex-col items-center justify-end pb-1 z-20">
                
                {/* Dog Container with 30% Enlarged Dimensions & Attached Chat Box */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Speech Bubble Attached Directly to Dog (within ~10px) */}
                  <div
                    onClick={() => setShowChatModal(true)}
                    className="absolute top-2 -right-2 sm:-right-4 z-30 max-w-[170px] bg-[#FFF6DE]/95 backdrop-blur-xs border border-[#F6E3BC] px-3.5 py-2 rounded-2xl rounded-bl-xs shadow-md animate-speech-float cursor-pointer hover:scale-105 transition-transform"
                  >
                    <p className="text-[11px] font-bold text-[#553E31] leading-tight text-center">
                      Hello, {userProfile?.name || 'Jane'}!
                    </p>
                    <p className="text-[10px] text-[#7A6455] leading-tight text-center mt-0.5">
                      how are you feeling today?
                    </p>
                    {/* Speech pointer tail pointing directly toward Mimi's ear */}
                    <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#FFF6DE]" />
                  </div>

                  {/* Interactive Companion Dog (Enlarged by 30% from 192px to ~250px) */}
                  <div
                    onClick={handleDogClick}
                    className="relative cursor-pointer flex flex-col items-center justify-center w-[250px] h-[250px] group select-none -mb-4"
                    title="Click Mimi for love!"
                  >
                    {/* Heart Burst on dog tap */}
                    {dogHeartPop && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-2xl animate-bounce pointer-events-none z-30">
                        <span>❤️</span>
                        <span>✨</span>
                      </div>
                    )}

                    {/* Soft ground shadow beneath paws */}
                    <div className="absolute bottom-2.5 w-44 h-4 bg-stone-900/20 rounded-full blur-[2px] -z-10" />

                    {/* Companion Animal Display */}
                    <div className="relative w-full h-full flex items-center justify-center animate-gentle-breathe transition-transform group-hover:scale-105 group-active:scale-95">
                      {companion?.type && companion.type !== 'dog' ? (
                        <CompanionAvatar
                          type={companion.type}
                          outfit={companion.equippedOutfit}
                          className="w-52 h-52"
                        />
                      ) : (
                        <>
                          {/* Mimi Dog PNG (30% Enlarged) */}
                          <img
                            src={dogImg}
                            alt="Mimi companion dog"
                            className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none"
                            draggable={false}
                          />

                          {/* Flower Crown Overlay fitted directly on enlarged dog head */}
                          {companion?.equippedOutfit === 'flower_crown' && (
                            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-32 pointer-events-none drop-shadow-xs animate-in zoom-in duration-200">
                              <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                                <path d="M15 26 C35 12, 65 12, 85 26" stroke="#7DAE8B" strokeWidth="3.5" strokeLinecap="round" />
                                <circle cx="28" cy="18" r="6" fill="#FFC5CE" />
                                <circle cx="28" cy="18" r="2.5" fill="#FFE885" />
                                <circle cx="50" cy="14" r="7" fill="#FFAAA6" />
                                <circle cx="50" cy="14" r="3" fill="#FFF0A0" />
                                <circle cx="72" cy="18" r="6" fill="#BCE0FD" />
                                <circle cx="72" cy="18" r="2.5" fill="#FFE885" />
                                <ellipse cx="40" cy="15" rx="4" ry="2" fill="#88C299" transform="rotate(-20 40 15)" />
                                <ellipse cx="60" cy="15" rx="4" ry="2" fill="#88C299" transform="rotate(20 60 15)" />
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wardrobe Button (Hanger Icon) at Bottom-Right */}
                <div className="absolute right-3 bottom-2 flex flex-col items-end z-30">
                  {/* Mini popup menu for wardrobe options */}
                  {wardrobeMenuOpen && (
                    <div className="mb-2 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pink-100 flex flex-col gap-1 text-[11px] font-semibold text-stone-700 animate-in fade-in duration-200">
                      <button
                        onClick={() => {
                          toggleOutfit('green_bandana');
                          setWardrobeMenuOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 text-left cursor-pointer"
                      >
                        🌿 Bandana
                      </button>
                      <button
                        onClick={() => {
                          toggleOutfit('flower_crown');
                          setWardrobeMenuOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-xl hover:bg-pink-50 hover:text-pink-800 text-left cursor-pointer"
                      >
                        🌸 Flower Crown
                      </button>
                      <button
                        onClick={() => {
                          toggleOutfit('default');
                          setWardrobeMenuOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-xl hover:bg-stone-50 text-left cursor-pointer"
                      >
                        🐾 Natural
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setWardrobeMenuOpen(!wardrobeMenuOpen)}
                    aria-label="Wardrobe and Outfits"
                    className="w-11 h-11 rounded-full bg-[#E597E3] hover:bg-[#D982D7] border-2 border-white shadow-md flex items-center justify-center text-white animate-wardrobe-float cursor-pointer transition-transform active:scale-95"
                  >
                    {/* Hanger SVG Icon matching Image 2 */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-[#5B2942]"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3c0 1.3.8 2.4 2 2.8V10l-8 5.3A2 2 0 0 0 2 17v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-1.7L13 10V7.8c1.2-.4 2-1.5 2-2.8a3 3 0 0 0-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom Slate-Blue Panel matching Image 2 */}
              <div className="relative z-30 bg-[#CBD7E2] rounded-t-[34px] pt-3.5 pb-2 px-4 shadow-[0_-6px_25px_rgba(40,50,60,0.12)]">
                {/* Big "Log my meal" Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('log-meal')}
                  className="w-full py-3 rounded-full bg-[#E4FAA6] hover:bg-[#D8F092] active:scale-[0.98] text-[#3B2A3E] font-bold text-base tracking-wide shadow-xs flex items-center justify-center cursor-pointer transition-all"
                >
                  Log my meal
                </button>

                {/* 5 Bottom Nav Icons */}
                <BottomNav
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  isHomeOverlay={true}
                />
              </div>
            </div>
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
          {activeTab === 'log-meal' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7]">
              <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="p-1 rounded-full text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-base font-bold text-[#3B3029]">Log my meal</h2>
                </div>
                <span className="text-xs text-[#7A695D]">No calories, only balance</span>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Toggle photo/manual */}
                <div className="p-1 rounded-full bg-[#EAE3D5] flex items-center">
                  <button
                    type="button"
                    onClick={() => setLogMode('photo')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-full cursor-pointer ${logMode === 'photo' ? 'bg-white text-[#2F2925] shadow-xs' : 'text-[#7D6F65]'
                      }`}
                  >
                    Take a photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogMode('manual')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-full cursor-pointer ${logMode === 'manual' ? 'bg-white text-[#2F2925] shadow-xs' : 'text-[#7D6F65]'
                      }`}
                  >
                    Manual entry
                  </button>
                </div>

                {/* Photo Mock */}
                <div className="p-4 rounded-3xl bg-white border border-[#E9E0D2] text-center space-y-2">
                  <div className="w-full h-36 rounded-2xl bg-[#F6F1E6] border border-dashed border-[#CFBEAA] flex flex-col items-center justify-center p-3">
                    <span className="text-3xl mb-1">🥗</span>
                    <span className="text-xs font-semibold text-[#5A4B40]">
                      Take a clear photo of your meal
                    </span>
                  </div>
                </div>

                {/* Nutrition intake cards */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A675B]">
                    Nutrition intake
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-2xl bg-[#EFEAF6] border border-[#DCD3E9] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#6B5885] uppercase">Protein</span>
                        <p className="text-sm font-extrabold text-[#3D2C55]">35g</p>
                      </div>
                      <span>🍗</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#EAF5EF] border border-[#CDE5D6] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#3B6B4E] uppercase">Carbohydrates</span>
                        <p className="text-sm font-extrabold text-[#1E4D30]">60g</p>
                      </div>
                      <span>🍞</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#F9EEF6] border border-[#ECCFE3] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#8A4A7A] uppercase">Fibre</span>
                        <p className="text-sm font-extrabold text-[#5B224E]">16g</p>
                      </div>
                      <span>🥦</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#EEF5F8] border border-[#D3E5ED] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#456C7F] uppercase">Fats</span>
                        <p className="text-sm font-extrabold text-[#234556]">18g</p>
                      </div>
                      <span>🥑</span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="p-3.5 rounded-3xl bg-[#EAF5EF] border border-[#C6E2D1] text-center space-y-1">
                  <span className="text-xs font-bold text-[#2A5C3D]">
                    Great choice! Your meal is well balanced.
                  </span>
                  <p className="text-[11px] text-[#4A755A]">
                    Well done! You're getting closer to your health goals!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addMealLog({
                      mealType: 'Lunch',
                      postMealFeeling: 'Nourished and peaceful',
                      nutritionBreakdown: { proteinGrams: 35, carbsGrams: 60, fibreGrams: 16, fatsGrams: 18 },
                    });
                    setActiveTab('home');
                  }}
                  className="w-full py-3 rounded-full bg-[#3D2D3E] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Meal
                </button>
              </div>

              {/* Bottom Nav */}
              <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4">
                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isHomeOverlay={true} />
              </div>
            </div>
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
