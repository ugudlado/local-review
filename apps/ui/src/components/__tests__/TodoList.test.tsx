import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from '../TodoList';
import { useTodoStore } from '../../stores/todoStore';

vi.mock('../../stores/todoStore');

describe('TodoList', () => {
  const mockFetchTodos = vi.fn();
  const mockToggleTodo = vi.fn();
  const mockDeleteTodo = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);

    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      loading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });
  });

  it('should fetch todos on mount', () => {
    render(<TodoList />);
    expect(mockFetchTodos).toHaveBeenCalledOnce();
  });

  it('should display loading state', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      loading: true,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText('Loading todos...')).toBeInTheDocument();
  });

  it('should display todos', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test description',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      loading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should display completed todo with line-through', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [
        {
          id: '1',
          title: 'Completed Todo',
          description: null,
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      loading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);
    const title = screen.getByText('Completed Todo');
    expect(title).toHaveClass('line-through');
  });

  it('should display error message', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      loading: false,
      error: 'Failed to fetch todos',
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument();
  });

  it('should handle toggle todo', async () => {
    const user = userEvent.setup();

    vi.mocked(useTodoStore).mockReturnValue({
      todos: [
        {
          id: '1',
          title: 'Test Todo',
          description: null,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      loading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      expect(mockToggleTodo).toHaveBeenCalledWith('1');
    });
  });

  it('should handle delete todo', async () => {
    const user = userEvent.setup();

    vi.mocked(useTodoStore).mockReturnValue({
      todos: [
        {
          id: '1',
          title: 'Test Todo',
          description: null,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      loading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      clearError: mockClearError,
      addTodo: vi.fn(),
      updateTodo: vi.fn(),
    });

    render(<TodoList />);

    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith('1');
    });
  });

  it('should display empty state message', () => {
    render(<TodoList />);
    expect(
      screen.getByText('No todos found. Add one to get started!'),
    ).toBeInTheDocument();
  });
});
