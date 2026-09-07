"use client";

import { useMemo, useState, ChangeEvent } from "react";
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
  Star,
  X,
  ImageIcon,
  QrCode,
  CreditCard,
  Banknote,
  Flame,
  Upload,
  CheckCircle2,
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

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    title: "ลูกชิ้นเนื้อแท้ไร้แป้ง (ไม้ละ 10.-)",
    price: 10,
    department: "แผนกอาหาร",
    timeAgo: "10 นาทีที่แล้ว",
    tag: "ขายดี",
    category: "ลูกชิ้นปิ้ง",
    has3D: false,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80",
    badge: "ขายดี",
    badgeColor: "bg-red-500",
  },
  {
    id: "2",
    title: "ชุดรวมมิตรทอดกรอบ + น้ำจิ้มสูตรเด็ด",
    price: 50,
    department: "แผนกอาหาร",
    timeAgo: "5 นาทีที่แล้ว",
    tag: "แนะนำ",
    category: "ชุดรวมฮิต",
    has3D: false,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80",
    badge: "ชุดสุดคุ้ม",
    badgeColor: "bg-orange-500",
  },
  {
    id: "3",
    title: "ไส้กรอกแดงในตำนานทอดกรอบ",
    price: 20,
    department: "แผนกอาหาร",
    timeAgo: "15 นาทีที่แล้ว",
    tag: "ยอดฮิต",
    category: "ไส้กรอก",
    has3D: false,
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=500&q=80",
    badge: "กรอบฟู",
    badgeColor: "bg-amber-500",
  },
  {
    id: "4",
    title: "ลูกชิ้นเอ็นหมูปิ้ง น้ำจิ้มพริกเผา",
    price: 12,
    department: "แผนกอาหาร",
    timeAgo: "20 นาทีที่แล้ว",
    tag: "ใหม่",
    category: "ลูกชิ้นปิ้ง",
    has3D: false,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80",
  },
  {
    id: "5",
    title: "ชาดำเย็นหวานน้อย แก้วใหญ่",
    price: 25,
    department: "แผนกเครื่องดื่ม",
    timeAgo: "30 นาทีที่แล้ว",
    tag: "เครื่องดื่ม",
    category: "เครื่องดื่ม",
    has3D: false,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
  },
  {
    id: "6",
    title: "โค้กเย็นๆ (กระป๋อง)",
    price: 18,
    department: "แผนกเครื่องดื่ม",
    timeAgo: "เมื่อสักครู่",
    tag: "เครื่องดื่ม",
    category: "เครื่องดื่ม",
    has3D: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80",
    badge: "ดับกระหาย",
    badgeColor: "bg-red-600",
  },
];

const CATEGORIES = [
  "ทั้งหมด",
  "ลูกชิ้นปิ้ง",
  "ชุดรวมฮิต",
  "ไส้กรอก",
  "เครื่องดื่ม",
];

export default function HomePage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [cart, setCart] = useState<Record<string, number>>({});

  // State สำหรับ Modal เพิ่มสินค้า
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("ลูกชิ้นปิ้ง");
  const [newImage, setNewImage] = useState<string>("");

  // State สำหรับ Modal สแกน QR Code
  const [showQrModal, setShowQrModal] = useState(false);
  const [slipUploaded, setSlipUploaded] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      alert("กรุณากรอกชื่อสินค้าและราคาให้ครบถ้วน");
      return;
    }

    const newItem: ProductItem = {
      id: Date.now().toString(),
      title: newTitle,
      price: Number(newPrice),
      department: "แผนกอาหาร",
      timeAgo: "เมื่อสักครู่",
      tag: "ใหม่",
      category: newCategory,
      has3D: false,
      image: newImage,
      badge: "สินค้าใหม่",
      badgeColor: "bg-blue-500",
    };

    setProducts((prev) => [newItem, ...prev]);
    setShowAddModal(false);

    setNewTitle("");
    setNewPrice("");
    setNewImage("");
    setNewCategory("ลูกชิ้นปิ้ง");
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`คุณต้องการลบรายการ "${title}" ออกจากร้านใช่หรือไม่?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product: ProductItem) => {
      const matchCategory =
        category === "ทั้งหมด" || product.category === category;

      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search, products]);

  const cartItems = products.filter((product: ProductItem) => cart[product.id]);

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

  // จัดการการกดยืนยันการสั่งซื้อ
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (paymentMethod === "qr") {
      setSlipUploaded(false);
      setShowQrModal(true);
    } else {
      const paymentNames: Record<string, string> = {
        transfer: "โอนผ่านบัญชีธนาคาร",
        cash: "เงินสด (ชำระปลายทาง)",
      };
      alert(`สั่งซื้อเรียบร้อยแล้ว!\nชำระด้วย: ${paymentNames[paymentMethod]}\nยอดรวม: ฿${total}`);
      setCart({});
    }
  };

  // เมื่อผู้ใช้กดยืนยันการชำระเงินในหน้า QR Code
  const handleConfirmQrPayment = () => {
    alert("รับยอดชำระเรียบร้อยแล้ว! ร้านค้ากำลังเตรียมออเดอร์ให้ครับ 🍢");
    setShowQrModal(false);
    setCart({});
  };

  const bg = darkMode
    ? "bg-[#1A1614] text-[#F3EBE1]"
    : "bg-[#FAF7F2] text-[#4A3E3D]";

  return (
    <main className={`min-h-screen ${bg} transition-colors duration-300 font-sans`}>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 border-b ${
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
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border-2 border-orange-600 flex items-center justify-center text-2xl shadow-sm">
                🍢
              </div>

              <div>
                <h1 className="text-xl font-bold text-orange-800 dark:text-orange-500">
                  ponghuh 🍢
                </h1>
                <p className="text-xs text-orange-700/60 dark:text-orange-200/50">
                  ร้านลูกชิ้น ทอดร้อนๆ น้ำจิ้มเด็ด ❤️
                </p>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="flex-1 relative max-w-3xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-700/50 dark:text-orange-200/50"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาลูกชิ้น, ไส้กรอก, น้ำจิ้ม..."
                className={`w-full rounded-full py-3 pl-12 pr-5 outline-none border transition ${
                  darkMode
                    ? "bg-[#26201D] border-[#3D332E] text-white placeholder:text-orange-200/30 focus:border-orange-500"
                    : "bg-white border-[#E5DDC8] text-[#4A3E3D] placeholder:text-orange-900/40 focus:border-orange-600"
                }`}
              />
            </div>

            {/* ADD PRODUCT BUTTON */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700 transition cursor-pointer shadow-sm text-sm"
            >
              <Plus size={18} />
              เพิ่มสินค้า
            </button>

            {/* FILTER */}
            <button
              type="button"
              className={`hidden lg:flex items-center gap-2 px-5 py-3 rounded-full border transition cursor-pointer ${
                darkMode
                  ? "bg-[#26201D] border-[#3D332E] hover:border-orange-500"
                  : "bg-white border-[#E5DDC8] hover:border-orange-600"
              }`}
            >
              <SlidersHorizontal size={18} />
              ตัวกรอง
            </button>

            {/* ACTIONS */}
            <button type="button" className="relative p-3 rounded-full hover:bg-orange-500/10 transition cursor-pointer">
              <Bell size={22} />
              <span className="absolute -right-0.5 -top-0.5 w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                0
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full hover:bg-orange-500/10 transition cursor-pointer"
            >
              {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-orange-800" />}
            </button>

            <button
              type="button"
              onClick={() => setShowCart(!showCart)}
              className="relative p-3 rounded-full hover:bg-orange-500/10 transition cursor-pointer"
            >
              <ShoppingCart size={24} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center">
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
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition text-sm cursor-pointer ${
                category === item
                  ? "bg-orange-600 text-white shadow-md dark:bg-orange-600"
                  : darkMode
                  ? "bg-[#26201D] border border-[#3D332E] hover:border-orange-500 text-orange-100/80"
                  : "bg-white border border-[#E5DDC8] hover:border-orange-600 text-[#5C4D4B]"
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
                      ? "bg-[#231D1A] border-[#362C27] hover:border-orange-500/50"
                      : "bg-white border-[#EFE8D8] hover:border-orange-600/40"
                  }`}
                >
                  <div>
                    {/* PRODUCT IMAGE & ACTION BUTTONS */}
                    <div className="w-full h-36 rounded-xl bg-orange-50/50 dark:bg-[#1A1614] border border-orange-100 dark:border-[#3D332E] mb-3 flex items-center justify-center relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={28} className="text-orange-800/30 dark:text-orange-200/20" />
                      )}

                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          title="ลบรายการนี้"
                          className="p-1.5 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition backdrop-blur-sm cursor-pointer shadow-sm"
                        >
                          <Trash2 size={13} />
                        </button>

                        <button
                          type="button"
                          className="p-1.5 rounded-full bg-black/20 text-white hover:text-red-500 transition backdrop-blur-sm cursor-pointer"
                        >
                          <Heart size={14} />
                        </button>
                      </div>
                    </div>

                    <span className="text-xs text-orange-700 dark:text-orange-400 font-semibold">
                      {product.category}
                    </span>

                    <Link href={`/product?id=${product.id}`}>
                      <h2 className="font-semibold mt-1 text-sm leading-5 line-clamp-2 hover:text-orange-600">
                        {product.title}
                      </h2>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-orange-100 dark:border-[#362C27]">
                    <span className="text-base font-bold text-orange-800 dark:text-orange-400">
                      ฿{product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition shadow-sm cursor-pointer active:scale-95"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-orange-800/40 dark:text-orange-200/30">
                <ImageIcon size={50} className="mx-auto mb-4 opacity-40" />
                <p className="text-base font-medium">ไม่พบเมนูที่คุณค้นหา</p>
              </div>
            )}

            {/* FEATURES */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-5 mt-8 pt-7 border-t ${
                darkMode ? "border-[#2D2421]" : "border-[#E8DFC8]"
              }`}
            >
              <Feature icon={<Truck />} title="จัดส่งไวถึงตึก" text="ส่งตรงใต้ตึกและหอพัก" />
              <Feature icon={<Flame />} title="ทอดปิ้งร้อนๆ" text="สดใหม่ทำคำต่อคำ" />
              <Feature icon={<ShieldCheck />} title="น้ำจิ้มสูตรเด็ด" text="รสชาติเข้มข้นจัดจ้าน" />
              <Feature icon={<Star />} title="ขวัญใจเด็กหอ" text="อร่อยคุ้มค่า ราคานักศึกษา" />
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
              <div className="flex items-center justify-between p-5 border-b border-orange-100 dark:border-[#362C27]">
                <h2 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                  รายการที่สั่ง ({cartCount})
                </h2>

                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="text-orange-800/50 hover:text-orange-800 dark:text-orange-200/50 dark:hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 text-orange-800/40 dark:text-orange-200/30">
                    <ShoppingCart
                      size={45}
                      className="mx-auto mb-3 opacity-40"
                    />
                    <p className="text-sm">ยังไม่มีรายการลูกชิ้นในตะกร้า</p>
                  </div>
                ) : (
                  cartItems.map((product: ProductItem) => (
                    <div
                      key={product.id}
                      className="flex gap-3 pb-4 border-b border-orange-100 dark:border-[#362C27] items-center"
                    >
                      <div className="w-14 h-14 rounded-xl bg-orange-50 dark:bg-[#1A1614] border border-orange-100 dark:border-[#3D332E] flex items-center justify-center shrink-0 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-orange-800/30 dark:text-orange-200/20" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {product.title}
                        </h3>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decreaseCart(product.id)}
                              className="w-5 h-5 rounded bg-orange-100 dark:bg-[#362C27] text-orange-800 dark:text-orange-200 flex items-center justify-center hover:bg-orange-200 cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>

                            <span className="text-xs font-semibold">
                              {cart[product.id]}
                            </span>

                            <button
                              type="button"
                              onClick={() => addToCart(product.id)}
                              className="w-5 h-5 rounded bg-orange-100 dark:bg-[#362C27] text-orange-800 dark:text-orange-200 flex items-center justify-center hover:bg-orange-200 cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <span className="font-bold text-orange-800 dark:text-orange-400 text-sm">
                            ฿
                            {(
                              product.price * cart[product.id]
                            ).toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-[11px] text-red-500/80 mt-1 flex items-center gap-1 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 size={11} />
                          ลบรายการ
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* PAYMENT METHOD SELECTION */}
                <div className="pt-3 border-t border-orange-100 dark:border-[#362C27]">
                  <p className="text-xs font-bold text-orange-900/80 dark:text-orange-200/80 mb-2">
                    เลือกช่องทางชำระเงิน
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("qr")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium cursor-pointer ${
                        paymentMethod === "qr"
                          ? "border-orange-600 bg-orange-600/10 text-orange-800 dark:text-orange-400 dark:border-orange-500"
                          : "border-orange-100 dark:border-[#362C27] bg-orange-50/50 dark:bg-[#1A1614] text-orange-900/60 dark:text-orange-200/50"
                      }`}
                    >
                      <QrCode size={18} className="mb-1" />
                      PromptPay
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "border-orange-600 bg-orange-600/10 text-orange-800 dark:text-orange-400 dark:border-orange-500"
                          : "border-orange-100 dark:border-[#362C27] bg-orange-50/50 dark:bg-[#1A1614] text-orange-900/60 dark:text-orange-200/50"
                      }`}
                    >
                      <CreditCard size={18} className="mb-1" />
                      โอนเงิน
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition text-xs font-medium cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-orange-600 bg-orange-600/10 text-orange-800 dark:text-orange-400 dark:border-orange-500"
                          : "border-orange-100 dark:border-[#362C27] bg-orange-50/50 dark:bg-[#1A1614] text-orange-900/60 dark:text-orange-200/50"
                      }`}
                    >
                      <Banknote size={18} className="mb-1" />
                      เงินสด
                    </button>
                  </div>
                </div>

                {/* TOTAL & SUBMIT */}
                <div className="pt-2">
                  <div className="flex justify-between text-base font-bold text-orange-900 dark:text-orange-100">
                    <span>ยอดชำระทั้งหมด</span>
                    <span className="text-orange-700 dark:text-orange-400 text-lg">
                      ฿{total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] cursor-pointer disabled:bg-orange-100 dark:disabled:bg-[#2D2421] disabled:text-orange-800/30 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center"
                  >
                    ยืนยันการสั่งซื้อ
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* MODAL: เพิ่มสินค้าใหม่ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${
              darkMode
                ? "bg-[#231D1A] border-[#362C27] text-white"
                : "bg-white border-[#EFE8D8] text-[#4A3E3D]"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-orange-100 dark:border-[#362C27]">
              <h3 className="text-lg font-bold">เพิ่มรายการสินค้าใหม่</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-orange-500/10 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  รูปภาพสินค้า
                </label>
                <div className="relative w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden border-orange-300 dark:border-[#3D332E] bg-orange-50/50 dark:bg-[#1A1614] hover:border-orange-500 transition">
                  {newImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={newImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewImage("")}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4 text-center">
                      <Upload size={28} className="text-orange-500 mb-2" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-300">
                        คลิกเพื่อเลือก/อัปโหลดรูปภาพ
                      </span>
                      <span className="text-[10px] text-orange-700/50 dark:text-orange-200/40 mt-1">
                        รองรับ PNG, JPG, WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  ชื่อสินค้า / เมนู
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ไส้กรอกไก่ชีสทะลัก"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-sm outline-none transition ${
                    darkMode
                      ? "bg-[#1A1614] border-[#3D332E] focus:border-orange-500"
                      : "bg-white border-[#E5DDC8] focus:border-orange-600"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="15"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none transition ${
                      darkMode
                        ? "bg-[#1A1614] border-[#3D332E] focus:border-orange-500"
                        : "bg-white border-[#E5DDC8] focus:border-orange-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm outline-none transition ${
                      darkMode
                        ? "bg-[#1A1614] border-[#3D332E] focus:border-orange-500 text-white"
                        : "bg-white border-[#E5DDC8] focus:border-orange-600"
                    }`}
                  >
                    {CATEGORIES.filter((c) => c !== "ทั้งหมด").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-orange-200 dark:border-[#3D332E] text-xs font-semibold hover:bg-orange-500/10 transition cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition cursor-pointer shadow-md"
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QR CODE SCAN PAYMENT */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border text-center relative ${
              darkMode
                ? "bg-[#231D1A] border-[#362C27] text-white"
                : "bg-white border-[#EFE8D8] text-[#4A3E3D]"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-orange-500/10 transition text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold text-xs rounded-full mb-2">
                พร้อมเพย์ (PromptPay)
              </span>
              <h3 className="text-xl font-extrabold text-orange-900 dark:text-orange-400">
                สแกนเพื่อชำระเงิน
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                เปิดแอปธนาคารของคุณเพื่อสแกน QR Code
              </p>
            </div>

            {/* Price Highlight */}
            <div className="my-4 py-3 bg-orange-50 dark:bg-[#1A1614] rounded-2xl border border-orange-100 dark:border-[#3D332E]">
              <span className="text-xs text-orange-800/60 dark:text-orange-200/50 block">ยอดชำระสุทธิ</span>
              <span className="text-3xl font-black text-orange-600 dark:text-orange-400">
                ฿{total.toLocaleString()}
              </span>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl border-2 border-orange-200 inline-block shadow-inner relative group my-1">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=PROMPTPAY-PONGHUH-${total}`}
                alt="PromptPay QR Code"
                className="w-48 h-48 mx-auto object-contain"
              />
              <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-blue-900">
                <span>Prompt</span>
                <span className="text-sky-500">Pay</span>
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>ชื่อบัญชี: <span className="font-semibold text-gray-800 dark:text-gray-200">ร้าน ponghuh 🍢</span></p>
              <p className="text-[11px]">หมายเลข: 08X-XXX-XXXX</p>
            </div>

            {/* Slip Upload simulation */}
            <div className="mt-4 pt-4 border-t border-orange-100 dark:border-[#362C27]">
              {slipUploaded ? (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-xs font-semibold py-2">
                  <CheckCircle2 size={16} />
                  แนบหลักฐานเรียบร้อยแล้ว
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSlipUploaded(true)}
                  className="w-full py-2 px-3 border border-dashed border-orange-300 dark:border-[#3D332E] rounded-xl text-xs text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-[#1A1614] transition flex items-center justify-center gap-2 cursor-pointer mb-2"
                >
                  <Upload size={14} />
                  แนบสลิปการโอนเงิน (จำลอง)
                </button>
              )}

              <button
                type="button"
                onClick={handleConfirmQrPayment}
                className="w-full mt-2 py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl text-sm transition shadow-md cursor-pointer"
              >
                โอนเงินเรียบร้อยแล้ว
              </button>
            </div>
          </div>
        </div>
      )}
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
      <div className="text-orange-600 dark:text-orange-400">{icon}</div>

      <div>
        <p className="font-semibold text-sm text-orange-900 dark:text-orange-200">{title}</p>
        <p className="text-xs text-orange-800/60 dark:text-orange-200/50">{text}</p>
      </div>
    </div>
  );
}