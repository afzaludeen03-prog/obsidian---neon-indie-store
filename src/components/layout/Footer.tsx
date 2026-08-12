import React, { useState } from "react";
import { Gamepad2, Twitter, Github, Globe, Youtube, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer id="community" className="px-6 lg:px-16 py-16 bg-[#0a0a0f] border-t border-[#1e1e2e] relative z-10 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a855f7]/5 blur-[140px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#a855f7] to-[#00f3ff] rounded-lg flex items-center justify-center text-black font-black text-xs shadow-neon-purple">
              O
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase italic text-white glow-text-purple">
              OBSIDIAN <span className="text-[#00f3ff]">NEON</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            The premier boutique marketplace for independent game creators and passionate players worldwide. Curated for excellence.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-400 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-400 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-400 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-400 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
            Platform
          </h4>
          <ul className="space-y-3 text-xs text-zinc-400">
            <li>
              <a href="#featured" className="hover:text-[#00f3ff] transition-colors">
                Browse Store
              </a>
            </li>
            <li>
              <a href="#featured" className="hover:text-[#00f3ff] transition-colors">
                Latest Drops
              </a>
            </li>
            <li>
              <a href="#featured" className="hover:text-[#00f3ff] transition-colors">
                Special Discounts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00f3ff] transition-colors">
                Developer Syndicate
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
            Support & Legal
          </h4>
          <ul className="space-y-3 text-xs text-zinc-400">
            <li>
              <a href="#" className="hover:text-[#00f3ff] transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00f3ff] transition-colors">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00f3ff] transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00f3ff] transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup with Neon Outline */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Syndicate Newsletter
          </h4>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Get instant early access to indie drops and secret rewards.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f3ff] focus:shadow-neon-cyan transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-[#a855f7] text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-[#a855f7]/80 hover:shadow-neon-purple active:scale-95 transition-all flex items-center justify-center shrink-0"
            >
              {subscribed ? <Check className="w-4 h-4 text-green-400" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

          {subscribed && (
            <p className="text-[11px] text-[#00f3ff] mt-2 font-mono">
              ✓ Subscribed to Obsidian Syndicate drops!
            </p>
          )}
        </div>
      </div>

      {/* Copyright Footer Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#1e1e2e] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
        <p>© 2026 OBSIDIAN NEON DIGITAL LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
