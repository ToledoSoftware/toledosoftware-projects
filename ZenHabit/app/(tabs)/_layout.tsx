// app/(tabs)/_layout.tsx
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';

// Componente auxiliar para ícones da barra de abas
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarStyle: {
          backgroundColor: Colors[theme].cardBackground,
          borderTopColor: Colors[theme].borderColor,
        },
        headerStyle: {
           backgroundColor: Colors[theme].cardBackground,
           borderBottomColor: Colors[theme].borderColor,
           shadowColor: 'transparent', // Remove sombra padrão do iOS
        },
        headerTintColor: Colors[theme].text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hábitos', // Título da aba e do header
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square-o" color={color} />,
          headerRight: () => ( // Botão "+" para adicionar hábito
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    color={Colors[theme].tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => <ThemeToggle />, // Botão para trocar tema
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estatísticas', // Título da aba e do header
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          headerLeft: () => <ThemeToggle />, // Botão para trocar tema
        }}
      />
    </Tabs>
  );
}