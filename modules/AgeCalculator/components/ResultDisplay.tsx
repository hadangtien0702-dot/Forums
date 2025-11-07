import React, { useState } from 'react';
import type { CalculationResult } from '../AgeCalculator.types';

interface ResultDisplayProps {
  result: CalculationResult;
  dob: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, dob }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUrgent = result.daysRemaining <= 30;

  const handleCopy = () => {
    if (isCopied) return;

    const textToCopy = `Client DOB: ${dob}\nIssued Age (Insurance): ${result.insuranceAge}\nDays Remaining: ${result.daysRemaining}\nNext Age-Up Date: ${result.nextAgeDate}\nActual Age: ${result.actualAge}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy results.');
    });
  };
  
  return (
    <div className="mt-8 pt-8 border-t border-slate-200 relative">
       <button 
            onClick={handleCopy}
            className={`absolute top-8 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isCopied 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
        >
            {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )}
            {isCopied ? 'Copied!' : 'Copy'}
        </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Info: Issued Age */}
        <div className="p-6 rounded-lg bg-blue-50 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800">Issued Age (Insurance)</h3>
          <p className="text-6xl font-bold text-blue-600 mt-2">{result.insuranceAge}</p>
        </div>

        {/* Supporting Info: Days Remaining */}
        <div className={`p-6 rounded-lg ${isUrgent ? 'bg-amber-50 border-amber-300' : 'bg-emerald-50 border-emerald-200'}`}>
           <h3 className={`text-sm font-semibold ${isUrgent ? 'text-amber-800' : 'text-emerald-800'}`}>Days Remaining</h3>
           <p className={`text-6xl font-bold mt-2 ${isUrgent ? 'text-amber-600' : 'text-emerald-600'}`}>{result.daysRemaining}</p>
            {isUrgent && (
              <p className="mt-2 text-sm font-semibold text-amber-800">
                ⚠️ Urgent action needed!
              </p>
            )}
        </div>
        
        {/* Secondary Info */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
           <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-sm text-slate-600">Actual Age: </span>
              <span className="text-sm font-bold text-slate-800">{result.actualAge}</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-sm text-slate-600">Next Age-Up Date: </span>
              <span className="text-sm font-bold text-slate-800">{result.nextAgeDate}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;