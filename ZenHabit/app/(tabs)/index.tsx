// app/(tabs)/index.tsx

import React, { useState, useEffect } from 'react';
// Imports corretos:
import { Text, View } from '@/components/Themed'; // Temáticos
import { 
  FlatList,       // <-- Mantido
  StyleSheet,     // <-- Mantido
  ActivityIndicator // <-- Mantido
  // Pressable não é usado diretamente aqui, então pode remover se quiser
} from 'react-native'; // Essenciais
import { habitService } from '../../services/habitService';
import { Habit } from '../../services/types';
import HabitItem from '../../components/HabitItem'; // <-- Path corrigido
import { useIsFocused } from '@react-navigation/native';

// Função para pegar a data de "hoje" no formato YYYY-MM-DD
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export default function TabIndexScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(getTodayString());
  const isFocused = useIsFocused();

  const loadAndSyncData = async () => {
    setLoading(true);
    habitService.syncHabits().then(async () => {
      const updatedHabits = await habitService.loadHabits();
      setHabits(updatedHabits);
      // Apenas para garantir que o loading termine após a sincronização e recarga
      setLoading(false); 
    }).catch(e => {
        console.error("Erro na sincronização:", e);
        setLoading(false); // Garante que o loading termine mesmo com erro na sync
    });

    const localHabits = await habitService.loadHabits();
    setHabits(localHabits);
    // Move o setLoading(false) para dentro do .then() ou .catch() da sync
    // setLoading(false); 
  };

  useEffect(() => {
    if (isFocused) {
      setToday(getTodayString());
      loadAndSyncData();
    }
  }, [isFocused]);

  const handleToggle = async (habitId: string) => {
    const newHabits = await habitService.toggleHabitCompletion(habitId, today);
    setHabits([...newHabits]); // Garante re-renderização com nova referência
  };

  const handleDelete = async (habitId: string) => {
    const newHabits = await habitService.deleteHabit(habitId);
    setHabits([...newHabits]); // Garante re-renderização com nova referência
  };

  if (loading && habits.length === 0) {
    return (
      // View temática já pega a cor de fundo
      <View style={styles.center}>
        <ActivityIndicator size="large" /* color={Colors[useColorScheme() ?? 'light'].tint} */ />
        {/* Text temático já pega a cor do texto */}
        <Text>Carregando hábitos...</Text> 
      </View>
    );
  }

  return (
    // View temática já pega a cor de fundo
    <View style={styles.container}>
      {habits.length === 0 ? (
         // View temática já pega a cor de fundo
         <View style={styles.center}>
            {/* Text temático já pega a cor do texto */}
            <Text style={styles.emptyText}>Sem hábitos ainda.</Text>
            {/* Text temático já pega a cor do texto */}
            <Text>Clique no "+" para adicionar seu primeiro hábito!</Text>
         </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HabitItem
              habit={item}
              today={today}
              onToggle={() => handleToggle(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          // Adiciona um pouco de espaço no final da lista
          contentContainerStyle={{ paddingBottom: 20 }} 
        />
      )}
    </View>
  );
}

// Garante que StyleSheet seja usado corretamente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor removido, View temática cuida disso
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adiciona padding para texto não ficar colado nas bordas
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color removido, Text temático cuida disso (mas pode precisar de ajuste)
    color: '#888', // Mantendo cinza por enquanto
    textAlign: 'center', // Garante centralização
    marginBottom: 5,   // Espaço entre as linhas
  },
});