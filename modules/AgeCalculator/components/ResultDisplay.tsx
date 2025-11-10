import React from 'react';
import type { CalculationResult } from '../AgeCalculator.types';

interface ResultDisplayProps {
  result: CalculationResult;
}

const ResultItem: React.FC<{ label: string; value: string | number; valueClasses?: string }> = ({ label, value, valueClasses = '' }) => (
  <div className="flex justify-between items-baseline py-4">
    <span className="text-slate-600">{label}</span>
    <span className={`font-bold text-slate-800 text-xl ${valueClasses}`}>{value}</span>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isUrgent = result.daysRemaining <= 30;

  return (
    <div className="border-t border-slate-200 pt-6">
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-2">Calculation Result</h2>
      <div className="divide-y divide-slate-100">
        <ResultItem label="Actual Age" value={result.actualAge} />
        <ResultItem label="Insurance Age" value={result.insuranceAge} valueClasses="text-blue-600" />
        <ResultItem label="Next Age-Up Date" value={result.nextAgeDate} />
      </div>
      <div className={`mt-6 p-4 rounded-lg text-center ${isUrgent ? 'bg-red-50' : 'bg-green-50'}`}>
        <p className="text-sm font-medium text-slate-600">Days Until Next Age-Up</p>
        <p className={`text-4xl font-bold ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
          {result.daysRemaining}
        </p>
         <p className={`text-sm ${isUrgent ? 'text-red-500' : 'text-green-500'}`}>
            {isUrgent ? "Action may be required soon." : "Plenty of time remaining."}
         </p>
      </div>
    </div>
  );
};

export default ResultDisplay;