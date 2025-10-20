// context/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'system';

interface ThemeContextProps {
  theme: Theme; // O tema ATUALMENTE aplicado (light ou dark)
  themePreference: ThemePreference; // A ESCOLHA do usuário (light, dark, system)
  setThemePreference: (preference: ThemePreference) => void;
  isSystemTheme: boolean; // Indica se estamos seguindo o sistema
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_STORAGE_KEY = '@ZenHabit:themePreference';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme() ?? 'light'; // Tema do OS
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system'); // Escolha salva
  const [currentTheme, setCurrentTheme] = useState<Theme>(systemColorScheme); // Tema aplicado

  // Carrega a preferência salva ao iniciar
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
        if (storedPreference) {
          setThemePreferenceState(storedPreference);
        } else {
          setThemePreferenceState('system'); // Padrão
        }
      } catch (e) {
        console.error("Erro ao carregar preferência de tema", e);
        setThemePreferenceState('system');
      }
    };
    loadPreference();
  }, []);

  // Atualiza o tema aplicado quando a preferência ou o sistema mudam
  useEffect(() => {
    if (themePreference === 'system') {
      setCurrentTheme(systemColorScheme);
    } else {
      setCurrentTheme(themePreference);
    }
  }, [themePreference, systemColorScheme]);

  // Salva a preferência quando ela muda
  const handleSetThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreferenceState(preference);
    } catch (e) {
      console.error("Erro ao salvar preferência de tema", e);
    }
  };
  
  // Ouve mudanças no tema do sistema operacional
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

// Hook para usar o contexto facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};