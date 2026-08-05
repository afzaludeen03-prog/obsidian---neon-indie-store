import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "../types";
import { useCartContext } from "./CartContext";

interface WishlistContextType {
  wishlist: Game[];
  toggleWishlist: (game: Game) => void;
  isInWishlist: (gameId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  removeFromWishlist: (gameId: string) => void;
  moveToVault: (game: Game) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const WISHLIST_STORAGE_KEY = "obsidian_neon_wishlist_v1";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToCart, showToast } = useCartContext();

  const [wishlist, setWishlist] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const isInWishlist = (gameId: string) => wishlist.some((item) => item.id === gameId);

  const toggleWishlist = (game: Game) => {
    if (isInWishlist(game.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== game.id));
      showToast(`Removed "${game.title}" from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, game]);
      showToast(`Saved "${game.title}" to Wishlist`);
    }
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== gameId));
  };

  const moveToVault = (game: Game) => {
    addToCart(game);
    removeFromWishlist(game.id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        removeFromWishlist,
        moveToVault,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
};
