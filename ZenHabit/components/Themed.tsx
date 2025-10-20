// components/Themed.tsx
// components/Themed.tsx
import { Text as DefaultText, View as DefaultView } from 'react-native'; // Removido useColorScheme daqui
import Colors from '@/constants/Colors';
// --- CORREÇÃO DO CAMINHO ---
// PARA:
import { useTheme } from '../context/ThemeContext'; // <-- Corrigido o casing

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

// Não precisamos mais desta função
// export function useThemeColor( ... ) { ... }

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // const colorScheme = useColorScheme() ?? 'light'; // Remove
  const { theme } = useTheme(); // Usa nosso hook
  const color = theme === 'dark' 
    ? (darkColor ?? Colors.dark.text) 
    : (lightColor ?? Colors.light.text);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // const colorScheme = useColorScheme() ?? 'light'; // Remove
  const { theme } = useTheme(); // Usa nosso hook
  const backgroundColor = theme === 'dark' 
    ? (darkColor ?? Colors.dark.background) 
    : (lightColor ?? Colors.light.background);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}