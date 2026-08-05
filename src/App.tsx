import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import FeaturedGames from "./components/home/FeaturedGames";
import CartDrawer from "./components/layout/CartDrawer";
import WishlistDrawer from "./components/wishlist/WishlistDrawer";
import GameModal from "./components/home/GameModal";
import CheckoutModal from "./components/cart/CheckoutModal";
import UserLibrary from "./components/library/UserLibrary";
import CommunityHub from "./components/community/CommunityHub";
import Toast from "./components/ui/Toast";
import Footer from "./components/layout/Footer";
import { GAMES_DATA } from "./data/games";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { LibraryProvider } from "./context/LibraryContext";
import { CommunityProvider } from "./context/CommunityContext";
import { ActiveTab } from "./types";
import { motion } from "motion/react";

function MainContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("store");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter games based on search query across title, category, tags, and developer
  const filteredGames = GAMES_DATA.filter((game) => {
    const query = searchQuery.toLowerCase();
    return (
      game.title.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query) ||
      game.developer.toLowerCase().includes(query) ||
      game.tags.some((tag) => tag.toLowerCase().includes(query))
    );
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
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Switching */}
      <main>
        {activeTab === "store" && (
          <>
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
          </>
        )}

        {activeTab === "library" && <UserLibrary />}

        {activeTab === "community" && <CommunityHub />}
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <GameModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <LibraryProvider>
          <CommunityProvider>
            <MainContent />
          </CommunityProvider>
        </LibraryProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
