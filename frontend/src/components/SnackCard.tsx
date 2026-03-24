'use client';

import { Snack } from '@/types';
import { ShoppingCart, TrendingUp } from 'lucide-react';

interface SnackCardProps {
  snack: Snack;
  onOrder: (snackId: string) => void;
}

export default function SnackCard({ snack, onOrder }: SnackCardProps) {
  const emoji = getSnackEmoji(snack.name);

  return (
    <div className="group relative overflow-hidden bg-white/4 border border-white/8 rounded-[20px] p-6 flex flex-col gap-4 transition-all duration-300 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] max-sm:p-[18px] max-sm:gap-3 max-sm:rounded-2xl">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent-light/10 flex items-center justify-center max-sm:w-11 max-sm:h-11 max-sm:rounded-xl">
        <span className="text-[28px] max-sm:text-[22px]">{emoji}</span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[17px] font-semibold text-white max-sm:text-[15px]">{snack.name}</h3>
        <p className="text-[22px] font-bold bg-gradient-to-br from-accent-light to-accent bg-clip-text text-transparent max-sm:text-lg">₹{snack.price}</p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-1.5 text-[13px] text-white/40 max-sm:text-xs">
          <TrendingUp size={14} />
          <span>{snack.ordersCount} orders</span>
        </div>
      </div>

      <button
        className="flex items-center justify-center gap-2 p-3 border-none rounded-xl bg-gradient-to-br from-accent to-accent-purple text-white text-sm font-semibold cursor-pointer transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] active:translate-y-0 max-sm:min-h-11 max-sm:rounded-[10px] max-sm:text-[13px]"
        onClick={() => onOrder(snack._id)}
      >
        <ShoppingCart size={16} />
        <span>Order</span>
      </button>
    </div>
  );
}

function getSnackEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('samosa')) return '🥟';
  if (lower.includes('sandwich')) return '🥪';
  if (lower.includes('roll')) return '🌯';
  if (lower.includes('juice')) return '🧃';
  if (lower.includes('chip')) return '🍟';
  if (lower.includes('coffee')) return '☕';
  if (lower.includes('dosa')) return '🥞';
  if (lower.includes('tikki')) return '🥘';
  if (lower.includes('spring')) return '🥡';
  if (lower.includes('lassi') || lower.includes('mango')) return '🥭';
  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('burger')) return '🍔';
  return '🍽️';
}
