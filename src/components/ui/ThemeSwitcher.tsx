import { useThemeContext, ThemeColor } from "../../context/ThemeContext";
import { Palette } from "lucide-react";
import { useState } from "react";
import { audioManager } from "../../utils/audio";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);

  const colors: { key: ThemeColor; hex: string; name: string }[] = [
    { key: "cyan", hex: "#00f3ff", name: "Neon Cyan" },
    { key: "purple", hex: "#a855f7", name: "Cyber Purple" },
    { key: "pink", hex: "#ff007f", name: "Synthwave Pink" },
    { key: "green", hex: "#00ff66", name: "Matrix Green" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => {
          audioManager.playHoverTick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => audioManager.playHoverTick()}
        className="p-2.5 bg-[#12121c] border border-[#1e1e2e] rounded-xl text-zinc-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5"
        title="Custom Glow Theme Switcher"
      >
        <Palette className="w-4 h-4 text-[#00f3ff]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 bg-[#0a0a0f] border border-[#1e1e2e] p-3 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 backdrop-blur-xl">
          {colors.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                audioManager.playSuccessChime();
                setTheme(c.key);
                setIsOpen(false);
              }}
              onMouseEnter={() => audioManager.playHoverTick()}
              className={`w-7 h-7 rounded-full transition-transform border-2 ${
                theme === c.key ? "scale-125 border-white shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
