import React from 'react';
import type { LogEntry } from '../AgeCalculator.types';

interface LogTableProps {
  logs: LogEntry[];
  onClear: () => void;
}

const LogTable: React.FC<LogTableProps> = ({ logs, onClear }) => {
  const formatTimestamp = (timestamp: string) => {
    // New entries are ISO strings, which are parsed correctly by `new Date()`.
    // Old entries might be locale strings which `new Date()` may fail to parse.
    const date = new Date(timestamp);

    if (!isNaN(date.getTime())) {
      // Successfully parsed, return the time portion.
      return date.toLocaleTimeString('en-US');
    }

    // Fallback for old, unparsable formats.
    // We assume the time part is the one containing a colon.
    const parts = timestamp.split(',');
    const timePart = parts.find(part => part.includes(':'));
    return timePart ? timePart.trim() : timestamp;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 h-full">
      <div className="flex justify-between items-center p-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-lg font-bold text-slate-800">Calculation History</h2>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            Clear
          </button>
        )}
      </div>
      <div className="p-2">
         {logs.length === 0 ? (
            <div className="text-center p-10 text-slate-500">No calculation history yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Time</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">DOB</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider text-center">Issued Age</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-3 text-slate-500 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">{log.dob}</td>
                      <td className="p-3 text-slate-800 font-bold text-center">{log.insuranceAge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}

export default LogTable;