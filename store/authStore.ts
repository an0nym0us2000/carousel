import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
