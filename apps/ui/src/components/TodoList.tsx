import { useEffect } from 'react';
import { useTodoStore } from '../stores/todoStore';

export function TodoList() {
  const { todos, loading, error, fetchTodos, toggleTodo, deleteTodo, clearError } =
    useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggle = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  if (loading && todos.length === 0) {
    return <div className="text-center py-4">Loading todos...</div>;
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={clearError}
            className="absolute top-0 right-0 px-4 py-3"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {todos.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              No todos found. Add one to get started!
            </li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-medium ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-900'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p
                          className={`text-sm ${
                            todo.completed ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-600 hover:text-red-800 font-medium ml-4"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
