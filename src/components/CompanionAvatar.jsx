import React from 'react';
import dogImg from '../assets/dog.png';
import catImg from '../assets/cat.png';
import dogBandanaImg from '../assets/dog_bandana.png';

/**
 * Exquisite Handcrafted Flower Crown SVG
 * Features rich layered blush peonies, daisies with golden centers, forget-me-nots, and sage foliage
 */
const FlowerCrownSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Base vine arch */}
    <path d="M18 52 C55 22, 145 22, 182 52" stroke="#4A6B53" strokeWidth="4" strokeLinecap="round" />
    <path d="M22 51 C58 24, 142 24, 178 51" stroke="#7EAE8B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Left leafy tendrils & eucalyptus */}
    <g transform="translate(18, 48) rotate(-25)">
      <ellipse cx="-6" cy="0" rx="9" ry="4" fill="#62906C" stroke="#3D5C45" strokeWidth="1.2" />
      <ellipse cx="-12" cy="-5" rx="7" ry="3" fill="#88BA94" stroke="#3D5C45" strokeWidth="1" />
      <circle cx="-18" cy="-4" r="2.5" fill="#FFF7ED" />
      <circle cx="-14" cy="2" r="2" fill="#FFF7ED" />
    </g>

    {/* Right leafy tendrils & eucalyptus */}
    <g transform="translate(182, 48) rotate(25)">
      <ellipse cx="6" cy="0" rx="9" ry="4" fill="#62906C" stroke="#3D5C45" strokeWidth="1.2" />
      <ellipse cx="12" cy="-5" rx="7" ry="3" fill="#88BA94" stroke="#3D5C45" strokeWidth="1" />
      <circle cx="18" cy="-4" r="2.5" fill="#FFF7ED" />
      <circle cx="14" cy="2" r="2" fill="#FFF7ED" />
    </g>

    {/* Foliage along arch */}
    <ellipse cx="50" cy="35" rx="8" ry="4" fill="#78A884" stroke="#3D5C45" strokeWidth="1" transform="rotate(-18 50 35)" />
    <ellipse cx="74" cy="26" rx="9" ry="4.5" fill="#8FC49C" stroke="#3D5C45" strokeWidth="1" transform="rotate(-8 74 26)" />
    <ellipse cx="126" cy="26" rx="9" ry="4.5" fill="#8FC49C" stroke="#3D5C45" strokeWidth="1" transform="rotate(8 126 26)" />
    <ellipse cx="150" cy="35" rx="8" ry="4" fill="#78A884" stroke="#3D5C45" strokeWidth="1" transform="rotate(18 150 35)" />

    {/* Left Daisy Blossom */}
    <g transform="translate(42, 42)">
      <ellipse cx="0" cy="-9" rx="3.5" ry="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      <ellipse cx="7" cy="-6" rx="3.5" ry="6" fill="#FEF3C7" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(45 7 -6)" />
      <ellipse cx="9" cy="0" rx="3.5" ry="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(90 9 0)" />
      <ellipse cx="7" cy="6" rx="3.5" ry="6" fill="#FEF3C7" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(135 7 6)" />
      <ellipse cx="0" cy="9" rx="3.5" ry="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      <ellipse cx="-7" cy="6" rx="3.5" ry="6" fill="#FEF3C7" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(-135 -7 6)" />
      <ellipse cx="-9" cy="0" rx="3.5" ry="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(-90 -9 0)" />
      <ellipse cx="-7" cy="-6" rx="3.5" ry="6" fill="#FEF3C7" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(-45 -7 -6)" />
      <circle cx="0" cy="0" r="5.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <circle cx="-1.5" cy="-1.5" r="1.8" fill="#FDE68A" />
    </g>

    {/* Left-Mid Soft Peach/Pink Rose Blossom */}
    <g transform="translate(72, 28)">
      <circle cx="0" cy="0" r="14" fill="#FECDD3" stroke="#E11D48" strokeWidth="1" opacity="0.9" />
      <circle cx="-2" cy="-2" r="10" fill="#FDA4AF" stroke="#BE123C" strokeWidth="0.8" />
      <circle cx="1" cy="1" r="7" fill="#F43F5E" stroke="#9F1239" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="3.5" fill="#FFE4E6" />
    </g>

    {/* Centerpiece Grand Peony Blossom */}
    <g transform="translate(100, 22)">
      <circle cx="0" cy="-5" r="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="7" cy="-2" r="8" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="7" cy="4" r="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="0" cy="6" r="8" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="-7" cy="4" r="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="-7" cy="-2" r="8" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <circle cx="0" cy="0" r="9.5" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />
      <circle cx="0" cy="-1" r="6" fill="#F43F5E" stroke="#9F1239" strokeWidth="1" />
      <circle cx="0" cy="0" r="3.2" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" />
    </g>

    {/* Right-Mid Sky Blue Blossom */}
    <g transform="translate(128, 28)">
      <ellipse cx="0" cy="-7" rx="4" ry="5.5" fill="#BAE6FD" stroke="#0284C7" strokeWidth="0.9" />
      <ellipse cx="6.5" cy="-2" rx="4" ry="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.9" transform="rotate(72 6.5 -2)" />
      <ellipse cx="4" cy="6" rx="4" ry="5.5" fill="#BAE6FD" stroke="#0284C7" strokeWidth="0.9" transform="rotate(144 4 6)" />
      <ellipse cx="-4" cy="6" rx="4" ry="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.9" transform="rotate(216 -4 6)" />
      <ellipse cx="-6.5" cy="-2" rx="4" ry="5.5" fill="#BAE6FD" stroke="#0284C7" strokeWidth="0.9" transform="rotate(288 -6.5 -2)" />
      <circle cx="0" cy="0" r="4.2" fill="#FDE047" stroke="#D97706" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
    </g>

    {/* Right Lavender Blossom */}
    <g transform="translate(158, 42)">
      <circle cx="-5" cy="-5" r="5.5" fill="#E9D5FF" stroke="#9333EA" strokeWidth="0.8" />
      <circle cx="5" cy="-5" r="5.5" fill="#F3E8FF" stroke="#9333EA" strokeWidth="0.8" />
      <circle cx="5" cy="5" r="5.5" fill="#E9D5FF" stroke="#9333EA" strokeWidth="0.8" />
      <circle cx="-5" cy="5" r="5.5" fill="#F3E8FF" stroke="#9333EA" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="4.5" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
    </g>

    {/* Baby's breath accents */}
    <circle cx="60" cy="42" r="2.8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.6" />
    <circle cx="88" cy="35" r="2.4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.6" />
    <circle cx="114" cy="35" r="2.4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.6" />
    <circle cx="142" cy="42" r="2.8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.6" />
  </svg>
);

/**
 * CompanionAvatar renders the chosen pet companion (Dog, Cat, Elephant, Hippo).
 * - For 'dog' (Mimi): Renders high-res dog.png with modular bandana, flower crown, or natural.
 * - For 'cat' (Lulu): Renders high-res cat.png with modular bandana, flower crown, or natural.
 * - For 'elephant', 'hippo': Renders responsive SVG companion illustrations with outfits.
 */
export function CompanionAvatar({
  type = 'dog',
  outfit = 'green_bandana',
  className = 'w-24 h-24',
  animated = false,
}) {
  const normType = (type || 'dog').toLowerCase();
  const animClass = animated ? 'animate-bounce' : 'animate-gentle-breathe';

  // DOG COMPANION (Mimi)
  if (normType === 'dog') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        {/* Soft ground shadow beneath paws */}
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          {/* Inner container locking aspect ratio so overlays scale perfectly at any size */}
          <div className="relative h-full aspect-[1124/1337] flex items-center justify-center">
            {/* Natural Dog */}
            <img
              src={dogImg}
              alt="Mimi companion dog"
              className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
              draggable={false}
            />

            {/* Modular Bandana Overlay - Tucked naturally right under the chin curve */}
            {outfit === 'green_bandana' && (
              <img
                src={dogBandanaImg}
                alt="Green bandana"
                className="absolute top-[54.2%] left-[21.8%] w-[53%] object-contain pointer-events-none drop-shadow-xs select-none animate-in zoom-in-95 duration-200"
                draggable={false}
              />
            )}

            {/* Modular Flower Crown Overlay - Perched gracefully atop the head between ears */}
            {outfit === 'flower_crown' && (
              <div className="absolute top-[4.5%] left-[50%] -translate-x-1/2 w-[48%] pointer-events-none drop-shadow-sm animate-in zoom-in-95 duration-200">
                <FlowerCrownSvg className="w-full drop-shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // CAT COMPANION (Lulu)
  if (normType === 'cat') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        {/* Soft ground shadow beneath paws */}
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          {/* Inner container locking aspect ratio so overlays scale perfectly at any size */}
          <div className="relative h-full aspect-[1414/1362] flex items-center justify-center">
            {/* Natural White Fluffy Cat */}
            <img
              src={catImg}
              alt="Cat companion"
              className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
              draggable={false}
            />

            {/* Modular Bandana Overlay fitted to Cat's neck fold */}
            {outfit === 'green_bandana' && (
              <img
                src={dogBandanaImg}
                alt="Green bandana"
                className="absolute top-[43.7%] left-[55.8%] w-[33%] -rotate-6 object-contain pointer-events-none drop-shadow-xs select-none animate-in zoom-in-95 duration-200"
                draggable={false}
              />
            )}

            {/* Modular Flower Crown Overlay fitted atop Cat's crown between ears */}
            {outfit === 'flower_crown' && (
              <div className="absolute top-[6.5%] left-[67%] -translate-x-1/2 -rotate-3 w-[36%] pointer-events-none drop-shadow-sm animate-in zoom-in-95 duration-200">
                <FlowerCrownSvg className="w-full drop-shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OTHER COMPANIONS (Elephant, Hippo)
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-sm transition-transform duration-300 ${animClass}`}
      >
        <ellipse cx="80" cy="148" rx="45" ry="8" fill="#EAD9CE" fillOpacity="0.5" />

        {/* ELEPHANT COMPANION */}
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
            <ellipse cx="64" cy="143" rx="12" ry="7" fill="#E4EEF8" stroke="#3A4D60" strokeWidth="2.5" />
            <ellipse cx="96" cy="143" rx="12" ry="7" fill="#E4EEF8" stroke="#3A4D60" strokeWidth="2.5" />

            {/* Elephant Bandana */}
            {outfit === 'green_bandana' && (
              <path
                d="M56 100 C68 114, 92 114, 104 100 C96 118, 86 128, 80 132 C74 128, 64 118, 56 100 Z"
                fill="#7DAE8B"
                stroke="#3D6B4F"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            )}

            {/* Elephant Flower Crown */}
            {outfit === 'flower_crown' && (
              <g>
                <path d="M52 50 C68 40, 92 40, 108 50" stroke="#7DAE8B" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="62" cy="45" r="5" fill="#FFC5CE" />
                <circle cx="62" cy="45" r="2.5" fill="#FFE885" />
                <circle cx="80" cy="40" r="6" fill="#FFAAA6" />
                <circle cx="80" cy="40" r="3" fill="#FFF0A0" />
                <circle cx="98" cy="45" r="5" fill="#BCE0FD" />
                <circle cx="98" cy="45" r="2.5" fill="#FFE885" />
              </g>
            )}
          </g>
        )}

        {/* HIPPO COMPANION */}
        {normType === 'hippo' && (
          <g id="hippo-body">
            <ellipse cx="50" cy="50" rx="12" ry="10" fill="#9BA6BD" stroke="#3D4556" strokeWidth="3" />
            <ellipse cx="110" cy="50" rx="12" ry="10" fill="#9BA6BD" stroke="#3D4556" strokeWidth="3" />
            <ellipse cx="80" cy="120" rx="44" ry="28" fill="#9BA6BD" stroke="#3D4556" strokeWidth="3" />
            <ellipse cx="80" cy="124" rx="26" ry="16" fill="#D3DAE8" />
            <circle cx="80" cy="74" r="34" fill="#9BA6BD" stroke="#3D4556" strokeWidth="3" />
            <ellipse cx="80" cy="94" rx="42" ry="26" fill="#9BA6BD" stroke="#3D4556" strokeWidth="3" />
            <circle cx="50" cy="98" r="6" fill="#F8B4BE" opacity="0.8" />
            <circle cx="110" cy="98" r="6" fill="#F8B4BE" opacity="0.8" />
            <ellipse cx="66" cy="68" rx="4" ry="5" fill="#20242E" />
            <circle cx="65" cy="66" r="1.5" fill="#FFFFFF" />
            <ellipse cx="94" cy="68" rx="4" ry="5" fill="#20242E" />
            <circle cx="93" cy="66" r="1.5" fill="#FFFFFF" />
            <ellipse cx="72" cy="88" rx="3" ry="2.5" fill="#20242E" />
            <ellipse cx="88" cy="88" rx="3" ry="2.5" fill="#20242E" />
            <ellipse cx="64" cy="144" rx="12" ry="6" fill="#D3DAE8" stroke="#3D4556" strokeWidth="2.5" />
            <ellipse cx="96" cy="144" rx="12" ry="6" fill="#D3DAE8" stroke="#3D4556" strokeWidth="2.5" />

            {/* Hippo Bandana */}
            {outfit === 'green_bandana' && (
              <path
                d="M54 104 C68 116, 92 116, 106 104 C98 122, 88 130, 80 134 C72 130, 62 122, 54 104 Z"
                fill="#7DAE8B"
                stroke="#3D6B4F"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            )}

            {/* Hippo Flower Crown */}
            {outfit === 'flower_crown' && (
              <g>
                <path d="M52 46 C68 36, 92 36, 108 46" stroke="#7DAE8B" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="62" cy="41" r="5" fill="#FFC5CE" />
                <circle cx="62" cy="41" r="2.5" fill="#FFE885" />
                <circle cx="80" cy="36" r="6" fill="#FFAAA6" />
                <circle cx="80" cy="36" r="3" fill="#FFF0A0" />
                <circle cx="98" cy="41" r="5" fill="#BCE0FD" />
                <circle cx="98" cy="41" r="2.5" fill="#FFE885" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

export default CompanionAvatar;
