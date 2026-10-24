import React, { useState } from 'react';
import { User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanionAvatar from '../components/CompanionAvatar';
import BottomNav from '../components/BottomNav';
import meadowBg from '../assets/meadow_bg.jpg';

/**
 * HomeScreen (Dashboard) for "Mimi & Me"
 * Displays:
 * - Alpine meadow background with 20% dimming and floating breeze petals
 * - Header with streak indicator ("Day X Together >") and progress link
 * - Centered interactive companion (Dog, Cat, etc.) with accessories
 * - Attached speech bubble with a clean, comfortable gap above the companion
 * - Interactive heart bursts on tapping companion
 * - Wardrobe popup menu for outfits and companion switcher
 * - Prominent "Log my meal" quick action button
 * - Bottom navigation bar
 */
export function HomeScreen({ onNavigate, onOpenProfile, onOpenChat }) {
  const { userProfile, companion, progress, toggleOutfit, updateCompanion } = useApp();
  const [dogHeartPop, setDogHeartPop] = useState(false);
  const [wardrobeMenuOpen, setWardrobeMenuOpen] = useState(false);

  const handleCompanionClick = () => {
    setDogHeartPop(true);
    setTimeout(() => setDogHeartPop(false), 1200);
  };

  const streakDays = progress?.streakDays || 4;
  const companionName = companion?.name || 'Mimi';
  const userName = userProfile?.name || 'Jane';

  return (
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

      {/* TOP CONTROLS HEADER */}
      <div className="relative z-20 px-4 pt-7 flex items-start justify-between">
        {/* Profile Circle Icon (Left) */}
        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Profile & Personalisation"
          className="w-10 h-10 rounded-full bg-[#5B2942] hover:bg-[#481E33] border-2 border-white/80 shadow-md flex items-center justify-center text-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <User className="w-5 h-5 fill-white/80" />
        </button>

        {/* Stacked Status Pills (Right) */}
        <div className="flex flex-col gap-2 items-end">
          {/* Day X Together Streak Pill */}
          <div
            onClick={() => onNavigate('progress')}
            className="bg-[#FFF6DC]/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#F6E3B8] shadow-sm flex items-center gap-2 cursor-pointer hover:bg-white transition-all group"
          >
            <span className="text-base animate-leaf-sway inline-block">🌿</span>
            <div className="text-right leading-none">
              <span className="text-xs font-bold text-[#4B3B30] group-hover:text-[#2D231C]">
                Day {streakDays}
              </span>
              <span className="text-[10px] text-[#7A6455] font-medium block">Together &gt;</span>
            </div>
          </div>

          {/* My Progress Pill */}
          <div
            onClick={() => onNavigate('progress')}
            className="bg-[#FFF3D2]/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#F6DE9F] shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-white transition-all"
          >
            <span className="text-amber-500 text-xs">⭐</span>
            <span className="text-[11px] font-bold text-[#553E31]">My progress &gt;</span>
          </div>
        </div>
      </div>

      {/* CENTER COMPANION & FLOATING SPEECH BUBBLE */}
      <div className="relative z-20 flex-1 flex flex-col justify-end items-center pb-2">
        <div className="relative flex flex-col items-center">
          {/* Soft Speech Bubble - Noticeable 20px gap above companion without crowding */}
          <div
            onClick={onOpenChat}
            className="absolute -top-14 sm:-top-16 -right-2 sm:-right-4 z-30 max-w-[170px] bg-[#FFF6DE]/95 backdrop-blur-xs border border-[#F6E3BC] px-3.5 py-2 rounded-2xl rounded-bl-xs shadow-md animate-speech-float cursor-pointer hover:scale-105 transition-transform"
          >
            <p className="text-[11px] font-bold text-[#553E31] leading-tight text-center">
              Hello, {userName}!
            </p>
            <p className="text-[10px] text-[#7A6455] leading-tight text-center mt-0.5">
              how are you feeling today?
            </p>
            {/* Pointer arrow with clean gap towards the ear */}
            <div className="absolute -bottom-2 left-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#FFF6DE]" />
          </div>

          {/* Interactive Companion (Enlarged by 30% to 250px) */}
          <div
            onClick={handleCompanionClick}
            className="relative cursor-pointer flex flex-col items-center justify-center w-[250px] h-[250px] group select-none -mb-3"
            title={`Click ${companionName} for love!`}
          >
            {/* Heart Burst on tap */}
            {dogHeartPop && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-2xl animate-bounce pointer-events-none z-30">
                <span>❤️</span>
                <span>✨</span>
              </div>
            )}

            {/* Companion Animal Display */}
            <div className="relative w-full h-full flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95">
              <CompanionAvatar
                type={companion?.type || 'dog'}
                outfit={companion?.equippedOutfit || 'green_bandana'}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Wardrobe & Companion Switcher Button at Bottom-Right */}
        <div className="absolute right-3 bottom-1.5 flex flex-col items-end z-30">
          {wardrobeMenuOpen && (
            <div className="mb-2 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pink-100 flex flex-col gap-1 text-[11px] font-semibold text-stone-700 animate-in fade-in duration-200 min-w-[145px]">
              <div className="px-2 pt-0.5 pb-0.5 text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                Outfits
              </div>
              <button
                onClick={() => {
                  toggleOutfit('green_bandana');
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.equippedOutfit === 'green_bandana'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🌿 Bandana</span>
                {companion?.equippedOutfit === 'green_bandana' && <span>✓</span>}
              </button>
              <button
                onClick={() => {
                  toggleOutfit('flower_crown');
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.equippedOutfit === 'flower_crown'
                    ? 'bg-pink-50 text-pink-800 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🌸 Flower Crown</span>
                {companion?.equippedOutfit === 'flower_crown' && <span>✓</span>}
              </button>
              <button
                onClick={() => {
                  toggleOutfit('default');
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.equippedOutfit === 'default'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🐾 Natural</span>
                {companion?.equippedOutfit === 'default' && <span>✓</span>}
              </button>

              <div className="h-px bg-stone-100 my-0.5" />
              <div className="px-2 pt-0.5 pb-0.5 text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                Companion
              </div>
              <button
                type="button"
                onClick={() => {
                  const defaultNames = ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles', 'Ele'];
                  const isDefault = !companion?.name || defaultNames.includes(companion.name);
                  updateCompanion({
                    type: 'dog',
                    name: isDefault ? 'Mimi' : companion.name,
                  });
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  (companion?.type || 'dog') === 'dog'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🐶 Dog (Mimi)</span>
                {(companion?.type || 'dog') === 'dog' && <span>✓</span>}
              </button>
              <button
                type="button"
                onClick={() => {
                  const defaultNames = ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles', 'Ele'];
                  const isDefault = !companion?.name || defaultNames.includes(companion.name);
                  updateCompanion({
                    type: 'cat',
                    name: isDefault ? 'Lulu' : companion.name,
                  });
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.type === 'cat'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🐱 Cat (Lulu)</span>
                {companion?.type === 'cat' && <span>✓</span>}
              </button>
              <button
                type="button"
                onClick={() => {
                  const defaultNames = ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles', 'Ele'];
                  const isDefault = !companion?.name || defaultNames.includes(companion.name);
                  updateCompanion({
                    type: 'elephant',
                    name: isDefault ? 'Ellie' : companion.name,
                  });
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.type === 'elephant'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🐘 Elephant (Ellie)</span>
                {companion?.type === 'elephant' && <span>✓</span>}
              </button>
              <button
                type="button"
                onClick={() => {
                  const defaultNames = ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles', 'Ele'];
                  const isDefault = !companion?.name || defaultNames.includes(companion.name);
                  updateCompanion({
                    type: 'hippo',
                    name: isDefault ? 'bubbles' : companion.name,
                  });
                  setWardrobeMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                  companion?.type === 'hippo'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span>🦛 Hippo (bubbles)</span>
                {companion?.type === 'hippo' && <span>✓</span>}
              </button>

              <div className="h-px bg-stone-100 my-0.5" />
              <button
                type="button"
                onClick={() => {
                  setWardrobeMenuOpen(false);
                  onNavigate('progress');
                }}
                className="px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-colors bg-purple-50 text-purple-900 hover:bg-purple-100 font-bold flex items-center justify-between text-[10px]"
              >
                <span>✨ All Accessories</span>
                <span>→</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setWardrobeMenuOpen(!wardrobeMenuOpen)}
            aria-label="Wardrobe and Outfits"
            className="w-11 h-11 rounded-full bg-[#E597E3] hover:bg-[#D982D7] border-2 border-white shadow-md flex items-center justify-center text-white animate-wardrobe-float cursor-pointer transition-transform active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 3a3 3 0 0 0-3 3c0 .8.3 1.5.8 2L3 14a2 2 0 0 0 1.4 3.4h15.2A2 2 0 0 0 21 14l-6.8-6a3 3 0 0 0 .8-2 3 3 0 0 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* BOTTOM SLATE-BLUE SECTION */}
      <div className="relative z-30 bg-[#CBD7E2] rounded-t-[34px] pt-4 pb-2 px-5 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] flex flex-col gap-3">
        {/* Quick Action Button: "Log my meal" */}
        <button
          type="button"
          onClick={() => onNavigate('log-meal')}
          className="w-full py-3.5 px-6 rounded-full bg-[#DCF397] hover:bg-[#D2EC82] active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(140,165,85,0.25)] border border-[#CDE585] flex items-center justify-center text-[#3D4721] font-bold text-sm tracking-wide cursor-pointer"
        >
          Log my meal
        </button>

        {/* 5 Bottom Navigation Icons */}
        <BottomNav activeTab="home" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default HomeScreen;
