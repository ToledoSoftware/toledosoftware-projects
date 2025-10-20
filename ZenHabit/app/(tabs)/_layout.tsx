// app/(tabs)/_layout.tsx
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
// PARA:
import { useTheme } from '../../context/ThemeContext'; // <-- Corrigido o caminho
import ThemeToggle from '../../components/ThemeToggle'; // <-- Corrigido o caminho
// --- DEFINIÇÃO CORRETA E COMPLETA ---
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']; // Define o tipo do nome do ícone
  color: string; // Define o tipo da cor
}) {
  // Retorna o componente FontAwesome com os props corretos
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />; 
}
// --- FIM DA CORREÇÃO ---

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
           shadowColor: 'transparent', 
        },
        headerTintColor: Colors[theme].text, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hábitos',
          // Agora a chamada para TabBarIcon funciona
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square-o" color={color} />, 
          headerRight: () => (
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
          headerLeft: () => <ThemeToggle />, 
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estatísticas',
           // Agora a chamada para TabBarIcon funciona
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          headerLeft: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}