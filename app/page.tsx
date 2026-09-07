'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-10 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl -z-10" />

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

      {/* Hero / Brand Section */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/20 animate-bounce">
          <ShoppingBag size={48} className="text-white" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            College Marketplace
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            ตลาดนัดเด็กหอ <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ซื้อง่าย ขายคล่อง
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            แหล่งรวมหนังสือ เครื่องใช้ อุปกรณ์การเรียน และสินค้าส่งต่อจากเพื่อนๆ ในวิทยาลัย
          </p>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pb-6 space-y-3">
        <Link
          href="/home"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:opacity-95 active:scale-95 transition-all"
        >
          เริ่มต้นใช้งาน <ArrowRight size={18} />
        </Link>
        <p className="text-xs text-center text-slate-400">
          เฉพาะนักศึกษาและบุคลากรภายในวิทยาลัยเท่านั้น
        </p>
      </div>
    </main>
  );
}