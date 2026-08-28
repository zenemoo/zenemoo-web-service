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
  taglineText = 'WEB SERVICES',
  size = 'md',
}) => {
  const containerSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const sublineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Perfectly Circular Logo Frame */}
      <div 
        className={`relative shrink-0 rounded-full p-1 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 backdrop-blur-md overflow-hidden flex items-center justify-center ${containerSizes[size]}`}
      >
        <img
          src="/zenemoologo.png"
          alt="ZENEMOO"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Clean Solid Brand Typography */}
      <div className="flex flex-col">
        <span className={`font-black tracking-wider text-white font-sans leading-none ${textSizes[size]}`}>
          ZENEMOO
        </span>

        {showTagline && (
          <div className={`text-cyan-400 font-mono tracking-[0.2em] uppercase mt-1 flex items-center gap-1.5 ${sublineSizes[size]}`}>
            <span>{taglineText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
