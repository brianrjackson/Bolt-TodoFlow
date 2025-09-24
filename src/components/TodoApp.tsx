import React, { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo, TodoFilter } from '../types/todo';
import { createTodo, updateTodo, filterTodos, getTodoStats } from '../utils/todoUtils';
import { TodoItem } from './TodoItem';
import { TodoFilters } from './TodoFilters';

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [newTodoText, setNewTodoText] = useState('');

  const stats = getTodoStats(todos);
  const filteredTodos = filterTodos(todos, filter);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;

    const newTodo = createTodo(text);
    setTodos([newTodo, ...todos]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? updateTodo(todo, { completed: !todo.completed })
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? updateTodo(todo, { text })
        : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => 
      updateTodo(todo, { completed: !allCompleted })
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="text-blue-600" size={36} />
            <h1 className="text-4xl font-bold text-gray-800">TodoFlow</h1>
          </div>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        {/* Main todo container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Add todo form */}
          <form onSubmit={addTodo} className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title="Add todo"
                >
                  <Plus size={20} />
                </button>
              </div>
              {todos.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAllTodos}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    todos.every(todo => todo.completed)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="Toggle all todos"
                >
                  {todos.every(todo => todo.completed) ? 'Uncheck All' : 'Check All'}
                </button>
              )}
            </div>
          </form>

          {/* Todo list */}
          {todos.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <CheckSquare size={48} className="mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">No todos yet</h3>
              <p className="text-gray-400">Add your first todo above to get started!</p>
            </div>
          ) : (
            <>
              {filteredTodos.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    No {filter === 'all' ? '' : filter} todos found
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </div>
              )}

              {/* Filters and stats */}
              <TodoFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                activeCount={stats.active}
                completedCount={stats.completed}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Double-click to edit todos • All data saved locally</p>
        </div>
      </div>
    </div>
  );
}