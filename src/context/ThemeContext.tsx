import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeColor = "cyan" | "purple" | "pink" | "green";

interface ThemeConfig {
  name: ThemeColor;
  primary: string;
  glowShadow: string;
  label: string;
}

export const ThemeMap: Record<ThemeColor, ThemeConfig> = {
  cyan: {
    name: "cyan",
    primary: "#00f3ff",
    glowShadow: "0 0 25px rgba(0, 243, 255, 0.4)",
    label: "Neon Cyan",
  },
  purple: {
    name: "purple",
    primary: "#a855f7",
    glowShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
    label: "Cyber Purple",
  },
  pink: {
    name: "pink",
    primary: "#ff007f",
    glowShadow: "0 0 25px rgba(255, 0, 127, 0.4)",
    label: "Synthwave Pink",
  },
  green: {
    name: "green",
    primary: "#00ff66",
    glowShadow: "0 0 25px rgba(0, 255, 102, 0.4)",
    label: "Matrix Green",
  },
};

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "obsidian_neon_theme_v1";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return (saved as ThemeColor) && ThemeMap[saved as ThemeColor] ? (saved as ThemeColor) : "cyan";
    } catch {
      return "cyan";
    }
  });

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const config = ThemeMap[theme];
    document.documentElement.style.setProperty("--color-neon-accent", config.primary);
    document.documentElement.style.setProperty("--shadow-neon-accent", config.glowShadow);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config: ThemeMap[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
