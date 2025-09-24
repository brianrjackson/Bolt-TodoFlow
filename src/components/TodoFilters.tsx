import React from 'react';
import { TodoFilter } from '../types/todo';

interface TodoFiltersProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filterLabels: Record<TodoFilter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  activeCount, 
  completedCount,
  onClearCompleted 
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center gap-1">
        {(Object.keys(filterLabels) as TodoFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              currentFilter === filter
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
          >
            {filterLabels[filter]}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>
        
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}