import GameCard from "./GameCard";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const GAMES = [
  {
    title: "Vortex Keeper",
    category: "Action Roguelike",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Echo Reality",
    category: "Narrative Puzzler",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Shards of Ember",
    category: "Soulslike",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1612170153139-65ba3179945e?q=80&w=2070&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Synth Runner",
    category: "Rhythm",
    price: "Free",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-2"
  },
  {
    title: "Ghost Protocol",
    category: "Stealth",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-1"
  }
];

export default function BentoGrid() {
  return (
    <section className="px-12 lg:px-24 py-24 bg-obsidian z-10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-sm font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Spotlight</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase italic">Curated <span className="text-white/20">Indie</span> Library</h3>
        </div>
        <button className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          Explore All Games
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[1000px] md:h-[600px]">
        {GAMES.map((game, index) => (
          <motion.div
            key={game.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={game.gridClass}
          >
            <GameCard {...game} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
