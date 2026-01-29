import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { CreateTodoInput, UpdateTodoInput, TodoResponse } from '@todos/schema';
import { logger } from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Extended config to track request timing
interface RequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: number };
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - log outgoing requests
api.interceptors.request.use(
  (config: RequestConfig) => {
    config.metadata = { startTime: Date.now() };
    logger.api(config.method?.toUpperCase() || 'GET', config.url || '');
    return config;
  },
  (error: AxiosError) => {
    logger.logError('Request failed to send', error);
    return Promise.reject(error);
  }
);

// Response interceptor - log responses and errors
api.interceptors.response.use(
  (response) => {
    const config = response.config as RequestConfig;
    const duration = config.metadata ? Date.now() - config.metadata.startTime : 0;

    logger.api(
      config.method?.toUpperCase() || 'GET',
      config.url || '',
      response.status,
      duration
    );

    return response;
  },
  (error: AxiosError) => {
    const config = error.config as RequestConfig | undefined;
    const duration = config?.metadata ? Date.now() - config.metadata.startTime : 0;

    // Log the error with full context
    logger.logError('API request failed', error, {
      method: config?.method?.toUpperCase(),
      url: config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      duration,
      responseData: error.response?.data,
    });

    return Promise.reject(error);
  }
);

// API response wrapper type (server returns { success, data })
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const todoApi = {
  getAll: async (): Promise<TodoResponse[]> => {
    const response = await api.get<ApiResponse<TodoResponse[]>>('/api/todos');
    return response.data.data;
  },

  getById: async (id: string): Promise<TodoResponse> => {
    const response = await api.get<ApiResponse<TodoResponse>>(`/api/todos/${id}`);
    return response.data.data;
  },

  create: async (data: CreateTodoInput): Promise<TodoResponse> => {
    const response = await api.post<ApiResponse<TodoResponse>>('/api/todos', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateTodoInput): Promise<TodoResponse> => {
    const response = await api.put<ApiResponse<TodoResponse>>(`/api/todos/${id}`, data);
    return response.data.data;
  },

  toggle: async (id: string): Promise<TodoResponse> => {
    const response = await api.patch<ApiResponse<TodoResponse>>(`/api/todos/${id}/toggle`);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/todos/${id}`);
  },
};
