import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import FeaturedGames from "./components/home/FeaturedGames";
import CartDrawer from "./components/layout/CartDrawer";
import Footer from "./components/layout/Footer";
import { GAMES_DATA } from "./data/games";
import { CartItem, Game } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart Functions
  const handleAddToCart = (game: Game) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.game.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { game, quantity: 1 }];
    });

    setToastMessage(`Added "${game.title}" to your vault`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQuantity = (gameId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.game.id === gameId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (gameId: string) => {
    setCartItems((prev) => prev.filter((item) => item.game.id !== gameId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartGameIds = cartItems.map((item) => item.game.id);

  // Filter games based on search query
  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white selection:bg-[#00f3ff]/30 selection:text-[#00f3ff] overflow-x-hidden font-sans">
      {/* Dynamic Background Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />

      {/* Ambient Moving Glow Spheres */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-5%] w-[450px] h-[450px] bg-[#a855f7]/10 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#00f3ff]/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Body */}
      <main>
        <Hero />

        {/* Separator Marquee Banner */}
        <div className="relative z-10 px-6 lg:px-16 py-6 border-y border-[#1e1e2e] bg-[#12121c]/60 backdrop-blur-md">
          <div className="flex items-center justify-around gap-8 text-[11px] font-black tracking-[0.25em] uppercase italic text-zinc-500 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="hover:text-[#00f3ff] transition-colors cursor-default">Unreal Engine 5.4</span>
            <span>•</span>
            <span className="hover:text-[#a855f7] transition-colors cursor-default">Ray-Tracing Ultra</span>
            <span>•</span>
            <span className="hover:text-[#ff007f] transition-colors cursor-default">Spatial Audio</span>
            <span>•</span>
            <span className="hover:text-[#00f3ff] transition-colors cursor-default">Obsidian Deck Verified</span>
            <span>•</span>
            <span className="hover:text-[#a855f7] transition-colors cursor-default">Metahuman Ready</span>
          </div>
        </div>

        {/* Featured / Trending Games Section */}
        <FeaturedGames
          games={filteredGames}
          cartGameIds={cartGameIds}
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Syndicate Call to Action Section */}
        <section className="px-6 lg:px-16 py-24 bg-[#0a0a0f] relative overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border border-[#1e1e2e] bg-[#12121c] p-10 md:p-14 rounded-3xl overflow-hidden group shadow-neon-purple">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-black mb-4 tracking-tighter uppercase italic text-white">
                JOIN THE <span className="text-[#a855f7] glow-text-purple">SYNDICATE</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Unlock exclusive early drops, developer access, and obsidian-tier rewards for the most dedicated indie gamers.
              </p>
            </div>
            <button className="px-8 py-4 bg-[#a855f7] text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shrink-0 shadow-neon-purple">
              Join Now — Free
            </button>
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[90px] pointer-events-none" />
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#12121c] border border-[#00f3ff]/40 text-white px-5 py-3.5 rounded-xl shadow-neon-cyan flex items-center gap-3 text-xs font-bold"
          >
            <div className="p-1 bg-[#00f3ff]/20 text-[#00f3ff] rounded-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
