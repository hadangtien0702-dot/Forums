
'use client';

import React, { useState, useCallback } from 'react';
import QuoteCalculatorV2 from './v2/QuoteCalculatorV2';
import DataSyncCard from './components/DataSyncCard';

const QuoteCalculatorPage: React.FC = () => {
    const [showDataSync, setShowDataSync] = useState(false);

    const handleSyncSuccess = useCallback(() => {
        alert('Dữ liệu đã được cập nhật thành công!');
        setShowDataSync(false);
    }, []);

    const handleSyncError = useCallback((msg: string) => {
        alert(`Lỗi: ${msg}`);
    }, []);

    return (
        <div>
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Insurance Quote Calculator</h1>
                    <p className="mt-2 text-slate-600">
                    Quickly estimate insurance premiums for Term-Life and IUL programs.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                     <button
                        onClick={() => setShowDataSync(!showDataSync)}
                        className="px-4 py-2 text-sm font-semibold rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        {showDataSync ? 'Hide Data' : 'Manage Data'}
                    </button>
                </div>
            </div>
            
            {showDataSync && (
                <div className="mb-8 animate-fadeInDown-custom">
                    <DataSyncCard onSyncSuccess={handleSyncSuccess} onSyncError={handleSyncError} />
                </div>
            )}

            <QuoteCalculatorV2 />
        </div>
    );
};

export default QuoteCalculatorPage;
