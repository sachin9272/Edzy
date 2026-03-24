'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Users, LayoutDashboard, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/snacks', label: 'Snacks', icon: UtensilsCrossed },
  { href: '/students', label: 'Students', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="fixed top-4 left-4 z-[90] hidden max-md:flex w-11 h-11 items-center justify-center border border-white/10 rounded-xl bg-[rgba(15,15,25,0.9)] backdrop-blur-[12px] text-white cursor-pointer transition-all duration-200 hover:bg-accent/20 hover:border-accent/30"
      >
        <Menu size={22} />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[99] animate-fade-in-overlay max-md:block hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-sidebar h-screen fixed top-0 left-0 bg-[rgba(15,15,25,0.95)] backdrop-blur-[20px]
          border-r border-white/6 flex flex-col z-[100]
          max-md:transition-transform max-md:duration-300 max-md:ease-[cubic-bezier(0.4,0,0.2,1)]
          ${mobileOpen ? 'max-md:translate-x-0 max-md:shadow-[4px_0_24px_rgba(0,0,0,0.4)]' : 'max-md:-translate-x-full max-md:shadow-none'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-7 pb-6 border-b border-white/6">
          <span className="text-[28px]">🍕</span>
          <h1 className="text-[22px] font-bold bg-gradient-to-br from-accent-light to-accent bg-clip-text text-transparent flex-1">
            Canteen
          </h1>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="hidden max-md:flex w-9 h-9 items-center justify-center border-none rounded-[10px] bg-white/6 text-white/50 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3.5 py-3 px-4 rounded-xl text-[15px] font-medium
                  transition-all duration-250 no-underline
                  ${isActive
                    ? 'text-white bg-gradient-to-br from-accent/25 to-accent-light/15 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                    : 'text-white/50 hover:text-white/85 hover:bg-white/5'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/6">
          <p className="text-xs text-white/25">School Canteen v1.0</p>
        </div>
      </aside>
    </>
  );
}
