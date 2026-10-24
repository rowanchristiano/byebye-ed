import React from 'react';

/**
 * Baseball Cap SVG
 * Stylish curved pastel cap with visor, panels, top button, and cute tulip logo
 */
export const CapSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cap Dome / Crown */}
    <path
      d="M20 54 C20 22, 42 12, 60 12 C78 12, 100 22, 100 54 Z"
      fill="#4361EE"
      stroke="#2B3A8C"
      strokeWidth="2.5"
    />
    {/* Dome Panel Shading / Highlights */}
    <path
      d="M32 54 C32 26, 46 16, 60 12 C74 16, 88 26, 88 54"
      stroke="#3A56D4"
      strokeWidth="1.5"
      strokeDasharray="2 2"
    />
    <path
      d="M60 12 L60 54"
      stroke="#2B3A8C"
      strokeWidth="2"
    />
    {/* Visor / Brim with curve */}
    <path
      d="M14 52 C14 46, 26 44, 45 44 C72 44, 106 48, 114 54 C116 57, 108 64, 85 64 C56 64, 20 62, 14 52 Z"
      fill="#3A0CA3"
      stroke="#210563"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M24 53 C45 51, 80 54, 98 57"
      stroke="#4CC9F0"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Top Button */}
    <ellipse cx="60" cy="12" rx="5" ry="3" fill="#F72585" stroke="#2B3A8C" strokeWidth="1.5" />
    {/* Front Emblem: Cute Mini Tulip */}
    <g transform="translate(60, 36) scale(0.85)">
      <circle cx="0" cy="0" r="7" fill="#FFFFFF" opacity="0.9" />
      <path d="M-3 2 C-4 -2, -1 -4, 0 -1 C1 -4, 4 -2, 3 2 Z" fill="#F72585" />
    </g>
  </svg>
);

/**
 * Dapper Bowtie SVG
 * Elegant satin bowtie with rich ruby red / golden tones and center knot
 */
export const BowtieSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Left Ribbon Wing */}
    <path
      d="M50 25 L16 10 C12 20, 12 30, 16 40 L50 25 Z"
      fill="#E63946"
      stroke="#9B1D28"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M22 17 C26 23, 26 27, 22 33" stroke="#F18A94" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 21 L28 29" stroke="#9B1D28" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right Ribbon Wing */}
    <path
      d="M50 25 L84 10 C88 20, 88 30, 84 40 L50 25 Z"
      fill="#E63946"
      stroke="#9B1D28"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M78 17 C74 23, 74 27, 78 33" stroke="#F18A94" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M68 21 L72 29" stroke="#9B1D28" strokeWidth="1.5" strokeLinecap="round" />

    {/* Center Knot with golden sheen */}
    <rect
      x="44"
      y="18"
      width="12"
      height="14"
      rx="4"
      fill="#D90429"
      stroke="#7A0018"
      strokeWidth="2.5"
    />
    <ellipse cx="50" cy="22" rx="3" ry="1.5" fill="#FFA5AB" opacity="0.8" />
  </svg>
);

/**
 * Harry Potter / Wizard Round Glasses SVG
 * Iconic large round wireframe lenses, curved arched bridge, side arms, and subtle golden spark.
 * Designed with anime chibi eye proportions and crystal-clear lenses so expressive eyes shine through.
 */
export const GlassesSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Subtle Left Temple Arm */}
    <path
      d="M14.5 25 Q9 25 3 29"
      stroke="#1E293B"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle Right Temple Arm */}
    <path
      d="M105.5 25 Q111 25 117 29"
      stroke="#1E293B"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Center High-Arched Nose Bridge */}
    <path
      d="M49.5 23 C54 14, 66 14, 70.5 23"
      stroke="#1E293B"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <path
      d="M50.5 22 C54.5 15, 65.5 15, 69.5 22"
      stroke="#F59E0B"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.85"
    />

    {/* Soft Golden Nose Pads */}
    <ellipse cx="51.5" cy="27" rx="1.4" ry="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="0.7" opacity="0.9" />
    <ellipse cx="68.5" cy="27" rx="1.4" ry="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="0.7" opacity="0.9" />

    {/* Left Lens - Ultra-Clear Luminous Tint */}
    <circle cx="32" cy="25" r="17.5" fill="#F0F9FF" fillOpacity="0.04" />
    {/* Left Wire Frame Outer Ring */}
    <circle cx="32" cy="25" r="17.5" stroke="#0F172A" strokeWidth="3" />
    {/* Left Inner Warm Rim Sheen */}
    <path
      d="M18 18 C21 12, 30 10, 39 12"
      stroke="#F59E0B"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Left Lens Glass Glints */}
    <path
      d="M21 16 C25 12, 34 12, 40 15"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.9"
    />
    <circle cx="43" cy="17" r="1.2" fill="#FFFFFF" opacity="0.95" />

    {/* Right Lens - Ultra-Clear Luminous Tint */}
    <circle cx="88" cy="25" r="17.5" fill="#F0F9FF" fillOpacity="0.04" />
    {/* Right Wire Frame Outer Ring */}
    <circle cx="88" cy="25" r="17.5" stroke="#0F172A" strokeWidth="3" />
    {/* Right Inner Warm Rim Sheen */}
    <path
      d="M74 18 C77 12, 86 10, 95 12"
      stroke="#F59E0B"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Right Lens Glass Glints */}
    <path
      d="M77 16 C81 12, 90 12, 96 15"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.9"
    />
    <circle cx="99" cy="17" r="1.2" fill="#FFFFFF" opacity="0.95" />

    {/* Golden Hinge Screws */}
    <circle cx="14.5" cy="25" r="2.2" fill="#F59E0B" stroke="#0F172A" strokeWidth="0.9" />
    <circle cx="105.5" cy="25" r="2.2" fill="#F59E0B" stroke="#0F172A" strokeWidth="0.9" />

    {/* Golden Lightning Bolt Magic Accent above right frame */}
    <path
      d="M95 5 L91 11 L96 11 L90 18 L92 12 L87 12 Z"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    {/* Magical Starlight Sparkle */}
    <path
      d="M103 8 L104 10 L106 11 L104 12 L103 14 L102 12 L100 11 L102 10 Z"
      fill="#FEF08A"
      opacity="0.95"
    />
  </svg>
);

/**
 * Hero Recovery Cape SVG (Back Billowing Wing Layers)
 * Designed wide so majestic flowing purple cape folds flare out visibly behind the companion
 */
export const CapeBackSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Deep shadow / backdrop folds */}
    <path
      d="M50 25 C20 45, 2 80, 0 115 C20 110, 42 120, 58 102 C68 65, 75 40, 80 25 Z"
      fill="#3C096C"
      stroke="#240046"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M170 25 C200 45, 218 80, 220 115 C200 110, 178 120, 162 102 C152 65, 145 40, 140 25 Z"
      fill="#3C096C"
      stroke="#240046"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Left Billowing Wing (Fanning out widely) */}
    <path
      d="M75 22 C42 38, 14 70, 8 110 C26 102, 46 112, 64 96 C74 65, 82 38, 88 22 Z"
      fill="#7B2CBF"
      stroke="#3C096C"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Left Wing highlight fold */}
    <path
      d="M20 98 C35 70, 55 45, 78 28"
      stroke="#C77DFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M40 102 C50 80, 68 55, 82 35"
      stroke="#9D4EDD"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Right Billowing Wing (Fanning out widely) */}
    <path
      d="M145 22 C178 38, 206 70, 212 110 C194 102, 174 112, 156 96 C146 65, 138 38, 132 22 Z"
      fill="#7B2CBF"
      stroke="#3C096C"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Right Wing highlight fold */}
    <path
      d="M200 98 C185 70, 165 45, 142 28"
      stroke="#C77DFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M180 102 C170 80, 152 55, 138 35"
      stroke="#9D4EDD"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Central Cape Body */}
    <path
      d="M78 22 C92 16, 128 16, 142 22 C155 60, 165 105, 138 122 C120 114, 100 114, 82 122 C55 105, 65 60, 78 22 Z"
      fill="#9D4EDD"
      stroke="#3C096C"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Center Folds & Highlights */}
    <path d="M92 28 C86 58, 84 88, 86 112" stroke="#E0AAFF" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
    <path d="M128 28 C134 58, 136 88, 134 112" stroke="#E0AAFF" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
  </svg>
);

/**
 * Cape Front Clasp & Neck Ribbon SVG
 * Renders in front of companion collar at z-20 for an authentic superhero cape appearance
 */
export const CapeFrontClaspSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Neck Ribbon Band */}
    <path
      d="M12 10 C32 22, 68 22, 88 10"
      stroke="#5A189A"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M14 10 C33 21, 67 21, 86 10"
      stroke="#9D4EDD"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Ribbon Tails hanging down from brooch */}
    <path
      d="M46 16 L41 31 L47 28 L53 31 L48 16 Z"
      fill="#7B2CBF"
      stroke="#3C096C"
      strokeWidth="1.2"
    />

    {/* Golden Sunburst / Star Brooch Clasp */}
    <circle cx="50" cy="15" r="8" fill="#FFB703" stroke="#B58000" strokeWidth="1.8" />
    <circle cx="50" cy="15" r="5" fill="#D90429" stroke="#9B1D28" strokeWidth="1" />
    {/* Sparkling star glint */}
    <path
      d="M50 11.5 L51.2 14.2 L53.5 15 L51.2 15.8 L50 18.5 L48.8 15.8 L46.5 15 L48.8 14.2 Z"
      fill="#FFFDF0"
    />
  </svg>
);

export const CapeSvg = CapeBackSvg;

/**
 * Whimsical Witch Hat SVG
 * Pointy mystical hat with curved tip, starry band, and gold buckle
 */
export const WitchHatSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wide Rim */}
    <ellipse cx="60" cy="80" rx="46" ry="14" fill="#240046" stroke="#10002B" strokeWidth="2.5" />
    <ellipse cx="60" cy="80" rx="40" ry="10" fill="#3C096C" />

    {/* Hat Cone with playful bent tip */}
    <path
      d="M32 78 C36 50, 50 25, 78 8 C88 2, 94 8, 86 16 C76 22, 70 38, 88 78 Z"
      fill="#5A189A"
      stroke="#10002B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Cone Highlight Crease */}
    <path
      d="M48 76 C52 52, 60 30, 78 14"
      stroke="#9D4EDD"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Ribbon Hat Band */}
    <path
      d="M32 74 C42 70, 78 70, 88 74 L88 78 C78 74, 42 74, 32 78 Z"
      fill="#F72585"
      stroke="#7209B7"
      strokeWidth="1.5"
    />

    {/* Golden Star Buckle */}
    <g transform="translate(60, 74)">
      <circle cx="0" cy="0" r="6" fill="#FFB703" stroke="#D48B00" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="3" fill="#7209B7" />
    </g>
    {/* Tiny Star Accents */}
    <path d="M50 45 L51 48 L54 48 L52 50 L53 53 L50 51 L47 53 L48 50 L46 48 L49 48 Z" fill="#FFD166" />
    <circle cx="68" cy="34" r="1.5" fill="#FFD166" />
  </svg>
);

/**
 * Regal Golden Crown SVG
 * 3-point royal crown with ruby, sapphire, and emerald gems
 */
export const CrownSvg = ({ className = 'w-full' }) => (
  <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crown Base & 3 Peaks */}
    <path
      d="M18 52 L12 24 L36 36 L50 14 L64 36 L88 24 L82 52 Z"
      fill="#FFB703"
      stroke="#B58000"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Velvet interior arch */}
    <path
      d="M20 52 C32 46, 68 46, 80 52 L78 56 C66 50, 34 50, 22 56 Z"
      fill="#D90429"
      stroke="#9B1D28"
      strokeWidth="1.5"
    />
    {/* Golden Rim Base */}
    <path
      d="M16 52 C34 46, 66 46, 84 52 L82 60 C66 54, 34 54, 18 60 Z"
      fill="#FB8500"
      stroke="#B58000"
      strokeWidth="2"
    />

    {/* Crown Peak Pearls */}
    <circle cx="12" cy="24" r="3.5" fill="#FFFFFF" stroke="#B58000" strokeWidth="1.2" />
    <circle cx="50" cy="14" r="4.5" fill="#FFFFFF" stroke="#B58000" strokeWidth="1.5" />
    <circle cx="88" cy="24" r="3.5" fill="#FFFFFF" stroke="#B58000" strokeWidth="1.2" />

    {/* Center Ruby Jewel */}
    <circle cx="50" cy="36" r="4.5" fill="#E63946" stroke="#9B1D28" strokeWidth="1.2" />
    <circle cx="48.5" cy="34.5" r="1.2" fill="#FFFFFF" />

    {/* Left Sapphire Jewel */}
    <circle cx="32" cy="42" r="3.2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
    <circle cx="31" cy="41" r="0.8" fill="#FFFFFF" />

    {/* Right Emerald Jewel */}
    <circle cx="68" cy="42" r="3.2" fill="#10B981" stroke="#047857" strokeWidth="1" />
    <circle cx="67" cy="41" r="0.8" fill="#FFFFFF" />

    {/* Sparkle Glint */}
    <path d="M50 4 L51 8 L55 9 L51 10 L50 14 L49 10 L45 9 L49 8 Z" fill="#FFFBEB" />
  </svg>
);

export default {
  CapSvg,
  BowtieSvg,
  GlassesSvg,
  CapeSvg,
  WitchHatSvg,
  CrownSvg,
};
