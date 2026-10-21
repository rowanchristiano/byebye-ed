import React, { useState } from 'react';
import {
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Star,
  Sparkles,
  Heart,
  ShieldAlert,
  Users,
  Compass,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const LEARNING_MODULES = [
  {
    id: 'understanding_ed_misconceptions',
    title: 'Understanding ED & Common Misconceptions',
    subtitle: 'Demystifying myths and clarifying what recovery truly means',
    icon: Compass,
    badge: 'Foundations',
    accentColor: 'from-amber-50 to-orange-50 border-amber-200 text-amber-900',
    iconBg: 'bg-amber-100 text-amber-800',
    readTime: '4 min read',
    overview: 'Eating disorders are complex psychiatric and neurobiological illnesses—never a personal choice, phase, or vanity contest.',
    sections: [
      {
        heading: 'Misconception 1: "You have to be visibly emaciated to have an eating disorder."',
        content: 'Fact: Over 90% of individuals suffering from severe eating disorders are not clinically underweight. Eating disorders manifest across all body shapes, sizes, ethnicities, and genders. Body size is never an indicator of medical severity or psychological distress.'
      },
      {
        heading: 'Misconception 2: "Eating disorders are just about wanting to look attractive."',
        content: 'Fact: Food restriction, bingeing, or compensatory behaviors are coping mechanisms designed to regulate unbearable emotions, trauma, anxiety, or perfectionism. Controlling food intake is often an attempt to regain safety when life feels out of control.'
      },
      {
        heading: 'Misconception 3: "Recovery means just learning to eat normally overnight."',
        content: 'Fact: Recovery is a gradual rewiring of the nervous system and behavioral patterns. It involves unlearning deep-seated cognitive biases, restoring nutritional safety, and discovering self-worth independent of appearance.'
      }
    ],
    mimiNote: 'Mimi says: "You do not need to prove how sick you are to deserve help. Your pain is valid right now."'
  },
  {
    id: 'guilt_shame_seeking_help',
    title: 'Why Guilt & Shame Make It Difficult to Seek Help',
    subtitle: 'Overcoming the emotional barriers to reaching out',
    icon: Heart,
    badge: 'Emotional Safety',
    accentColor: 'from-rose-50 to-pink-50 border-rose-200 text-rose-900',
    iconBg: 'bg-rose-100 text-rose-800',
    readTime: '3 min read',
    overview: 'Shame thrives in secrecy and convinces us that we are unworthy of kindness. Unpacking why asking for help feels so frightening.',
    sections: [
      {
        heading: 'The Difference Between Guilt and Shame',
        content: 'Guilt says: "I did something bad (e.g. eating past fullness)." Shame says: "I am inherently flawed and unlovable." Eating disorders feed on shame, turning natural biological needs into moral failings.'
      },
      {
        heading: 'The "Not Sick Enough" Trap',
        content: 'Almost every person in recovery experiences the thought: "Others have it worse, I should be able to fix this alone." This thought is a symptom of the disorder itself. Waiting until you hit "rock bottom" only prolongs unnecessary suffering.'
      },
      {
        heading: 'Breaking the Cycle of Secrecy',
        content: 'Sharing your struggles with even one trusted person or compassionate journal cuts the power of shame in half. Courage does not mean feeling fearless—it means reaching out while your hands are still trembling.'
      }
    ],
    mimiNote: 'Mimi says: "Guilt is a heavy backpack you were never meant to carry alone. Let us set it down together."'
  },
  {
    id: 'body_comparisons_social_media',
    title: 'Coping with Body Comparisons & Social Media',
    subtitle: 'Protecting your mental space from toxic digital beauty ideals',
    icon: Sparkles,
    badge: 'Mindful Media',
    accentColor: 'from-purple-50 to-indigo-50 border-purple-200 text-purple-900',
    iconBg: 'bg-purple-100 text-purple-800',
    readTime: '4 min read',
    overview: 'How algorithm-driven content warps body perception, and practical exercises to reclaim neutrality and peace.',
    sections: [
      {
        heading: 'The Illusion of Curated Reality',
        content: 'What you see on social feeds represents the top 1% of curated lighting, angles, body posing, digital filters, and photo retouching. Comparing your 3D living, breathing body to a frozen, edited 2D image is an unfair contest.'
      },
      {
        heading: 'Audit Your Digital Environment Ruthlessly',
        content: 'Unfollow or mute accounts that trigger body dissatisfaction, "what I eat in a day" content, or clean-eating moralization. Follow diverse body creators, recovery advocates, art, nature, and educational pages instead.'
      },
      {
        heading: 'Shift from Body Image to Body Neutrality',
        content: 'You don\'t have to love every inch of your appearance immediately. Practice body neutrality: appreciating what your body does for you (breathing, laughing, walking with your dog, hugging loved ones) rather than how it looks in photos.'
      }
    ],
    mimiNote: 'Mimi says: "Your body is a home for your spirit and kindness, not an ornament for public approval."'
  },
  {
    id: 'physical_risks_purging_restriction',
    title: 'Physical Risks of Purging & Restrictive Eating',
    subtitle: 'Understanding biological impacts with care and medical honesty',
    icon: ShieldAlert,
    badge: 'Health & Science',
    accentColor: 'from-sky-50 to-teal-50 border-sky-200 text-sky-900',
    iconBg: 'bg-sky-100 text-sky-800',
    readTime: '5 min read',
    overview: 'Gentle, evidence-informed medical facts about how chronic restriction and compensatory behaviors impact your vital organs.',
    sections: [
      {
        heading: 'Electrolyte Imbalances & Heart Health',
        content: 'Purging (via vomiting, laxatives, or excessive exercise) rapidly depletes potassium and sodium. Electrolytes maintain the electrical rhythm of your heart. Severe drops can cause heart palpitations, arrhythmias, and fainting without warning.'
      },
      {
        heading: 'Gastrointestinal Slowing & Bloating',
        content: 'When deprived of consistent regular nourishment, the digestive tract slows down to conserve energy (gastroparesis). This causes early fullness, acid reflux, and uncomfortable bloating when food is reintroduced. This bloating is a sign of healing, not permanent change.'
      },
      {
        heading: 'Bone Density & Hormonal Disruption',
        content: 'Chronic energy deficits halt reproductive hormones and accelerate bone mass loss (osteopenia and osteoporosis). Consistent, balanced fuel containing proteins, fats, and minerals is essential to rebuild and protect your skeletal health.'
      }
    ],
    mimiNote: 'Mimi says: "Nourishment is protective medicine. Every nourishing meal helps your heart beat strong and steady."'
  },
  {
    id: 'telling_trusted_person',
    title: 'How to Tell a Trusted Person About an ED',
    subtitle: 'Practical conversation templates and setting healthy boundaries',
    icon: Users,
    badge: 'Communication',
    accentColor: 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-900',
    iconBg: 'bg-emerald-100 text-emerald-800',
    readTime: '3 min read',
    overview: 'Step-by-step guidance on opening up to a friend, parent, partner, or teacher without feeling overwhelmed.',
    sections: [
      {
        heading: '1. Choose the Right Moment and Setting',
        content: 'Pick a quiet, private time when neither of you is rushed or distracted. Avoid talking during mealtimes or in the middle of an emotional disagreement.'
      },
      {
        heading: '2. Use "I" Statements to Share Your Experience',
        content: 'Example script: "I want to share something vulnerable with you. For a while, I’ve been struggling with food and negative thoughts about my body. It is really overwhelming, and I am telling you because I care about our relationship and need support."'
      },
      {
        heading: '3. Tell Them How They Can Best Help (and What to Avoid)',
        content: 'Be direct about what helps: "It really helps if we talk about non-food topics after meals. Please don\'t comment on my body, weight, or portion size, even as a compliment."'
      }
    ],
    mimiNote: 'Mimi says: "You can even write it down in a letter or text if speaking out loud feels too difficult at first."'
  },
  {
    id: 'seeking_professional_support',
    title: 'What to Expect When Seeking Professional Support',
    subtitle: 'Navigating doctors, therapists, and dietitians with confidence',
    icon: BookOpen,
    badge: 'Care Pathways',
    accentColor: 'from-blue-50 to-indigo-50 border-blue-200 text-blue-900',
    iconBg: 'bg-blue-100 text-blue-800',
    readTime: '4 min read',
    overview: 'Understanding the recovery care team: who they are, what questions they ask, and how they partner with you.',
    sections: [
      {
        heading: 'General Practitioner (Doctor)',
        content: 'Your GP monitors vital signs (blood pressure, pulse, temperature) and routine blood tests to ensure your physical safety. They can provide referrals to specialized psychological and nutritional clinics.'
      },
      {
        heading: 'Clinical Psychologist / Psychotherapist',
        content: 'Utilizes evidence-based therapies (such as Cognitive Behavioral Therapy for Eating Disorders CBT-E, DBT, or ACT) to help you understand underlying emotional drivers, develop healthy coping tools, and dismantle disordered thought loops.'
      },
      {
        heading: 'Non-Diet Specialized Dietitian',
        content: 'Does NOT give you strict diets or calorie targets. Instead, they gently help you re-establish regular eating patterns, challenge fear foods at your own pace, and rebuild trust in your body\'s natural hunger and fullness cues.'
      }
    ],
    mimiNote: 'Mimi says: "You are the leader of your recovery team. Good professionals will always listen to you with dignity and warmth."'
  }
];

export function LearnScreen({ onNavigate }) {
  const { learningProgress, completeLearningModule, toggleBookmarkModule, progress } = useApp();

  const [activeModule, setActiveModule] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'bookmarked'
  const [celebrationStar, setCelebrationStar] = useState(false);

  const completedIds = learningProgress?.completedModuleIds || [];
  const bookmarkedIds = learningProgress?.bookmarkedModuleIds || [];

  const completedCount = completedIds.length;
  const totalCount = LEARNING_MODULES.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredModules = LEARNING_MODULES.filter((mod) => {
    if (filter === 'completed') return completedIds.includes(mod.id);
    if (filter === 'bookmarked') return bookmarkedIds.includes(mod.id);
    return true;
  });

  const handleFinishModule = (moduleId) => {
    completeLearningModule(moduleId);
    setCelebrationStar(true);
    setTimeout(() => setCelebrationStar(false), 2400);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-200 select-none overflow-hidden">
      {/* TOP HEADER */}
      <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] bg-white/70 backdrop-blur-xs flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Back to home"
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-stone-600 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#3B3029] leading-tight">Learn & Grow</h2>
            <p className="text-[11px] text-[#8C7A70]">Evidence-informed guidance</p>
          </div>
        </div>

        {/* Progress Stars Badge */}
        <div className="px-3 py-1 rounded-full bg-[#FFF6DE] border border-[#F6DE9F] flex items-center gap-1.5 shadow-2xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
          <span className="text-[11px] font-bold text-[#553E31]">
            {completedCount} / {totalCount} ⭐
          </span>
        </div>
      </div>

      {/* SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* CELEBRATION STAR BANNER */}
        {celebrationStar && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2.5 animate-in zoom-in-95 duration-200 shadow-sm">
            <span className="text-xl">🌟</span>
            <div>
              <p>Module Complete! You earned +1 Progress Star!</p>
              <p className="text-[10px] text-amber-700 font-normal">
                Every step of understanding strengthens your path to recovery.
              </p>
            </div>
          </div>
        )}

        {/* OVERALL LEARNING PROGRESS CARD */}
        <div className="p-4 rounded-3xl bg-white border border-[#EFE8DD] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#4B3B30] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#7DAE8B]" />
              <span>Recovery Library Progress</span>
            </span>
            <span className="text-[11px] font-bold text-[#7DAE8B]">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-[#F0EBE1] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8AC499] to-[#7DAE8B] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#8C7A70] pt-0.5">
            <span>{completedCount} modules mastered</span>
            <span>{totalCount - completedCount} modules waiting</span>
          </div>
        </div>

        {/* FILTER CHIPS */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#EAE3D5] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 py-1 rounded-full transition-all cursor-pointer text-center ${
              filter === 'all'
                ? 'bg-white text-[#332A24] font-bold shadow-2xs'
                : 'text-[#7D6F65] hover:text-[#332A24]'
            }`}
          >
            All Modules
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1 rounded-full transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
              filter === 'completed'
                ? 'bg-white text-[#332A24] font-bold shadow-2xs'
                : 'text-[#7D6F65] hover:text-[#332A24]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-[#7DAE8B]" />
            <span>Completed</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('bookmarked')}
            className={`flex-1 py-1 rounded-full transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
              filter === 'bookmarked'
                ? 'bg-white text-[#332A24] font-bold shadow-2xs'
                : 'text-[#7D6F65] hover:text-[#332A24]'
            }`}
          >
            <Bookmark className="w-3 h-3 text-amber-500" />
            <span>Saved</span>
          </button>
        </div>

        {/* MODULE CARDS LIST */}
        <div className="space-y-3">
          {filteredModules.map((mod) => {
            const isCompleted = completedIds.includes(mod.id);
            const isBookmarked = bookmarkedIds.includes(mod.id);
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`p-4 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs hover:border-[#CFBEAA] transition-all cursor-pointer relative group ${
                  isCompleted ? 'bg-gradient-to-r from-white via-white to-emerald-50/30' : ''
                }`}
              >
                {/* Top Badge & Bookmark Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF5EB] text-[#786457] border border-[#ECE0D0]">
                      {mod.badge}
                    </span>
                    <span className="text-[10px] text-[#A6958A]">• {mod.readTime}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Bookmark action */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkModule(mod.id);
                      }}
                      aria-label="Bookmark module"
                      className="p-1 rounded-full text-stone-300 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>

                    {/* Completion status */}
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#8C7A70] group-hover:text-[#3B3029] flex items-center gap-0.5">
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Title & Icon */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${mod.iconBg} shadow-2xs`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <h3 className="text-xs font-bold text-[#3B3029] group-hover:text-[#1F1814] leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-[#8C7A70] leading-tight">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* READABLE DETAIL MODAL */}
      {activeModule && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm max-h-[90vh] bg-white rounded-3xl flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#F2ECE0] bg-[#FAF7F2] flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${activeModule.iconBg}`}
                >
                  <activeModule.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7466]">
                    {activeModule.badge} • {activeModule.readTime}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#3B3029] leading-tight">
                    {activeModule.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModule(null)}
                className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 cursor-pointer shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-[#4F4138] leading-relaxed">
              {/* Overview quote */}
              <div className="p-3 rounded-2xl bg-[#FFFBF0] border border-[#F6E9CC] text-[#69523C] font-medium text-xs italic">
                “{activeModule.overview}”
              </div>

              {/* Sections */}
              {activeModule.sections.map((sec, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EFE8DD] space-y-1.5">
                  <h4 className="font-bold text-[#3B3029] text-xs">
                    {sec.heading}
                  </h4>
                  <p className="text-[11px] text-[#55453B] leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}

              {/* Mimi Loving Note */}
              <div className="p-3.5 rounded-2xl bg-[#EBF4EE] border border-[#CFE4D6] flex items-start gap-2.5">
                <span className="text-xl shrink-0">🐶</span>
                <p className="text-[11px] font-bold text-[#2A5C3D] leading-tight">
                  {activeModule.mimiNote}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-[#F2ECE0] bg-white flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleBookmarkModule(activeModule.id)}
                className="px-3.5 py-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    bookmarkedIds.includes(activeModule.id)
                      ? 'fill-amber-400 text-amber-500'
                      : ''
                  }`}
                />
                <span>
                  {bookmarkedIds.includes(activeModule.id) ? 'Saved' : 'Save'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleFinishModule(activeModule.id);
                  setActiveModule(null);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold cursor-pointer transition-transform active:scale-95 shadow-xs flex items-center justify-center gap-1.5 ${
                  completedIds.includes(activeModule.id)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#7DAE8B] hover:bg-[#6FA07D] text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>
                  {completedIds.includes(activeModule.id)
                    ? 'Completed • Keep Star ⭐'
                    : 'Finish Module & Earn Star ⭐'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="relative z-30 bg-[#CBD7E2] rounded-t-[34px] pt-2 pb-1 px-4 shadow-[0_-4px_15px_rgba(0,0,0,0.04)]">
        <BottomNav activeTab="learn" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default LearnScreen;
