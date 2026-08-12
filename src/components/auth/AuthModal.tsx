import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, User, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { audioManager } from "../../utils/audio";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    signIn,
    signUp,
  } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Lock background body scrolling when auth modal is active
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    if (authMode === "login") {
      const res = await signIn(email, password);
      if (res.error) {
        setErrorMsg(res.error.message);
      }
    } else {
      const res = await signUp(email, password, tagInput || email.split("@")[0]);
      if (res.error) {
        setErrorMsg(res.error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-safe pb-safe overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#0a0a0f] border border-[#a855f7]/50 rounded-3xl p-6 sm:p-8 shadow-neon-purple z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2.5 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/5 transition-colors flex items-center justify-center"
            aria-label="Close Auth Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6 space-y-2">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#a855f7] to-[#00f3ff] rounded-2xl flex items-center justify-center mx-auto shadow-neon-purple text-black font-black text-lg">
              O
            </div>
            <h2 className="text-2xl font-display font-black text-white italic uppercase tracking-tight">
              {authMode === "login" ? "Syndicate Access" : "Register Gamer Tag"}
            </h2>
            <p className="text-xs text-zinc-400">
              {authMode === "login"
                ? "Sign in to access your permanent Obsidian vault & library"
                : "Create a new developer or player profile for Obsidian Store"}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border border-[#1e1e2e] rounded-xl p-1 bg-[#12121c] mb-6">
            <button
              onClick={() => {
                audioManager.playHoverTick();
                setAuthMode("login");
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 min-h-[44px] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center ${
                authMode === "login"
                  ? "bg-[#a855f7] text-white shadow-neon-purple"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                audioManager.playHoverTick();
                setAuthMode("signup");
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 min-h-[44px] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center ${
                authMode === "signup"
                  ? "bg-[#00f3ff] text-black font-black shadow-neon-cyan"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00f3ff]" /> Gamer Tag / Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. CyberGhost99"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  required
                  className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 min-h-[44px] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f3ff]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00f3ff]" /> Email Address
              </label>
              <input
                type="email"
                placeholder="name@syndicate.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 min-h-[44px] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f3ff]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#a855f7]" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 min-h-[44px] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#a855f7]"
              />
            </div>

            {errorMsg && (
              <p className="text-[11px] text-[#ff007f] font-mono bg-[#ff007f]/10 p-3 rounded-xl border border-[#ff007f]/30">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 min-h-[44px] bg-gradient-to-r from-[#a855f7] to-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-neon-purple disabled:opacity-50"
            >
              {submitting
                ? "Authenticating..."
                : authMode === "login"
                ? "Sign In to Vault"
                : "Create Syndicate Profile"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
