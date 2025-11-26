
import React, { lazy, Suspense } from 'react';
import Spinner from '../../shared/ui/Spinner';

const HomeV3 = lazy(() => import('./v3/HomeV3'));

const HomePage: React.FC = () => {
    
  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div className="h-full">
      <Suspense fallback={<SuspenseFallback />}>
        <HomeV3 />
      </Suspense>
    </div>
  );
};

export default HomePage;
