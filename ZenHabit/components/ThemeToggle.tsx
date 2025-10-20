import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, View, Animated, Easing } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import Colors from '@/constants/Colors';

export default function ThemeToggle() {
  const { theme, setThemePreference } = useTheme();
  const animValue = useRef(new Animated.Value(theme === 'dark' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: theme === 'dark' ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [theme, animValue]);

  const toggleTheme = () => setThemePreference(theme === 'light' ? 'dark' : 'light');

  const translateX = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 22] });
  const cardBgColor = Colors[theme].cardBackground;
  const toggleBgColor = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
  const iconColor = theme === 'dark' ? Colors.dark.tint : Colors.light.tint;

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <View style={[styles.switch, { backgroundColor: toggleBgColor }]}>
        <Animated.View style={[styles.slider, { backgroundColor: cardBgColor ?? '#fff' }, { transform: [{ translateX }] }]}>
          <FontAwesome name={theme === 'dark' ? 'moon-o' : 'sun-o'} size={16} color={iconColor} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, justifyContent: 'center', height: '100%' },
  switch: { width: 50, height: 28, borderRadius: 14, justifyContent: 'center', padding: 2 },
  slider: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 },
});
