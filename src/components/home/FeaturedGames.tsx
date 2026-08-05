import { motion } from "motion/react";
import { ShoppingBag, Star, Tag, Check, Eye } from "lucide-react";
import { Game } from "../../types";
import { useCartContext } from "../../context/CartContext";

interface FeaturedGamesProps {
  games: Game[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = ["All", "Cyberpunk", "Action", "RPG", "Rhythm", "Stealth"];

export default function FeaturedGames({
  games,
  selectedCategory,
  onSelectCategory,
}: FeaturedGamesProps) {
  const { cartItems, addToCart, openGameModal } = useCartContext();

  const filteredGames = games.filter((game) => {
    if (selectedCategory === "All") return true;
    return (
      game.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase())
    );
  });

  return (
    <section id="featured" className="py-24 px-6 lg:px-16 bg-[#0a0a0f] relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#00f3ff] mb-3">
              <Tag className="w-4 h-4" />
              Curated Showcase
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase italic text-white">
              Trending <span className="text-[#a855f7] glow-text-purple">Indie Titles</span>
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div id="categories" className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? "bg-[#a855f7] text-white shadow-neon-purple"
                    : "bg-[#12121c] text-zinc-400 border border-[#1e1e2e] hover:border-[#a855f7]/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive 3-Column Grid */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-20 bg-[#12121c] border border-[#1e1e2e] rounded-3xl">
            <p className="text-zinc-400 text-base">No indie titles found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, index) => {
              const isInCart = cartItems.some((item) => item.game.id === game.id);

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Header & Artwork */}
                  <div
                    onClick={() => openGameModal(game)}
                    className="relative h-56 overflow-hidden"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121c] via-transparent to-transparent" />

                    {/* Quick View Hover Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="px-4 py-2 bg-black/80 text-[#00f3ff] border border-[#00f3ff]/50 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-neon-cyan">
                        <Eye className="w-4 h-4" /> View Details
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {game.discount && (
                      <span className="absolute top-4 left-4 bg-[#ff007f] text-white text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-hot-pink z-10">
                        {game.discount}
                      </span>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-[#0a0a0f]/80 backdrop-blur-md text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10 z-10">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{game.rating}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div onClick={() => openGameModal(game)}>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {game.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#1e1e2e] text-[#00f3ff] text-[10px] font-semibold uppercase tracking-wider rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-display font-black text-white group-hover:text-[#a855f7] transition-colors uppercase italic tracking-tight mb-1">
                        {game.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    {/* Footer: Price & Add to Cart */}
                    <div className="pt-4 border-t border-[#1e1e2e] flex items-center justify-between">
                      <div>
                        {game.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through block font-mono">
                            ${game.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-lg font-mono font-bold text-[#00f3ff]">
                          ${game.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(game);
                        }}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                          isInCart
                            ? "bg-[#1e1e2e] text-[#00f3ff] border border-[#00f3ff]/40 shadow-neon-cyan"
                            : "bg-[#a855f7] text-white hover:bg-[#a855f7]/80 hover:shadow-neon-purple"
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-4 h-4" /> In Vault
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Add to Vault
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
