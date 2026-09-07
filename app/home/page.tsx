'use client';

import Link from 'next/link';
import { Search, Bell, Plus, Flame, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['ทั้งหมด', 'ลูกชิ้นทอด', 'ลูกชิ้นปิ้ง', 'ไส้กรอก', 'ชุดรวมฮิต', 'เครื่องดื่ม'];

const PRODUCTS = [
  {
    id: 1,
    title: 'ลูกชิ้นเนื้อแท้ไร้แป้ง (ไม้ละ 10.-)',
    price: 10,
    category: 'ลูกชิ้นปิ้ง',
    seller: 'ร้านพี่หมู หน้าตึก 3',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80',
  },
  {
    id: 2,
    title: 'ชุดรวมมิตรทอดกรอบ + น้ำจิ้มสูตรเด็ด',
    price: 50,
    category: 'ชุดรวมฮิต',
    seller: 'ร้านพี่หมู หน้าตึก 3',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
  },
  {
    id: 3,
    title: 'ไส้กรอกแดงในตำนานทอดกรอบ',
    price: 20,
    category: 'ไส้กรอก',
    seller: 'ซุ้มข้างลานกิจกรรม',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=400&q=80',
  },
  {
    id: 4,
    title: 'ลูกชิ้นเอ็นหมูปิ้ง น้ำจิ้มพริกเผา',
    price: 12,
    category: 'ลูกชิ้นปิ้ง',
    seller: 'ร้านพี่หมู หน้าตึก 3',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
  },
  {
    id: 5,
    title: 'ชาดำเย็นหวานน้อย แก้วใหญ่',
    price: 25,
    category: 'เครื่องดื่ม',
    seller: 'ร้านน้ำป้าจอย',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80',
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [cart, setCart] = useState<{ id: number; price: number }[]>([]);
  const [addedAnimation, setAddedAnimation] = useState<number | null>(null);

  // กรองสินค้าตามหมวดหมู่ที่เลือก
  const filteredProducts = selectedCategory === 'ทั้งหมด'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === selectedCategory);

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = (e: React.MouseEvent, product: { id: number; price: number }) => {
    e.preventDefault(); // ป้องกันการเปลี่ยนหน้าไปยังรายละเอียดสินค้าเมื่อกดปุ่มบวก
    setCart((prev) => [...prev, product]);
    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen pb-28 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 relative">
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
        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
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
              <Flame size={16} className="text-orange-500" /> {selectedCategory} ({filteredProducts.length})
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between relative"
              >
                <Link href="/product" className="block">
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
                </Link>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between mt-1">
                  <div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Sparkles size={10} /> {item.seller}
                    </div>
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                      {item.price} ฿
                    </div>
                  </div>

                  {/* ปุ่มกดเพิ่มลงตะกร้า */}
                  <button
                    onClick={(e) => addToCart(e, item)}
                    className={`p-2 rounded-xl transition-all active:scale-90 ${
                      addedAnimation === item.id
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600'
                    }`}
                    aria-label="Add to Cart"
                  >
                    {addedAnimation === item.id ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Sticky Bar (แสดงขึ้นมาเมื่อมีสินค้าในตะกร้า) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-20">
          <Link
            href="/product"
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-between shadow-xl shadow-orange-500/30 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={22} />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-orange-600 rounded-full text-xs font-extrabold flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              </div>
              <span className="text-sm">ตะกร้าของคุณ</span>
            </div>
            <div className="text-sm font-extrabold">{totalPrice} ฿ →</div>
          </Link>
        </div>
      )}
    </div>
  );
}