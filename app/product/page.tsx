'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Heart, ShoppingBag, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [cookingType, setCookingType] = useState('ทอดกรอบ');
  const [sauceLevel, setSauceLevel] = useState('เผ็ดปานกลาง');

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 relative">
      {/* Top Floating Controls */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-10 p-4 flex justify-between items-center">
        <Link
          href="/home"
          className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 shadow-sm">
            <Share2 size={20} />
          </button>
          <button className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 shadow-sm">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="w-full aspect-square relative bg-slate-200 dark:bg-slate-800">
        <img
          src="https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80"
          alt="ชุดรวมมิตรทอดกรอบ"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-6 bg-slate-50 dark:bg-slate-950 -mt-6 rounded-t-3xl relative z-0">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-medium">
              ชุดรวมฮิต
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} /> รอประมาณ 5-10 นาที
            </span>
          </div>
          <h1 className="text-xl font-bold mb-2">ชุดรวมมิตรทอดกรอบ + น้ำจิ้มสูตรเด็ด</h1>
          <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">50 ฿</div>
        </div>

        {/* Cooking Option Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            รูปแบบการปรุง
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['ทอดกรอบ', 'ปิ้งเตาถ่าน', 'นึ่งนุ่ม'].map((option) => (
              <button
                key={option}
                onClick={() => setCookingType(option)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                  cookingType === option
                    ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Sauce Option Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            ระดับความเผ็ดน้ำจิ้ม
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['เผ็ดน้อย', 'เผ็ดปานกลาง', 'เผ็ดพ่นไฟ'].map((option) => (
              <button
                key={option}
                onClick={() => setSauceLevel(option)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                  sauceLevel === option
                    ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Location Delivery Note */}
        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center gap-2.5 text-xs text-orange-700 dark:text-orange-300">
          <MapPin size={18} className="shrink-0" />
          <span>นัดรับได้ที่หน้าตึก 3, ตึกเรียนรวม หรือซุ้มม้านั่งใต้อาคาร</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex gap-3">
        <button className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
          <ShoppingBag size={18} /> สั่งซื้อเลย (50 ฿)
        </button>
      </div>
    </div>
  );
}