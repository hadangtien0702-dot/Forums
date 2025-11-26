
import React, { useState } from 'react';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import type { Gender, HealthStatus, QuoteResultsData, Program } from '../QuoteCalculator.types';
import { faceAmounts } from '../data/termLifeData';
import './QuoteCalculatorV2.css';

// Custom Slider component for Face Amount
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
    <label className="form-label">{label}</label>
    <div className="slider-value-display">{formatValue(value)}</div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range-slider"
    />
    <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
         <span>Min</span>
         <span>Max</span>
    </div>
  </div>
);

// Light Mode Segmented Control
function LightSegmentedControl<T extends string>({ options, value, onChange }: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
    return (
        <div className="light-segmented-control">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`segment-btn ${value === option.value ? 'active' : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

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
                  {selectedTerm === result.term && <span className="selected-badge">Recommended</span>}
                   <div className="flex-grow flex flex-col justify-center">
                      <span className="result-term">{data.params.program === 'IUL' ? 'Illustrative Premium' : `${result.term}-Year Term`}</span>
                      <span className="result-label">Monthly Payment</span>
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
    
    // Determine limits based on program
    const minAge = 1; 
    const maxAge = 70;

    const handleFaceAmountSliderChange = (index: number) => {
        const amount = faceAmounts[index] || 250000;
        handleParamChange('faceAmount', amount);
    };

    return (
        <div className="quote-calculator-v2">
            <div className="card-content">
                {/* Left Side - Form */}
                <div className="form-panel">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                             <div>
                                <h2 className="text-2xl font-bold text-slate-800">Quote Calculator</h2>
                                <p className="text-sm text-slate-500 mt-1">Customize your plan</p>
                             </div>
                             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                             </div>
                        </div>
                        
                         <div>
                            <label className="form-label">Program Type</label>
                            <LightSegmentedControl<Program>
                                value={params.program}
                                onChange={(val) => handleParamChange('program', val)}
                                options={[ { label: 'Term-Life', value: 'TERM' }, { label: 'IUL', value: 'IUL' } ]}
                            />
                        </div>

                        {/* AGE INPUT - CHANGED TO BOX */}
                        <div>
                            <label className="form-label">Client's Age</label>
                            <div className="age-input-container">
                                <input 
                                    type="number" 
                                    value={params.age || ''}
                                    onChange={(e) => handleParamChange('age', parseInt(e.target.value))}
                                    placeholder="0"
                                    min={minAge}
                                    max={maxAge}
                                    className="age-input"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold pointer-events-none">Years Old</span>
                            </div>
                        </div>

                        {/* FACE AMOUNT - KEPT AS SLIDER */}
                        <CustomSlider
                            label="Face Amount"
                            value={faceAmountIndex !== -1 ? faceAmountIndex : 2} 
                            min={0}
                            max={faceAmounts.length - 1}
                            step={1}
                            onChange={handleFaceAmountSliderChange}
                            formatValue={() => formatCurrency(params.faceAmount || 0)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Gender</label>
                                <LightSegmentedControl<Gender>
                                    value={params.gender}
                                    onChange={(val) => handleParamChange('gender', val)}
                                    options={[ { label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' } ]}
                                />
                            </div>

                             <div>
                                <label className="form-label">Health</label>
                                <LightSegmentedControl<HealthStatus>
                                    value={params.healthStatus}
                                    onChange={(val) => handleParamChange('healthStatus', val)}
                                    options={[ { label: 'NTBC', value: 'NTBC' }, { label: 'TBC', value: 'TBC' }, { label: 'EX1', value: 'EX1' } ]}
                                />
                            </div>
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
                                 <div className="text-4xl mb-4">⚠️</div>
                                 <p className="font-bold text-slate-800 text-lg">Calculation Error</p>
                                 <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">{error}</p>
                            </div>
                         </div>
                    )}
                    {!isLoading && !error && !results && (
                         <div className="results-placeholder">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-100 shadow-sm">
                                     <svg className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="font-bold text-slate-700 text-lg">Ready to Calculate</p>
                                <p className="text-sm text-slate-400 mt-1">Enter details to see the premium estimate.</p>
                            </div>
                         </div>
                    )}
                    {!isLoading && !error && results && (
                         <div className="results-wrapper fade-in-up">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculation Results</h4>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Live Quote</span>
                            </div>
                            
                            <ResultsPanel data={results} />
                            
                            {results.params.program === 'IUL' && (results.pdfUrl || results.csvUrl) && (
                                <div className="download-resources">
                                    <h4 className="download-title">Available Documents</h4>
                                    {results.pdfUrl && (
                                        <a href={results.pdfUrl} target="_blank" rel="noopener noreferrer" className="download-item">
                                            <div className="download-icon-wrapper">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="download-name">Full Illustration</p>
                                                <p className="download-meta">PDF Document • Download</p>
                                            </div>
                                            <div className="text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
                                    {results.csvUrl && (
                                        <a href={results.csvUrl} target="_blank" rel="noopener noreferrer" className="download-item">
                                            <div className="download-icon-wrapper">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="download-name">Rate Data</p>
                                                <p className="download-meta">CSV Spreadsheet • Download</p>
                                            </div>
                                            <div className="text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
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
