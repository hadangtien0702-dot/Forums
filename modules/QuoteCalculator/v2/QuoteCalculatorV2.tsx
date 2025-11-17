

import React, { useState } from 'react';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import type { Gender, HealthStatus, QuoteResultsData } from '../QuoteCalculator.types';
import { faceAmounts } from '../data/termLifeData';
import './QuoteCalculatorV2.css'; // New CSS file

// Custom Slider component for this layout
const CustomSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
}> = ({ label, value, min, max, step, onChange, formatValue }) => (
  <div className="slider-container">
    <div className="flex justify-between items-baseline mb-2">
      <label className="text-sm font-normal text-slate-400">{label}</label>
      <span className="text-2xl font-bold text-white tracking-tight">{formatValue(value)}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-slider"
    />
  </div>
);


// Re-styled SegmentedControl for dark theme
const DarkSegmentedControl = <T extends string>({ options, value, onChange }: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) => (
    <div className="flex bg-slate-900/50 p-1 rounded-lg">
        {options.map(option => (
            <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-all text-center relative ${
                    value === option.value ? 'text-white' : 'text-slate-300 hover:bg-slate-700/50'
                }`}
            >
                {value === option.value && <div className="absolute inset-0 bg-blue-600 rounded-md motion-safe:animate-fade-in z-0" />}
                <span className="relative z-10">{option.label}</span>
            </button>
        ))}
    </div>
);


// Results Display
const ResultsPanel: React.FC<{ data: QuoteResultsData }> = ({ data }) => {
    const [selectedTerm, setSelectedTerm] = useState(data.results[0]?.term || null);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2,
    }).format(amount);

    return (
        <div className="space-y-3">
            {data.results.map(result => (
                <div
                    key={result.term}
                    onClick={() => setSelectedTerm(result.term)}
                    className={`result-item ${selectedTerm === result.term ? 'selected' : ''}`}
                >
                  {selectedTerm === result.term && <span className="selected-badge">Selected</span>}
                   <div className="flex-grow flex flex-col justify-center">
                      <span className="result-term">{data.params.program === 'IUL' ? 'Illustrative Premium' : `${result.term}-Year Term`}</span>
                      <span className="result-label">Monthly Premium</span>
                  </div>
                  <span className="result-premium">{formatCurrency(result.premium)}</span>
                </div>
            ))}
        </div>
    );
};


const QuoteCalculatorV2: React.FC = () => {
    const { params, results, isLoading, error, handleParamChange, getQuote } = useQuoteCalculator();

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);

    // Find the index of the current face amount for the slider
    const faceAmountIndex = faceAmounts.indexOf(params.faceAmount || 250000);

    const handleFaceAmountSliderChange = (index: number) => {
        handleParamChange('faceAmount', faceAmounts[index]);
    };

    return (
        <div className="quote-calculator-v2">
            <div className="card-content">
                {/* Left Side - Form */}
                <div className="form-panel">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Premium Insurance Estimator</h2>
                        
                        <CustomSlider
                            label="Client's Age"
                            value={params.age || 35}
                            min={20}
                            max={70}
                            step={1}
                            onChange={(val) => handleParamChange('age', val)}
                            formatValue={(val) => String(val)}
                        />

                        <CustomSlider
                            label="Face Amount"
                            value={faceAmountIndex}
                            min={0}
                            max={faceAmounts.length - 1}
                            step={1}
                            onChange={handleFaceAmountSliderChange}
                            formatValue={() => formatCurrency(params.faceAmount || 0)}
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                            <DarkSegmentedControl<Gender>
                                value={params.gender}
                                onChange={(val) => handleParamChange('gender', val)}
                                options={[ { label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' } ]}
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Health Status</label>
                            <DarkSegmentedControl<HealthStatus>
                                value={params.healthStatus}
                                onChange={(val) => handleParamChange('healthStatus', val)}
                                options={[ { label: 'SNTBC', value: 'SNTBC' }, { label: 'STBC', value: 'STBC' }, { label: 'ENTBC1', value: 'ENTBC1' } ]}
                            />
                        </div>

                        <button onClick={getQuote} disabled={isLoading} className="get-quote-btn">
                            {isLoading ? 'Calculating...' : (
                                <>
                                Calculate Premium
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Side - Results */}
                <div className="results-panel">
                    {isLoading && (
                        <div className="results-placeholder">
                            <div className="shimmer-wrapper">
                                <div className="shimmer-bar" />
                                <div className="shimmer-bar" style={{ animationDelay: '0.1s' }} />
                                <div className="shimmer-bar" style={{ animationDelay: '0.2s' }} />
                                <div className="shimmer-bar" style={{ animationDelay: '0.3s' }} />
                            </div>
                        </div>
                    )}
                    {!isLoading && error && (
                         <div className="results-placeholder">
                            <div className="text-center">
                                 <div className="text-2xl mb-2">⚠️</div>
                                 <p className="font-semibold text-white">Calculation Error</p>
                                 <p className="text-sm text-slate-400 max-w-xs mx-auto">{error}</p>
                            </div>
                         </div>
                    )}
                    {!isLoading && !error && !results && (
                         <div className="results-placeholder">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <p className="mt-4 font-semibold text-white">Your quote will appear here</p>
                                <p className="text-sm text-slate-400">Fill out the form to get an estimate.</p>
                            </div>
                         </div>
                    )}
                    {!isLoading && !error && results && (
                         <div className="results-wrapper">
                            <ResultsPanel data={results} />
                            
                            {results.params.program === 'IUL' && (
                                <div className="download-resources">
                                    <h4 className="download-title">Downloadable Resources</h4>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="download-item">
                                        <div className="download-icon-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="download-name">Product Brochure</p>
                                            <p className="download-meta">PDF Document</p>
                                        </div>
                                        <div className="download-action-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="download-item">
                                        <div className="download-icon-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="download-name">Policy Illustration</p>
                                            <p className="download-meta">PDF Document</p>
                                        </div>
                                        <div className="download-action-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculatorV2;