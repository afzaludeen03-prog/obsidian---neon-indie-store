import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../types";
import { useCartContext } from "./CartContext";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface LibraryContextType {
  library: Game[];
  addGamesToLibrary: (games: Game[]) => Promise<void>;
  isGamePurchased: (gameId: string) => boolean;
  launchGame: (game: Game) => void;
  loadingLibrary: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
const LIBRARY_STORAGE_KEY = "obsidian_neon_library_v1";

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCartContext();
  const [library, setLibrary] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(LIBRARY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  // Sync with Supabase user_libraries table
  useEffect(() => {
    const fetchSupabaseLibrary = async () => {
      if (isSupabaseConfigured()) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setLoadingLibrary(true);
            const { data, error } = await supabase
              .from("user_libraries")
              .select("game_data")
              .eq("user_id", session.user.id);

            if (!error && data && data.length > 0) {
              const fetchedGames: Game[] = data.map((item: any) => item.game_data).filter(Boolean);
              // Merge with local library without duplicates
              setLibrary((prev) => {
                const existingIds = new Set(prev.map((g) => g.id));
                const newItems = fetchedGames.filter((g) => !existingIds.has(g.id));
                return [...prev, ...newItems];
              });
            }
            setLoadingLibrary(false);
          }
        } catch (e) {
          console.error("Error fetching Supabase user_libraries:", e);
        }
      }
    };

    fetchSupabaseLibrary();
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(library));
    } catch (e) {
      console.error(e);
    }
  }, [library]);

  const addGamesToLibrary = async (newGames: Game[]) => {
    setLibrary((prev) => {
      const existingIds = new Set(prev.map((g) => g.id));
      const uniqueNew = newGames.filter((g) => !existingIds.has(g.id));
      return [...prev, ...uniqueNew];
    });

    if (isSupabaseConfigured()) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const rowsToInsert = newGames.map((game) => ({
            user_id: session.user.id,
            game_id: game.id,
            game_data: game,
            purchased_at: new Date().toISOString(),
          }));
          await supabase.from("user_libraries").insert(rowsToInsert);
        }
      } catch (e) {
        console.error("Supabase user_libraries insert error:", e);
      }
    }

    showToast(`🎉 ${newGames.length} game(s) permanently added to your Obsidian Vault Library!`);
  };

  const isGamePurchased = (gameId: string) => {
    return library.some((g) => g.id === gameId);
  };

  const launchGame = (game: Game) => {
    showToast(`🚀 Launching ${game.title}... Connecting to Ray-Tracing Engine`);
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        addGamesToLibrary,
        isGamePurchased,
        launchGame,
        loadingLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibraryContext must be used within a LibraryProvider");
  }
  return context;
};
