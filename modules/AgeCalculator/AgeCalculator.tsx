import React from 'react';
import { useAgeCalculator } from './hooks/useAgeCalculator';
import AgeCalculatorForm from './components/AgeCalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import LogTable from './components/LogTable';

const AgeCalculatorPage: React.FC = () => {
  const {
    dob,
    result,
    error,
    isLoading,
    logs,
    handleCalculate,
    handleDobChange,
    handleClearLogs,
  } = useAgeCalculator();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Left Column: Calculator */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
          <AgeCalculatorForm
            dob={dob}
            isLoading={isLoading}
            onDobChange={handleDobChange}
            onCalculate={handleCalculate}
          />
          
          {error && (
             <div className="mt-6 p-4 text-center bg-red-50 text-red-700 font-medium rounded-lg border border-red-200">{error}</div>
          )}

          {result && !isLoading && <ResultDisplay result={result} dob={dob} />}
        </div>
      </div>

      {/* Right Column: Logs */}
      <div className="lg:col-span-1">
        <LogTable logs={logs} onClear={handleClearLogs} />
      </div>

    </div>
  );
};

export default AgeCalculatorPage;