import React from 'react';
import dogImg from '../assets/dog.png';

/**
 * CompanionAvatar renders the chosen pet companion.
 * - When type is 'dog' (Mimi), renders the requested dog PNG with gentle breathing and outfit options.
 * - Also supports SVG illustrations for 'cat', 'elephant', and 'hippo'.
 * - Outfits supported: 'green_bandana', 'flower_crown', 'default'.
 */
export function CompanionAvatar({
  type = 'dog',
  outfit = 'green_bandana',
  className = 'w-24 h-24',
  animated = false,
}) {
  const normType = (type || 'dog').toLowerCase();
  const animClass = animated ? 'animate-bounce' : 'animate-gentle-breathe';

  // If dog, render the exact user PNG with animated breathing & accessories
  if (normType === 'dog' || (normType !== 'cat' && normType !== 'elephant' && normType !== 'hippo')) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        {/* Soft ground shadow */}
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/10 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          <img
            src={dogImg}
            alt="Mimi the companion dog"
            className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
            draggable={false}
          />

          {/* Optional flower crown overlay if selected */}
          {outfit === 'flower_crown' && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none drop-shadow-xs">
              <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* Crown vine */}
                <path d="M15 26 C35 12, 65 12, 85 26" stroke="#7DAE8B" strokeWidth="3" strokeLinecap="round" />
                {/* Flower 1 */}
                <circle cx="28" cy="18" r="6" fill="#FFC5CE" />
                <circle cx="28" cy="18" r="2.5" fill="#FFE885" />
                {/* Flower 2 */}
                <circle cx="50" cy="14" r="7" fill="#FFAAA6" />
                <circle cx="50" cy="14" r="3" fill="#FFF0A0" />
                {/* Flower 3 */}
                <circle cx="72" cy="18" r="6" fill="#BCE0FD" />
                <circle cx="72" cy="18" r="2.5" fill="#FFE885" />
                {/* Leaves */}
                <ellipse cx="40" cy="15" rx="4" ry="2" fill="#88C299" transform="rotate(-20 40 15)" />
                <ellipse cx="60" cy="15" rx="4" ry="2" fill="#88C299" transform="rotate(20 60 15)" />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SVG Renderers for other companions (cat, elephant, hippo)
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-sm transition-transform duration-300 ${animClass}`}
      >
        <ellipse cx="80" cy="148" rx="45" ry="8" fill="#EAD9CE" fillOpacity="0.5" />

        {normType === 'cat' && (
          <g id="cat-body">
            <path d="M42 65L52 28L78 52" fill="#F8C4A5" stroke="#4A3427" strokeWidth="3" strokeLinejoin="round" />
            <path d="M50 56L56 38L70 50" fill="#FFA5A5" />
            <path d="M118 65L108 28L82 52" fill="#F8C4A5" stroke="#4A3427" strokeWidth="3" strokeLinejoin="round" />
            <path d="M110 56L104 38L90 50" fill="#FFA5A5" />
            <ellipse cx="80" cy="115" rx="42" ry="32" fill="#F8C4A5" stroke="#4A3427" strokeWidth="3" />
            <ellipse cx="80" cy="120" rx="24" ry="20" fill="#FFF2E7" />
            <ellipse cx="80" cy="80" rx="44" ry="38" fill="#F8C4A5" stroke="#4A3427" strokeWidth="3" />
            <circle cx="56" cy="90" r="7" fill="#FFB7B2" opacity="0.75" />
            <circle cx="104" cy="90" r="7" fill="#FFB7B2" opacity="0.75" />
            <ellipse cx="64" cy="78" rx="4.5" ry="5.5" fill="#3D291D" />
            <circle cx="62.5" cy="76" r="1.8" fill="#FFFFFF" />
            <ellipse cx="96" cy="78" rx="4.5" ry="5.5" fill="#3D291D" />
            <circle cx="94.5" cy="76" r="1.8" fill="#FFFFFF" />
            <polygon points="76,86 84,86 80,91" fill="#FF8D85" />
            <path d="M75 92C77 95 80 95 80 92C80 95 83 95 85 92" stroke="#4A3427" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M42 82L28 80M40 88L26 90M118 82L132 80M120 88L134 90" stroke="#4A3427" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="65" cy="142" rx="12" ry="7" fill="#FFF2E7" stroke="#4A3427" strokeWidth="2.5" />
            <ellipse cx="95" cy="142" rx="12" ry="7" fill="#FFF2E7" stroke="#4A3427" strokeWidth="2.5" />
          </g>
        )}

        {normType === 'elephant' && (
          <g id="elephant-body">
            <ellipse cx="36" cy="76" rx="26" ry="30" fill="#B5C9DF" stroke="#3A4D60" strokeWidth="3" />
            <ellipse cx="36" cy="76" rx="17" ry="20" fill="#D6E4F0" />
            <ellipse cx="124" cy="76" rx="26" ry="30" fill="#B5C9DF" stroke="#3A4D60" strokeWidth="3" />
            <ellipse cx="124" cy="76" rx="17" ry="20" fill="#D6E4F0" />
            <ellipse cx="80" cy="118" rx="44" ry="30" fill="#B5C9DF" stroke="#3A4D60" strokeWidth="3" />
            <ellipse cx="80" cy="122" rx="26" ry="18" fill="#E4EEF8" />
            <circle cx="80" cy="80" r="40" fill="#B5C9DF" stroke="#3A4D60" strokeWidth="3" />
            <circle cx="56" cy="86" r="6" fill="#F8B4BE" opacity="0.8" />
            <circle cx="104" cy="86" r="6" fill="#F8B4BE" opacity="0.8" />
            <ellipse cx="65" cy="75" rx="4" ry="5" fill="#253545" />
            <circle cx="64" cy="73" r="1.5" fill="#FFFFFF" />
            <ellipse cx="95" cy="75" rx="4" ry="5" fill="#253545" />
            <circle cx="94" cy="73" r="1.5" fill="#FFFFFF" />
            <path d="M74 84C74 100 70 108 78 110C86 112 88 98 86 84" fill="#B5C9DF" stroke="#3A4D60" strokeWidth="3" strokeLinejoin="round" />
            <line x1="75" y1="92" x2="84" y2="92" stroke="#3A4D60" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <line x1="74" y1="98" x2="82" y2="98" stroke="#3A4D60" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <ellipse cx="64" cy="143" rx="12" ry="7" fill="#E4EEF8" stroke="#3A4D60" strokeWidth="2.5" />
            <ellipse cx="96" cy="143" rx="12" ry="7" fill="#E4EEF8" stroke="#3A4D60" strokeWidth="2.5" />
          </g>
        )}

        {normType === 'hippo' && (
          <g id="hippo-body">
            <ellipse cx="48" cy="46" rx="9" ry="11" fill="#D3BFDC" stroke="#483B52" strokeWidth="3" />
            <ellipse cx="48" cy="46" rx="5" ry="6" fill="#F3DCF8" />
            <ellipse cx="112" cy="46" rx="9" ry="11" fill="#D3BFDC" stroke="#483B52" strokeWidth="3" />
            <ellipse cx="112" cy="46" rx="5" ry="6" fill="#F3DCF8" />
            <ellipse cx="80" cy="120" rx="46" ry="30" fill="#D3BFDC" stroke="#483B52" strokeWidth="3" />
            <ellipse cx="80" cy="122" rx="26" ry="18" fill="#F2EAF7" />
            <circle cx="80" cy="74" r="36" fill="#D3BFDC" stroke="#483B52" strokeWidth="3" />
            <ellipse cx="64" cy="68" rx="4" ry="5" fill="#32263B" />
            <circle cx="63" cy="66" r="1.5" fill="#FFFFFF" />
            <ellipse cx="96" cy="68" rx="4" ry="5" fill="#32263B" />
            <circle cx="95" cy="66" r="1.5" fill="#FFFFFF" />
            <ellipse cx="80" cy="94" rx="38" ry="24" fill="#E4D3EB" stroke="#483B52" strokeWidth="3" />
            <ellipse cx="70" cy="90" rx="4" ry="3" fill="#6B5379" />
            <ellipse cx="90" cy="90" rx="4" ry="3" fill="#6B5379" />
            <path d="M72 103C76 107 84 107 88 103" stroke="#483B52" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="52" cy="92" r="6" fill="#FFAEC9" opacity="0.8" />
            <circle cx="108" cy="92" r="6" fill="#FFAEC9" opacity="0.8" />
            <ellipse cx="64" cy="143" rx="12" ry="7" fill="#F2EAF7" stroke="#483B52" strokeWidth="2.5" />
            <ellipse cx="96" cy="143" rx="12" ry="7" fill="#F2EAF7" stroke="#483B52" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default CompanionAvatar;
