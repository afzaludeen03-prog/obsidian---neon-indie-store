import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-20 glass border-b border-[#1e1e2e] flex items-center justify-between px-6 lg:px-16 transition-all duration-300">
      {/* Left: Brand Logo & Nav Links */}
      <div className="flex items-center gap-10">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#a855f7] to-[#00f3ff] rounded-lg shadow-neon-purple group-hover:scale-110 transition-transform flex items-center justify-center font-black text-black text-xs">
            O
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase italic text-white group-hover:text-[#a855f7] transition-colors glow-text-purple">
            OBSIDIAN
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#home" className="hover:text-[#00f3ff] transition-colors">
            Home
          </a>
          <a href="#featured" className="hover:text-[#00f3ff] transition-colors">
            Featured
          </a>
          <a href="#categories" className="hover:text-[#00f3ff] transition-colors">
            Categories
          </a>
          <a href="#community" className="hover:text-[#00f3ff] transition-colors">
            Community
          </a>
        </div>
      </div>

      {/* Right: Search Bar & Cart Button */}
      <div className="flex items-center gap-4">
        {/* Search Bar with glowing focus border */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search indie games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#12121c] border border-[#1e1e2e] text-xs text-white placeholder-zinc-500 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#00f3ff] focus:shadow-neon-cyan transition-all"
          />
        </div>

        {/* Cart Icon Button with Active Counter Badge */}
        <button
          onClick={onOpenCart}
          className="relative p-3 bg-[#12121c] border border-[#1e1e2e] rounded-xl hover:border-[#a855f7] hover:shadow-neon-purple transition-all group shrink-0"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 text-zinc-300 group-hover:text-[#00f3ff] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#a855f7] to-[#ff007f] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0f] shadow-hot-pink animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 bg-[#12121c] border border-[#1e1e2e] text-zinc-300 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#0a0a0f] border-b border-[#1e1e2e] p-6 flex flex-col gap-4 md:hidden z-50">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#12121c] border border-[#1e1e2e] text-xs text-white p-3 rounded-xl focus:outline-none focus:border-[#00f3ff]"
          />
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Home
          </a>
          <a
            href="#featured"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Featured
          </a>
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Categories
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Community
          </a>
        </div>
      )}
    </nav>
  );
}
