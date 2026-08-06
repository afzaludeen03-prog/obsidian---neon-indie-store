import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useCartContext } from "./CartContext";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  signIn: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, pass: string, gamerTag: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  gamerTag: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [gamerTag, setGamerTag] = useState<string>("CyberGhost");

  const { showToast } = useCartContext();

  useEffect(() => {
    // Initial Session Check
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.user_metadata?.gamerTag) {
          setGamerTag(session.user.user_metadata.gamerTag);
        }
        setLoading(false);
      });

      // Listen for Auth State Changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.user_metadata?.gamerTag) {
          setGamerTag(session.user.user_metadata.gamerTag);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline / Demo Mode Session Check
      try {
        const demoUser = localStorage.getItem("obsidian_demo_user");
        if (demoUser) {
          const parsed = JSON.parse(demoUser);
          setGamerTag(parsed.gamerTag || "CyberGhost");
          setUser({ id: parsed.id, email: parsed.email } as User);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) {
        return { error };
      }
      const tag = data.user?.user_metadata?.gamerTag || email.split("@")[0];
      setGamerTag(tag);
      showToast(`Welcome back, ${tag}! Authenticated with Supabase.`);
      setIsAuthModalOpen(false);
      return { error: null };
    } else {
      // Demo / Local Auth Fallback
      const tag = email.split("@")[0] || "CyberGhost";
      const demoUser = { id: `demo-${Date.now()}`, email, gamerTag: tag };
      setUser(demoUser as unknown as User);
      setGamerTag(tag);
      localStorage.setItem("obsidian_demo_user", JSON.stringify(demoUser));
      showToast(`Welcome back, ${tag}! Signed in (Demo Mode).`);
      setIsAuthModalOpen(false);
      return { error: null };
    }
  };

  const signUp = async (email: string, pass: string, tag: string) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            gamerTag: tag,
          },
        },
      });
      if (error) {
        return { error };
      }
      setGamerTag(tag);
      showToast(`Account created for ${tag}! Please verify your email.`);
      setIsAuthModalOpen(false);
      return { error: null };
    } else {
      // Demo / Local Signup Fallback
      const demoUser = { id: `demo-${Date.now()}`, email, gamerTag: tag };
      setUser(demoUser as unknown as User);
      setGamerTag(tag);
      localStorage.setItem("obsidian_demo_user", JSON.stringify(demoUser));
      showToast(`Syndicate Account registered for ${tag}!`);
      setIsAuthModalOpen(false);
      return { error: null };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem("obsidian_demo_user");
    showToast("Signed out of Obsidian Vault.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        signIn,
        signUp,
        signOut,
        gamerTag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
