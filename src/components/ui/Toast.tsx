import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCartContext } from "../../context/CartContext";

export default function Toast() {
  const { toastMessage } = useCartContext();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 bg-[#12121c] border border-[#00f3ff]/50 text-white px-5 py-4 rounded-2xl shadow-neon-cyan flex items-center gap-3 text-xs font-bold backdrop-blur-xl"
        >
          <div className="p-2 bg-[#00f3ff]/20 text-[#00f3ff] rounded-xl border border-[#00f3ff]/30">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#00f3ff] uppercase font-mono tracking-wider">
              Vault Notification
            </span>
            <span className="text-zinc-200">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
