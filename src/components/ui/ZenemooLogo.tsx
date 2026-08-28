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
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-9 sm:h-11 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const sublineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Real Zenemoo Logo Image */}
      <img
        src="/zenemoologo.png"
        alt="ZENEMOO"
        className={`object-contain drop-shadow-[0_0_12px_rgba(0,242,254,0.25)] ${iconSizes[size]}`}
      />

      {/* Clean Solid Typography matching reference */}
      <div className="flex flex-col">
        <span className={`font-black tracking-wider text-white font-sans leading-none ${textSizes[size]}`}>
          ZENEMOO
        </span>

        {showTagline && (
          <div className={`text-slate-400 font-mono tracking-[0.2em] uppercase mt-1 flex items-center gap-1.5 ${sublineSizes[size]}`}>
            <span>{taglineText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
