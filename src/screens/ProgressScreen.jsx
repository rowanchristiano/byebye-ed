import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, Check, Heart, Trophy, Shirt, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanionAvatar from '../components/CompanionAvatar';
import BottomNav from '../components/BottomNav';

const WARDROBE_ACCESSORIES = [
  {
    id: 'green_bandana',
    name: 'Sage Bandana',
    subtitle: 'Warm & calming protection',
    icon: '🧣',
    color: 'bg-[#EBF4EE] border-[#CFE4D6] text-[#2A5C3D]',
    type: 'default',
    requirementText: 'Available by default',
  },
  {
    id: 'flower_crown',
    name: 'Flower Crown',
    subtitle: 'Blossoming self-compassion',
    icon: '🌸',
    color: 'bg-[#FDF2F4] border-[#FAD6DC] text-[#A63C52]',
    type: 'default',
    requirementText: 'Available by default',
  },
  {
    id: 'cap',
    name: 'Cozy Baseball Cap',
    subtitle: 'Shades your gentle recovery path',
    icon: '🧢',
    color: 'bg-[#EAF2FD] border-[#CADDF9] text-[#1E52A4]',
    type: 'meals',
    requiredMeals: 1,
    requirementText: 'Log 1 meal to unlock',
  },
  {
    id: 'bowtie',
    name: 'Dapper Bowtie',
    subtitle: 'Celebrating mindful recovery moments',
    icon: '🎀',
    color: 'bg-[#FDF0EE] border-[#F8D2CC] text-[#B8382A]',
    type: 'modules',
    requiredModules: 1,
    requirementText: 'Complete 1 learning module to unlock',
  },
  {
    id: 'glasses',
    name: 'Wizard Round Glasses',
    subtitle: 'Wise, curious & insightful ("Harry Potter" style)',
    icon: '👓',
    color: 'bg-[#F4F1EA] border-[#DFD8C9] text-[#423C32]',
    type: 'modules',
    requiredModules: 2,
    requirementText: 'Complete 2 learning modules to unlock',
  },
  {
    id: 'cape',
    name: 'Hero Recovery Cape',
    subtitle: 'Every nourishing choice is brave',
    icon: '🦸',
    color: 'bg-[#F6EEFD] border-[#E5CEFA] text-[#6929A8]',
    type: 'community',
    requiredCommunity: 3,
    requirementText: 'View 3 community posts to unlock',
  },
  {
    id: 'witch_hat',
    name: 'Whimsical Witch Hat',
    subtitle: 'Magic of private emotional honesty',
    icon: '🧙',
    color: 'bg-[#F0ECF9] border-[#D8CEF0] text-[#55369A]',
    type: 'journal',
    requiredJournals: 1,
    requirementText: 'Write 1 journal reflection to unlock',
  },
  {
    id: 'crown',
    name: 'Golden Recovery Crown',
    subtitle: 'You are worthy of care and healing',
    icon: '👑',
    color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]',
    type: 'combo',
    requiredMeals: 1,
    requiredModules: 2,
    requirementText: 'Log 1 meal & complete 2 modules to unlock',
  },
  {
    id: 'default',
    name: 'Natural & Cozy',
    subtitle: 'Pure and comfortable as you are',
    icon: '🐾',
    color: 'bg-[#FAF6F0] border-[#EAE0D0] text-[#553E31]',
    type: 'default',
    requirementText: 'Always available',
  },
];

const COMPANIONS = [
  { id: 'dog', name: 'Mimi', label: 'Dog 🐶' },
  { id: 'cat', name: 'Lulu', label: 'Cat 🐱' },
  { id: 'elephant', name: 'Ellie', label: 'Elephant 🐘' },
  { id: 'hippo', name: 'bubbles', label: 'Hippo 🦛' },
];

/**
 * ProgressScreen: Stats Summary & Wardrobe Customizer
 * Features:
 * 1. Non-punitive stats summary:
 *    - Total Meals Logged
 *    - Healthy Days
 *    - Non-punitive safe streak count (missed days never reset to zero)
 * 2. Wardrobe Selector:
 *    - Live interactive companion preview with equipped accessories
 *    - View unlocked accessories and toggle to equip them dynamically
 *    - Pet switcher to style any unlocked companion
 */
export function ProgressScreen({ onNavigate, onOpenProfile, onOpenTutorial }) {
  const {
    progress,
    companion,
    toggleOutfit,
    updateCompanion,
    userProfile,
    mealLogs,
    journalEntries,
    learningProgress,
    community,
  } = useApp();
  const [activeTab, setActiveTab] = useState('wardrobe'); // 'wardrobe' | 'stats'
  const [equipFeedback, setEquipFeedback] = useState('');

  const currentOutfit = companion?.equippedOutfit || 'green_bandana';
  const currentPet = companion?.type || 'dog';
  const streakDays = progress?.streakDays || 4;
  const healthyDays = progress?.healthyDays || 15;
  const mealsLogged = (mealLogs && mealLogs.length) || progress?.totalMealsLogged || 0;
  const completedModulesCount = (learningProgress?.completedModuleIds && learningProgress.completedModuleIds.length) || 0;
  const viewedCommunityCount = (community?.viewedPostIds && community.viewedPostIds.length) || 0;
  const journalCount = (journalEntries && journalEntries.length) || 0;
  const unlockedList = companion?.unlockedOutfits || ['default', 'green_bandana', 'flower_crown'];

  const checkIsUnlocked = (item) => {
    if (unlockedList.includes(item.id)) return true;
    switch (item.id) {
      case 'default':
      case 'green_bandana':
      case 'flower_crown':
        return true;
      case 'cap':
        return mealsLogged >= 1;
      case 'bowtie':
        return completedModulesCount >= 1;
      case 'glasses':
        return completedModulesCount >= 2;
      case 'cape':
        return viewedCommunityCount >= 3;
      case 'witch_hat':
        return journalCount >= 1 || mealsLogged >= 2;
      case 'crown':
        return mealsLogged >= 1 && completedModulesCount >= 2;
      default:
        return false;
    }
  };

  const handleEquip = (accessoryId) => {
    const item = WARDROBE_ACCESSORIES.find((a) => a.id === accessoryId);
    if (!item) return;

    const isUnlocked = checkIsUnlocked(item);
    if (!isUnlocked) {
      setEquipFeedback(`🔒 Locked: ${item.requirementText}! Keep going ✨`);
      setTimeout(() => setEquipFeedback(''), 2500);
      return;
    }

    toggleOutfit(accessoryId);
    setEquipFeedback(`Equipped ${item.name}! ✨`);
    setTimeout(() => setEquipFeedback(''), 1800);
  };

  const handleSwitchPet = (petId, petName) => {
    const isDefaultName = !companion?.name || ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles'].includes(companion.name);
    updateCompanion({
      type: petId,
      name: isDefaultName ? petName : companion.name,
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-200 select-none overflow-hidden">
      {/* HEADER */}
      <div className="px-5 pt-7 pb-3 border-b border-[#F2ECE0] flex items-center justify-between shrink-0 bg-[#FAF4EA]/80 backdrop-blur-xs">
        <div>
          <h2 className="text-base font-bold text-[#3B3029]">My Progress & Style</h2>
          <p className="text-xs text-[#827166]">Gentle, non-punitive consistency</p>
        </div>
        <div className="flex items-center gap-1.5">
          {onOpenTutorial && (
            <button
              type="button"
              onClick={onOpenTutorial}
              className="px-2.5 py-1 rounded-full bg-[#FAF0E6] border border-[#ECD9C5] text-[11px] font-bold text-[#8C5D3A] hover:bg-[#F3E2CF] cursor-pointer transition-all active:scale-95"
              title="View app tutorial walkthrough"
            >
              Tour ✨
            </button>
          )}
          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="px-2.5 py-1 rounded-full bg-[#EBF4EE] border border-[#CFE4D6] text-[11px] font-bold text-[#2A5C3D] hover:bg-[#DCEEE3] cursor-pointer transition-all active:scale-95"
            >
              Personalise 🌷
            </button>
          )}
        </div>
      </div>

      {/* CONTENT SCROLL */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4">
        {/* SUB-TABS: WARDROBE vs STATS */}
        <div className="p-1 rounded-full bg-[#EAE3D5] flex items-center">
          <button
            type="button"
            onClick={() => setActiveTab('wardrobe')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'wardrobe'
                ? 'bg-white text-[#2F2925] shadow-xs'
                : 'text-[#7D6F65] hover:text-[#4F4138]'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Wardrobe</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'stats'
                ? 'bg-white text-[#2F2925] shadow-xs'
                : 'text-[#7D6F65] hover:text-[#4F4138]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Stats Summary</span>
          </button>
        </div>

        {/* ================= SECTION: WARDROBE SELECTOR ================= */}
        {activeTab === 'wardrobe' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* LIVE COMPANION PREVIEW CARD */}
            <div className="relative p-4 rounded-3xl bg-gradient-to-b from-[#FFF9EE] to-[#FFF1DE] border border-[#F6E1C8] shadow-xs flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full flex items-center justify-between text-xs text-[#7A5B2B] font-bold px-1 mb-1">
                <span>{companion?.name || 'Mimi'}</span>
                <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                  {currentOutfit === 'green_bandana'
                    ? 'Sage Bandana 🧣'
                    : currentOutfit === 'flower_crown'
                    ? 'Flower Crown 🌸'
                    : 'Natural 🐾'}
                </span>
              </div>

              {/* Interactive Avatar Container */}
              <div className="relative w-40 h-40 flex items-center justify-center my-1">
                <CompanionAvatar
                  type={currentPet}
                  outfit={currentOutfit}
                  className="w-full h-full"
                />
              </div>

              {/* Feedback toast */}
              {equipFeedback && (
                <div className="text-[11px] font-bold text-[#2A5C3D] bg-[#EBF4EE] border border-[#CFE4D6] px-3 py-1 rounded-full animate-bounce">
                  {equipFeedback}
                </div>
              )}

              {/* PET SWITCHER CHIPS */}
              <div className="w-full flex items-center justify-center gap-1.5 pt-2 border-t border-amber-200/50 mt-2">
                {COMPANIONS.map((pet) => (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => handleSwitchPet(pet.id, pet.name)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                      currentPet === pet.id
                        ? 'bg-[#3D2D3E] text-white shadow-xs'
                        : 'bg-white/80 text-[#675447] hover:bg-white border border-[#EAE0D0]'
                    }`}
                  >
                    {pet.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ACCESSORIES SELECTOR LIST */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#3B3029]">Wardrobe & Accessories</span>
                <span className="text-[10px] text-[#8C7A70]">Tap to style companion</span>
              </div>

              <div className="space-y-2">
                {WARDROBE_ACCESSORIES.map((item) => {
                  const isEquipped = currentOutfit === item.id;
                  const isUnlocked = checkIsUnlocked(item);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleEquip(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-2xs hover:scale-[1.008] active:scale-[0.99] ${
                        !isUnlocked
                          ? 'bg-[#F9F6F0]/70 border-dashed border-[#DFD6C8] opacity-80'
                          : isEquipped
                          ? 'bg-[#FBF8EF] border-[#D4C3A3] ring-2 ring-[#7DAE8B]/40'
                          : 'bg-white border-[#EAE1D2] hover:border-[#DCCDBA]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border relative ${
                            !isUnlocked ? 'bg-[#ECE5D8] border-[#DFD6C8] text-[#8C7C70] grayscale-50' : item.color
                          }`}
                        >
                          {item.icon}
                          {!isUnlocked && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#52443A] text-white flex items-center justify-center shadow-xs">
                              <Lock className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[#3B3029]">{item.name}</h4>
                            {isEquipped && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#7DAE8B] text-white">
                                EQUIPPED
                              </span>
                            )}
                            {!isUnlocked && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#EAE2D5] text-[#7A6A5E]">
                                LOCKED
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#7A6A5E]">
                            {!isUnlocked ? (
                              <span className="font-semibold text-[#A66038]">
                                🔒 {item.requirementText}
                              </span>
                            ) : (
                              item.subtitle
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEquip(item.id);
                        }}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                          !isUnlocked
                            ? 'bg-[#ECE5D8] text-[#786659] border border-[#DDD3C4] hover:bg-[#E2D9CB]'
                            : isEquipped
                            ? 'bg-[#7DAE8B] text-white shadow-xs'
                            : 'bg-[#FAF6F0] text-[#553E31] border border-[#EAE0D0] hover:bg-[#F2ECE0]'
                        }`}
                      >
                        {!isUnlocked ? 'Locked 🔒' : isEquipped ? 'Equipped ✓' : 'Equip'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION: STATS SUMMARY ================= */}
        {activeTab === 'stats' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* ENCOURAGEMENT BANNER */}
            <div className="p-4 rounded-3xl bg-[#FEF7EB] border border-[#FCE2B8] text-center space-y-1 shadow-2xs">
              <span className="text-sm font-extrabold text-[#A66C1A]">You’re doing great!</span>
              <p className="text-xs text-[#7A5420] font-medium leading-relaxed">
                Consistency in recovery is about returning gently, not perfection. Every nourishing choice counts.
              </p>
            </div>

            {/* 3 CORE STATS CARDS */}
            <div className="grid grid-cols-2 gap-3">
              {/* Stat 1: Total Meals Logged */}
              <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] text-center shadow-xs flex flex-col items-center justify-center">
                <span className="text-[11px] font-semibold text-[#8C7A70] uppercase tracking-wider">
                  Meals logged
                </span>
                <div className="text-3xl font-black text-[#3D2D3E] mt-1">
                  {mealsLogged}
                </div>
                <span className="text-[10px] text-[#7DAE8B] font-semibold mt-1">
                  Nourishing mind & body
                </span>
              </div>

              {/* Stat 2: Healthy Days */}
              <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] text-center shadow-xs flex flex-col items-center justify-center">
                <span className="text-[11px] font-semibold text-[#8C7A70] uppercase tracking-wider">
                  Healthy days
                </span>
                <div className="text-3xl font-black text-[#7DAE8B] mt-1">
                  {healthyDays}
                </div>
                <span className="text-[10px] text-[#A66C1A] font-semibold mt-1">
                  {streakDays} days together 🔥
                </span>
              </div>
            </div>

            {/* SAFE STREAK EXPLANATION */}
            <div className="p-3.5 rounded-2xl bg-[#EBF4EE] border border-[#CFE4D6] flex items-start gap-2.5 text-xs text-[#2A5C3D] shadow-2xs">
              <ShieldCheck className="w-5 h-5 shrink-0 text-[#7DAE8B] mt-0.5" />
              <div>
                <p className="font-bold">Safe, Non-Punitive Streak</p>
                <p className="text-[11px] text-[#336345] leading-relaxed mt-0.5">
                  Missed or difficult days <strong>never reset your streak count to zero</strong>. Healing happens through self-compassion, not punishment.
                </p>
              </div>
            </div>

            {/* RECOVERY MILESTONES */}
            <div className="p-4 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs space-y-2.5">
              <h3 className="text-xs font-bold text-[#3B3029] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#A66C1A]" />
                <span>Earned Milestones</span>
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EFE5D5]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥗</span>
                    <div>
                      <p className="text-xs font-bold text-[#3B3029]">Mindful Meal Logger</p>
                      <p className="text-[10px] text-[#8C7A70]">Logged over 15 balanced meals</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-[#7DAE8B]" />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EFE5D5]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧣</span>
                    <div>
                      <p className="text-xs font-bold text-[#3B3029]">Wardrobe Stylist</p>
                      <p className="text-[10px] text-[#8C7A70]">Unlocked custom accessories for Mimi</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-[#7DAE8B]" />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EFE5D5]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌱</span>
                    <div>
                      <p className="text-xs font-bold text-[#3B3029]">Safe Space Champion</p>
                      <p className="text-[10px] text-[#8C7A70]">Protected a 4-day non-punitive streak</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-[#7DAE8B]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4 shrink-0">
        <BottomNav activeTab="progress" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default ProgressScreen;
