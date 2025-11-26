
import React, { lazy, Suspense } from 'react';
import Spinner from '../../shared/ui/Spinner';

const CommunityFeedV3 = lazy(() => import('./v3/CommunityFeedV3'));

const CommunityFeedPage: React.FC = () => {
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

      <Suspense fallback={<SuspenseFallback />}>
        <CommunityFeedV3 />
      </Suspense>
    </div>
  );
};

export default CommunityFeedPage;
