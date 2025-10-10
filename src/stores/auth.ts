// src/stores/useAuthStore.js
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  setSession: (session: Session | null) => {
    set({ session, user: session?.user });
  },
  signOut: () => supabase.auth.signOut(),
}));

export const initializeAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  useAuthStore.getState().setSession(session);

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setSession(session);
  });
};

export default useAuthStore;
