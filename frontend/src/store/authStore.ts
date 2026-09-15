import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { User } from "../models/User";
import { secureStorage } from "./secureStorage";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setSession: (user: User, accessToken: string) => void;

  logout: () => void;

  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,

      setSession: (user, accessToken) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },

      setHasHydrated: (hasHydrated) => {
        set({
          hasHydrated,
        });
      },
    }),

    {
      name: "authentication-storage",

      storage: createJSONStorage(() => secureStorage),

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
