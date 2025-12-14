import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  icon?: React.ReactNode;
}

export const Select = <T extends string>({ label, value, onChange, options, icon }: SelectProps<T>) => {
  return (
    <div className="w-full">
      <label className="block text-gray-400 text-sm font-medium mb-2 pl-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-netflix-red transition-colors">
          {icon}
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="block w-full pl-10 pr-10 py-3 bg-netflix-gray border border-transparent text-white rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-netflix-red focus:bg-neutral-800 transition-all cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};