import { Gamepad2, Twitter, Github, Globe, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-12 lg:px-24 py-16 bg-obsidian border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-violet/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-neon-cyan p-1.5 rounded-lg">
              <Gamepad2 className="w-5 h-5 text-obsidian" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase italic">
              Obsidian<span className="text-neon-cyan">Neon</span>
            </span>
          </div>
          <p className="text-sm text-white/40 mb-8 leading-relaxed">
            The premium boutique storefront for the next generation of independent gaming excellence. Curated by creators, for players.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-neon-cyan">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-neon-cyan">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-neon-cyan">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-neon-cyan">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Browse Store</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Latest Releases</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Special Offers</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Account Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Newsletter</h4>
          <p className="text-sm text-white/40 mb-4">Get the latest on indie drops and exclusive drops.</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neon-cyan/50 w-full"
            />
            <button className="bg-neon-cyan text-obsidian px-4 py-2 rounded-lg font-bold text-sm tracking-tight active:scale-95 transition-transform">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-white/20">
        <p>© 2026 OBSIDIAN NEON DIGITAL LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
