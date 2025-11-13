
import React, { lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const HomeV1 = lazy(() => import('./v1/HomeV1'));
const HomeV2 = lazy(() => import('./v2/HomeV2'));
const HomeV3 = lazy(() => import('./v3/HomeV3'));

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

interface HomePageProps {
  layout: string;
  setLayout: (layout: string) => void;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ layout, setLayout, onNavigate }) => {
    
  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  const isFullWidthLayout = layout === 'v1' || layout === 'v2' || layout === 'v3';

  return (
    <div className={isFullWidthLayout ? 'h-full' : ''}>
      {/* Page header is hidden for all full-width layouts */}
      {!isFullWidthLayout && (
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Welcome to Forums</h1>
          <p className="mt-2 text-slate-600">
            Your central hub for insurance tools and client management.
          </p>
        </div>
      )}

      {/* The layout switcher is moved inside a container for non-full-width layouts for better padding */}
      <div className={isFullWidthLayout ? '' : 'mb-6'}>
          <div className={isFullWidthLayout ? 'p-4 sm:p-6 lg:p-8' : ''}>
             <div className="flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
                <span className="text-sm font-medium text-slate-600 mr-2">Dashboard Layout:</span>
                <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
                <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
                <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
            </div>
          </div>
      </div>

      <Suspense fallback={<SuspenseFallback />}>
        {layout === 'v1' && <HomeV1 />}
        {layout === 'v2' && <HomeV2 onNavigate={onNavigate} />}
        {layout === 'v3' && <HomeV3 />}
      </Suspense>
    </div>
  );
};

export default HomePage;
