
import React, { lazy, Suspense } from 'react';
import Spinner from '../../shared/ui/Spinner';

// Switching to the new improved V5 layout
const ImportantNoticeV5 = lazy(() => import('./v5/ImportantNoticeV5'));

const ImportantNoticePage: React.FC = () => {
    
    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
    );

    return (
        <div className="h-full">
            <Suspense fallback={<SuspenseFallback />}>
                <ImportantNoticeV5 />
            </Suspense>
        </div>
    );
};

export default ImportantNoticePage;
