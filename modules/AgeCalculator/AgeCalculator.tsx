
'use client';

import React from 'react';
import { useAgeCalculator } from './hooks/useAgeCalculator';
import AgeCalculatorForm from './components/AgeCalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import LogTable from './components/LogTable';
import Spinner from '../../shared/ui/Spinner';

export default function AgeCalculatorPage() {
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Insurance Age Calculator</h1>
        <p className="mt-2 text-slate-600">
          Enter the client's date of birth to calculate their actual and insurance-applicable age.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Card: Calculator and Results */}
          <div className="xl:col-span-7">
              <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80">
                  <div className="p-6 sm:p-8">
                    <AgeCalculatorForm
                        dob={dob}
                        isLoading={isLoading}
                        onDobChange={handleDobChange}
                        onCalculate={handleCalculate}
                    />
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      {error && (
                          <div className="p-4 text-center bg-red-50 text-red-700 font-medium rounded-lg border border-red-200">{error}</div>
                      )}
                      
                      {isLoading && (
                          <div className="flex flex-col items-center justify-center text-center text-slate-500 py-8">
                              <Spinner />
                              <p className="mt-2 font-medium">Calculating age...</p>
                          </div>
                      )}
                      
                      {result && !isLoading && <ResultDisplay result={result} />}
                  </div>
              </div>
          </div>

          {/* Right Card: History */}
          <div className="xl:col-span-5">
              <LogTable logs={logs} onClear={handleClearLogs} />
          </div>
      </div>
    </div>
  );
}
