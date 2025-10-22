// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { habitService } from '../../services/habitService';
import { Habit } from '../../services/types';
import HabitItem from '../../components/HabitItem';
import { useIsFocused } from '@react-navigation/native';

// Função para obter a data atual em formato YYYY-MM-DD
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export default function TabIndexScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(getTodayString());
  const isFocused = useIsFocused(); // Hook para saber se a tela está visível

  // Carrega e sincroniza os dados dos hábitos
  const loadAndSyncData = async () => {
    setLoading(true);
    // Tenta sincronizar com o backend primeiro
    habitService.syncHabits().then(async () => {
      // Se a sincronização for bem-sucedida, recarrega os hábitos locais
      const updatedHabits = await habitService.loadHabits();
      setHabits(updatedHabits);
      setLoading(false); // Termina o loading após sucesso
    }).catch(async (e) => { // Mesmo se a sincronização falhar
        console.error("Erro na sincronização:", e);
        // Carrega os hábitos locais existentes
        const localHabitsOnError = await habitService.loadHabits();
        setHabits(localHabitsOnError);
        setLoading(false); // Termina o loading após falha
    });
  };

  // Recarrega os dados quando a tela recebe foco
  useEffect(() => {
    if (isFocused) {
      setToday(getTodayString()); // Atualiza a data para hoje
      loadAndSyncData();
    }
  }, [isFocused]);

  // Função para marcar/desmarcar um hábito como completo
  const handleToggle = async (habitId: string) => {
    const newHabits = await habitService.toggleHabitCompletion(habitId, today);
    setHabits([...newHabits]); // Atualiza o estado para re-renderizar
  };

  // Função para deletar um hábito
  const handleDelete = async (habitId: string) => {
    const newHabits = await habitService.deleteHabit(habitId);
    setHabits([...newHabits]); // Atualiza o estado para re-renderizar
  };

  // Tela de loading inicial
  if (loading && habits.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando hábitos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mensagem se não houver hábitos */}
      {habits.length === 0 ? (
         <View style={styles.center}>
            <Text style={styles.emptyText}>Sem hábitos ainda.</Text>
            <Text>Clique no "+" para adicionar seu primeiro hábito!</Text>
         </View>
      ) : (
        // Lista de hábitos
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
          contentContainerStyle={{ paddingBottom: 20 }} // Espaço no final
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888', // Cor mantida temporariamente
    textAlign: 'center',
    marginBottom: 5,
  },
});