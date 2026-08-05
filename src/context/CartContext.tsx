import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Game } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Game Details Modal State
  selectedGameModal: Game | null;
  openGameModal: (game: Game) => void;
  closeGameModal: () => void;

  // Checkout Modal State
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Toast Notifications State
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Promo Code State
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "obsidian_neon_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGameModal, setSelectedGameModal] = useState<Game | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (game: Game) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.game.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { game, quantity: 1 }];
    });
    showToast(`Added "${game.title}" to your Vault`);
  };

  const removeFromCart = (gameId: string) => {
    const game = cartItems.find((item) => item.game.id === gameId)?.game;
    setCartItems((prev) => prev.filter((item) => item.game.id !== gameId));
    if (game) {
      showToast(`Removed "${game.title}" from your Vault`);
    }
  };

  const updateQuantity = (gameId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.game.id === gameId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    setPromoCode("");
  };

  const openGameModal = (game: Game) => setSelectedGameModal(game);
  const closeGameModal = () => setSelectedGameModal(null);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "NEON20") {
      setPromoCode("NEON20");
      setDiscountPercent(20);
      setPromoError(null);
      showToast("Promo NEON20 applied: 20% OFF!");
      return true;
    } else if (cleanCode === "OBSIDIAN50") {
      setPromoCode("OBSIDIAN50");
      setDiscountPercent(50);
      setPromoError(null);
      showToast("VIP Promo OBSIDIAN50 applied: 50% OFF!");
      return true;
    } else {
      setPromoError("Invalid code. Try 'NEON20'");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedGameModal,
        openGameModal,
        closeGameModal,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        toastMessage,
        showToast,
        promoCode,
        discountPercent,
        promoError,
        applyPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
