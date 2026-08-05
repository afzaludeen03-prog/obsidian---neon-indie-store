import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Play, Info } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end justify-start pb-24 px-12 lg:px-24">
      {/* Background Image Container */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
          alt="Featured Game"
          className="w-full h-[120%] object-cover scale-110"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 max-w-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-neon-violet/20 text-neon-violet border border-neon-violet/30 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">New Release</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-black leading-none mb-6 tracking-tighter uppercase italic">
          NEON <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">SYNDICATE</span>
        </h1>
        
        <p className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed">
          Experience the hyper-visceral cyberpunk combat simulator that redefined the indie landscape. Now with Ray-Tracing.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-10 py-4 rounded-lg font-black text-sm uppercase tracking-tight hover:bg-neon-cyan transition-colors duration-300">
            Purchase Now — $24.99
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-tight hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
            + Wishlist
          </button>
        </div>
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
