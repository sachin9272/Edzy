'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 px-5 text-center animate-fade-in">
      <div className="w-[72px] h-[72px] rounded-[20px] bg-danger/10 text-danger flex items-center justify-center mb-1 animate-shake">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-xl font-bold text-white">Oops!</h3>
      <p className="text-sm text-white/45 max-w-[340px] leading-relaxed">{message}</p>
      {onRetry && (
        <button
          className="flex items-center gap-2 py-3 px-6 border border-white/10 rounded-xl bg-white/5 text-white/70 text-sm font-semibold cursor-pointer transition-all duration-250 mt-3 min-h-11 font-[inherit] hover:bg-accent/15 hover:border-accent/30 hover:text-white hover:-translate-y-0.5 active:translate-y-0"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
