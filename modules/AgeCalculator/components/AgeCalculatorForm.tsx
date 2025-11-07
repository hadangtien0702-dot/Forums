import React from 'react';
import Spinner from '../../../shared/ui/Spinner';

interface AgeCalculatorFormProps {
  dob: string;
  isLoading: boolean;
  onDobChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
}

const AgeCalculatorForm: React.FC<AgeCalculatorFormProps> = ({
  dob,
  isLoading,
  onDobChange,
  onCalculate,
}) => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Insurance Age Calculator</h1>
      <p className="mt-2 text-base text-slate-600">Enter the client's date of birth to calculate their actual and insurance-applicable age.</p>
      
      <div className="mt-8">
        <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-2">
            Client's Date of Birth
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            <div className="relative flex-grow">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                 <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
                 </svg>
               </div>
              <input
                type="text"
                id="dob"
                placeholder="MM/DD/YYYY"
                maxLength={10}
                value={dob}
                onChange={onDobChange}
                onKeyPress={(e) => e.key === 'Enter' && onCalculate()}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 placeholder-slate-400"
              />
            </div>
            <button
              onClick={onCalculate}
              disabled={isLoading}
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? <Spinner /> : null}
              {isLoading ? 'Calculating...' : 'Calculate'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculatorForm;