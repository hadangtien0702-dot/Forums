

import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const ImportantNoticeV1 = lazy(() => import('./v1/ImportantNoticeV1'));
const ImportantNoticeV2 = lazy(() => import('./v2/ImportantNoticeV2'));
const ImportantNoticeV4 = lazy(() => import('./v4/ImportantNoticeV4'));


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

const ImportantNoticePage: React.FC = () => {
    const [layout, setLayout] = useState('v1');

    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
    );

    return (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Important Notices</h1>
            <p className="mt-2 text-slate-600">
              Please review the latest updates, announcements, and policy changes below.
            </p>
          </div>

          <div className="mb-6 flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
            <span className="text-sm font-medium text-slate-600 mr-2">View Layout:</span>
            <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
            <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
            <LayoutButton label="Version 3" isActive={layout === 'v4'} onClick={() => setLayout('v4')} />
          </div>
          
          <Suspense fallback={<SuspenseFallback />}>
            {layout === 'v1' && <ImportantNoticeV1 />}
            {layout === 'v2' && <ImportantNoticeV2 />}
            {layout === 'v4' && <ImportantNoticeV4 />}
          </Suspense>
        </div>
    );
};

export default ImportantNoticePage;