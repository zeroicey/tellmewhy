import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  session: Session | null;
  user: User | null;
  isSignedIn: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => {
  const store = {
    session: null,
    user: null,
    isSignedIn: false,
    loading: true,
    setLoading: (loading: boolean) => set({ loading }),
    signOut: async () => {
      set({ session: null, user: null, isSignedIn: false });
      await supabase.auth.signOut();
    },
  };
  supabase.auth.getSession().then(({ data: { session } }) => {
    set({
      session,
      user: session?.user ?? null,
      isSignedIn: !!session,
      loading: false,
    });
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    set({
      session,
      user: session?.user ?? null,
      isSignedIn: !!session,
      loading: false,
    });
  });
  return store;
});

export default useAuthStore;
