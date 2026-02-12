import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  apiKeys: {
    alphaVantage: string;
    fmp: string;
    twelveData: string;
    fred: string;
  };
  setApiKey: (key: keyof AppState['apiKeys'], value: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apiKeys: {
        alphaVantage: '',
        fmp: '',
        twelveData: '',
        fred: '',
      },
      setApiKey: (key, value) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [key]: value },
        })),
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'quantos-storage',
    }
  )
);
