
import React from 'react';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import QuoteForm from '../components/QuoteForm';
import QuoteResults from '../components/QuoteResults';
import Spinner from '../../../shared/ui/Spinner';

const QuoteCalculatorV1: React.FC = () => {
    const { params, results, isLoading, error, handleParamChange, getQuote } = useQuoteCalculator();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Term-Life Insurance Quote</h2>
                <p className="text-slate-500 mb-6">Enter the client's information to get a premium estimate.</p>
                <QuoteForm
                    params={params}
                    isLoading={isLoading}
                    onParamChange={handleParamChange}
                    onSubmit={getQuote}
                />
            </div>
            {/* Results Card */}
            <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8 min-h-[400px]">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <Spinner />
                        <p className="mt-2 font-medium">Calculating your quote...</p>
                    </div>
                )}
                {!isLoading && error && (
                    <div className="flex items-center justify-center h-full">
                        <div className="p-4 text-center bg-red-50 text-red-700 font-medium rounded-lg border border-red-200">{error}</div>
                    </div>
                )}
                 {!isLoading && !error && !results && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-4 font-semibold text-slate-600">Your quote will appear here.</p>
                        <p className="text-sm">Fill out the form to get started.</p>
                    </div>
                )}
                {!isLoading && !error && results && <QuoteResults data={results} />}
            </div>
        </div>
    );
};

export default QuoteCalculatorV1;
