
'use client';

import React, { useState } from 'react';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import type { Gender, HealthStatus, QuoteResultsData, Program } from '../QuoteCalculator.types';
import { faceAmounts as termFaceAmounts } from '../data/termLifeData';

const iulFaceAmounts = [
    100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 
    300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 
    500000, 525000, 550000, 575000, 600000, 625000, 650000, 675000, 
    700000, 725000, 750000, 775000, 1000000
];

const CustomSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
}> = ({ label, value, min, max, step, onChange, formatValue }) => (
  <div className="pt-2">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="text-4xl font-extrabold text-blue-600 mb-4 tracking-tight leading-none">{formatValue(value)}</div>
    <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
    </div>
    <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
         <span>Min</span>
         <span>Max</span>
    </div>
  </div>
);

function LightSegmentedControl<T extends string>({ options, value, onChange }: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
    return (
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-all duration-200 ${
                        value === option.value 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

const ResultsPanel: React.FC<{ data: QuoteResultsData }> = ({ data }) => {
    const [selectedTerm, setSelectedTerm] = useState(data.results[0]?.term || null);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2,
    }).format(amount);

    return (
        <div className="space-y-3 w-full">
            {data.results.map(result => (
                <div
                    key={result.term}
                    onClick={() => setSelectedTerm(result.term)}
                    className={`group flex items-center w-full p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative ${
                        selectedTerm === result.term 
                        ? 'bg-blue-50 border-blue-500 shadow-md' 
                        : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                    }`}
                >
                  {selectedTerm === result.term && (
                      <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm">
                          Recommended
                      </span>
                  )}
                   <div className="flex-grow flex flex-col">
                      <span className="text-base font-bold text-slate-800">
                          {data.params.program === 'IUL' ? 'Illustrative Premium' : `${result.term}-Year Term`}
                      </span>
                      <span className="text-xs font-medium text-slate-500">Monthly Payment</span>
                  </div>
                  <span className={`text-2xl font-black ${selectedTerm === result.term ? 'text-blue-600' : 'text-slate-800'}`}>
                      {formatCurrency(result.premium)}
                  </span>
                </div>
            ))}
        </div>
    );
};


export default function QuoteCalculatorV2() {
    const { params, results, isLoading, error, handleParamChange, getQuote } = useQuoteCalculator();

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);

    const currentFaceAmounts = params.program === 'IUL' ? iulFaceAmounts : termFaceAmounts;
    const faceAmountIndex = currentFaceAmounts.indexOf(params.faceAmount || 250000);
    const sliderValue = faceAmountIndex !== -1 ? faceAmountIndex : 0;
    
    const minAge = 1; 
    const maxAge = 70;

    const handleFaceAmountSliderChange = (index: number) => {
        const amount = currentFaceAmounts[index] || 250000;
        handleParamChange('faceAmount', amount);
    };

    React.useEffect(() => {
        if (params.faceAmount && !currentFaceAmounts.includes(params.faceAmount)) {
             handleParamChange('faceAmount', currentFaceAmounts[0]);
        }
    }, [params.program, currentFaceAmounts, params.faceAmount, handleParamChange]);

    return (
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                {/* Left Side - Form */}
                <div className="flex flex-col gap-8 lg:border-r lg:border-slate-100 lg:pr-12">
                    <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quote Calculator</h2>
                            <p className="text-sm text-slate-500 font-medium mt-1">Customize your plan instantly</p>
                         </div>
                         <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm ring-1 ring-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                         </div>
                    </div>
                    
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Program Type</label>
                        <LightSegmentedControl<Program>
                            value={params.program}
                            onChange={(val) => handleParamChange('program', val)}
                            options={[ { label: 'Term-Life', value: 'TERM' }, { label: 'IUL', value: 'IUL' } ]}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client's Age</label>
                        <div className="relative group">
                            <input 
                                type="number" 
                                value={params.age || ''}
                                onChange={(e) => handleParamChange('age', parseInt(e.target.value))}
                                placeholder="0"
                                min={minAge}
                                max={maxAge}
                                className="w-full text-4xl font-extrabold text-slate-800 py-4 px-5 border-2 border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none uppercase tracking-wide">Years Old</span>
                        </div>
                    </div>

                    <CustomSlider
                        label="Face Amount"
                        value={sliderValue} 
                        min={0}
                        max={currentFaceAmounts.length - 1}
                        step={1}
                        onChange={handleFaceAmountSliderChange}
                        formatValue={() => formatCurrency(currentFaceAmounts[sliderValue] || 0)}
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                            <LightSegmentedControl<Gender>
                                value={params.gender}
                                onChange={(val) => handleParamChange('gender', val)}
                                options={[ { label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' } ]}
                            />
                        </div>

                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Health</label>
                            <LightSegmentedControl<HealthStatus>
                                value={params.healthStatus}
                                onChange={(val) => handleParamChange('healthStatus', val)}
                                options={[ { label: 'NTBC', value: 'NTBC' }, { label: 'TBC', value: 'TBC' }, { label: 'EX1', value: 'EX1' } ]}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={getQuote} 
                        disabled={isLoading} 
                        className="w-full flex items-center justify-center py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all active:translate-y-0 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed mt-auto"
                    >
                        {isLoading ? 'Calculating...' : (
                            <>
                            Calculate Premium
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            </>
                        )}
                    </button>
                </div>

                {/* Right Side - Results */}
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center min-h-[500px] items-center">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center w-full gap-4">
                             <div className="w-full space-y-4">
                                <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 animate-shimmer [background-size:200%_100%]"></div>
                                <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 animate-shimmer [background-size:200%_100%] delay-75"></div>
                                <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 animate-shimmer [background-size:200%_100%] delay-150"></div>
                             </div>
                        </div>
                    )}
                    {!isLoading && error && (
                         <div className="flex flex-col items-center justify-center text-center h-full text-slate-500">
                                <div className="text-5xl mb-4">⚠️</div>
                                <p className="font-bold text-slate-800 text-lg">Calculation Error</p>
                                <p className="text-sm mt-2 max-w-xs mx-auto">{error}</p>
                         </div>
                    )}
                    {!isLoading && !error && !results && (
                         <div className="flex flex-col items-center justify-center text-center h-full text-slate-400">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-slate-100 shadow-sm">
                                 <svg className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="font-bold text-slate-600 text-xl">Ready to Calculate</p>
                            <p className="text-sm mt-2">Enter details to see the premium estimate.</p>
                         </div>
                    )}
                    {!isLoading && !error && results && (
                         <div className="w-full animate-fadeInUp-custom">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Calculation Results</h4>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded uppercase tracking-wide">Live Quote</span>
                            </div>
                            
                            <ResultsPanel data={results} />
                            
                            {results.params.program === 'IUL' && (results.pdfUrl || results.csvUrl) && (
                                <div className="mt-10 pt-8 border-t border-slate-200 animate-fadeInUp-custom" style={{ animationDelay: '0.1s' }}>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Downloads</h4>
                                    <div className="space-y-3">
                                    {results.pdfUrl && (
                                        <a href={results.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Full Illustration</p>
                                                <p className="text-xs text-slate-500">PDF Document</p>
                                            </div>
                                            <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
                                    {results.csvUrl && (
                                        <a href={results.csvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-green-300 hover:shadow-md transition-all group">
                                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-green-600 transition-colors">Rate Data</p>
                                                <p className="text-xs text-slate-500">CSV Spreadsheet</p>
                                            </div>
                                            <div className="text-slate-300 group-hover:text-green-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
