import React, { useState } from 'react';
import { Check, X, Edit3, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group flex items-center gap-3 p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {todo.completed && <Check size={14} />}
      </button>

      {/* Todo content */}
      <div className="flex-grow min-w-0">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-2 py-1 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What needs to be done?"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 text-green-600 hover:text-green-800 transition-colors duration-200"
              title="Save"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              title="Cancel"
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <span
            className={`block text-gray-900 transition-all duration-200 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action buttons */}
      {!isEditing && (
        <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            title="Edit todo"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200"
            title="Delete todo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}