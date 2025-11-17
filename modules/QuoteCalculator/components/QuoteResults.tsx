
import React from 'react';
import type { QuoteResultsData } from '../QuoteCalculator.types';

const formatCurrency = (amount: number | null) => {
    if (amount === null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

interface QuoteResultsProps {
  data: QuoteResultsData;
}

const QuoteResults: React.FC<QuoteResultsProps> = ({ data }) => {
    const { params, results } = data;
    return (
        <div>
            <h2 className="text-xl font-bold text-slate-800">Your Term-Life Quote</h2>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="font-medium text-slate-500">Age</p>
                    <p className="font-semibold text-slate-800">{params.age}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Gender</p>
                    <p className="font-semibold text-slate-800">{params.gender}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Health Status</p>
                    <p className="font-semibold text-slate-800">{params.healthStatus}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Face Amount</p>
                    <p className="font-semibold text-slate-800">{formatCurrency(params.faceAmount).replace('.00', '')}</p>
                </div>
            </div>
            <div className="mt-4">
                <ul className="divide-y divide-slate-100">
                    {results.map(result => (
                        <li key={result.term} className="flex justify-between items-center py-4">
                            <span className="font-semibold text-slate-600">{result.term}-Year Term</span>
                            <span className="font-bold text-xl text-blue-600">{formatCurrency(result.premium)}<span className="text-sm font-medium text-slate-500">/mo</span></span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuoteResults;
