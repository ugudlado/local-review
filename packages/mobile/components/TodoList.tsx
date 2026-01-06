import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { TodoItem } from './TodoItem';
import { colors } from '../theme';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onRefresh: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  isLoading,
  onRefresh,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0 && !isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No todos yet</Text>
        <Text style={styles.emptySubtext}>Add your first todo above</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem todo={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={colors.primary.DEFAULT}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
});
