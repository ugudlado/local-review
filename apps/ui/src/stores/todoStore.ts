import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { TodoResponse } from '@todos/schema';
import { todoApi } from '../services/api';
import { logger } from '../utils/logger';

interface TodoState {
  todos: TodoResponse[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (id: string, title?: string, description?: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    loading: false,
    error: null,

    fetchTodos: async () => {
      logger.debug('Fetching todos');
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const todos = await todoApi.getAll();
        logger.info(`Fetched ${todos.length} todos`);
        set((state) => {
          state.todos = todos;
          state.loading = false;
        });
      } catch (error) {
        logger.logError('Failed to fetch todos', error);
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to fetch todos';
          state.loading = false;
        });
      }
    },

    addTodo: async (title: string, description?: string) => {
      logger.debug('Adding todo', { title });
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const newTodo = await todoApi.create({ title, description, completed: false });
        logger.info('Todo added', { id: newTodo.id, title: newTodo.title });
        set((state) => {
          state.todos.push(newTodo);
          state.loading = false;
        });
      } catch (error) {
        logger.logError('Failed to add todo', error);
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to create todo';
          state.loading = false;
        });
        throw error;
      }
    },

    updateTodo: async (id: string, title?: string, description?: string) => {
      logger.debug('Updating todo', { id, title, description });
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const updated = await todoApi.update(id, { title, description });
        logger.info('Todo updated', { id: updated.id });
        set((state) => {
          const index = state.todos.findIndex((t) => t.id === id);
          if (index !== -1) {
            state.todos[index] = updated;
          }
          state.loading = false;
        });
      } catch (error) {
        logger.logError('Failed to update todo', error);
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to update todo';
          state.loading = false;
        });
        throw error;
      }
    },

    toggleTodo: async (id: string) => {
      logger.debug('Toggling todo', { id });
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const updated = await todoApi.toggle(id);
        logger.info('Todo toggled', { id: updated.id, completed: updated.completed });
        set((state) => {
          const index = state.todos.findIndex((t) => t.id === id);
          if (index !== -1) {
            state.todos[index] = updated;
          }
          state.loading = false;
        });
      } catch (error) {
        logger.logError('Failed to toggle todo', error);
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to toggle todo';
          state.loading = false;
        });
        throw error;
      }
    },

    deleteTodo: async (id: string) => {
      logger.debug('Deleting todo', { id });
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        await todoApi.delete(id);
        logger.info('Todo deleted', { id });
        set((state) => {
          state.todos = state.todos.filter((t) => t.id !== id);
          state.loading = false;
        });
      } catch (error) {
        logger.logError('Failed to delete todo', error);
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Failed to delete todo';
          state.loading = false;
        });
        throw error;
      }
    },

    clearError: () => {
      logger.debug('Clearing error');
      set((state) => {
        state.error = null;
      });
    },
  })),
);
