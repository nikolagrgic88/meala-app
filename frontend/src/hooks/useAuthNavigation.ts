import { useAuthStore } from "../store/authStore";

export function useIsAuthenticated() {
  return useAuthStore(
    (state) => state.isAuthenticated
  );
}

export function useIsNotAuthenticated() {
  return useAuthStore(
    (state) => !state.isAuthenticated
  );
}