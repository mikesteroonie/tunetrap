import { create } from "zustand";

type PastWelcomeState = {
  isPastWelcome: boolean;
  setIsPastWelcome: (welc: boolean) => void;
};

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

type AccountState = {
  accountCreated: boolean;
  setAccountCreated: (acc: boolean) => void;
};

type ClickState = {
  click: number;
  incrementClick: () => void;
  decrementClick: () => void;
};

export const useIsPastWelcome = create<PastWelcomeState>((set) => ({
  isPastWelcome: false,
  setIsPastWelcome: (welc) => set({ isPastWelcome: welc }),
}));

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));

export const useAccountStore = create<AccountState>((set) => ({
  accountCreated: false,
  setAccountCreated: (acc) => set({ accountCreated: acc }),
}));

export const useClickStore = create<ClickState>((set) => ({
  click: 0,
  incrementClick: () => set((state) => ({ click: state.click + 1 })),
  decrementClick: () => set((state) => ({ click: state.click - 1 })),
}));
