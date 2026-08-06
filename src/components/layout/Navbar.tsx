import { ShoppingBag, Search, Menu, X, Heart, Rocket, Volume2, VolumeX, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { useLibraryContext } from "../../context/LibraryContext";
import { useStoreContext } from "../../context/StoreContext";
import { useAuthContext } from "../../context/AuthContext";
import { ActiveTab } from "../../types";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { audioManager } from "../../utils/audio";

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { cartItems, setIsCartOpen } = useCartContext();
  const { wishlist, setIsWishlistOpen } = useWishlistContext();
  const { library } = useLibraryContext();
  const { setIsDevPortalOpen } = useStoreContext();
  const { user, gamerTag, setIsAuthModalOpen, signOut } = useAuthContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => audioManager.getMutedStatus());

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleAudio = () => {
    const nextState = audioManager.toggleMute();
    setIsMuted(nextState);
    if (!nextState) audioManager.playSuccessChime();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-20 glass border-b border-[#1e1e2e] flex items-center justify-between px-6 lg:px-16 transition-all duration-300">
      {/* Left: Brand Logo & Nav Links */}
      <div className="flex items-center gap-10">
        <button
          onClick={() => {
            audioManager.playHoverTick();
            onSelectTab("store");
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-[#a855f7] to-[#00f3ff] rounded-lg shadow-neon-purple group-hover:scale-110 transition-transform flex items-center justify-center font-black text-black text-xs">
            O
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase italic text-white group-hover:text-[#a855f7] transition-colors glow-text-purple">
            OBSIDIAN
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          <button
            onClick={() => {
              audioManager.playHoverTick();
              onSelectTab("store");
            }}
            onMouseEnter={() => audioManager.playHoverTick()}
            className={`transition-colors ${
              activeTab === "store" ? "text-[#00f3ff] glow-text-cyan" : "text-zinc-400 hover:text-white"
            }`}
          >
            Store
          </button>
          <button
            onClick={() => {
              audioManager.playHoverTick();
              onSelectTab("library");
            }}
            onMouseEnter={() => audioManager.playHoverTick()}
            className={`flex items-center gap-1.5 transition-colors ${
              activeTab === "library" ? "text-[#00f3ff] glow-text-cyan" : "text-zinc-400 hover:text-white"
            }`}
          >
            Library
            {library.length > 0 && (
              <span className="px-1.5 py-0.2 bg-[#00f3ff]/20 text-[#00f3ff] text-[10px] rounded-md font-mono border border-[#00f3ff]/40">
                {library.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              audioManager.playHoverTick();
              onSelectTab("community");
            }}
            onMouseEnter={() => audioManager.playHoverTick()}
            className={`transition-colors ${
              activeTab === "community" ? "text-[#a855f7] glow-text-purple" : "text-zinc-400 hover:text-white"
            }`}
          >
            Community
          </button>
        </div>
      </div>

      {/* Right: Search Bar & Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden sm:block w-36 md:w-52">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (activeTab !== "store") onSelectTab("store");
            }}
            className="w-full bg-[#12121c] border border-[#1e1e2e] text-xs text-white placeholder-zinc-500 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#00f3ff] focus:shadow-neon-cyan transition-all"
          />
        </div>

        {/* Audio Mute SFX Toggle */}
        <button
          onClick={handleToggleAudio}
          className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-300 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 transition-all shrink-0"
          title={isMuted ? "Unmute UI SFX" : "Mute UI SFX"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#ff007f]" /> : <Volume2 className="w-4 h-4 text-[#00f3ff]" />}
        </button>

        {/* Theme Glow Switcher */}
        <ThemeSwitcher />

        {/* Dev Portal Trigger Button */}
        <button
          onClick={() => {
            audioManager.playHoverTick();
            setIsDevPortalOpen(true);
          }}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-[#a855f7]/20 border border-[#a855f7]/40 text-[#a855f7] rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#a855f7]/30 transition-all shrink-0"
        >
          <Rocket className="w-3.5 h-3.5" /> Dev Portal
        </button>

        {/* Auth Profile / Sign In Button */}
        {user ? (
          <div className="flex items-center gap-2 bg-[#12121c] border border-[#1e1e2e] px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-[#00f3ff] flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-[#a855f7]" /> {gamerTag}
            </span>
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-[#ff007f] p-1 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              audioManager.playHoverTick();
              setIsAuthModalOpen(true);
            }}
            className="px-3 py-2 bg-[#00f3ff]/20 border border-[#00f3ff]/40 text-[#00f3ff] rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#00f3ff]/30 transition-all shrink-0 flex items-center gap-1.5 shadow-neon-cyan"
          >
            <UserIcon className="w-3.5 h-3.5" /> Sign In
          </button>
        )}

        {/* Wishlist Heart Icon Button */}
        <button
          onClick={() => {
            audioManager.playHoverTick();
            setIsWishlistOpen(true);
          }}
          className="relative p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl hover:border-[#ff007f] hover:shadow-hot-pink transition-all group shrink-0"
          aria-label="View Wishlist"
        >
          <Heart className="w-4.5 h-4.5 text-zinc-300 group-hover:text-[#ff007f] transition-colors" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#ff007f] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#0a0a0f] shadow-hot-pink">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart Icon Button */}
        <button
          onClick={() => {
            audioManager.playHoverTick();
            setIsCartOpen(true);
          }}
          className="relative p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl hover:border-[#a855f7] hover:shadow-neon-purple transition-all group shrink-0"
          aria-label="View Vault Cart"
        >
          <ShoppingBag className="w-4.5 h-4.5 text-zinc-300 group-hover:text-[#00f3ff] transition-colors" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#a855f7] to-[#ff007f] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#0a0a0f] shadow-hot-pink animate-pulse">
              {totalCartCount}
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
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (activeTab !== "store") onSelectTab("store");
            }}
            className="w-full bg-[#12121c] border border-[#1e1e2e] text-xs text-white p-3 rounded-xl focus:outline-none focus:border-[#00f3ff]"
          />
          <button
            onClick={() => {
              onSelectTab("store");
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Store
          </button>
          <button
            onClick={() => {
              onSelectTab("library");
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#00f3ff]"
          >
            Library ({library.length})
          </button>
          <button
            onClick={() => {
              onSelectTab("community");
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#a855f7]"
          >
            Community
          </button>
          {!user ? (
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-bold uppercase tracking-wider text-[#00f3ff]"
            >
              Sign In / Register
            </button>
          ) : (
            <button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-bold uppercase tracking-wider text-[#ff007f]"
            >
              Sign Out ({gamerTag})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
