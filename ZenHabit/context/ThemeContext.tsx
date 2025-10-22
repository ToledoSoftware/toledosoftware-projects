// context/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'system';

interface ThemeContextProps {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const THEME_STORAGE_KEY = '@ZenHabit:themePreference';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme() ?? 'light';
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [currentTheme, setCurrentTheme] = useState<Theme>(systemColorScheme);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
        setThemePreferenceState(storedPreference ?? 'system');
      } catch (e) {
        console.error("Erro ao carregar preferência de tema", e);
        setThemePreferenceState('system');
      }
    };
    loadPreference();
  }, []);

  useEffect(() => {
    setCurrentTheme(themePreference === 'system' ? systemColorScheme : themePreference);
  }, [themePreference, systemColorScheme]);

  const handleSetThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreferenceState(preference);
    } catch (e) {
      console.error("Erro ao salvar preferência de tema", e);
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        if (themePreference === 'system') {
            setCurrentTheme(colorScheme ?? 'light');
        }
    });
    return () => subscription.remove();
  }, [themePreference]);

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      themePreference,
      setThemePreference: handleSetThemePreference,
      isSystemTheme: themePreference === 'system'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};