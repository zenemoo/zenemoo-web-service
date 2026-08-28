import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: 'cyan' | 'purple' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glowColor = 'none',
  onClick,
}) => {
  const glowStyles = {
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.15)]',
    purple: 'hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)]',
    none: '',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-6 transition-all duration-300 ${
        hoverable ? 'cursor-pointer hover:-translate-y-1 hover:bg-slate-900/80' : ''
      } ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
};
