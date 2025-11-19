
import React from 'react';

interface SegmentedControlProps<T extends string> {
  name: string;
  options: { label: string; value: T; disabled?: boolean }[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({ name, options, value, onChange }: SegmentedControlProps<T>) => (
    <div className="flex bg-slate-100 p-1 rounded-lg">
        {options.map(option => (
            <button
                key={option.value}
                onClick={() => !option.disabled && onChange(option.value)}
                disabled={option.disabled}
                className={`flex-1 px-3 py-1.5 text-sm font-semibold rounded-md transition-all text-center ${
                    value === option.value ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                } ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200/50'}`}
            >
                {option.label}
            </button>
        ))}
    </div>
);

export default SegmentedControl;
