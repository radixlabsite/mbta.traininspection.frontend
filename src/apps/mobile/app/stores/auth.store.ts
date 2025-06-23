import { create } from "zustand";

interface IAuthStore {
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  userGroups: string[];
  userLocation: string | null;
  userLine: string | null;
  username: string | null;
  userId: string | null;

  setIsLoading: (value: boolean) => void;
  setAuthData: (data: Partial<IAuthStore>) => void;
  resetAuth: () => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: true,
  isAuthenticated: false,
  authToken: null,
  userGroups: [],
  userLocation: null,
  userLine: null,
  username: null,
  userId: null,

  setIsLoading: (value) => set({ isLoading: value }),

  setAuthData: (data) => set((state) => ({ ...state, ...data })),

  resetAuth: () =>
    set({
      isAuthenticated: false,
      authToken: null,
      userGroups: [],
      userLocation: null,
      userLine: null,
      username: null,
      userId: null,
      isLoading: false,
    }),
}));

export default useAuthStore;
