import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Rocket } from "lucide-react";
import { useStoreContext } from "../../context/StoreContext";
import { Game } from "../../types";

export default function DevDashboard() {
  const { isDevPortalOpen, setIsDevPortalOpen, addGameToStore } = useStoreContext();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cyberpunk");
  const [tagsInput, setTagsInput] = useState("Cyberpunk, Action, Ray-Tracing");
  const [price, setPrice] = useState("1499");
  const [discount, setDiscount] = useState("-20%");
  const [developer, setDeveloper] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [os, setOs] = useState("Windows 11 (64-bit)");
  const [gpu, setGpu] = useState("NVIDIA RTX 3060");

  if (!isDevPortalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !developer || !price) return;

    const gameId = title.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const parsedTags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const parsedPrice = parseFloat(price) || 1499;
    const newGame: Game = {
      id: gameId,
      title,
      category,
      tags: parsedTags.length > 0 ? parsedTags : [category],
      price: parsedPrice,
      originalPrice: discount ? Math.round(parsedPrice * 1.25) : undefined,
      discount: discount || undefined,
      rating: 5.0,
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      description: description || "An exciting new indie title published through the Obsidian Syndicate Portal.",
      developer,
      releaseDate: "Just Now",
      featured: true,
      systemRequirements: {
        minimum: {
          os: os || "Windows 10",
          cpu: "Quad-Core 2.5 GHz",
          ram: "8 GB RAM",
          gpu: gpu || "GTX 1060",
          storage: "25 GB SSD",
        },
        recommended: {
          os: "Windows 11",
          cpu: "Octa-Core 3.5 GHz",
          ram: "16 GB RAM",
          gpu: gpu || "RTX 3070",
          storage: "25 GB NVMe",
        },
      },
      screenshots: [
        imageUrl.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      ],
      reviews: [
        { id: "r1", user: "ObsidianCurator", rating: 5, comment: "Freshly submitted title on Obsidian Portal!", date: "Just Now" },
      ],
    };

    addGameToStore(newGame);
    setIsDevPortalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDevPortalOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#0a0a0f] border border-[#a855f7]/50 rounded-3xl p-6 sm:p-8 shadow-neon-purple z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsDevPortalOpen(false)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#a855f7] uppercase tracking-widest">
              <Rocket className="w-4 h-4 text-[#00f3ff]" /> Developer & Publisher Portal
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white italic uppercase tracking-tight">
              Publish a New <span className="text-[#a855f7] glow-text-purple">Indie Title</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Submit your game to the live Obsidian showcase. Published titles appear instantly in the store grid!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Game Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cyberpunk Odyssey"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Developer / Studio Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neon Forge Studios"
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  required
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="Cyberpunk">Cyberpunk</option>
                  <option value="Action">Action</option>
                  <option value="RPG">RPG</option>
                  <option value="Rhythm">Rhythm</option>
                  <option value="Stealth">Stealth</option>
                  <option value="Soulslike">Soulslike</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Price (₹ INR)
                </label>
                <input
                  type="number"
                  placeholder="1499"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Discount Tag
                </label>
                <input
                  type="text"
                  placeholder="-20%"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Cyberpunk, Action, Sci-Fi, Ray-Tracing"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                Full Game Description
              </label>
              <textarea
                placeholder="Write a compelling overview of gameplay mechanics and narrative..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-neon-purple"
            >
              <Rocket className="w-4 h-4" /> Publish to Obsidian Showcase
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
