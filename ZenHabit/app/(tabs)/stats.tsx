// app/(tabs)/stats.tsx
import { useTheme } from '../../context/ThemeContext';
import Colors from '@/constants/Colors';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed'; // Temáticos
import {
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native'; // Essenciais
import { useIsFocused } from '@react-navigation/native';
import { habitService } from '../../services/habitService';
import { Habit } from '../../services/types';
import { calculateCurrentStreak, calculateLongestStreak, HabitStats } from '../../services/streakUtils';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // <-- 1. IMPORTAR FONT AWESOME

export default function TabStatsScreen() {
  const { theme } = useTheme();
  const [habitStats, setHabitStats] = useState<HabitStats[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const loadStats = async () => {
    setLoading(true);
    try {
      const habits = await habitService.loadHabits();
      const stats = habits.map(habit => ({
        ...habit,
        currentStreak: calculateCurrentStreak(habit),
        longestStreak: calculateLongestStreak(habit),
      }));
      setHabitStats(stats);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadStats();
    }
  }, [isFocused]);

  // --- 2. ATUALIZAR RENDERSTATITEM ---
  const renderStatItem = ({ item }: { item: HabitStats }) => (
    <View style={[
      styles.itemContainer,
      {
        backgroundColor: Colors[theme].cardBackground,
        borderColor: Colors[theme].borderColor
      }
    ]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.streaksContainer}>
        {/* Streak Atual com ícone */}
        <View style={styles.streakRow}>
          <FontAwesome 
            name="fire" 
            size={16} 
            color={Colors[theme].tint} // Usa a cor de destaque do tema
            style={styles.streakIcon} 
          />
          <Text style={styles.streakText}>Atual: {item.currentStreak}</Text>
        </View>
        
        {/* Recorde com ícone */}
        <View style={styles.streakRow}>
           <FontAwesome 
            name="trophy" 
            size={16} 
            color="#FFD700" // Ouro (pode ser fixo)
            style={styles.streakIcon} 
          />
          <Text style={styles.streakText}>Recorde: {item.longestStreak}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors[theme].tint} />
        <Text>Calculando estatísticas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas de Hábitos</Text>
      {habitStats.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Adicione hábitos para ver as estatísticas.</Text>
        </View>
      ) : (
        <FlatList
          data={habitStats}
          keyExtractor={(item) => item.id}
          renderItem={renderStatItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

// --- 3. ATUALIZAR ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  itemContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Aumenta o espaço
  },
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // NOVOS ESTILOS
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    marginRight: 6,
  },
  streakText: {
    fontSize: 16,
  },
});