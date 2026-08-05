import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";
import { useCartContext } from "./CartContext";

interface StoreContextType {
  games: Game[];
  addGameToStore: (newGame: Game) => void;
  isDevPortalOpen: boolean;
  setIsDevPortalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);
const STORE_STORAGE_KEY = "obsidian_neon_custom_games_v1";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCartContext();

  const [games, setGames] = useState<Game[]>(() => {
    try {
      const savedCustom = localStorage.getItem(STORE_STORAGE_KEY);
      if (savedCustom) {
        const parsedCustom: Game[] = JSON.parse(savedCustom);
        // Merge custom submitted games with default GAMES_DATA
        const existingIds = new Set(GAMES_DATA.map((g) => g.id));
        const customOnly = parsedCustom.filter((g) => !existingIds.has(g.id));
        return [...GAMES_DATA, ...customOnly];
      }
      return GAMES_DATA;
    } catch {
      return GAMES_DATA;
    }
  });

  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);

  const addGameToStore = (newGame: Game) => {
    setGames((prev) => [newGame, ...prev]);

    // Save custom games to localStorage
    try {
      const customGames = [newGame, ...games.filter((g) => !GAMES_DATA.some((d) => d.id === g.id))];
      localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(customGames));
    } catch (e) {
      console.error(e);
    }

    showToast(`🚀 Published "${newGame.title}" live to the Obsidian Showcase!`);
  };

  return (
    <StoreContext.Provider value={{ games, addGameToStore, isDevPortalOpen, setIsDevPortalOpen }}>
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
