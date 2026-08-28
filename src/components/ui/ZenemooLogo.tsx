import React from 'react';

interface ZenemooLogoProps {
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ZenemooLogo: React.FC<ZenemooLogoProps> = ({
  className = '',
  showTagline = true,
  taglineText = 'BUILD · LAUNCH · GROW',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const sublineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem SVG */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,242,254,0.3)]">
          <defs>
            <linearGradient id="zenemoo-z-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00F2FE" />
              <stop offset="50%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#8B5CF6" />
            </linearGradient>
            <linearGradient id="zenemoo-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* Main Ribbon Z */}
          <path
            d="M 28 26 C 38 24 68 22 74 28 C 78 32 60 50 44 68 C 36 76 34 78 46 78 C 58 78 68 78 74 78"
            stroke="url(#zenemoo-z-grad)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Accent Purple Dot */}
          <circle cx="70" cy="60" r="7" fill="#8B5CF6" />

          {/* Top Sparkle 1 */}
          <path
            d="M 82 12 C 82 17 87 17 87 17 C 87 17 82 17 82 22 C 82 17 77 17 77 17 C 77 17 82 17 82 12 Z"
            fill="url(#zenemoo-star-grad)"
          />
          {/* Top Sparkle 2 */}
          <path
            d="M 92 24 C 92 27 95 27 95 27 C 95 27 92 27 92 30 C 92 27 89 27 89 27 C 89 27 92 27 92 24 Z"
            fill="#8B5CF6"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-extrabold tracking-wider text-slate-100 font-sans flex items-center gap-0.5 leading-none ${textSizes[size]}`}>
          <span>ZENEM</span>
          {/* First O: Solid/Gradient Purple Circle */}
          <span className="inline-block w-[0.7em] h-[0.7em] rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 mx-[0.05em] shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          {/* Second O: Cyan Ring */}
          <span className="inline-block w-[0.7em] h-[0.7em] rounded-full border-[2.5px] border-cyan-400 mx-[0.05em] shadow-[0_0_8px_rgba(0,242,254,0.5)]" />
        </div>

        {showTagline && (
          <div className={`text-slate-400 font-mono tracking-[0.2em] uppercase mt-1 flex items-center gap-1.5 ${sublineSizes[size]}`}>
            <span>{taglineText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
