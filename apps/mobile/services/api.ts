/**
 * API service for todo operations
 * Connects to the @todos/server backend with logging
 */

import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';
import { logger } from '../utils/logger';

// Configure API base URL - update this based on your environment
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options?.method || 'GET';
  const startTime = Date.now();

  logger.api(method, endpoint);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const duration = Date.now() - startTime;
    const json = await response.json();

    if (!response.ok) {
      const error = json as ApiErrorResponse;
      const errorMessage = error.error?.message || `API Error: ${response.status}`;

      logger.logError('API request failed', new Error(errorMessage), {
        method,
        endpoint,
        status: response.status,
        duration,
        errorCode: error.error?.code,
      });

      throw new Error(errorMessage);
    }

    logger.api(method, endpoint, response.status, duration);
    return (json as ApiResponse<T>).data;
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof TypeError && error.message === 'Network request failed') {
      logger.logError('Network error - is the server running?', error, {
        method,
        endpoint,
        duration,
        apiUrl: API_BASE_URL,
      });
    }

    throw error;
  }
}

export const api = {
  /**
   * Fetch all todos
   */
  getTodos: (): Promise<Todo[]> => {
    logger.debug('Fetching all todos');
    return request<Todo[]>('/api/todos');
  },

  /**
   * Fetch a single todo by ID
   */
  getTodo: (id: string): Promise<Todo> => {
    logger.debug('Fetching todo', { id });
    return request<Todo>(`/api/todos/${id}`);
  },

  /**
   * Create a new todo
   */
  createTodo: (data: CreateTodoInput): Promise<Todo> => {
    logger.debug('Creating todo', { title: data.title });
    return request<Todo>('/api/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update an existing todo
   */
  updateTodo: (id: string, data: UpdateTodoInput): Promise<Todo> => {
    logger.debug('Updating todo', { id });
    return request<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Toggle todo completion status
   */
  toggleTodo: (id: string): Promise<Todo> => {
    logger.debug('Toggling todo', { id });
    return request<Todo>(`/api/todos/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  /**
   * Delete a todo
   */
  deleteTodo: (id: string): Promise<void> => {
    logger.debug('Deleting todo', { id });
    return request<void>(`/api/todos/${id}`, {
      method: 'DELETE',
    });
  },
};
