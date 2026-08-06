import { motion } from "motion/react";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import { formatINR } from "../../utils/formatCurrency";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full pt-28 pb-20 px-6 lg:px-16 flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background Hero Artwork */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
          alt="Featured Indie Showcase"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Badge Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12121c] border border-[#a855f7]/40 text-[#a855f7] text-xs font-bold uppercase tracking-widest mb-6 shadow-neon-purple"
        >
          <Sparkles className="w-4 h-4 text-[#00f3ff]" />
          <span>Premier Indie Showcase 2026</span>
        </motion.div>

        {/* Headline with Glowing Gradient Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black leading-none mb-8 tracking-tighter uppercase italic text-white"
        >
          Discover the Next Generation of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ff007f] glow-text-purple">
            Indie Gaming
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
        >
          A curated boutique marketplace connecting visionary independent developers with passionate players worldwide. Experience uncensored creative freedom.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="#featured"
            className="px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-neon-purple flex items-center gap-3"
          >
            Purchase Now — {formatINR(1899)}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#categories"
            className="px-8 py-4 bg-[#12121c] border border-[#a855f7]/50 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#a855f7]/10 hover:border-[#00f3ff] transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-[#ff007f]" />
            View Trending
          </a>
        </motion.div>
      </div>

      {/* Decorative Ambient Radial Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#a855f7]/10 blur-[140px] rounded-full pointer-events-none" />
    </section>
  );
}
