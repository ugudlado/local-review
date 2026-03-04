import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTodoStore } from '../todoStore';
import { todoApi } from '../../services/api';
import type { TodoResponse } from '@todos/schema';

vi.mock('../../services/api', () => ({
  todoApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    toggle: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('todoStore', () => {
  const mockTodo: TodoResponse = {
    id: '1',
    title: 'Test Todo',
    description: 'Test description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Reset store state
    useTodoStore.setState({
      todos: [],
      loading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('fetchTodos', () => {
    it('should fetch and store todos', async () => {
      vi.mocked(todoApi.getAll).mockResolvedValue([mockTodo]);

      await useTodoStore.getState().fetchTodos();

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toBe('Test Todo');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle fetch error', async () => {
      vi.mocked(todoApi.getAll).mockRejectedValue(new Error('Network error'));

      await useTodoStore.getState().fetchTodos();

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(0);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });

  describe('addTodo', () => {
    it('should add new todo to store', async () => {
      vi.mocked(todoApi.create).mockResolvedValue(mockTodo);

      await useTodoStore.getState().addTodo('Test Todo', 'Test description');

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toBe('Test Todo');
    });

    it('should handle create error', async () => {
      vi.mocked(todoApi.create).mockRejectedValue(new Error('Create failed'));

      await expect(
        useTodoStore.getState().addTodo('Test Todo'),
      ).rejects.toThrow('Create failed');

      const state = useTodoStore.getState();
      expect(state.error).toBe('Create failed');
    });
  });

  describe('updateTodo', () => {
    it('should update existing todo', async () => {
      // Setup initial state
      useTodoStore.setState({ todos: [mockTodo] });

      const updatedTodo = { ...mockTodo, title: 'Updated Title' };
      vi.mocked(todoApi.update).mockResolvedValue(updatedTodo);

      await useTodoStore.getState().updateTodo('1', 'Updated Title');

      const state = useTodoStore.getState();
      expect(state.todos[0].title).toBe('Updated Title');
    });
  });

  describe('toggleTodo', () => {
    it('should toggle todo completion status', async () => {
      // Setup initial state
      useTodoStore.setState({ todos: [mockTodo] });

      const toggledTodo = { ...mockTodo, completed: true };
      vi.mocked(todoApi.toggle).mockResolvedValue(toggledTodo);

      await useTodoStore.getState().toggleTodo('1');

      const state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true);
    });
  });

  describe('deleteTodo', () => {
    it('should remove todo from store', async () => {
      // Setup initial state
      useTodoStore.setState({ todos: [mockTodo] });

      vi.mocked(todoApi.delete).mockResolvedValue();

      await useTodoStore.getState().deleteTodo('1');

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(0);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      useTodoStore.setState({ error: 'Some error' });

      useTodoStore.getState().clearError();

      expect(useTodoStore.getState().error).toBeNull();
    });
  });
});
