import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading data...',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center space-y-3 ${className}`}>
      <div
        className={`${sizeMap[size]} border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin`}
      />
      {label && <p className="text-sm font-medium text-slate-400 animate-pulse">{label}</p>}
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-xl p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
      <div className="h-6 bg-slate-800 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-800/60 rounded w-full"></div>
        <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-5 bg-slate-800 rounded w-16"></div>
        <div className="h-5 bg-slate-800 rounded w-20"></div>
      </div>
    </div>
  );
};
