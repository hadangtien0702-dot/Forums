
import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const MenuV1 = lazy(() => import('./v1/MenuV1'));
const MenuV2 = lazy(() => import('./v2/MenuV2'));
const MenuV3 = lazy(() => import('./v3/MenuV3'));

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

const MenuPage: React.FC = () => {
  const [layout, setLayout] = useState('v1');
    
  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Menu</h1>
        <p className="mt-2 text-slate-600">
          Select a menu layout to view.
        </p>
      </div>

      <div className="mb-6">
         <div className="flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
            <span className="text-sm font-medium text-slate-600 mr-2">Menu Layout:</span>
            <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
            <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
            <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
        </div>
      </div>

      <Suspense fallback={<SuspenseFallback />}>
        {layout === 'v1' && <MenuV1 />}
        {layout === 'v2' && <MenuV2 />}
        {layout === 'v3' && <MenuV3 />}
      </Suspense>
    </div>
  );
};

export default MenuPage;