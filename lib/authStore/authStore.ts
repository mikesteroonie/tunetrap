// authStore.ts
import { supabase } from "@lib/supabase"; // or your import path to Supabase client
import create from "zustand";

import { Session, User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  signOut: () => Promise<void>;
  subscribeToAuthChanges: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  initialized: false,
  // Method to sign out the user
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
  // Subscribe to auth state changes
  //event variable is there to use if we want to differneciate between scenarios of login, logout, etc like different notifications

  //the set function updates the zustand store with new state.
  subscribeToAuthChanges: () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      set({
        session,
        user: session ? session.user : null,
        initialized: true,
      });
    });
  },
}));

// Make sure to call the `subscribeToAuthChanges` method somewhere at the root of your app to start listening to auth changes.
