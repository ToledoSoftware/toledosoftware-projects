import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Language = 'pt' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'pt', 
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'nextcommerce-lang',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);