import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useCartContext } from "./CartContext";

interface StoreContextType {
  games: Game[];
  addGameToStore: (newGame: Game) => Promise<void>;
  isDevPortalOpen: boolean;
  setIsDevPortalOpen: (open: boolean) => void;
  loadingGames: boolean;
  refreshGames: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);
const STORE_STORAGE_KEY = "obsidian_neon_custom_games_v1";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCartContext();
  const [games, setGames] = useState<Game[]>(GAMES_DATA);
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [loadingGames, setLoadingGames] = useState(true);

  const refreshGames = async () => {
    setLoadingGames(true);
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from("games").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          const mappedGames: Game[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category || "Indie",
            tags: item.tags || ["Indie"],
            price: item.price,
            originalPrice: item.original_price,
            discount: item.discount,
            rating: item.rating || 4.8,
            image: item.cover_url || item.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
            description: item.description || "",
            developer: item.developer || "Indie Creator",
            releaseDate: item.release_date || "2026",
            featured: item.featured ?? true,
            systemRequirements: item.system_requirements || {
              minimum: { os: "Windows 10", cpu: "Quad-Core 2.5 GHz", ram: "8 GB RAM", gpu: "GTX 1060", storage: "25 GB SSD" },
              recommended: { os: "Windows 11", cpu: "Octa-Core 3.5 GHz", ram: "16 GB RAM", gpu: "RTX 3070", storage: "25 GB NVMe" },
            },
            screenshots: item.screenshots || [item.cover_url || item.image],
            reviews: item.reviews || [],
          }));

          // Merge custom Supabase games with default GAMES_DATA ensuring no duplicates
          const dbIds = new Set(mappedGames.map((g) => g.id));
          const uniqueDefault = GAMES_DATA.filter((g) => !dbIds.has(g.id));
          setGames([...mappedGames, ...uniqueDefault]);
        }
      } catch (e) {
        console.error("Error fetching games from Supabase:", e);
      }
    } else {
      // Local Storage Fallback
      try {
        const savedCustom = localStorage.getItem(STORE_STORAGE_KEY);
        if (savedCustom) {
          const parsedCustom: Game[] = JSON.parse(savedCustom);
          const existingIds = new Set(GAMES_DATA.map((g) => g.id));
          const customOnly = parsedCustom.filter((g) => !existingIds.has(g.id));
          setGames([...GAMES_DATA, ...customOnly]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setLoadingGames(false);
  };

  useEffect(() => {
    refreshGames();
  }, []);

  const addGameToStore = async (newGame: Game) => {
    setGames((prev) => [newGame, ...prev]);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("games").insert({
          id: newGame.id,
          title: newGame.title,
          category: newGame.category,
          tags: newGame.tags,
          price: newGame.price,
          original_price: newGame.originalPrice,
          discount: newGame.discount,
          rating: newGame.rating,
          cover_url: newGame.image,
          description: newGame.description,
          developer: newGame.developer,
          release_date: newGame.releaseDate,
          featured: newGame.featured,
          system_requirements: newGame.systemRequirements,
          screenshots: newGame.screenshots,
          reviews: newGame.reviews,
        });

        if (error) {
          console.error("Supabase insert game error:", error);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const customGames = [newGame, ...games.filter((g) => !GAMES_DATA.some((d) => d.id === g.id))];
        localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(customGames));
      } catch (e) {
        console.error(e);
      }
    }

    showToast(`🚀 Published "${newGame.title}" live to the Obsidian Showcase!`);
  };

  return (
    <StoreContext.Provider
      value={{
        games,
        addGameToStore,
        isDevPortalOpen,
        setIsDevPortalOpen,
        loadingGames,
        refreshGames,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
