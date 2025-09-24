import { Todo, TodoFilter } from '../types/todo';

export function generateTodoId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createTodo(text: string): Todo {
  const now = Date.now();
  return {
    id: generateTodoId(),
    text: text.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTodo(todo: Todo, updates: Partial<Pick<Todo, 'text' | 'completed'>>): Todo {
  return {
    ...todo,
    ...updates,
    updatedAt: Date.now(),
  };
}

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export function getTodoStats(todos: Todo[]) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
}