import React from 'react';
import dogImg from '../assets/dog.png';
import catImg from '../assets/cat.png';
import elephantImg from '../assets/elephant.png';
import hippoImg from '../assets/hippo.png';
import dogBandanaImg from '../assets/dog_bandana.png';
import {
  CapSvg,
  BowtieSvg,
  GlassesSvg,
  CapeSvg,
  CapeFrontClaspSvg,
  WitchHatSvg,
  CrownSvg,
} from './AccessorySvgs';

/**
 * Exquisite Handcrafted Flower Crown SVG
 * Features rich layered blush peonies, daisies with golden centers, forget-me-nots, and sage foliage
 */
export const FlowerCrownSvg = ({ className = 'w-full' }) => (
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
 * Features:
 * - High-res hand-drawn anime/chibi character art:
 *   - Dog (Mimi)
 *   - Cat (Lulu)
 *   - Elephant (Ellie) - refined to match Mimi & Lulu art style
 *   - Hippo (bubbles) - refined to match Mimi & Lulu art style
 * - Full modular accessory support tailored to each companion:
 *   - 'green_bandana', 'flower_crown', 'cap', 'bowtie', 'glasses', 'cape', 'witch_hat', 'crown', 'default'
 */
export function CompanionAvatar({
  type = 'dog',
  outfit = 'default',
  className = 'w-24 h-24',
  animated = false,
}) {
  const normType = (type || 'dog').toLowerCase();
  const animClass = animated ? 'animate-bounce' : 'animate-gentle-breathe';

  // 1. DOG COMPANION (Mimi)
  if (normType === 'dog') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          <div className="relative h-full aspect-[1124/1337] flex items-center justify-center">
            {/* Cape (Behind Dog) */}
            {outfit === 'cape' && (
              <div className="absolute top-[36%] left-[50%] -translate-x-1/2 w-[98%] pointer-events-none drop-shadow-md z-0 animate-in zoom-in-95 duration-200">
                <CapeSvg className="w-full" />
              </div>
            )}

            {/* Natural Dog */}
            <img
              src={dogImg}
              alt="Mimi companion dog"
              className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none relative z-10"
              draggable={false}
            />

            {/* Cape Front Brooch Clasp */}
            {outfit === 'cape' && (
              <div className="absolute top-[53%] left-[50%] -translate-x-1/2 w-[24%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapeFrontClaspSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Green Bandana */}
            {outfit === 'green_bandana' && (
              <img
                src={dogBandanaImg}
                alt="Green bandana"
                className="absolute top-[54.2%] left-[21.8%] w-[53%] object-contain pointer-events-none drop-shadow-xs select-none z-20 animate-in zoom-in-95 duration-200"
                draggable={false}
              />
            )}

            {/* Flower Crown */}
            {outfit === 'flower_crown' && (
              <div className="absolute top-[4.5%] left-[50%] -translate-x-1/2 w-[48%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <FlowerCrownSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Baseball Cap */}
            {outfit === 'cap' && (
              <div className="absolute top-[6%] left-[51%] -translate-x-1/2 -rotate-3 w-[52%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Bowtie */}
            {outfit === 'bowtie' && (
              <div className="absolute top-[52.5%] left-[50%] -translate-x-1/2 w-[28%] pointer-events-none drop-shadow-xs z-20 animate-in zoom-in-95 duration-200">
                <BowtieSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Harry Potter Round Glasses */}
            {outfit === 'glasses' && (
              <div className="absolute top-[25.2%] left-[57.6%] -translate-x-1/2 -rotate-3 w-[53.5%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <GlassesSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Witch Hat */}
            {outfit === 'witch_hat' && (
              <div className="absolute -top-[14%] left-[52%] -translate-x-1/2 -rotate-3 w-[56%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <WitchHatSvg className="w-full drop-shadow-md" />
              </div>
            )}

            {/* Golden Crown */}
            {outfit === 'crown' && (
              <div className="absolute top-[1%] left-[51%] -translate-x-1/2 w-[38%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <CrownSvg className="w-full drop-shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. CAT COMPANION (Lulu)
  if (normType === 'cat') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          <div className="relative h-full aspect-[1414/1362] flex items-center justify-center">
            {/* Cape (Behind Cat) */}
            {outfit === 'cape' && (
              <div className="absolute top-[32%] left-[60%] -translate-x-1/2 w-[96%] pointer-events-none drop-shadow-md z-0 animate-in zoom-in-95 duration-200">
                <CapeSvg className="w-full" />
              </div>
            )}

            {/* Natural White Fluffy Cat */}
            <img
              src={catImg}
              alt="Cat companion"
              className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none relative z-10"
              draggable={false}
            />

            {/* Cape Front Brooch Clasp */}
            {outfit === 'cape' && (
              <div className="absolute top-[44%] left-[67%] -translate-x-1/2 -rotate-3 w-[22%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapeFrontClaspSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Green Bandana */}
            {outfit === 'green_bandana' && (
              <img
                src={dogBandanaImg}
                alt="Green bandana"
                className="absolute top-[43.7%] left-[55.8%] w-[33%] -rotate-6 object-contain pointer-events-none drop-shadow-xs select-none z-20 animate-in zoom-in-95 duration-200"
                draggable={false}
              />
            )}

            {/* Flower Crown */}
            {outfit === 'flower_crown' && (
              <div className="absolute top-[6.5%] left-[67%] -translate-x-1/2 -rotate-3 w-[36%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <FlowerCrownSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Baseball Cap */}
            {outfit === 'cap' && (
              <div className="absolute top-[8%] left-[68%] -translate-x-1/2 -rotate-4 w-[42%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Bowtie */}
            {outfit === 'bowtie' && (
              <div className="absolute top-[44.5%] left-[67%] -translate-x-1/2 -rotate-2 w-[25%] pointer-events-none drop-shadow-xs z-20 animate-in zoom-in-95 duration-200">
                <BowtieSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Round Glasses */}
            {outfit === 'glasses' && (
              <div className="absolute top-[22.5%] left-[74.4%] -translate-x-1/2 -rotate-4 w-[39.5%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <GlassesSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Witch Hat */}
            {outfit === 'witch_hat' && (
              <div className="absolute -top-[12%] left-[67%] -translate-x-1/2 -rotate-3 w-[48%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <WitchHatSvg className="w-full drop-shadow-md" />
              </div>
            )}

            {/* Golden Crown */}
            {outfit === 'crown' && (
              <div className="absolute top-[2%] left-[67%] -translate-x-1/2 -rotate-3 w-[32%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <CrownSvg className="w-full drop-shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. ELEPHANT COMPANION (Ellie) - Handcrafted anime/chibi art style matching Mimi & Lulu
  if (normType === 'elephant') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

        <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
          <div className="relative h-full aspect-[1/1] flex items-center justify-center">
            {/* Cape (Behind Elephant) */}
            {outfit === 'cape' && (
              <div className="absolute top-[36%] left-[50%] -translate-x-1/2 w-[104%] pointer-events-none drop-shadow-md z-0 animate-in zoom-in-95 duration-200">
                <CapeSvg className="w-full" />
              </div>
            )}

            {/* Ellie Elephant Image */}
            <img
              src={elephantImg}
              alt="Ellie elephant companion"
              className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none relative z-10"
              draggable={false}
            />

            {/* Cape Front Brooch Clasp */}
            {outfit === 'cape' && (
              <div className="absolute top-[56.5%] left-[50%] -translate-x-1/2 w-[23%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapeFrontClaspSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Green Bandana */}
            {outfit === 'green_bandana' && (
              <img
                src={dogBandanaImg}
                alt="Green bandana"
                className="absolute top-[50%] left-[34%] w-[38%] -rotate-3 object-contain pointer-events-none drop-shadow-xs select-none z-20 animate-in zoom-in-95 duration-200"
                draggable={false}
              />
            )}

            {/* Flower Crown */}
            {outfit === 'flower_crown' && (
              <div className="absolute top-[6.5%] left-[50%] -translate-x-1/2 w-[46%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <FlowerCrownSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Baseball Cap */}
            {outfit === 'cap' && (
              <div className="absolute top-[8.5%] left-[50%] -translate-x-1/2 -rotate-2 w-[48%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <CapSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Bowtie */}
            {outfit === 'bowtie' && (
              <div className="absolute top-[57.5%] left-[50%] -translate-x-1/2 w-[26%] pointer-events-none drop-shadow-xs z-20 animate-in zoom-in-95 duration-200">
                <BowtieSvg className="w-full drop-shadow-xs" />
              </div>
            )}

            {/* Round Glasses */}
            {outfit === 'glasses' && (
              <div className="absolute top-[25.2%] left-[56.6%] -translate-x-1/2 -rotate-4 w-[49%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
                <GlassesSvg className="w-full drop-shadow-sm" />
              </div>
            )}

            {/* Witch Hat */}
            {outfit === 'witch_hat' && (
              <div className="absolute -top-[12%] left-[50%] -translate-x-1/2 -rotate-3 w-[54%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <WitchHatSvg className="w-full drop-shadow-md" />
              </div>
            )}

            {/* Golden Crown */}
            {outfit === 'crown' && (
              <div className="absolute top-[2.5%] left-[50%] -translate-x-1/2 w-[36%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
                <CrownSvg className="w-full drop-shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. HIPPO COMPANION (bubbles) - Handcrafted anime/chibi art style matching Mimi, Lulu & Ellie
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <div className="absolute bottom-1 w-3/4 h-3 bg-stone-900/15 rounded-full blur-[2px] -z-10" />

      <div className={`relative w-full h-full flex items-center justify-center ${animClass}`}>
        <div className="relative h-full aspect-[1/1] flex items-center justify-center">
          {/* Cape (Behind Hippo) */}
          {outfit === 'cape' && (
            <div className="absolute top-[36%] left-[51%] -translate-x-1/2 w-[100%] pointer-events-none drop-shadow-md z-0 animate-in zoom-in-95 duration-200">
              <CapeSvg className="w-full" />
            </div>
          )}

          {/* Bubbles Hippo Image */}
          <img
            src={hippoImg}
            alt="Bubbles hippo companion"
            className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none relative z-10"
            draggable={false}
          />

          {/* Cape Front Brooch Clasp */}
          {outfit === 'cape' && (
            <div className="absolute top-[57%] left-[51%] -translate-x-1/2 w-[24%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
              <CapeFrontClaspSvg className="w-full drop-shadow-xs" />
            </div>
          )}

          {/* Green Bandana */}
          {outfit === 'green_bandana' && (
            <img
              src={dogBandanaImg}
              alt="Green bandana"
              className="absolute top-[50%] left-[36%] w-[40%] -rotate-3 object-contain pointer-events-none drop-shadow-xs select-none z-20 animate-in zoom-in-95 duration-200"
              draggable={false}
            />
          )}

          {/* Flower Crown */}
          {outfit === 'flower_crown' && (
            <div className="absolute top-[7%] left-[51%] -translate-x-1/2 w-[44%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
              <FlowerCrownSvg className="w-full drop-shadow-sm" />
            </div>
          )}

          {/* Baseball Cap */}
          {outfit === 'cap' && (
            <div className="absolute top-[9%] left-[51%] -translate-x-1/2 -rotate-2 w-[48%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
              <CapSvg className="w-full drop-shadow-sm" />
            </div>
          )}

          {/* Bowtie */}
          {outfit === 'bowtie' && (
            <div className="absolute top-[57%] left-[51%] -translate-x-1/2 w-[26%] pointer-events-none drop-shadow-xs z-20 animate-in zoom-in-95 duration-200">
              <BowtieSvg className="w-full drop-shadow-xs" />
            </div>
          )}

          {/* Round Glasses */}
          {outfit === 'glasses' && (
            <div className="absolute top-[16.5%] left-[53.2%] -translate-x-1/2 -rotate-6 w-[56%] pointer-events-none drop-shadow-sm z-20 animate-in zoom-in-95 duration-200">
              <GlassesSvg className="w-full drop-shadow-sm" />
            </div>
          )}

          {/* Witch Hat */}
          {outfit === 'witch_hat' && (
            <div className="absolute -top-[10%] left-[51%] -translate-x-1/2 -rotate-3 w-[52%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
              <WitchHatSvg className="w-full drop-shadow-md" />
            </div>
          )}

          {/* Golden Crown */}
          {outfit === 'crown' && (
            <div className="absolute top-[3%] left-[51%] -translate-x-1/2 w-[34%] pointer-events-none drop-shadow-md z-20 animate-in zoom-in-95 duration-200">
              <CrownSvg className="w-full drop-shadow-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanionAvatar;
