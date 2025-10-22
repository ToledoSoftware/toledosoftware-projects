// app/modal.tsx
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import {
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { habitService } from '../services/habitService';
import { useTheme } from '../context/ThemeContext';
import Colors from '@/constants/Colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ModalScreen() {
  const [title, setTitle] = useState('');
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [notificationTime, setNotificationTime] = useState<string | null>(null);

  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);

    if (event.type === 'set') {
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      setNotificationTime(`${hours}:${minutes}`);
    } else {
      // User cancelled picker
      setShowPicker(false);
    }
  };

  const handleAddHabit = async () => {
    if (title.trim().length === 0) {
      Alert.alert("Error", "Title cannot be empty."); // Traduzido
      return;
    }
    try {
      await habitService.createHabit(title, notificationTime);
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not create habit."); // Traduzido
    }
  };

  const themeColors = Colors[theme];

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="E.g., Read 20 minutes" // Traduzido
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

      <Text style={[styles.label, { color: themeColors.text }]}>Reminder (Optional)</Text> {/* Traduzido */}

      <Pressable onPress={() => setShowPicker(true)} style={[styles.timePickerButton, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.borderColor }]}>
        <FontAwesome name="bell-o" size={16} color={themeColors.tabIconDefault} />
        <Text style={{ color: notificationTime ? themeColors.tint : themeColors.tabIconDefault, marginLeft: 10 }}>
          {notificationTime ? `Daily at ${notificationTime}` : "No reminder set"} {/* Traduzido */}
        </Text>
      </Pressable>

      {notificationTime && (
        <Pressable onPress={() => setNotificationTime(null)} style={styles.removeButton}>
          <Text style={{ color: '#dc3545' }}>Remove reminder</Text> {/* Traduzido */}
        </Pressable>
      )}

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Ajustado display para iOS
          onChange={onChangeTime}
          themeVariant={theme}
        />
      )}

      {/* Adicionado espaço antes do botão */}
      <View style={{ marginTop: 'auto', marginBottom: Platform.OS === 'ios' ? 20 : 0 }}> 
        <Button onPress={handleAddHabit} title="Save Habit" color={themeColors.tint} /> {/* Traduzido */}
      </View>
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
    marginBottom: 10, // Espaço adicionado
  },
  removeButton: {
    marginTop: 5, // Ajustado
    alignItems: 'center',
  }
});