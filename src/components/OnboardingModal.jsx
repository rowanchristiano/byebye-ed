import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanionAvatar from './CompanionAvatar';

const SUPPORT_OPTIONS = [
  'Managing guilt around food',
  'Feeling more comfortable with my body',
  'Coping with difficult emotions',
  'Finding the courage to seek help',
  'Learning more about eating disorders',
  'Feeling less alone',
];

const COMPANION_DEFAULTS = {
  dog: 'Mimi',
  cat: 'Lulu',
  elephant: 'Ellie',
  hippo: 'bubbles',
};

const COMPANIONS = [
  {
    type: 'cat',
    label: 'Cat (Lulu)',
    description: 'Whimsical & peaceful',
    outfit: 'flower_crown',
  },
  {
    type: 'dog',
    label: 'Dog (Mimi)',
    description: 'Loyal & encouraging',
    outfit: 'green_bandana',
  },
  {
    type: 'elephant',
    label: 'Elephant (Ellie)',
    description: 'Gentle & steady',
    outfit: 'cap',
  },
  {
    type: 'hippo',
    label: 'Hippo (bubbles)',
    description: 'Warm & grounded',
    outfit: 'bowtie',
  },
];

const DEFAULT_MEAL_TIMES = [
  { key: 'breakfast', label: 'breakfast', defaultTime: '07:30 AM', optional: false },
  { key: 'lunch', label: 'Lunch', defaultTime: '12:30 PM', optional: false },
  { key: 'dinner', label: 'Dinner', defaultTime: '06:30 PM', optional: false },
  { key: 'snack', label: 'Supper/Snack (optional)', defaultTime: '09:00 PM', optional: true },
];

export function OnboardingModal({ isOpen: explicitIsOpen, onClose, onComplete }) {
  const { userProfile, companion, updateProfile, updateCompanion } = useApp();

  // Automatic trigger if not onboarded, or controlled via explicitIsOpen
  const shouldShow = explicitIsOpen !== undefined ? explicitIsOpen : !userProfile?.isOnboarded;

  const [step, setStep] = useState(1);

  // Form State initialized from userProfile/companion
  const [userName, setUserName] = useState(() => userProfile?.name || '');

  useEffect(() => {
    if (userProfile?.name && !userName) {
      setUserName(userProfile.name);
    }
  }, [userProfile?.name]);

  const [selectedAreas, setSelectedAreas] = useState(() =>
    userProfile?.supportAreas?.length
      ? userProfile.supportAreas
      : ['Managing guilt around food', 'Feeling more comfortable with my body']
  );
  const [reminderPref, setReminderPref] = useState('Yes, optional meal reminders');

  const [selectedPet, setSelectedPet] = useState(() => companion?.type || 'dog');
  const [petName, setPetName] = useState(() => companion?.name || 'Mimi');

  const [mealTimes, setMealTimes] = useState(() =>
    userProfile?.preferredMealTimes || {
      breakfast: '07:30 AM',
      lunch: '12:30 PM',
      dinner: '06:30 PM',
      snack: '09:00 PM',
    }
  );

  const [enabledMeals, setEnabledMeals] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
    snack: true,
  });

  if (!shouldShow) return null;

  const toggleSupportArea = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleTimeChange = (key, val) => {
    setMealTimes((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const toggleMealEnabled = (key) => {
    setEnabledMeals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // 1. Update Profile
    updateProfile({
      name: userName.trim() || userProfile?.name || 'Jane',
      isOnboarded: true,
      supportAreas: selectedAreas,
      mealRemindersEnabled: reminderPref !== 'Not right now',
      preferredMealTimes: mealTimes,
    });

    // 2. Update Companion
    const defaultPetName = COMPANION_DEFAULTS[selectedPet] || 'Mimi';
    updateCompanion({
      type: selectedPet,
      name: petName.trim() || defaultPetName,
      equippedOutfit: selectedPet === 'dog' ? 'green_bandana' : (selectedPet === 'cat' ? 'flower_crown' : 'default'),
    });

    if (onComplete) {
      onComplete();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-[2rem] shadow-2xl border border-amber-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 pt-5 pb-3 bg-gradient-to-b from-[#FBF6EE] to-[#FFFDF9] border-b border-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌷</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A70]">
              Personalisation
            </span>
          </div>

          {/* Step indicator dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6 bg-[#7DAE8B]'
                    : s < step
                    ? 'w-2 bg-[#A3C8AF]'
                    : 'w-2 bg-[#E6DEC9]'
                }`}
              />
            ))}
          </div>

          {/* Close button if user opened it while already onboarded */}
          {userProfile?.isOnboarded && onClose ? (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-[#2D2A26] space-y-6">
          {/* STEP 1: Name, Support Areas, and Reminders */}
          {step === 1 && (
            <div className="space-y-5 animate-in slide-in-from-right duration-200">
              {/* Kind Affirmation Subtitle from design */}
              <div className="p-4 rounded-2xl bg-[#F7F2E7]/80 border border-[#EBE3D3] text-center">
                <p className="text-xs leading-relaxed text-[#6E5D52] font-medium">
                  {userName.trim() ? `“Welcome, ${userName.trim()}! ` : '“'}You don’t have to change your body to deserve care. This is your space to explore
                  your feelings and take things one step at a time.”
                </p>
              </div>

              {/* Name input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7568]">
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your preferred name (e.g. Jane)"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#E5DCce] focus:outline-none focus:border-[#7DAE8B] focus:ring-2 focus:ring-[#7DAE8B]/20 text-sm font-medium transition-all"
                />
              </div>

              {/* Support Areas Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7568] flex items-center justify-between">
                  <span>What would you like support with?</span>
                  <span className="text-[10px] lowercase font-normal text-[#A39286]">select any</span>
                </label>

                <div className="grid grid-cols-1 gap-2">
                  {SUPPORT_OPTIONS.map((area) => {
                    const isChecked = selectedAreas.includes(area);
                    return (
                      <button
                        type="button"
                        key={area}
                        onClick={() => toggleSupportArea(area)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all select-none cursor-pointer ${
                          isChecked
                            ? 'bg-[#EBF5EF] border-[#7DAE8B] text-[#245237] shadow-xs'
                            : 'bg-white border-[#EBE4D7] text-[#5A4E46] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        <span>{area}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#7DAE8B] text-white' : 'border border-[#D8CEBF]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gentle Reminders Preference */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7568]">
                  Would you like gentle reminders?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Yes, optional meal reminders',
                    'Emotional check-in reminders',
                    'Not right now',
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setReminderPref(option)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-all select-none cursor-pointer ${
                        reminderPref === option
                          ? 'bg-[#FDF0EC] border-[#F2A494] text-[#8C3A2B]'
                          : 'bg-white border-[#EBE4D7] text-[#63554B] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          reminderPref === option
                            ? 'border-[#E27D6B] bg-[#E27D6B]'
                            : 'border-[#CEC2B3]'
                        }`}
                      >
                        {reminderPref === option && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Companion Pet & Pet Name */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7A6456]">
                  Choose Your Companion
                </h3>
                <p className="text-xs text-[#8A7A70]">
                  Your kind friend will stay by your side through every meal and feeling.
                </p>
              </div>

              {/* 4 Companion Choices */}
              <div className="grid grid-cols-2 gap-3">
                {COMPANIONS.map((item) => {
                  const isSelected = selectedPet === item.type;
                  return (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => {
                        setSelectedPet(item.type);
                        const defaultNames = ['Mimi', 'Lulu', 'Ellie', 'Pip', 'bubbles', 'Bubbles', 'Ele'];
                        if (!petName || defaultNames.includes(petName)) {
                          setPetName(COMPANION_DEFAULTS[item.type]);
                        }
                      }}
                      className={`relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#EBF5EF] border-[#7DAE8B] shadow-md ring-2 ring-[#7DAE8B]/20 scale-[1.02]'
                          : 'bg-white border-[#E9E1D2] hover:bg-[#FAF7F0] opacity-90'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7DAE8B] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      )}
                      <CompanionAvatar
                        type={item.type}
                        outfit={item.type === 'dog' ? 'green_bandana' : item.outfit}
                        className="w-20 h-20 my-1"
                        animated={isSelected}
                      />
                      <span className="text-xs font-bold text-[#3E342D] mt-1">{item.label}</span>
                      <span className="text-[10px] text-[#8A7A70]">{item.description}</span>
                    </button>
                  );
                })}
              </div>

              {/* Name Your Companion */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A7568]">
                  Name your companion
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder={COMPANION_DEFAULTS[selectedPet] || 'Mimi'}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#E5DCce] focus:outline-none focus:border-[#7DAE8B] focus:ring-2 focus:ring-[#7DAE8B]/20 text-sm font-semibold transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7A70]">
                    🐾
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Preferred Meal Times */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7A6456]">
                  Select your preferred meal times
                </h3>
                <p className="text-xs text-[#8A7A70]">
                  Gentle reminders at times that feel comfortable and stress-free for you.
                </p>
              </div>

              {/* Meal Times List matching design */}
              <div className="space-y-3">
                {DEFAULT_MEAL_TIMES.map((meal) => {
                  const isEnabled = enabledMeals[meal.key];
                  const currentTime = mealTimes[meal.key] || meal.defaultTime;

                  return (
                    <div
                      key={meal.key}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isEnabled
                          ? 'bg-white border-[#E8DFC9] shadow-xs'
                          : 'bg-[#F8F5EE] border-[#ECE4D8] opacity-65'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Toggle switch */}
                        <button
                          type="button"
                          onClick={() => toggleMealEnabled(meal.key)}
                          className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                            isEnabled ? 'bg-[#7DAE8B]' : 'bg-[#D6CDC2]'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                              isEnabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className="text-xs font-semibold capitalize text-[#382E26]">
                          {meal.label}
                        </span>
                      </div>

                      {/* Time pill selector matching design (dark pill with time) */}
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={currentTime}
                          onChange={(e) => handleTimeChange(meal.key, e.target.value)}
                          disabled={!isEnabled}
                          className="bg-[#2D2A3E] text-stone-100 font-semibold text-xs px-3.5 py-1.5 rounded-full text-center w-26 shadow-inner tracking-wide focus:outline-none focus:ring-2 focus:ring-[#7DAE8B]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cheerful companion illustration peeking up */}
              <div className="p-3 rounded-2xl bg-[#F6F2E9] border border-[#EAE1D1] flex items-center gap-3">
                <CompanionAvatar
                  type={selectedPet}
                  outfit={selectedPet === 'dog' ? 'green_bandana' : 'default'}
                  className="w-14 h-14 shrink-0"
                />
                <div className="text-xs text-[#5C4C42] leading-snug">
                  <span className="font-bold text-[#3B3029]">{petName || 'Mimi'}:</span> “I'll be
                  right beside you whenever it's time to eat, with zero pressure or judgment.”
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 py-4 bg-[#FBF6EE] border-t border-[#F2EBE0] flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DED4C3] text-xs font-semibold text-[#665448] hover:bg-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#7DAE8B] hover:bg-[#6C9E7B] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer ml-auto"
            >
              <span>{step === 2 ? 'Continue to Mimi&Me > > >' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-2.5 rounded-full bg-[#3D2D3E] hover:bg-[#2A1D2B] text-white text-xs font-bold tracking-wide shadow-md transition-all cursor-pointer ml-auto"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnboardingModal;
