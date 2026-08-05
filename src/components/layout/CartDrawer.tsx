import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { useCartContext } from "../../context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    openCheckout,
  } = useCartContext();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.game.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0f] border-l border-[#1e1e2e] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#1e1e2e] flex items-center justify-between bg-[#12121c]/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#a855f7]/20 rounded-lg text-[#a855f7] border border-[#a855f7]/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-display font-black tracking-tight text-white uppercase italic">
                  Your Vault <span className="text-[#00f3ff]">({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-[#12121c] text-zinc-600 rounded-full flex items-center justify-center mb-4 border border-[#1e1e2e]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-wide">
                    Your vault is empty
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-xs mb-6">
                    Browse the indie showcase and add games to your vault to get started.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-[#a855f7] text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-neon-purple"
                  >
                    Explore Games
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.game.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-xl bg-[#12121c] border border-[#1e1e2e] flex items-center gap-4 hover:border-[#a855f7]/40 transition-colors"
                  >
                    <img
                      src={item.game.image}
                      alt={item.game.title}
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-white text-sm truncate uppercase tracking-tight">
                        {item.game.title}
                      </h4>
                      <p className="text-xs text-[#00f3ff] font-mono font-semibold mt-0.5">
                        ${item.game.price.toFixed(2)}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.game.id, -1)}
                          className="w-6 h-6 rounded bg-[#1e1e2e] hover:bg-[#a855f7]/30 text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.game.id, 1)}
                          className="w-6 h-6 rounded bg-[#1e1e2e] hover:bg-[#a855f7]/30 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.game.id)}
                      className="p-2 text-zinc-500 hover:text-[#ff007f] hover:bg-[#ff007f]/10 rounded-lg transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Trigger */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#1e1e2e] bg-[#12121c]/80 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Est. Taxes (8%)</span>
                    <span className="font-mono text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="font-mono text-[#00f3ff] text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={openCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-neon-purple"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
