
import React from 'react';

interface TimeFilterProps {
  active: string;
  onChange: (val: string) => void;
}

const PERIODS = ['This Month', 'Quarter', 'Year To Date'];

const TimeFilter: React.FC<TimeFilterProps> = ({ active, onChange }) => {
  return (
    <div className="inline-flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm mb-8">
      {PERIODS.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            active === period 
            ? 'bg-slate-800 text-white shadow-md transform scale-105' 
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
