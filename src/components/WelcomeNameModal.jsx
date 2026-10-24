import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export function WelcomeNameModal({ isOpen, onNameSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please tell us what to call you so Mimi can greet you 🌸');
      return;
    }
    setError('');
    onNameSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#FFFDF9] rounded-[2.5rem] shadow-2xl border border-amber-100/80 overflow-hidden flex flex-col p-6 text-center animate-in zoom-in-95 duration-200">

        {/* Soft Decorative Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FDE8DF]/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#E7F3EC]/50 rounded-full blur-2xl pointer-events-none" />

        {/* Friendly Top Icon */}
        <div className="relative mx-auto mb-4 w-18 h-18 rounded-3xl bg-gradient-to-br from-[#FFF4EA] to-[#FBF0DE] border border-[#EFE3CF] shadow-inner flex items-center justify-center text-3xl">
          <span>🌷</span>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#7DAE8B] text-white flex items-center justify-center text-[10px] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Header Copy */}
        <div className="space-y-1.5 mb-5 relative z-10">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#8C7A70] bg-[#F7F2E7] px-3 py-1 rounded-full border border-[#E9DFCF]">
            Welcome to Mimi & Me
          </span>
          <h2 className="text-xl font-bold text-[#3B3029] pt-2">
            A Safe Space for Your Healing
          </h2>
          <p className="text-xs text-[#705E53] leading-relaxed px-2 font-normal">
            A gentle, judgment-free companion to support your nourishment, feelings, and recovery at your own pace.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left relative z-10">
          <div className="space-y-1.5">
            <label
              htmlFor="first-time-user-name"
              className="text-xs font-bold uppercase tracking-wider text-[#7E695D] flex items-center justify-between"
            >
              <span>What should we call you?</span>
              <span className="text-[10px] lowercase font-normal text-[#A5958A]">first name or nickname</span>
            </label>
            <div className="relative">
              <input
                id="first-time-user-name"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Jane"
                maxLength={30}
                className={`w-full px-4 py-3 bg-white rounded-2xl border text-sm font-semibold text-[#2D2A26] placeholder:text-[#B5A69B] placeholder:font-normal focus:outline-none transition-all shadow-inner ${error
                    ? 'border-rose-400 ring-2 ring-rose-200'
                    : 'border-[#E6DDD0] focus:border-[#7DAE8B] focus:ring-3 focus:ring-[#7DAE8B]/20'
                  }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base">
                ✨
              </span>
            </div>
            {error && (
              <p className="text-[11px] font-medium text-rose-600 animate-in fade-in flex items-center gap-1 pl-1">
                <span>•</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Gentle Note */}
          <div className="p-3 rounded-2xl bg-[#F8F5EE] border border-[#EAE3D5] text-[11px] text-[#69584D] flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
            <span>This stays completely private on your device.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-5 rounded-2xl bg-[#3D2D3E] hover:bg-[#2A1D2B] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Continue to Personalisation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

export default WelcomeNameModal;
