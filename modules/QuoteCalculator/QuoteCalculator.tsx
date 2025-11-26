
import React, { lazy, Suspense, useState } from 'react';
import Spinner from '../../shared/ui/Spinner';

const QuoteCalculatorV1 = lazy(() => import('./v1/QuoteCalculatorV1'));
const QuoteCalculatorV2 = lazy(() => import('./v2/QuoteCalculatorV2'));

const QuoteCalculatorPage: React.FC = () => {
    const [version, setVersion] = useState<'v1' | 'v2'>('v2');

    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
    );

    return (
        <div>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Insurance Quote Calculator</h1>
                    <p className="mt-2 text-slate-600">
                    Quickly estimate insurance premiums for Term-Life and IUL programs.
                    </p>
                </div>
                <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button 
                        onClick={() => setVersion('v1')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${version === 'v1' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                        Classic
                    </button>
                    <button 
                        onClick={() => setVersion('v2')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${version === 'v2' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                        Pro Dark
                    </button>
                </div>
            </div>
            
            <Suspense fallback={<SuspenseFallback />}>
                {version === 'v1' ? <QuoteCalculatorV1 /> : <QuoteCalculatorV2 />}
            </Suspense>
        </div>
    );
};

export default QuoteCalculatorPage;