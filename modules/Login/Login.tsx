
'use client';

import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const LoginV1 = lazy(() => import('./v1/LoginV1'));
const LoginV2 = lazy(() => import('./v2/LoginV2'));
const LoginV3 = lazy(() => import('./v3/LoginV3'));

const LayoutButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = memo(({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200'
        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
    }`}
  >
    {label}
  </button>
));

const LoginPage: React.FC = () => {
  const [layout, setLayout] = useState('v1');

  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-12">
      <Spinner />
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Authentication</h1>
          <p className="mt-2 text-slate-600">
            Preview different login screen layouts and styles.
          </p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <LayoutButton label="Classic" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
            <LayoutButton label="Split" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
            <LayoutButton label="Glass" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
        </div>
      </div>

      <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner min-h-[600px] relative">
        <Suspense fallback={<SuspenseFallback />}>
          {layout === 'v1' && <LoginV1 />}
          {layout === 'v2' && <LoginV2 />}
          {layout === 'v3' && <LoginV3 />}
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
