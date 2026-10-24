import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  Home,
  BookOpen,
  Users,
  Settings,
  MessageCircleHeart,
  ArrowDown,
} from 'lucide-react';
import CompanionAvatar from './CompanionAvatar';
import { useApp } from '../context/AppContext';

const TUTORIAL_STEPS = [
  {
    stepIndex: 0,
    tabId: 'home',
    nextTabId: 'journal',
    nextTabName: 'Journal',
    nextTabIcon: '❤️',
    title: 'Meet Your Gentle Companion',
    badge: 'Home & Companion',
    icon: Home,
    color: '#7DAE8B',
    bgColor: '#EAF3ED',
    description:
      'Your safe home space with Mimi. Tap your companion anytime for empathetic grounding, box breathing, or log meals with zero guilt and zero calorie counting.',
    tip: '💡 Tip: Mimi is an empathetic AI companion available 24/7 to listen without judgment.',
    promptText: 'Tap the Journal tab (❤️) below or click Next to explore feelings',
  },
  {
    stepIndex: 1,
    tabId: 'journal',
    nextTabId: 'learn',
    nextTabName: 'Guides',
    nextTabIcon: '📖',
    title: 'Digital Feelings Journal',
    badge: 'Emotional Well-Being',
    icon: Heart,
    color: '#E07A5F',
    bgColor: '#FDF0EC',
    description:
      'Check in with how your heart and body feel. Write down thoughts privately, identify emotional triggers, and access instant coping tools like 5-4-3-2-1 Sensory Grounding.',
    tip: '🌷 Tip: Recovery is not linear. Every emotion you experience is valid.',
    promptText: 'Tap the Guides tab (📖) below or click Next to view recovery modules',
  },
  {
    stepIndex: 2,
    tabId: 'learn',
    nextTabId: 'community',
    nextTabName: 'Community',
    nextTabIcon: '👥',
    title: 'Learn & Grow Library',
    badge: 'Evidence-Informed Guides',
    icon: BookOpen,
    color: '#8187DC',
    bgColor: '#F1F1FD',
    description:
      'Explore evidence-informed articles on dismantling eating disorder misconceptions, handling social media body comparisons, and knowing what to expect when seeking professional care.',
    tip: '📖 Tip: Complete 2 modules to unlock the iconic Wizard Round Glasses in your wardrobe!',
    promptText: 'Tap the Community tab (👥) below or click Next to see peer support',
  },
  {
    stepIndex: 3,
    tabId: 'community',
    nextTabId: 'progress',
    nextTabName: 'Style & Wardrobe',
    nextTabIcon: '⚙️',
    title: 'Safe Circle Community',
    badge: 'Anonymous Peer Support',
    icon: Users,
    color: '#588157',
    bgColor: '#EBF2EA',
    description:
      'Connect anonymously with others on their healing journeys. Share encouragement, send supportive hugs, and know that you are never walking alone.',
    tip: '🦸 Tip: Viewing 3 community posts unlocks the Hero Recovery Cape for your companion!',
    promptText: 'Tap the Settings / Wardrobe tab (⚙️) below or click Next',
  },
  {
    stepIndex: 4,
    tabId: 'progress',
    nextTabId: null,
    nextTabName: 'Home',
    nextTabIcon: '🏠',
    title: 'Wardrobe & Gentle Progress',
    badge: 'Progressive Unlocks',
    icon: Settings,
    color: '#B45309',
    bgColor: '#FFFBEB',
    description:
      'Track your non-punitive consistency (streaks never reset to 0!). Progressively unlock cute accessories: Baseball Cap, Dapper Bowtie, Wizard Glasses, Hero Cape, Witch Hat, and Golden Crown!',
    tip: '👑 Tip: Consistent small choices unlock the Golden Recovery Crown!',
    promptText: "✨ You're all set! Tap 'Begin Your Journey 🌷' to explore freely",
  },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, stepIdx: 0 },
  { id: 'journal', label: 'Journal', icon: Heart, stepIdx: 1 },
  { id: 'learn', label: 'Guides', icon: BookOpen, stepIdx: 2 },
  { id: 'community', label: 'Community', icon: Users, stepIdx: 3 },
  { id: 'progress', label: 'Settings', icon: Settings, stepIdx: 4 },
];

export function AppTutorial({ isOpen, onClose, activeTab, onNavigate }) {
  const { companion, updateProfile } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Sync active step with external tab if tab changes
  useEffect(() => {
    if (activeTab) {
      const matchIdx = TUTORIAL_STEPS.findIndex((s) => s.tabId === activeTab);
      if (matchIdx !== -1 && matchIdx !== currentStepIndex) {
        setCurrentStepIndex(matchIdx);
      }
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const currentStep = TUTORIAL_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TUTORIAL_STEPS.length - 1;

  const handleFinish = () => {
    updateProfile({ hasCompletedTutorial: true });
    if (onClose) onClose();
  };

  const handleSkip = () => {
    updateProfile({ hasCompletedTutorial: true });
    if (onClose) onClose();
  };

  const goToStep = (stepIdx) => {
    if (stepIdx < 0 || stepIdx >= TUTORIAL_STEPS.length) return;
    setCurrentStepIndex(stepIdx);
    const targetTab = TUTORIAL_STEPS[stepIdx].tabId;
    if (onNavigate && targetTab) {
      onNavigate(targetTab);
    }
  };

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      goToStep(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      goToStep(currentStepIndex - 1);
    }
  };

  const handleNavClick = (tabId, stepIdx) => {
    goToStep(stepIdx);
  };

  const IconComponent = currentStep.icon;

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-between pointer-events-auto select-none bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Top Banner Notice */}
      <div className="pt-8 px-4 flex items-center justify-between">
        <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-white/60 shadow-xs flex items-center gap-1.5">
          <span className="text-xs">🌷</span>
          <span className="text-[11px] font-bold text-[#4B3B30] uppercase tracking-wider">
            Interactive Walkthrough
          </span>
        </div>

        {/* Clear Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#705E53] hover:text-[#3B3029] text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer active:scale-95"
          title="Skip tutorial and start using the app"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* FLOATING STEP CARD */}
      <div className="px-3 sm:px-4 my-auto">
        <div className="w-full max-w-sm mx-auto bg-[#FFFDF9] rounded-[2rem] shadow-2xl border border-amber-100 overflow-hidden flex flex-col p-5 animate-in zoom-in-95 duration-200">
          
          {/* Header Info */}
          <div className="flex items-center justify-between pb-2 border-b border-[#F4EFE6]">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block"
                style={{ backgroundColor: currentStep.bgColor, color: currentStep.color }}
              >
                {currentStep.badge}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#8C7A70]">
              Step {currentStepIndex + 1} of {TUTORIAL_STEPS.length}
            </span>
          </div>

          {/* Card Body */}
          <div className="py-3.5 space-y-3 text-center">
            {/* Visual Header */}
            <div className="relative mx-auto flex items-center justify-center">
              {currentStepIndex === 0 ? (
                <div className="p-2 rounded-2xl bg-[#FFF6DB] border border-[#EFE3C6] shadow-2xs flex items-center justify-center">
                  <CompanionAvatar
                    type={companion?.type || 'dog'}
                    outfit={companion?.equippedOutfit || 'green_bandana'}
                    className="w-20 h-20"
                    animated
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-black/5"
                  style={{ backgroundColor: currentStep.bgColor }}
                >
                  <IconComponent
                    className="w-8 h-8 transition-transform duration-300 transform scale-105"
                    style={{ color: currentStep.color }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-[#3B3029]">
              {currentStep.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-[#6B5A4F] leading-relaxed px-1 font-normal">
              {currentStep.description}
            </p>

            {/* Tip Card */}
            <div className="p-2.5 rounded-xl bg-[#F7F3EB] border border-[#ECE4D5] text-[11px] text-[#5C4D42] text-left leading-snug">
              {currentStep.tip}
            </div>

            {/* Interactive Navigation Prompt */}
            <div className="p-2 rounded-xl bg-[#EDF6F0] border border-[#D5EAD9] text-[11px] font-bold text-[#2A5C3D] flex items-center justify-center gap-1.5 animate-pulse">
              <span>{currentStep.promptText}</span>
              {!isLast && <ArrowDown className="w-3.5 h-3.5 shrink-0" />}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            {TUTORIAL_STEPS.map((step, idx) => (
              <button
                type="button"
                key={step.tabId}
                onClick={() => goToStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-6 bg-[#7DAE8B]'
                    : idx < currentStepIndex
                    ? 'w-2 bg-[#A3C8AF]'
                    : 'w-2 bg-[#E6DEC9]'
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next & Back Buttons */}
          <div className="pt-2 flex items-center justify-between gap-2">
            {!isFirst ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 px-3.5 py-2 rounded-full border border-[#DED4C3] text-xs font-semibold text-[#665448] hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`flex items-center gap-1 px-5 py-2 rounded-full text-white text-xs font-bold shadow-sm transition-all cursor-pointer ml-auto active:scale-98 ${
                isLast
                  ? 'bg-[#3D2D3E] hover:bg-[#2A1D2B]'
                  : 'bg-[#7DAE8B] hover:bg-[#6C9E7B]'
              }`}
            >
              <span>{isLast ? 'Begin Your Journey 🌷' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE BOTTOM NAVIGATION BAR OVERLAY */}
      <div className="pb-4 pt-2 px-3 bg-gradient-to-t from-[#201E22]/90 via-[#201E22]/70 to-transparent">
        <div className="bg-[#FAF7F0] rounded-3xl p-1.5 shadow-xl border border-white/80">
          <div className="w-full flex items-center justify-around py-1">
            {NAV_ITEMS.map((item) => {
              const NavIcon = item.icon;
              const isCurrentTab = currentStep.tabId === item.id;
              const isNextTarget = currentStep.nextTabId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.stepIdx)}
                  className={`relative p-2 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center gap-0.5 select-none ${
                    isNextTarget
                      ? 'bg-[#7DAE8B] text-white scale-110 shadow-md ring-4 ring-[#7DAE8B]/40 animate-bounce'
                      : isCurrentTab
                      ? 'bg-[#3D2D3E] text-white shadow-xs'
                      : 'text-[#7D6E63] hover:text-[#3B3029] hover:bg-[#ECE5D8]'
                  }`}
                  aria-label={item.label}
                >
                  <NavIcon className="w-5 h-5" strokeWidth={isNextTarget || isCurrentTab ? 2.6 : 2} />
                  <span className="text-[9px] font-bold tracking-tight">{item.label}</span>

                  {/* Pulsing indicator pill for target tab */}
                  {isNextTarget && (
                    <span className="absolute -top-3.5 bg-amber-400 text-stone-900 text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                      Tap!
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default AppTutorial;
