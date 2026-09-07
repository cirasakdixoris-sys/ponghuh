'use client';

import Link from 'next/link';
import { Search, Bell, Plus, Tag, Flame } from 'lucide-react';

const CATEGORIES = ['ทั้งหมด', 'หนังสือ/ชีท', 'อุปกรณ์ไฟฟ้า', 'เสื้อผ้า', 'ของใช้หอพัก', 'อื่นๆ'];

const PRODUCTS = [
  {
    id: 1,
    title: 'หนังสือ Calculus 1 สภาพ 95%',
    price: '150 ฿',
    category: 'หนังสือ/ชีท',
    seller: 'ตึก 3 ชั้น 2',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
  },
  {
    id: 2,
    title: 'พัดลมตั้งโต๊ะ Hatari 16 นิ้ว',
    price: '300 ฿',
    category: 'ของใช้หอพัก',
    seller: 'หอพักหญิง B',
    image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=400&q=80',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-4 space-y-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs text-slate-500 dark:text-slate-400">สวัสดี 👋</h2>
            <h1 className="text-lg font-bold">ตลาดวิทยาลัย</h1>
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
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-900 border-none text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Categories Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                idx === 0
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
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
              <Flame size={16} className="text-orange-500" /> สินค้ามาใหม่
            </h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer">ดูทั้งหมด</span>
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
                    <Tag size={12} /> {item.seller}
                  </div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {item.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button (Post Product) */}
      <button className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all">
        <Plus size={24} />
      </button>
    </div>
  );
}