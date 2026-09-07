'use client';

import Link from 'next/link';
import { ArrowRight, Sun, Moon, Utensils } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-10 -left-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 -right-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl -z-10" />

      {/* Top Bar: Toggle Theme */}
      <div className="flex justify-end pt-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:scale-105 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center shadow-xl shadow-orange-500/20 animate-bounce">
          <Utensils size={48} className="text-white" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Campus Meatballs
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            ร้านลูกชิ้นเด็กหอ <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              ทอดร้อนๆ น้ำจิ้มเด็ด
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            สั่งลูกชิ้น ปิ้ง ทอด นึ่ง ส่งตรงถึงใต้ตึกเรียนและหอพักภายในวิทยาลัย
          </p>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pb-6 space-y-3">
        <Link
          href="/home"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:opacity-95 active:scale-95 transition-all"
        >
          สั่งซื้อลูกชิ้นเลย <ArrowRight size={18} />
        </Link>
        <p className="text-xs text-center text-slate-400">
          บริการส่งฟรีถึงตึกเรียนในวิทยาลัย
        </p>
      </div>
    </main>
  );
}