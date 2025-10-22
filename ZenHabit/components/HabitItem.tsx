// components/HabitItem.tsx
import React from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Habit } from '../services/types';
import { useTheme } from '../context/ThemeContext';
import Colors from '@/constants/Colors';

type HabitItemProps = {
  habit: Habit;
  today: string;
  onToggle: () => void;
  onDelete: () => void;
};

export default function HabitItem({ habit, today, onToggle, onDelete }: HabitItemProps) {
  const { theme } = useTheme();
  const isCompleted = habit.completedDates.includes(today);

  const tintColor = Colors[theme].tint;
  const mutedColor = Colors[theme].tabIconDefault;

  return (
    <View style={[styles.container, { borderBottomColor: Colors[theme].borderColor }]}>
      <Pressable onPress={onToggle} style={styles.toggleArea}>
        <View style={[
          styles.checkbox,
          { borderColor: tintColor },
          isCompleted && [styles.checkboxCompleted, { backgroundColor: tintColor, borderColor: tintColor }]
        ]}>
          {isCompleted && <FontAwesome name="check" size={18} color="#fff" />}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{habit.title}</Text>
          {habit.notificationTime && (
            <View style={styles.reminderRow}>
              <FontAwesome name="bell-o" size={12} color={mutedColor} />
              <Text style={[styles.reminderText, { color: mutedColor }]}>
                {` Lembrete às ${habit.notificationTime}`}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <FontAwesome name="trash-o" size={20} color="#dc3545" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  toggleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxCompleted: {
    // Estilos dinâmicos
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reminderText: {
    fontSize: 12,
  },
});