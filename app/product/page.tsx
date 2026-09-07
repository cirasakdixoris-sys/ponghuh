'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Heart, MessageCircle, ShieldCheck, UserCheck } from 'lucide-react';

export default function ProductDetailPage() {
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
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80"
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-6 bg-slate-50 dark:bg-slate-950 -mt-6 rounded-t-3xl relative z-0">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium">
              หนังสือ/ชีท
            </span>
            <span className="text-xs text-slate-400">ลงเมื่อ 2 ชม. ที่แล้ว</span>
          </div>
          <h1 className="text-xl font-bold mb-2">หนังสือ Calculus 1 สภาพ 95% ไม่มีรอยปากกา</h1>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">150 ฿</div>
        </div>

        {/* Seller Profile Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Seller" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1">
                นายสมชาย สายเรียน <UserCheck size={14} className="text-blue-500" />
              </div>
              <div className="text-xs text-slate-400">คณะวิศวกรรมศาสตร์ • ชั้นปีที่ 2</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm">รายละเอียดสินค้า</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            หนังสือแคลคูลัส 1 สภาพดีมาก นัดรับได้ที่ใต้ตึกเรียนวิศวะ หรือตึก 3 วิทยาลัย 
            มีสรุปสูตรแถมให้ท้ายเล่มครับ สนใจทักแชตสอบถามก่อนได้เลย!
          </p>
        </div>

        {/* Security Tag */}
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/50 flex items-center gap-2.5 text-xs text-green-700 dark:text-green-300">
          <ShieldCheck size={18} className="shrink-0" />
          <span>นัดรับสินค้าและตรวจสอบสภาพก่อนชำระเงินทุกครั้ง</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex gap-3">
        <button className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          <MessageCircle size={18} /> ทักแชตผู้ขาย
        </button>
      </div>
    </div>
  );
}