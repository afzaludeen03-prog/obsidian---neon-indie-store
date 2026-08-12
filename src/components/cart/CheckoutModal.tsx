import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, CreditCard, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import { useLibraryContext } from "../../context/LibraryContext";
import { formatINR } from "../../utils/formatCurrency";
import { audioManager } from "../../utils/audio";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cartItems,
    clearCart,
    discountPercent,
    applyPromoCode,
    promoError,
    promoCode,
  } = useCartContext();

  const { addGamesToLibrary } = useLibraryContext();

  const [inputCode, setInputCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "vault">("card");
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Lock background body scrolling when checkout modal is active
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.game.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
    }
  };

  const handleCompleteOrder = () => {
    audioManager.playFanfare();
    const generatedId = `OBS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Automatically add purchased games to user's permanent Library
    const purchasedGames = cartItems.map((item) => item.game);
    addGamesToLibrary(purchasedGames);

    setIsCompleted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsCompleted(false);
    closeCheckout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-safe pb-safe overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#0a0a0f] border border-[#00f3ff]/40 rounded-3xl p-6 sm:p-8 shadow-neon-cyan z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={closeCheckout}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2.5 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/5 transition-colors flex items-center justify-center"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>

          {isCompleted ? (
            /* Order Success Screen */
            <div className="text-center py-8 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-[#00f3ff]/20 text-[#00f3ff] rounded-full flex items-center justify-center mx-auto border-2 border-[#00f3ff] shadow-neon-cyan"
              >
                <CheckCircle className="w-10 h-10" />
              </motion.div>

              <div>
                <span className="px-3 py-1 bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Transaction Confirmed
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white italic uppercase tracking-tight mt-3">
                  Welcome to the Syndicate
                </h2>
                <p className="text-zinc-400 text-sm mt-2">
                  Order ID: <span className="font-mono text-[#00f3ff] font-bold">{orderId}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121c] border border-[#1e1e2e] text-left space-y-2 max-w-md mx-auto text-xs text-zinc-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Items Added to Library:</span>
                  <span className="font-bold text-white">{cartItems.length} games</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-white">
                  <span>Total Charged:</span>
                  <span className="text-[#00f3ff] font-mono text-sm">{formatINR(total)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full max-w-md py-4 min-h-[44px] bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all shadow-neon-purple mx-auto flex items-center justify-center"
              >
                Go to My Library
              </button>
            </div>
          ) : (
            /* Checkout Summary & Payment */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#00f3ff] uppercase tracking-widest mb-1">
                  <ShieldCheck className="w-4 h-4" /> Secure Obsidian Vault Checkout
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white italic uppercase">
                  Order Summary
                </h2>
              </div>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.game.id}
                    className="flex justify-between items-center p-3 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.game.image}
                        alt={item.game.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-white uppercase">{item.game.title}</div>
                        <div className="text-zinc-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-mono text-[#00f3ff] font-bold">
                      {formatINR(item.game.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Promo / Creator Code (Try <span className="text-[#00f3ff]">NEON20</span>)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 min-h-[44px] text-xs text-white uppercase focus:outline-none focus:border-[#00f3ff]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 min-h-[44px] bg-[#1e1e2e] text-[#00f3ff] hover:bg-[#00f3ff]/20 border border-[#00f3ff]/40 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
                  >
                    Apply
                  </button>
                </div>
                {promoCode && (
                  <p className="text-[11px] text-green-400 font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Promo {promoCode} applied ({discountPercent}% OFF)
                  </p>
                )}
                {promoError && <p className="text-[11px] text-[#ff007f] font-mono">{promoError}</p>}
              </form>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 min-h-[44px] rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === "card"
                        ? "bg-[#a855f7]/20 border-[#a855f7] text-white shadow-neon-purple"
                        : "bg-[#12121c] border-[#1e1e2e] text-zinc-400"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card / UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("crypto")}
                    className={`p-3 min-h-[44px] rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === "crypto"
                        ? "bg-[#00f3ff]/20 border-[#00f3ff] text-white shadow-neon-cyan"
                        : "bg-[#12121c] border-[#1e1e2e] text-zinc-400"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Web3 / Crypto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("vault")}
                    className={`p-3 min-h-[44px] rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === "vault"
                        ? "bg-[#ff007f]/20 border-[#ff007f] text-white shadow-hot-pink"
                        : "bg-[#12121c] border-[#1e1e2e] text-zinc-400"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Vault Credits</span>
                  </button>
                </div>
              </div>

              {/* Calculation Totals */}
              <div className="p-4 rounded-2xl bg-[#12121c] border border-[#1e1e2e] space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Est. Taxes (8%)</span>
                  <span className="font-mono text-white">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span className="uppercase">Final Amount</span>
                  <span className="font-mono text-[#00f3ff] text-base">{formatINR(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="w-full py-4 min-h-[44px] bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-neon-purple"
              >
                Pay {formatINR(total)} & Claim Games
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
