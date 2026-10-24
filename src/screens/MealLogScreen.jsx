import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronDown, Camera, Upload, Check, Sparkles, Heart, Trash2, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MEAL_TYPES = [
  { id: 'Breakfast', label: 'Breakfast', icon: '🥞' },
  { id: 'Lunch', label: 'Lunch', icon: '🥗' },
  { id: 'Dinner', label: 'Dinner', icon: '🍲' },
  { id: 'Snack', label: 'Snack', icon: '🍎' },
];

const FEELING_OPTIONS = [
  '🌸 Nourished & peaceful',
  '✨ Proud of myself',
  '🌿 Comfortable & present',
  '💛 A bit anxious, but breathing through it',
  '🍵 Gentle with my body',
];

/**
 * MealLogScreen
 * Recovery-first meal journaling screen:
 * - Text input to easily type what you ate
 * - Camera & photo upload option
 * - Hidden by default (expandable) macronutrient balance breakdown
 * - Dynamic SVG Donut Chart showing % distribution
 * - Post-meal feeling check-in input
 * - STRICT CONSTRAINT: Zero calorie totals or calorie targets
 */
export function MealLogScreen({ onNavigate }) {
  const { addMealLog } = useApp();
  const fileInputRef = useRef(null);

  const [mealDescription, setMealDescription] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [photoData, setPhotoData] = useState('');
  const [showMacros, setShowMacros] = useState(false); // Hidden by default as requested
  const [postMealFeeling, setPostMealFeeling] = useState('🌸 Nourished & peaceful');
  const [customNotes, setCustomNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Macronutrient states in grams
  const [protein, setProtein] = useState(32);
  const [carbs, setCarbs] = useState(58);
  const [fibre, setFibre] = useState(15);
  const [fats, setFats] = useState(18);

  // Compress and convert image to persistent Base64 Data URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        setPhotoData(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Calculate dynamic percentages for Donut Chart
  const totalGrams = Math.max(1, (protein || 0) + (carbs || 0) + (fibre || 0) + (fats || 0));
  const proteinPct = Math.round(((protein || 0) / totalGrams) * 100);
  const carbsPct = Math.round(((carbs || 0) / totalGrams) * 100);
  const fibrePct = Math.round(((fibre || 0) / totalGrams) * 100);
  const fatsPct = Math.max(0, 100 - proteinPct - carbsPct - fibrePct);

  // SVG Donut geometry
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.32

  const pDash = (proteinPct / 100) * circumference;
  const cDash = (carbsPct / 100) * circumference;
  const fiDash = (fibrePct / 100) * circumference;
  const faDash = (fatsPct / 100) * circumference;

  const pOffset = 0;
  const cOffset = -pDash;
  const fiOffset = -(pDash + cDash);
  const faOffset = -(pDash + cDash + fiDash);

  const handleSave = () => {
    const fullFeeling = customNotes.trim()
      ? `${postMealFeeling} - ${customNotes.trim()}`
      : postMealFeeling;

    addMealLog({
      mealType,
      foodDescription: mealDescription.trim() || undefined,
      mealName: mealDescription.trim() || undefined,
      photoData,
      nutritionBreakdown: {
        proteinGrams: Number(protein) || 0,
        carbsGrams: Number(carbs) || 0,
        fibreGrams: Number(fibre) || 0,
        fatsGrams: Number(fats) || 0,
      },
      postMealFeeling: fullFeeling,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      onNavigate('home');
    }, 1100);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#FDFBF7] animate-in fade-in duration-300 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-5 pt-8 pb-3 border-b border-[#F2ECE0] flex items-center justify-between bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#3B3029]">Log my meal</h2>
            <span className="text-[10px] text-[#7DAE8B] font-semibold block leading-none">
              Nourishment & Balance
            </span>
          </div>
        </div>

        {/* Gentle recovery badge - strictly zero calories */}
        <span className="text-[11px] font-semibold text-[#8C7A70] bg-[#F7F2E7] px-2.5 py-1 rounded-full border border-[#EDE5D8]">
          Mindful fuel 🌿
        </span>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Success Banner */}
        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in zoom-in-95 duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Meal logged with kindness! Nourishing your streak...</span>
          </div>
        )}

        {/* Meal Type Selection */}
        <div className="flex items-center justify-between gap-1.5">
          {MEAL_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMealType(t.id)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                mealType === t.id
                  ? 'bg-[#EBF5EF] text-[#28573A] border-[#7DAE8B] shadow-xs'
                  : 'bg-white text-[#736357] border-[#EBE4D7] hover:bg-stone-50'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* 1. TEXT INPUT: WHAT DID YOU EAT? (Above camera/photo feature) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A675B] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#7DAE8B]" />
              <span>What did you eat?</span>
            </span>
            <span className="text-[10px] text-[#8C7A70] font-normal">Type your meal</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              placeholder="e.g. Avocado toast with poached eggs, fresh berries..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#E9E0D2] focus:outline-none focus:border-[#7DAE8B] focus:ring-2 focus:ring-[#7DAE8B]/20 text-xs text-[#3E342D] placeholder-[#A09085] shadow-2xs transition-all"
            />
            {mealDescription && (
              <button
                type="button"
                onClick={() => setMealDescription('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer p-1"
                aria-label="Clear meal description"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 2. CAMERA / PHOTO FEATURE (Directly below text input) */}
        <div className="p-3.5 rounded-3xl bg-white border border-[#E9E0D2] text-center space-y-2.5 shadow-2xs">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {photoData ? (
            <div className="relative rounded-2xl overflow-hidden border border-[#DDD3C2] bg-stone-100 max-h-48 flex items-center justify-center group">
              <img
                src={photoData}
                alt="Logged meal"
                className="w-full h-40 object-cover"
              />
              <button
                type="button"
                onClick={() => setPhotoData('')}
                aria-label="Remove photo"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-900/80 text-white flex items-center justify-center shadow-md cursor-pointer transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 rounded-2xl bg-[#F8F5EE] border-2 border-dashed border-[#CFBEAA] hover:border-[#7DAE8B] flex flex-col items-center justify-center p-2.5 cursor-pointer transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Camera className="w-4 h-4 text-[#7DAE8B]" />
              </div>
              <span className="text-xs font-bold text-[#4F4137]">
                Add a meal photo (optional)
              </span>
              <span className="text-[10px] text-[#8C7A70]">
                Tap to snap or upload a picture
              </span>
            </div>
          )}
        </div>

        {/* 3. MACRONUTRIENT PORTION (Hidden by default, expandable if clicked on) */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowMacros(!showMacros)}
            className="w-full p-3 rounded-2xl bg-white border border-[#E9E0D2] flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:bg-[#FAF6F0] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF5EF] text-[#28573A] flex items-center justify-center text-sm font-bold">
                🥗
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#3B3029]">Macronutrient Balance</h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FAF4EA] text-[#8C7A70] border border-[#EFE3D3]">
                    {showMacros ? 'Tap to collapse' : 'Optional · Click to expand'}
                  </span>
                </div>
                <p className="text-[10px] text-[#8C7A70]">
                  {showMacros ? 'Detailed macro distribution' : 'Balance ratio (Protein, Carbs, Fibre, Fats)'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7A675B] transition-transform duration-200 ${
                showMacros ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showMacros && (
            <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A675B]">
                  Macro Breakdown
                </span>
                <span className="text-[10px] text-[#8A796E] font-medium">grams intake</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Protein */}
                <div className="p-3 rounded-2xl bg-[#EFEAF6] border border-[#DCD3E9] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#6B5885] uppercase">Protein</span>
                    <span>🍗</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-extrabold text-[#3D2C55]">{protein}g</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setProtein(Math.max(0, protein - 5))}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#3D2C55] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setProtein(protein + 5)}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#3D2C55] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Carbohydrates */}
                <div className="p-3 rounded-2xl bg-[#EAF5EF] border border-[#CDE5D6] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#3B6B4E] uppercase">Carbohydrates</span>
                    <span>🍞</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-extrabold text-[#1E4D30]">{carbs}g</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCarbs(Math.max(0, carbs - 5))}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#1E4D30] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarbs(carbs + 5)}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#1E4D30] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fibre */}
                <div className="p-3 rounded-2xl bg-[#F9EEF6] border border-[#ECCFE3] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8A4A7A] uppercase">Fibre</span>
                    <span>🥦</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-extrabold text-[#5B224E]">{fibre}g</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFibre(Math.max(0, fibre - 2))}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#5B224E] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setFibre(fibre + 2)}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#5B224E] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Healthy Fats */}
                <div className="p-3 rounded-2xl bg-[#EEF5F8] border border-[#D3E5ED] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#456C7F] uppercase">Fats</span>
                    <span>🥑</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-extrabold text-[#234556]">{fats}g</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFats(Math.max(0, fats - 3))}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#234556] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setFats(fats + 3)}
                        className="w-5 h-5 rounded-md bg-white/80 hover:bg-white text-[#234556] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Donut Chart */}
              <div className="p-4 rounded-3xl bg-white border border-[#E9E0D2] shadow-xs flex flex-col items-center gap-3">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4F4137]">Balance Ratio</span>
                  <span className="text-[10px] text-[#7DAE8B] font-bold">100% Nourishment</span>
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
                  {/* SVG Donut */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#F3ECE1"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#B59EC9"
                        strokeWidth="12"
                        strokeDasharray={`${pDash} ${circumference}`}
                        strokeDashoffset={pOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#7DAE8B"
                        strokeWidth="12"
                        strokeDasharray={`${cDash} ${circumference}`}
                        strokeDashoffset={cOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#F4B382"
                        strokeWidth="12"
                        strokeDasharray={`${fiDash} ${circumference}`}
                        strokeDashoffset={fiOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#78A1BB"
                        strokeWidth="12"
                        strokeDasharray={`${faDash} ${circumference}`}
                        strokeDashoffset={faOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-sm">🌷</span>
                      <span className="text-[8px] font-extrabold text-[#4F4137] uppercase">Balanced</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 space-y-1.5 text-[11px] font-semibold">
                    <div className="flex items-center justify-between text-[#6B5885]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#B59EC9]" />
                        <span>Protein</span>
                      </div>
                      <span className="font-bold">{proteinPct}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[#3B6B4E]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#7DAE8B]" />
                        <span>Carbs</span>
                      </div>
                      <span className="font-bold">{carbsPct}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[#B26531]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F4B382]" />
                        <span>Fibre</span>
                      </div>
                      <span className="font-bold">{fibrePct}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[#39637E]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#78A1BB]" />
                        <span>Fats</span>
                      </div>
                      <span className="font-bold">{fatsPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="w-full p-2.5 rounded-2xl bg-[#EAF5EF] border border-[#C6E2D1] text-center space-y-0.5">
                  <span className="text-xs font-bold text-[#2A5C3D] block">
                    Great choice! Your meal is well balanced.
                  </span>
                  <p className="text-[10px] text-[#4A755A]">
                    Nourishing your body with variety & care.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post-Meal Feeling Check-in */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A675B] block">
            How are you feeling after this meal?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FEELING_OPTIONS.map((feel) => (
              <button
                key={feel}
                type="button"
                onClick={() => setPostMealFeeling(feel)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  postMealFeeling === feel
                    ? 'bg-[#EBF5EF] text-[#245436] border-[#7DAE8B] shadow-xs'
                    : 'bg-white text-[#6E5E52] border-[#EBE4D7] hover:bg-stone-50'
                }`}
              >
                {feel}
              </button>
            ))}
          </div>

          <textarea
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="Add any gentle notes, thoughts, or sensations (optional)..."
            rows={2}
            className="w-full mt-1.5 p-3 rounded-2xl bg-white border border-[#E9E0D2] focus:outline-none focus:border-[#7DAE8B] focus:ring-2 focus:ring-[#7DAE8B]/20 text-xs text-[#3E342D] placeholder-[#A09085] resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3.5 rounded-full bg-[#3D2D3E] hover:bg-[#2F2130] active:scale-[0.98] text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Save Meal</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#CBD7E2] rounded-t-[28px] pt-2 pb-1 px-4">
        <BottomNav activeTab="log-meal" onTabChange={onNavigate} isHomeOverlay={true} />
      </div>
    </div>
  );
}

export default MealLogScreen;
