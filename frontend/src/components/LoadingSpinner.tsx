'use client';

interface LoadingSpinnerProps {
  message?: string;
  showSkeleton?: boolean;
}

export default function LoadingSpinner({
  message = 'Loading...',
  showSkeleton = true,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 px-5 animate-fade-in">
      <div className="relative w-[52px] h-[52px]">
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-accent animate-spin-ring" />
        <div className="absolute inset-[5px] rounded-full border-3 border-transparent border-t-accent-light animate-spin-ring-2" />
        <div className="absolute inset-[10px] rounded-full border-3 border-transparent border-t-[#c4b5fd] animate-spin-ring-3" />
      </div>
      <p className="text-sm text-white/40 tracking-wide">{message}</p>

      {showSkeleton && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full max-w-[800px] mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
              <div className="h-[18px] w-[60%] rounded-lg bg-gradient-to-r from-white/4 via-white/8 to-white/4 bg-[length:200%_100%] animate-shimmer" />
              <div className="h-3.5 w-[80%] rounded-lg bg-gradient-to-r from-white/4 via-white/8 to-white/4 bg-[length:200%_100%] animate-shimmer" />
              <div className="h-3.5 w-[45%] rounded-lg bg-gradient-to-r from-white/4 via-white/8 to-white/4 bg-[length:200%_100%] animate-shimmer" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
