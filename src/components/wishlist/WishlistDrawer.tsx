import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, Heart } from "lucide-react";
import { useWishlistContext } from "../../context/WishlistContext";

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, moveToVault } =
    useWishlistContext();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
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
                <div className="p-2 bg-[#ff007f]/20 rounded-lg text-[#ff007f] border border-[#ff007f]/30">
                  <Heart className="w-5 h-5 fill-[#ff007f]" />
                </div>
                <h2 className="text-lg font-display font-black tracking-tight text-white uppercase italic">
                  Saved Wishlist <span className="text-[#ff007f]">({wishlist.length})</span>
                </h2>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-[#12121c] text-zinc-600 rounded-full flex items-center justify-center mb-4 border border-[#1e1e2e]">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-wide">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-xs mb-6">
                    Click the neon heart icon on any indie game to save it for later.
                  </p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-6 py-3 bg-[#a855f7] text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-neon-purple"
                  >
                    Browse Showcase
                  </button>
                </div>
              ) : (
                wishlist.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-xl bg-[#12121c] border border-[#1e1e2e] flex items-center gap-4 hover:border-[#ff007f]/40 transition-colors"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-white text-sm truncate uppercase tracking-tight">
                        {game.title}
                      </h4>
                      <p className="text-xs text-[#00f3ff] font-mono font-semibold mt-0.5">
                        ${game.price.toFixed(2)}
                      </p>

                      <button
                        onClick={() => moveToVault(game)}
                        className="mt-2 px-3 py-1.5 bg-[#a855f7] text-white rounded-lg font-bold text-[10px] uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5 shadow-neon-purple"
                      >
                        <ShoppingBag className="w-3 h-3" /> Move to Vault
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(game.id)}
                      className="p-2 text-zinc-500 hover:text-[#ff007f] hover:bg-[#ff007f]/10 rounded-lg transition-colors shrink-0"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
