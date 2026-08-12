import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, ShoppingBag, Calendar, User, Cpu, HardDrive, Check, Sparkles } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import { formatINR } from "../../utils/formatCurrency";

export default function GameModal() {
  const { selectedGameModal, closeGameModal, addToCart, cartItems } = useCartContext();
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");

  // Lock background body scrolling when game detail modal is active
  useEffect(() => {
    if (selectedGameModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedGameModal]);

  if (!selectedGameModal) return null;

  const game = selectedGameModal;
  const isInCart = cartItems.some((item) => item.game.id === game.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-safe pb-safe overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGameModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0a0a0f] border border-[#a855f7]/40 rounded-3xl overflow-hidden shadow-neon-purple z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={closeGameModal}
            className="absolute top-5 right-5 z-30 w-11 h-11 min-w-[44px] min-h-[44px] bg-black/60 backdrop-blur-md text-zinc-400 hover:text-white rounded-full border border-white/10 hover:border-white/30 transition-all flex items-center justify-center"
            aria-label="Close Game Details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Hero Header */}
          <div className="relative h-72 sm:h-80 overflow-hidden">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/40 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {game.category}
                  </span>
                  {game.discount && (
                    <span className="px-2.5 py-0.5 bg-[#ff007f] text-white text-[10px] font-black uppercase tracking-wider rounded-md">
                      {game.discount}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase italic tracking-tighter glow-text-purple">
                  {game.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <User className="w-3.5 h-3.5 text-[#00f3ff]" />
                    {game.developer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
                    {game.releaseDate}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    {game.rating}
                  </span>
                </div>
              </div>

              {/* Price & Action CTA */}
              <div className="flex items-center gap-4 bg-[#12121c]/90 border border-[#1e1e2e] p-3 rounded-2xl backdrop-blur-md shrink-0">
                <div>
                  {game.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through block font-mono">
                      {formatINR(game.originalPrice)}
                    </span>
                  )}
                  <span className="text-xl font-mono font-bold text-[#00f3ff]">
                    {formatINR(game.price)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(game)}
                  className={`px-6 py-3.5 min-h-[44px] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isInCart
                      ? "bg-[#1e1e2e] text-[#00f3ff] border border-[#00f3ff]/50 shadow-neon-cyan"
                      : "bg-[#a855f7] text-white hover:bg-[#a855f7]/90 shadow-neon-purple active:scale-95"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4" /> In Vault
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Vault
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#1e1e2e] px-6 bg-[#12121c]/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 min-h-[44px] text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center shrink-0 ${
                activeTab === "overview"
                  ? "border-[#00f3ff] text-[#00f3ff]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`py-4 px-6 min-h-[44px] text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center shrink-0 ${
                activeTab === "specs"
                  ? "border-[#00f3ff] text-[#00f3ff]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              System Specs
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-6 min-h-[44px] text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center shrink-0 ${
                activeTab === "reviews"
                  ? "border-[#00f3ff] text-[#00f3ff]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Reviews ({game.reviews.length})
            </button>
          </div>

          {/* Tab Body Content */}
          <div className="p-6 max-h-[400px] overflow-y-auto space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00f3ff] mb-2">
                    About The Game
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-3">
                    Tags & Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#1e1e2e] text-zinc-300 text-xs font-semibold rounded-lg border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screenshots Gallery */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff007f]" />
                    Visual Showcase
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {game.screenshots.map((shot, idx) => (
                      <img
                        key={idx}
                        src={shot}
                        alt={`Screenshot ${idx + 1}`}
                        className="rounded-xl border border-[#1e1e2e] object-cover h-40 w-full hover:scale-[1.02] transition-transform"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum Specs */}
                <div className="p-5 rounded-2xl bg-[#12121c] border border-[#1e1e2e]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00f3ff]" />
                    Minimum Requirements
                  </h4>
                  <ul className="space-y-3 text-xs text-zinc-300">
                    <li><strong className="text-zinc-500">OS:</strong> {game.systemRequirements.minimum.os}</li>
                    <li><strong className="text-zinc-500">Processor:</strong> {game.systemRequirements.minimum.cpu}</li>
                    <li><strong className="text-zinc-500">Memory:</strong> {game.systemRequirements.minimum.ram}</li>
                    <li><strong className="text-zinc-500">Graphics:</strong> {game.systemRequirements.minimum.gpu}</li>
                    <li><strong className="text-zinc-500">Storage:</strong> {game.systemRequirements.minimum.storage}</li>
                  </ul>
                </div>

                {/* Recommended Specs */}
                <div className="p-5 rounded-2xl bg-[#12121c] border border-[#a855f7]/40 shadow-neon-purple">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-4 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-[#a855f7]" />
                    Recommended Requirements
                  </h4>
                  <ul className="space-y-3 text-xs text-zinc-300">
                    <li><strong className="text-zinc-500">OS:</strong> {game.systemRequirements.recommended.os}</li>
                    <li><strong className="text-zinc-500">Processor:</strong> {game.systemRequirements.recommended.cpu}</li>
                    <li><strong className="text-zinc-500">Memory:</strong> {game.systemRequirements.recommended.ram}</li>
                    <li><strong className="text-zinc-500">Graphics:</strong> {game.systemRequirements.recommended.gpu}</li>
                    <li><strong className="text-zinc-500">Storage:</strong> {game.systemRequirements.recommended.storage}</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {game.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-xl bg-[#12121c] border border-[#1e1e2e]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white text-xs">{review.user}</span>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 mb-2 leading-relaxed">"{review.comment}"</p>
                    <span className="text-[10px] text-zinc-500 font-mono">{review.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
