'use client';

import { Student } from '@/types';
import { ChevronRight, Hash, Wallet } from 'lucide-react';
import Link from 'next/link';

interface StudentListItemProps {
  student: Student;
}

export default function StudentListItem({ student }: StudentListItemProps) {
  return (
    <Link
      href={`/students/${student._id}`}
      className="group flex items-center gap-4 py-4 px-5 bg-white/3 border border-white/6 rounded-2xl no-underline text-inherit transition-all duration-250 cursor-pointer hover:bg-white/6 hover:border-accent/30 hover:translate-x-1 max-sm:py-3.5 max-sm:px-4 max-sm:gap-3 max-sm:rounded-xl"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-bold text-lg text-white shrink-0 max-sm:w-[38px] max-sm:h-[38px] max-sm:rounded-[10px] max-sm:text-base">
        {student.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-white mb-1 max-sm:text-sm">{student.name}</h3>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-white/40 bg-white/5 py-0.5 px-2 rounded-md max-sm:text-[11px] max-sm:py-0.5 max-sm:px-1.5">
            <Hash size={12} />
            {student.referralCode}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[15px] font-semibold text-accent-light shrink-0 max-sm:text-[13px]">
        <Wallet size={14} />
        <span>₹{student.totalSpent}</span>
      </div>

      <ChevronRight size={18} className="text-white/20 shrink-0 transition-colors duration-200 group-hover:text-white/50" />
    </Link>
  );
}
