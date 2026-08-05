/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import BentoGrid from "./components/home/BentoGrid";
import Footer from "./components/layout/Footer";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-white selection:bg-neon-cyan/30 overflow-x-hidden">
      {/* Dynamic Background Grain/Texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      
      {/* Ambient Moving Glows */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-5%] w-[400px] h-[400px] bg-neon-violet/10 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      
      <motion.div 
        animate={{ 
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Separator Section */}
        <div className="relative z-10 px-12 lg:px-24 py-8 flex items-center justify-between border-y border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-12 opacity-20 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-500 overflow-hidden whitespace-nowrap text-[10px] font-black tracking-[0.3em] uppercase italic">
            <span>Unity Engine</span>
            <span>Unreal Engine 5.4</span>
            <span>Ray-Tracing Ultra</span>
            <span>Metahuman Ready</span>
            <span>Spatial Audio</span>
            <span>Obsidian Deck Verified</span>
          </div>
        </div>

        <BentoGrid />

        {/* Call to Action Section */}
        <section className="px-12 lg:px-24 py-32 relative overflow-hidden bg-obsidian">
          <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-between gap-12 border border-white/10 bg-[#121214] p-12 rounded-[32px] overflow-hidden group shadow-neon-violet">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter uppercase italic text-zinc-100">JOIN THE <span className="text-neon-violet">SYNDICATE</span></h2>
              <p className="text-zinc-500 text-lg mb-0 max-w-xl leading-relaxed">
                Exclusive early access, developer journals, and obsidian-tier rewards for the most dedicated players.
              </p>
            </div>
            <button className="px-10 py-5 bg-neon-violet text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 shrink-0">
              CONNECT NOW
            </button>
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-neon-violet/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

