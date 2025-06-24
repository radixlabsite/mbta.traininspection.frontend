import { create } from "zustand";

// Zustand store responsável por manter estado global de autenticação
// Inclui userId (entra_id), grupos, token, loading e localização
interface IAuthStore {
  isLoading: boolean;
  isAppLoading: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  userGroups: string[];
  userLocation: string | null;
  userLine: string | null;
  username: string | null;
  userId: string | null;

  setIsLoading: (value: boolean) => void;
  setIsAppLoading: (value: boolean) => void;
  setAuthData: (data: Partial<IAuthStore>) => void;
  resetAuth: () => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: true,
  isAppLoading: true,
  isAuthenticated: false,
  authToken: null,
  userGroups: [],
  userLocation: null,
  userLine: null,
  username: null,
  userId: null,

  setIsLoading: (value) => set({ isLoading: value }),

  setIsAppLoading: (value) => set({ isAppLoading: value }),

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
      isAppLoading: false,
    }),
}));

export default useAuthStore;
