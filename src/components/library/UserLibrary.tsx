import { useState } from "react";
import { motion } from "motion/react";
import { Play, Download, Gamepad2, Search, Sparkles } from "lucide-react";
import { useLibraryContext } from "../../context/LibraryContext";

export default function UserLibrary() {
  const { libraryGames, launchGame } = useLibraryContext();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredLibrary = libraryGames.filter((game) =>
    game.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="pt-32 pb-24 px-6 lg:px-16 min-h-screen bg-[#0a0a0f] relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6 border-b border-[#1e1e2e] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#00f3ff] mb-2">
              <Gamepad2 className="w-4 h-4" /> Personal Vault
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase italic text-white">
              My <span className="text-[#00f3ff] glow-text-cyan">Library</span>
            </h1>
          </div>

          {/* Library Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search library..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#12121c] border border-[#1e1e2e] text-xs text-white placeholder-zinc-500 pl-9 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#00f3ff]"
            />
          </div>
        </div>

        {/* Empty Library State */}
        {libraryGames.length === 0 ? (
          <div className="py-20 text-center bg-[#12121c] border border-[#1e1e2e] rounded-3xl p-12 max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-[#00f3ff]/10 text-[#00f3ff] rounded-full flex items-center justify-center mx-auto border border-[#00f3ff]/30 shadow-neon-cyan">
              <Gamepad2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tight mb-2">
                No Games Owned Yet
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
                Explore the indie store, complete checkout, and your games will immediately appear here ready to play.
              </p>
            </div>
            <a
              href="#featured"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all shadow-neon-purple"
            >
              Browse Store Showcase
            </a>
          </div>
        ) : filteredLibrary.length === 0 ? (
          <div className="py-16 text-center bg-[#12121c] border border-[#1e1e2e] rounded-2xl">
            <p className="text-zinc-400 text-sm">No purchased games found matching "{filterQuery}".</p>
          </div>
        ) : (
          /* Purchased Games Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLibrary.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121c] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#00f3ff] text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-neon-cyan">
                    Installed
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tight mb-1">
                      {game.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{game.developer} • {game.category}</p>
                  </div>

                  {/* Actions: Launch & Download */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1e1e2e]">
                    <button
                      onClick={() => launchGame(game)}
                      className="py-3 bg-[#00f3ff] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-neon-cyan"
                    >
                      <Play className="w-4 h-4 fill-black" /> Launch
                    </button>
                    <button
                      onClick={() => launchGame(game)}
                      className="py-3 bg-[#1e1e2e] text-zinc-300 hover:text-white border border-white/10 hover:border-[#00f3ff]/40 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Client
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
