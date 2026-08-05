import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../types";
import { useCartContext } from "./CartContext";

interface LibraryContextType {
  libraryGames: Game[];
  addGamesToLibrary: (games: Game[]) => void;
  isGameOwned: (gameId: string) => boolean;
  launchGame: (game: Game) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
const LIBRARY_STORAGE_KEY = "obsidian_neon_library_v1";

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCartContext();

  const [libraryGames, setLibraryGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(LIBRARY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(libraryGames));
    } catch (e) {
      console.error("Failed to save library to localStorage", e);
    }
  }, [libraryGames]);

  const isGameOwned = (gameId: string) => libraryGames.some((game) => game.id === gameId);

  const addGamesToLibrary = (newGames: Game[]) => {
    setLibraryGames((prev) => {
      const existingIds = new Set(prev.map((g) => g.id));
      const filtered = newGames.filter((g) => !existingIds.has(g.id));
      return [...prev, ...filtered];
    });
  };

  const launchGame = (game: Game) => {
    showToast(`🚀 Launching ${game.title}... Connecting to Ray-Tracing Engine`);
  };

  return (
    <LibraryContext.Provider
      value={{
        libraryGames,
        addGamesToLibrary,
        isGameOwned,
        launchGame,
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
