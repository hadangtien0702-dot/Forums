
import React, { lazy, Suspense, memo, useState } from 'react';
import Spinner from '../../shared/ui/Spinner';

const CommunityFeedV1 = lazy(() => import('./v1/CommunityFeedV1'));
const CommunityFeedV2 = lazy(() => import('./v2/CommunityFeedV2'));
const CommunityFeedV3 = lazy(() => import('./v3/CommunityFeedV3'));

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

const CommunityFeedPage: React.FC = () => {
  const [layout, setLayout] = useState('v1');
    
  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Community Feed</h1>
        <p className="mt-2 text-slate-600">
          Explore the latest posts and discussions from the community.
        </p>
      </div>

      <div className="mb-6">
         <div className="flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
            <span className="text-sm font-medium text-slate-600 mr-2">Feed Layout:</span>
            <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
            <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
            <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
        </div>
      </div>

      <Suspense fallback={<SuspenseFallback />}>
        {layout === 'v1' && <CommunityFeedV1 />}
        {layout === 'v2' && <CommunityFeedV2 />}
        {layout === 'v3' && <CommunityFeedV3 />}
      </Suspense>
    </div>
  );
};

export default CommunityFeedPage;
