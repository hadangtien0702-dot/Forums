
import React, { useState, lazy, Suspense, memo } from 'react';
import Spinner from '../../shared/ui/Spinner';

const ImportantNoticeV1 = lazy(() => import('./v1/ImportantNoticeV1'));
const ImportantNoticeV2 = lazy(() => import('./v2/ImportantNoticeV2'));
const ImportantNoticeV3 = lazy(() => import('./v3/ImportantNoticeV3'));


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

interface ImportantNoticePageProps {
  layout: string;
  setLayout: (layout: string) => void;
  onNavigate: (page: string) => void;
}

const ImportantNoticePage: React.FC<ImportantNoticePageProps> = ({ layout, setLayout, onNavigate }) => {
    
    const SuspenseFallback: React.FC = () => (
        <div className="flex w-full items-center justify-center p-8">
          <Spinner />
        </div>
    );

    const isFullWidthLayout = layout === 'v1' || layout === 'v2' || layout === 'v3';

    return (
        <div className={isFullWidthLayout ? 'h-full' : ''}>
            {/* Page header is hidden for all full-width layouts as they have their own titles */}
            {!isFullWidthLayout && (
                 <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Important Notices</h1>
                    <p className="mt-2 text-slate-600">
                      Please review the latest updates, announcements, and policy changes below.
                    </p>
                  </div>
            )}
            
            {/* The layout switcher is moved inside a container with padding for full-width layouts */}
            <div className={isFullWidthLayout ? 'p-4 sm:p-6 lg:p-8' : 'mb-6'}>
                <div className="flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
                    <span className="text-sm font-medium text-slate-600 mr-2">View Layout:</span>
                    <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
                    <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
                    <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
                </div>
            </div>
            
            <Suspense fallback={<SuspenseFallback />}>
                {layout === 'v1' && <ImportantNoticeV1 />}
                {layout === 'v2' && <ImportantNoticeV2 />}
                {layout === 'v3' && <ImportantNoticeV3 onNavigate={onNavigate} />}
            </Suspense>
        </div>
    );
};

export default ImportantNoticePage;
