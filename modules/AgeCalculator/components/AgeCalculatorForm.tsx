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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Insurance Age Calculator</h1>
        <p className="mt-2 text-slate-600">
          Enter the client's date of birth to calculate their actual and insurance-applicable age.
        </p>
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-2">
          Client's Date of Birth
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 placeholder-slate-400"
                />
            </div>
          <button
            onClick={onCalculate}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <Spinner /> : 'Calculate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculatorForm;
