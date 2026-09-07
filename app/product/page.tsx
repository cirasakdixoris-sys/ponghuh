'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Heart, ShoppingBag, Clock, MapPin, QrCode, Banknote, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [cookingType, setCookingType] = useState('ทอดกรอบ');
  const [sauceLevel, setSauceLevel] = useState('เผ็ดปานกลาง');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'cash'>('promptpay');
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pricePerUnit = 50;
  const totalPrice = pricePerUnit * quantity;

  const handleOrder = () => {
    setIsSuccess(true);
  };

  const resetOrder = () => {
    setShowCheckoutModal(false);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen pb-28 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 relative">
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
          <div className="flex justify-between items-center">
            <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
              {pricePerUnit} ฿
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-lg font-bold text-slate-500 hover:text-orange-500"
              >
                -
              </button>
              <span className="text-sm font-bold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg font-bold text-slate-500 hover:text-orange-500"
              >
                +
              </button>
            </div>
          </div>
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

        {/* Payment Method Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            วิธีการชำระเงิน
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPaymentMethod('promptpay')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                paymentMethod === 'promptpay'
                  ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <QrCode size={18} />
              <span>สแกน QR พร้อมเพย์</span>
            </button>
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                paymentMethod === 'cash'
                  ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Banknote size={18} />
              <span>เงินสด (ชำระเมื่อรับของ)</span>
            </button>
          </div>
        </div>

        {/* Location Delivery Note */}
        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center gap-2.5 text-xs text-orange-700 dark:text-orange-300">
          <MapPin size={18} className="shrink-0" />
          <span>นัดรับได้ที่หน้าตึก 3, ตึกเรียนรวม หรือซุ้มม้านั่งใต้อาคาร</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setShowCheckoutModal(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:opacity-95 active:scale-95 transition-all"
        >
          <ShoppingBag size={18} /> สั่งซื้อเลย ({totalPrice} ฿)
        </button>
      </div>

      {/* Modal ชำระเงิน/ยืนยันคำสั่งซื้อ */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={resetOrder}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>

            {!isSuccess ? (
              <>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold">ยืนยันการสั่งซื้อ</h3>
                  <p className="text-xs text-slate-400">ตรวจสอบรายละเอียดก่อนชำระเงิน</p>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">เมนู:</span>
                    <span className="font-semibold">ชุดรวมมิตรทอดกรอบ x{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">การปรุง/น้ำจิ้ม:</span>
                    <span className="font-semibold">{cookingType} / {sauceLevel}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 text-sm font-bold">
                    <span>ยอดชำระทั้งหมด:</span>
                    <span className="text-orange-500">{totalPrice} ฿</span>
                  </div>
                </div>

                {/* แสดง QR Code PromptPay ถ้าเลือกสแกนจ่าย */}
                {paymentMethod === 'promptpay' ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-500">สแกนจ่ายผ่าน PromptPay</span>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PROMPTPAY-PAYMENT-${totalPrice}`}
                      alt="PromptPay QR Code"
                      className="w-40 h-40 rounded-lg shadow-sm"
                    />
                    <span className="text-[10px] text-slate-400">ชื่อบัญชี: ร้านลูกชิ้นวิทยาลัย</span>
                  </div>
                ) : (
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl text-center text-xs text-orange-600 dark:text-orange-400 font-medium">
                    💵 เตรียมเงินสดจำนวน <span className="font-bold text-sm">{totalPrice} ฿</span> ไว้ชำระเมื่อรับสินค้า
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                >
                  {paymentMethod === 'promptpay' ? 'แจ้งชำระเงินแล้ว' : 'ยืนยันการสั่งซื้อ'}
                </button>
              </>
            ) : (
              /* หน้าจอสั่งซื้อสำเร็จ */
              <div className="text-center py-6 space-y-4">
                <CheckCircle size={60} className="text-green-500 mx-auto animate-bounce" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">สั่งซื้อสำเร็จแล้ว!</h3>
                  <p className="text-xs text-slate-400">
                    ร้านค้ากำลังเตรียมลูกชิ้นร้อนๆ ให้คุณ <br />
                    นัดรับสินค้าได้ที่จุดนัดพบในอีก 10 นาที
                  </p>
                </div>
                <button
                  onClick={resetOrder}
                  className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:opacity-90"
                >
                  ปิดหน้านี้
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}