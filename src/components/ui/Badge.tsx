import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = '',
  icon,
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
};
