import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors, shadows } from '../theme';
import { CreateTodoInput } from '../types';

interface AddTodoFormProps {
  onSubmit: (input: CreateTodoInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function AddTodoForm({ onSubmit, isSubmitting = false }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setShowDescription(false);
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={[styles.container, shadows.md]}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.text.muted}
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            editable={!isSubmitting}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              (!title.trim() || isSubmitting) && styles.addButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!title.trim() || isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Add todo"
          >
            <Plus size={24} color={colors.primary.foreground} />
          </TouchableOpacity>
        </View>

        {showDescription ? (
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add a description (optional)"
            placeholderTextColor={colors.text.muted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={2}
            editable={!isSubmitting}
          />
        ) : (
          <TouchableOpacity
            style={styles.addDescriptionButton}
            onPress={() => setShowDescription(true)}
          >
            <Text style={styles.addDescriptionText}>+ Add description</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background.elevated,
    borderRadius: 8,
    marginRight: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  descriptionInput: {
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background.elevated,
    borderRadius: 8,
    marginTop: 12,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addDescriptionButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
  addDescriptionText: {
    fontSize: 14,
    color: colors.text.muted,
  },
});
