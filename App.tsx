
import React, { useState, useCallback, Suspense, lazy } from 'react';
import Sidebar from './layout/Sidebar';
import Spinner from './shared/ui/Spinner';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./modules/Home'));
const AgeCalculatorPage = lazy(() => import('./modules/AgeCalculator'));
const UserProfilePage = lazy(() => import('./modules/UserProfile'));
const CommunityFeedPage = lazy(() => import('./modules/CommunityFeed'));
const SalesHonorPage = lazy(() => import('./modules/SalesHonor'));
const ImportantNoticePage = lazy(() => import('./modules/ImportantNotice'));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [homeLayout, setHomeLayout] = useState('v1'); // State for home layout
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Close sidebar on navigation
  }, []);
  
  // Check if the current view is a full-width Home layout
  const isFullWidthHome = currentPage === 'home' && (homeLayout === 'v1' || homeLayout === 'v2' || homeLayout === 'v3');

  const SuspenseFallback: React.FC = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        {/* Header for mobile with hamburger */}
        <header className="lg:hidden sticky top-0 bg-slate-50/80 backdrop-blur-sm z-10 border-b border-slate-200">
            <div className="flex items-center justify-between p-3">
                 <div className="flex items-center gap-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v1" />
                    </svg>
                   <span className="font-bold text-lg text-slate-800">Forums</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="Open sidebar"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
            </div>
        </header>
        {/* Main content area: padding is removed for the full-width Home layouts */}
        <main className={`flex-1 flex flex-col ${isFullWidthHome ? '' : 'p-4 sm:p-6 lg:p-8'}`}>
             {/* Container: removed for the full-width Home layouts */}
            <div className={isFullWidthHome ? 'h-full' : 'max-w-7xl mx-auto w-full'}>
                <Suspense fallback={<SuspenseFallback />}>
                  {currentPage === 'home' && <HomePage layout={homeLayout} setLayout={setHomeLayout} onNavigate={handleNavigate} />}
                  {currentPage === 'ageCalculator' && <AgeCalculatorPage />}
                  {currentPage === 'userProfile' && <UserProfilePage />}
                  {currentPage === 'communityFeed' && <CommunityFeedPage />}
                  {currentPage === 'salesHonor' && <SalesHonorPage />}
                  {currentPage === 'importantNotice' && <ImportantNoticePage />}
                </Suspense>
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
