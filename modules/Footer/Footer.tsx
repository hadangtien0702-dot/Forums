
import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const FooterV1 = lazy(() => import('./v1/FooterV1'));
const FooterV2 = lazy(() => import('./v2/FooterV2'));
const FooterV3 = lazy(() => import('./v3/FooterV3'));

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

const FooterPage: React.FC = () => {
  const [layout, setLayout] = useState('v1');
    
  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Footer Layouts</h1>
        <p className="mt-2 text-slate-600">
          Explore different footer designs and configurations.
        </p>
      </div>

      <div className="mb-6">
         <div className="flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
            <span className="text-sm font-medium text-slate-600 mr-2">View Layout:</span>
            <LayoutButton label="Version 1 (Classic)" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
            <LayoutButton label="Version 2 (Minimal)" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
            <LayoutButton label="Version 3 (Creative)" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-gray-50">
          <Suspense fallback={<SuspenseFallback />}>
            {layout === 'v1' && <FooterV1 />}
            {layout === 'v2' && <FooterV2 />}
            {layout === 'v3' && <FooterV3 />}
          </Suspense>
      </div>
    </div>
  );
};

export default FooterPage;
