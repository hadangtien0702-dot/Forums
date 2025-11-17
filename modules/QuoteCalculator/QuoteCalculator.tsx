
import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const QuoteCalculatorV1 = lazy(() => import('./v1/QuoteCalculatorV1'));
// const QuoteCalculatorV2 = lazy(() => import('./v2/QuoteCalculatorV2'));
// const QuoteCalculatorV3 = lazy(() => import('./v3/QuoteCalculatorV3'));

const LayoutButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = memo(({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
));


const QuoteCalculatorPage: React.FC = () => {
    const [layout, setLayout] = useState('v1');

    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
      );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Insurance Quote Calculator</h1>
                <p className="mt-2 text-slate-600">
                  Quickly estimate insurance premiums for Term-Life and IUL programs.
                </p>
            </div>
            
            <div className="mb-6 flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
                <span className="text-sm font-medium text-slate-600 mr-2">View Layout:</span>
                <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
                <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
                <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
            </div>

            <Suspense fallback={<SuspenseFallback />}>
                {layout === 'v1' && <QuoteCalculatorV1 />}
                {/* Add V2 and V3 when they are created */}
                {layout === 'v2' && <div className="text-center p-8 bg-white rounded-xl">Version 2 is not yet available.</div>}
                {layout === 'v3' && <div className="text-center p-8 bg-white rounded-xl">Version 3 is not yet available.</div>}
            </Suspense>
        </div>
    );
};

export default QuoteCalculatorPage;
