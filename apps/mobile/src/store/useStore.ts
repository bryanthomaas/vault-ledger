import { create } from 'zustand';
import { User, Account, Transaction } from '@vault-ledger/shared-types';

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  setAuthenticated: (value: boolean) => void;
  setUser: (user: User) => void;
  setAccounts: (accounts: Account[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  accounts: [],
  transactions: [],
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setAccounts: (accounts) => set({ accounts }),
  setTransactions: (transactions) => set({ transactions }),
}));
