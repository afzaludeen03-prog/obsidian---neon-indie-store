import { motion } from "motion/react";
import { Gamepad2, ShoppingBag, Search, User, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-white/10 flex items-center justify-between px-8 transition-all duration-300">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-tr from-neon-violet to-neon-cyan rounded-sm shadow-neon-violet"></div>
          <span className="font-display font-black text-xl tracking-tighter uppercase italic flex items-center">
            OBSIDIAN
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#" className="text-white hover:text-white transition-colors">Store</a>
          <a href="#" className="hover:text-white transition-colors">Library</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <a href="#" className="hover:text-white transition-colors">Developers</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 flex items-center justify-center bg-zinc-800 border border-white/10 rounded-full hover:bg-zinc-700 transition-colors">
          <Search className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-zinc-800 border border-white/10 rounded-full hover:bg-zinc-700 transition-colors relative">
          <ShoppingBag className="w-4 h-4 text-zinc-400" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-neon-cyan rounded-full border-2 border-black"></span>
        </button>
        <div className="hidden sm:block w-[1px] h-6 bg-white/10 mx-2"></div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-white/20 hover:scale-105 transition-transform cursor-pointer hidden sm:block"></div>
        <button className="md:hidden p-2 text-zinc-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
