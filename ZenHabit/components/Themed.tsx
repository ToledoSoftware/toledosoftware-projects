// components/Themed.tsx
import { Text as DefaultText, View as DefaultView } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '../context/ThemeContext';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { theme } = useTheme();
  const color = theme === 'dark'
    ? (darkColor ?? Colors.dark.text)
    : (lightColor ?? Colors.light.text);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { theme } = useTheme();
  const backgroundColor = theme === 'dark'
    ? (darkColor ?? Colors.dark.background)
    : (lightColor ?? Colors.light.background);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}