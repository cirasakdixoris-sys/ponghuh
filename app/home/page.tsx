"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Bell,
  Sun,
  Moon,
  SlidersHorizontal,
  Trash2,
  Plus,
  Minus,
  Heart,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  X,
  ImageIcon,
  QrCode,
  CreditCard,
  Banknote,
} from "lucide-react";

type ProductItem = {
  id: string;
  title: string;
  price: number;
  department: string;
  timeAgo: string;
  tag: string;
  category: string;
  has3D: boolean;
  image: string;
  badge?: string;
  badgeColor?: string;
};

const PRODUCTS: ProductItem[] = [];

const CATEGORIES = [
  "ทั้งหมด",
  "กาแฟ",
  "ชาและนม",
  "อิตาเลียนโซดา",
  "สมูทตี้และผลไม้",
  "เบเกอรี่และของทานเล่น",
];

export default function HomePage() {
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false); // ตั้งเป็น false เพื่อให้แสดงธีมครีมสดใสเป็นค่าเริ่มต้น
  const [showCart, setShowCart] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: ProductItem) => {
      const matchCategory =
        category === "ทั้งหมด" || product.category === category;

      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const cartItems = PRODUCTS.filter((product: ProductItem) => cart[product.id]);

  const total = cartItems.reduce(
    (sum: number, product: ProductItem) => sum + product.price * cart[product.id],
    0
  );

  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setShowCart(true);
  };

  const decreaseCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };

      if (!next[id]) return next;

      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id]--;
      }

      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // โทนสีพื้นหลังหลัก (Light: สีครีมอุ่นนวล | Dark: สีน้ำตาลกาแฟเข้ม)
  const bg = darkMode
    ? "bg-[#1A1614] text-[#F3EBE1]"
    : "bg-[#FAF7F2] text-[#4A3E3D]";

  return (
    <main className={`min-h-screen ${bg} transition-colors duration-300 font-sans`}>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 border-b ${
          darkMode
            ? "bg-[#1A1614]/95 border-[#2D2421]"
            : "bg-[#FAF7F2]/95 border-[#E8DFC8]"
        } backdrop-blur`}
      >
        <div className="max-w-[1600px] mx-auto px-5 py-4">
          <div className="flex items-center gap-5">
            {/* LOGO */}
            <Link
              href="/home"
              className="flex items-center gap-3 min-w-[230px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border-2 border-amber-600 flex items-center justify-center text-2xl shadow-sm">
                🥤
              </div>

              <div>
                <h1 className="text-xl font-bold text-amber-800 dark:text-amber-500">
                  Aum Shop 🥤
                </h1>
                <p className="text-xs text-amber-700/60 dark:text-amber-200/50">
                  เครื่องดื่มและเบเกอรี่อร่อยๆ ❤️
                </p>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="flex-1 relative max-w-3xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700/50 dark:text-amber-200/50"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาเมนูเครื่องดื่มสุดโปรด..."
                className={`w-full rounded-full py-3 pl-12 pr-5 outline-none border transition ${
                  darkMode
                    ? "bg-[#26201D] border-[#3D332E] text-white placeholder:text-amber-200/30 focus:border-amber-500"
                    : "bg-white border-[#E5DDC8] text-[#4A3E3D] placeholder:text-amber-900/40 focus:border-amber-600"
                }`}
              />
            </div>

            {/* FILTER */}
            <button
              className={`hidden lg:flex items-center gap-2 px-5 py-3 rounded-full border transition ${
                darkMode
                  ? "bg-[#26201D] border-[#3D332E] hover:border-amber-500"
                  : "bg-white border-[#E5DDC8] hover:border-amber-600"
              }`}
            >
              <SlidersHorizontal size={18} />
              ตัวกรอง
            </button>

            {/* ACTIONS */}
            <button className="relative p-3 rounded-full hover:bg-amber-500/10 transition">
              <Bell size={22} />
              <span className="absolute -right-0.5 -top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                0
              </span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full hover:bg-amber-500/10 transition"
            >
              {darkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} className="text-amber-800" />}
            </button>

            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-3 rounded-full hover:bg-amber-500/10 transition"
            >
              <ShoppingCart size={24} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY */}
      <div className="max-w-[1600px] mx-auto px-5 py-5">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition text-sm ${
                category === item
                  ? "bg-amber-700 text-white shadow-md dark:bg-amber-600"
                  : darkMode
                  ? "bg-[#26201D] border border-[#3D332E] hover:border-amber-500 text-amber-100/80"
                  : "bg-white border border-[#E5DDC8] hover:border-amber-600 text-[#5C4D4B]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1600px] mx-auto px-5 pb-8">
        <div
          className={`grid gap-6 ${
            showCart
              ? "grid-cols-1 xl:grid-cols-[1fr_380px]"
              : "grid-cols-1"
          }`}
        >
          {/* PRODUCTS */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProducts.map((product: ProductItem) => (
                <div
                  key={product.id}
                  className={`rounded-2xl overflow-hidden border p-4 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                    darkMode
                      ? "bg-[#231D1A] border-[#362C27] hover:border-amber-500/50"
                      : "bg-white border-[#EFE8D8] hover:border-amber-600/40"
                  }`}
                >
                  <div>
                    {/* PRODUCT IMAGE */}
                    <div className="w-full h-36 rounded-xl bg-amber-50/50 dark:bg-[#1A1614] border border-amber-100 dark:border-[#3D332E] mb-3 flex items-center justify-center relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={28} className="text-amber-800/30 dark:text-amber-200/20" />
                      )}

                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 text-white hover:text-red-500 transition backdrop-blur-sm">
                        <Heart size={15} />
                      </button>
                    </div>

                    <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                      {product.category}
                    </span>

                    <Link href={`/product?id=${product.id}`}>
                      <h2 className="font-semibold mt-1 text-sm leading-5 line-clamp-2 hover:text-amber-600">
                        {product.title}
                      </h2>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100 dark:border-[#362C27]">
                    <span className="text-base font-bold text-amber-800 dark:text-amber-400">
                      ฿{product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 rounded-full bg-amber-700 dark:bg-amber-600 text-white flex items-center justify-center hover:bg-amber-800 transition shadow-sm"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-amber-800/40 dark:text-amber-200/30">
                <ImageIcon size={50} className="mx-auto mb-4 opacity-40" />
                <p className="text-base font-medium">ยังไม่มีรายการเมนูในขณะนี้</p>
                <p className="text-xs mt-1">
                  เพิ่มรายการเมนูน้ำพร้อมรูปภาพของคุณได้ในอาร์เรย์ PRODUCTS ด้านบน
                </p>
              </div>
            )}

            {/* FEATURES */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-5 mt-8 pt-7 border-t ${
                darkMode ? "border-[#2D2421]" : "border-[#E8DFC8]"
              }`}
            >
              <Feature icon={<Truck />} title="จัดส่งไว" text="พร้อมเสิร์ฟถึงมือ" />
              <Feature icon={<ShieldCheck />} title="สดใหม่ทุกแก้ว" text="วัตถุดิบพรีเมียม" />
              <Feature icon={<Headphones />} title="บริการดีเยี่ยม" text="เปิด 08:00 - 18:00" />
              <Feature icon={<Star />} title="การันตีความอร่อย" text="รีวิวแน่นจากลูกค้า" />
            </div>
          </section>

          {/* CART */}
          {showCart && (
            <aside
              className={`rounded-2xl border h-fit sticky top-24 shadow-sm ${
                darkMode
                  ? "bg-[#231D1A] border-[#362C27]"
                  : "bg-white border-[#EFE8D8]"
              }`}
            >
              <div className="flex items-center justify-between p-5 border-b border-amber-100 dark:border-[#362C27]">
                <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  รายการที่สั่ง ({cartCount})
                </h2>

                <button
                  onClick={() => setShowCart(false)}
                  className="text-amber-800/50 hover:text-amber-800 dark:text-amber-200/50 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 text-amber-800/40 dark:text-amber-200/30">
                    <ShoppingCart
                      size={45}
                      className="mx-auto mb-3 opacity-40"
                    />
                    <p className="text-sm">ยังไม่มีเมนูในตะกร้า</p>
                  </div>
                ) : (
                  cartItems.map((product: ProductItem) => (
                    <div
                      key={product.id}
                      className="flex gap-3 pb-4 border-b border-amber-100 dark:border-[#362C27] items-center"
                    >
                      <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-[#1A1614] border border-amber-100 dark:border-[#3D332E] flex items-center justify-center shrink-0 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-amber-800/30 dark:text-amber-200/20" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {product.title}
                        </h3>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decreaseCart(product.id)}
                              className="w-5 h-5 rounded bg-amber-100 dark:bg-[#362C27] text-amber-800 dark:text-amber-200 flex items-center justify-center hover:bg-amber-200"
                            >
                              <Minus size={10} />
                            </button>

                            <span className="text-xs font-semibold">
                              {cart[product.id]}
                            </span>

                            <button
                              onClick={() => addToCart(product.id)}
                              className="w-5 h-5 rounded bg-amber-100 dark:bg-[#362C27] text-amber-800 dark:text-amber-200 flex items-center justify-center hover:bg-amber-200"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <span className="font-bold text-amber-800 dark:text-amber-400 text-sm">
                            ฿
                            {(
                              product.price * cart[product.id]
                            ).toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[11px] text-red-500/80 mt-1 flex items-center gap-1 hover:text-red-600"
                        >
                          <Trash2 size={11} />
                          ลบรายการ
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* PAYMENT METHOD SELECTION */}
                <div className="pt-3 border-t border-amber-100 dark:border-[#362C27]">
                  <p className="text-xs font-bold text-amber-900/80 dark:text-amber-200/80 mb-2">
                    เลือกช่องทางชำระเงิน
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("qr")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium ${
                        paymentMethod === "qr"
                          ? "border-amber-700 bg-amber-700/10 text-amber-800 dark:text-amber-400 dark:border-amber-500"
                          : "border-amber-100 dark:border-[#362C27] bg-amber-50/50 dark:bg-[#1A1614] text-amber-900/60 dark:text-amber-200/50"
                      }`}
                    >
                      <QrCode size={18} className="mb-1" />
                      PromptPay
                    </button>

                    <button
                      onClick={() => setPaymentMethod("transfer")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium ${
                        paymentMethod === "transfer"
                          ? "border-amber-700 bg-amber-700/10 text-amber-800 dark:text-amber-400 dark:border-amber-500"
                          : "border-amber-100 dark:border-[#362C27] bg-amber-50/50 dark:bg-[#1A1614] text-amber-900/60 dark:text-amber-200/50"
                      }`}
                    >
                      <CreditCard size={18} className="mb-1" />
                      โอนเงิน
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium ${
                        paymentMethod === "cash"
                          ? "border-amber-700 bg-amber-700/10 text-amber-800 dark:text-amber-400 dark:border-amber-500"
                          : "border-amber-100 dark:border-[#362C27] bg-amber-50/50 dark:bg-[#1A1614] text-amber-900/60 dark:text-amber-200/50"
                      }`}
                    >
                      <Banknote size={18} className="mb-1" />
                      เงินสด
                    </button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="pt-2">
                  <div className="flex justify-between text-base font-bold text-amber-900 dark:text-amber-100">
                    <span>ยอดชำระทั้งหมด</span>
                    <span className="text-amber-700 dark:text-amber-400 text-lg">
                      ฿{total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    disabled={cartItems.length === 0}
                    className="w-full mt-4 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 disabled:bg-amber-100 dark:disabled:bg-[#2D2421] disabled:text-amber-800/30 text-white font-bold py-3 rounded-xl transition shadow-md"
                  >
                    ยืนยันการสั่งซื้อ
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-amber-700 dark:text-amber-400">{icon}</div>

      <div>
        <p className="font-semibold text-sm text-amber-900 dark:text-amber-200">{title}</p>
        <p className="text-xs text-amber-800/60 dark:text-amber-200/50">{text}</p>
      </div>
    </div>
  );
}