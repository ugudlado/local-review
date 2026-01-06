/**
 * Todo store using Zustand
 * Manages todo state and API interactions with logging
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';
import { logger } from '../utils/logger';

interface TodoState {
  // Data
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (input: CreateTodoInput) => Promise<void>;
  updateTodo: (id: string, input: UpdateTodoInput) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

// Storage key for offline persistence
const STORAGE_KEY = '@todos/data';

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    logger.debug('Fetching todos');
    set({ isLoading: true, error: null });

    try {
      // Try to fetch from API
      const todos = await api.getTodos();
      logger.info(`Fetched ${todos.length} todos from API`);
      set({ todos, isLoading: false });

      // Cache for offline use
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      logger.debug('Cached todos to AsyncStorage');
    } catch (error) {
      logger.logError('Failed to fetch todos from API', error);

      // On error, try to load from cache
      try {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          const todos = JSON.parse(cached);
          logger.info(`Loaded ${todos.length} todos from cache`);
          set({ todos, isLoading: false });
          return;
        }
      } catch (cacheError) {
        logger.logError('Failed to load from cache', cacheError);
      }

      set({
        error: error instanceof Error ? error.message : 'Failed to fetch todos',
        isLoading: false,
      });
    }
  },

  addTodo: async (input: CreateTodoInput) => {
    logger.debug('Adding todo', { title: input.title });
    set({ error: null });

    try {
      const newTodo = await api.createTodo(input);
      logger.info('Todo added', { id: newTodo.id, title: newTodo.title });
      set((state) => ({
        todos: [newTodo, ...state.todos],
      }));

      // Update cache
      const { todos } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      logger.logError('Failed to add todo', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to add todo',
      });
      throw error;
    }
  },

  updateTodo: async (id: string, input: UpdateTodoInput) => {
    logger.debug('Updating todo', { id });
    set({ error: null });

    try {
      const updatedTodo = await api.updateTodo(id, input);
      logger.info('Todo updated', { id: updatedTodo.id });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        ),
      }));

      // Update cache
      const { todos } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      logger.logError('Failed to update todo', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to update todo',
      });
      throw error;
    }
  },

  toggleTodo: async (id: string) => {
    logger.debug('Toggling todo', { id });
    set({ error: null });

    // Optimistic update
    const originalTodos = get().todos;
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
    logger.debug('Optimistically toggled todo');

    try {
      const updatedTodo = await api.toggleTodo(id);
      logger.info('Todo toggled', { id: updatedTodo.id, completed: updatedTodo.completed });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        ),
      }));

      // Update cache
      const { todos } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      // Rollback on error
      logger.warn('Rolling back optimistic toggle', { id });
      set({ todos: originalTodos });
      logger.logError('Failed to toggle todo', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to toggle todo',
      });
      throw error;
    }
  },

  deleteTodo: async (id: string) => {
    logger.debug('Deleting todo', { id });
    set({ error: null });

    // Optimistic update
    const originalTodos = get().todos;
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
    logger.debug('Optimistically deleted todo');

    try {
      await api.deleteTodo(id);
      logger.info('Todo deleted', { id });

      // Update cache
      const { todos } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      // Rollback on error
      logger.warn('Rolling back optimistic delete', { id });
      set({ todos: originalTodos });
      logger.logError('Failed to delete todo', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to delete todo',
      });
      throw error;
    }
  },

  clearError: () => {
    logger.debug('Clearing error');
    set({ error: null });
  },
}));
