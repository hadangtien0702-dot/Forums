
import React, { lazy, Suspense } from 'react';
import Spinner from '../../shared/ui/Spinner';

const SalesHonorV2 = lazy(() => import('./v2/SalesHonorV2'));

const SalesHonorPage: React.FC = () => {
    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
      );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Sales Honor Roll</h1>
                <p className="mt-2 text-slate-600">
                  Recognizing the outstanding achievements of our top sales professionals this month.
                </p>
            </div>

            <Suspense fallback={<SuspenseFallback />}>
                <SalesHonorV2 />
            </Suspense>
        </div>
    );
};

export default SalesHonorPage;
