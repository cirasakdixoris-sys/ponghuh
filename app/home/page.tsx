'use client';

import Link from 'next/link';
import { Search, Bell, Plus, Flame, Sparkles } from 'lucide-react';

const CATEGORIES = ['ทั้งหมด', 'ลูกชิ้นทอด', 'ลูกชิ้นปิ้ง', 'ไส้กรอก', 'ชุดรวมฮิต', 'เครื่องดื่ม'];

const PRODUCTS = [
  {
    id: 1,
    title: 'ลูกชิ้นเนื้อแท้ไร้แป้ง (ไม้ละ 10.-)',
    price: '10 ฿',
    category: 'ลูกชิ้นปิ้ง',
    seller: 'ร้านพี่หมู หน้าตึก 3',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80',
  },
  {
    id: 2,
    title: 'ชุดรวมมิตรทอดกรอบ + น้ำจิ้มสูตรเด็ด',
    price: '50 ฿',
    category: 'ชุดรวมฮิต',
    seller: 'ร้านพี่หมู หน้าตึก 3',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-4 space-y-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs text-slate-500 dark:text-slate-400">หิวหรือยัง 👋</h2>
            <h1 className="text-lg font-bold">ร้านลูกชิ้นวิทยาลัย</h1>
          </div>
          <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาลูกชิ้น, ไส้กรอก, น้ำจิ้ม..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-900 border-none text-sm focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-slate-400"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                idx === 0
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              <Flame size={16} className="text-orange-500" /> เมนูขายดี
            </h3>
            <span className="text-xs text-orange-600 dark:text-orange-400 cursor-pointer">ดูทั้งหมด</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((item) => (
              <Link
                key={item.id}
                href="/product"
                className="group bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold line-clamp-2 mb-1">{item.title}</h4>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <Sparkles size={12} /> {item.seller}
                  </div>
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {item.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all">
        <Plus size={24} />
      </button>
    </div>
  );
}