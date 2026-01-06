import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { colors, shadows } from '../theme';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={[styles.container, shadows.sm]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        accessibilityLabel={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
      >
        <View
          style={[
            styles.checkboxInner,
            todo.completed && styles.checkboxChecked,
          ]}
        >
          {todo.completed && (
            <Check size={14} color={colors.primary.foreground} />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[styles.title, todo.completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text style={styles.description} numberOfLines={1}>
            {todo.description}
          </Text>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={() => onDelete(todo.id)}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${todo.title}`}
      >
        <Trash2 size={18} color={colors.destructive.DEFAULT} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.muted,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonPressed: {
    backgroundColor: colors.background.cardHover,
  },
});
