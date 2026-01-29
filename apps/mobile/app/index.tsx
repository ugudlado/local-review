import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useTodoStore } from '../store';
import { TodoList, AddTodoForm } from '../components';
import { colors } from '../theme';

export default function HomeScreen() {
  const { todos, isLoading, error, fetchTodos, addTodo, toggleTodo, deleteTodo, clearError } =
    useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My Todos',
          headerLargeTitle: true,
        }}
      />

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.dismissText} onPress={clearError}>
            Dismiss
          </Text>
        </View>
      )}

      <AddTodoForm onSubmit={addTodo} />

      <TodoList
        todos={todos}
        isLoading={isLoading}
        onRefresh={fetchTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.DEFAULT,
  },
  errorBanner: {
    backgroundColor: colors.destructive.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: colors.destructive.foreground,
    fontSize: 14,
    flex: 1,
  },
  dismissText: {
    color: colors.destructive.foreground,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
});
