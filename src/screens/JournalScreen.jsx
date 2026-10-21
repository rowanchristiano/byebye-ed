import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Sparkles,
  Heart,
  Check,
  Trash2,
  Wind,
  Shield,
  Eye,
  Smile,
  X,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MOODS = [
  { id: 'Overwhelmed', label: 'Overwhelmed', icon: '🌧️', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  { id: 'Calm', label: 'Calm', icon: '🍃', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  { id: 'Anxious', label: 'Anxious', icon: '🌊', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  { id: 'Hopeful', label: 'Hopeful', icon: '🌤️', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  { id: 'Proud', label: 'Proud', icon: '⭐', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
];

const COPING_STRATEGIES = [
  {
    id: '54321_grounding',
    title: '5-4-3-2-1 Grounding exercise',
    subtitle: 'Engage your 5 physical senses to anchor in the present',
    icon: Eye,
    color: 'from-teal-50 to-emerald-50 text-teal-800 border-teal-200',
    steps: [
      '👀 Look for 5 things you can see right now (e.g. light on the wall, a plant, your shoes).',
      '✋ Notice 4 things you can physically touch or feel (e.g. the fabric of your clothes, the floor under your feet).',
      '👂 Listen for 3 distinct sounds around you (e.g. distant traffic, wind, clock ticking).',
      '👃 Identify 2 things you can smell or scents you enjoy.',
      '👅 Acknowledge 1 thing you can taste (or take a gentle sip of cool water).'
    ]
  },
  {
    id: 'box_breathing',
    title: 'Box breathing',
    subtitle: '4-4-4-4 rhythm to downregulate the nervous system',
    icon: Wind,
    color: 'from-sky-50 to-blue-50 text-sky-800 border-sky-200',
    steps: [
      '🌬️ Inhale slowly and smoothly through your nose for 4 counts.',
      '⏸️ Gently hold your breath without tension for 4 counts.',
      '🍃 Exhale completely through your mouth for 4 counts.',
      '⏸️ Rest in the stillness at the bottom of the breath for 4 counts.',
      'Repeat for 3 to 4 gentle cycles.'
    ]
  },
  {
    id: 'self_compassion_pause',
    title: 'Self-compassion pause',
    subtitle: 'Warm validation when guilt or harsh self-criticism arises',
    icon: Heart,
    color: 'from-rose-50 to-pink-50 text-rose-800 border-rose-200',
    steps: [
      'Place a gentle hand over your heart or on your arm to feel the warmth of your touch.',
      'Acknowledge: "This is a painful moment right now. It hurts, and that is okay to feel."',
      'Remind yourself: "Struggling with food or body thoughts is part of recovery. I am not broken."',
      'Affirm kindly: "May I be gentle with myself in this moment. May I give myself the compassion I need."'
    ]
  },
  {
    id: 'urge_surfing',
    title: 'Urge surfing practice',
    subtitle: 'Observe urges as waves that rise, crest, and naturally subside',
    icon: Shield,
    color: 'from-amber-50 to-orange-50 text-amber-800 border-amber-200',
    steps: [
      'Notice the urge without judging or immediately acting on it.',
      'Visualize the urge like an ocean wave: it gathers energy, peaks, and must naturally roll away.',
      'Breathe into the sensation. Set a timer for just 10 minutes and let Mimi sit beside you.',
      'Notice that the wave loses intensity as you stay grounded in your breath.'
    ]
  }
];

export function JournalScreen({ onNavigate }) {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [entryDate, setEntryDate] = useState(todayStr);
  const [selectedMood, setSelectedMood] = useState('Calm');
  const [thoughtText, setThoughtText] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState(COPING_STRATEGIES[0].title);
  const [activePracticeModal, setActivePracticeModal] = useState(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!thoughtText.trim()) return;

    addJournalEntry({
      date: entryDate,
      mood: selectedMood,
      thoughtText: thoughtText.trim(),
      savedCopingStrategy: selectedStrategy,
    });

    setThoughtText('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const formattedDateHeading = new Date(entryDate + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-200 select-none overflow-hidden">
      {/* TOP HEADER */}
      <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] bg-white/60 backdrop-blur-xs flex items-center justify-between z-10">
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
            <h2 className="text-base font-bold text-[#3B3029] leading-tight">My digital journal</h2>
            <p className="text-[11px] text-[#8C7A70]">Safe reflections without judgment</p>
          </div>
        </div>

        {/* Date Selector Pill */}
        <label className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5EC] border border-[#EBE2D3] cursor-pointer hover:bg-white transition-all shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-[#7DAE8B]" />
          <span className="text-[11px] font-semibold text-[#665449]">{entryDate}</span>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          />
        </label>
      </div>

      {/* SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* SUCCESS CONFIRMATION BANNER */}
        {savedNotice && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in zoom-in-95 duration-200 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Reflection saved gently to your journal. Mimi is proud of you! 🌸</span>
          </div>
        )}

        {/* NEW ENTRY CARD */}
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-3xl bg-white border border-[#EFE8DD] shadow-xs space-y-3.5"
        >
          {/* Header & Date display */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A675B]">
              How are you feeling today?
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              {formattedDateHeading}
            </span>
          </div>

          {/* Mood Selector Chips */}
          <div className="flex flex-wrap gap-1.5">
            {MOODS.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? `${m.bg} ${m.border} ${m.text} ring-2 ring-[#7DAE8B]/40 shadow-xs scale-102`
                      : 'bg-[#FAF7F2] border-[#E8DFC9] text-[#786659] hover:bg-stone-50'
                  }`}
                >
                  <span className="text-sm">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Thought Textarea */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#8C7A70] block">
              Private thoughts & body sensations:
            </label>
            <textarea
              value={thoughtText}
              onChange={(e) => setThoughtText(e.target.value)}
              placeholder="Write privately about how you're feeling... (e.g. food thoughts, body worries, or small wins)"
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E9E0D2] focus:outline-none focus:border-[#7DAE8B] focus:ring-2 focus:ring-[#7DAE8B]/20 text-xs text-[#3D3128] placeholder:text-[#A8988C] leading-relaxed resize-none transition-all"
            />
          </div>

          {/* QUICK COPING STRATEGY DRAWER SECTION */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A675B] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Coping Strategy Tools</span>
              </span>
              <span className="text-[10px] text-[#8C7A70]">Tap to attach or practice</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COPING_STRATEGIES.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedStrategy === tool.title;
                return (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedStrategy(tool.title)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-[#7DAE8B] shadow-xs'
                        : 'bg-[#FAF8F3] border-[#EFE5D7] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-white shadow-2xs flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-[#588965]" />
                        </div>
                        <span className="text-[11px] font-bold text-[#3E342C] leading-tight">
                          {tool.title}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#588965] shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EAE0D2]/50">
                      <span className="text-[9px] text-[#8C7A70] line-clamp-1">
                        {tool.subtitle}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePracticeModal(tool);
                        }}
                        className="text-[9px] font-bold text-[#588965] hover:underline cursor-pointer shrink-0 ml-1"
                      >
                        Guide &gt;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE0]">
            <span className="text-[10px] text-[#8C7A70] italic">
              Entries stay completely encrypted in your private device.
            </span>
            <button
              type="submit"
              disabled={!thoughtText.trim()}
              className="px-5 py-2 rounded-full bg-[#7DAE8B] hover:bg-[#6FA07D] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer transition-transform active:scale-95 shadow-xs"
            >
              Save entry
            </button>
          </div>
        </form>

        {/* HISTORY LIST */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A675B] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#7DAE8B]" />
              <span>Past reflections ({journalEntries?.length || 0})</span>
            </h3>
          </div>

          {(!journalEntries || journalEntries.length === 0) ? (
            <div className="p-6 rounded-3xl bg-white border border-[#EFE8DD] text-center space-y-1 text-stone-500">
              <p className="text-xs font-semibold text-[#4A3F37]">No journal entries yet</p>
              <p className="text-[11px] text-[#8C7A70]">
                Write your first reflection above. Mimi is always here to listen.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {journalEntries.map((entry) => {
                const moodObj = MOODS.find((m) => m.id === entry.mood) || MOODS[1];
                return (
                  <div
                    key={entry.id}
                    className="p-4 rounded-3xl bg-white border border-[#EAE1D2] shadow-xs space-y-2.5 hover:border-[#CFBEAA] transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${moodObj.bg} ${moodObj.border} ${moodObj.text} flex items-center gap-1`}>
                          <span>{moodObj.icon}</span>
                          <span>{entry.mood}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-[#8C7A70]">
                          {entry.date}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteJournalEntry(entry.id)}
                        aria-label="Delete entry"
                        className="text-stone-300 hover:text-rose-500 p-1 rounded-full transition-colors cursor-pointer"
                        title="Delete reflection"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#3D3128] leading-relaxed whitespace-pre-line">
                      "{entry.thoughtText}"
                    </p>

                    {entry.savedCopingStrategy && (
                      <div className="pt-2 border-t border-[#F2ECE0] flex items-center gap-1.5 text-[11px] text-[#588965] font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span><strong>Coping tool:</strong> {entry.savedCopingStrategy}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* GUIDED COPING STRATEGY POPUP MODAL */}
      {activePracticeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                  <activePracticeModal.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3B3029]">
                    {activePracticeModal.title}
                  </h3>
                  <p className="text-[10px] text-[#8C7A70]">
                    {activePracticeModal.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePracticeModal(null)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 py-1">
              {activePracticeModal.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DD] text-xs text-[#4F4138] leading-relaxed flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-white text-[#7DAE8B] font-bold text-[10px] flex items-center justify-center shrink-0 border border-emerald-100">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedStrategy(activePracticeModal.title);
                  setActivePracticeModal(null);
                }}
                className="w-full py-2.5 rounded-full bg-[#7DAE8B] hover:bg-[#6FA07D] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Attach this tool to my journal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="relative z-30 bg-[#CBD7E2] rounded-t-[34px] pt-2 pb-1 px-4 shadow-[0_-4px_15px_rgba(0,0,0,0.04)]">
        <BottomNav activeTab="journal" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default JournalScreen;
