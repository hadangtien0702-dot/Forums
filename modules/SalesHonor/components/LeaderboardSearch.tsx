
import React from 'react';

interface LeaderboardSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const LeaderboardSearch: React.FC<LeaderboardSearchProps> = ({ value, onChange }) => (
    <div className="relative w-full sm:w-72 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <input 
            type="text" 
            placeholder="Find an agent..." 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium placeholder-slate-400 shadow-sm hover:shadow-md focus:shadow-lg"
        />
    </div>
);

export default LeaderboardSearch;
