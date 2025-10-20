// app/modal.tsx

import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import {
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Alert,
  Pressable, // <-- Adicionado
} from 'react-native';
import { router } from 'expo-router';
import { habitService } from '../services/habitService';
import { useTheme } from '../context/ThemeContext';
import Colors from '@/constants/Colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // <-- Adicionado
import FontAwesome from '@expo/vector-icons/FontAwesome'; // <-- Adicionado

export default function ModalScreen() {
  const [title, setTitle] = useState('');
  const { theme } = useTheme();

  // --- Estados para o Horário ---
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [notificationTime, setNotificationTime] = useState<string | null>(null);

  // Manipulador do seletor de horário
  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // No iOS, o picker é um modal
    setDate(currentDate);

    if (event.type === 'set') {
      // Formata a hora para "HH:MM"
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      setNotificationTime(`${hours}:${minutes}`);
    }
  };

  const handleAddHabit = async () => {
    if (title.trim().length === 0) {
      Alert.alert("Erro", "O título não pode estar vazio.");
      return;
    }
    try {
      // Envia o título e o horário (que pode ser null)
      await habitService.createHabit(title, notificationTime);
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível criar o hábito.");
    }
  };

  const themeColors = Colors[theme]; // Pega as cores do tema

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Ler 20 minutos"
        style={[
          styles.input,
          {
            color: themeColors.text,
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor
          }
        ]}
        placeholderTextColor={themeColors.tabIconDefault}
      />

      {/* Seletor de Lembrete */}
      <Text style={[styles.label, { color: themeColors.text }]}>Lembrete (Opcional)</Text>
      
      <Pressable onPress={() => setShowPicker(true)} style={[styles.timePickerButton, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.borderColor }]}>
        <FontAwesome name="bell-o" size={16} color={themeColors.tabIconDefault} />
        <Text style={{ color: notificationTime ? themeColors.tint : themeColors.tabIconDefault, marginLeft: 10 }}>
          {notificationTime ? `Diariamente às ${notificationTime}` : "Sem lembrete"}
        </Text>
      </Pressable>

      {/* Remove o lembrete */}
      {notificationTime && (
        <Pressable onPress={() => setNotificationTime(null)} style={styles.removeButton}>
          <Text style={{ color: '#dc3545' }}>Remover lembrete</Text>
        </Pressable>
      )}

      {/* O componente do Seletor de Horário */}
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'} // Queremos apenas a hora
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
          // Força o tema do seletor nativo
          themeVariant={theme} 
        />
      )}
      
      {/* Botão Salvar (espaçado) */}
      <View style={{ marginTop: 20 }}>
        <Button onPress={handleAddHabit} title="Salvar Hábito" color={themeColors.tint} />
      </View>

      {Platform.OS === 'ios' && <View style={{ height: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  removeButton: {
    marginTop: 10,
    alignItems: 'center',
  }
});