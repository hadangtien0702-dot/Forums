
import React, { useState, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import Spinner from './shared/ui/Spinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load modules to reduce initial bundle size
const HomePage = lazy(() => import('./modules/Home/Home'));
const AgeCalculatorPage = lazy(() => import('./modules/AgeCalculator/AgeCalculator'));
const QuoteCalculatorPage = lazy(() => import('./modules/QuoteCalculator/QuoteCalculator'));
const UserProfilePage = lazy(() => import('./modules/UserProfile/UserProfile'));
const CommunityFeedPage = lazy(() => import('./modules/CommunityFeed/CommunityFeed'));
const SalesHonorPage = lazy(() => import('./modules/SalesHonor/SalesHonor'));
const ImportantNoticePage = lazy(() => import('./modules/ImportantNotice/ImportantNotice'));
const MenuPage = lazy(() => import('./modules/Menu/Menu'));
const LoginPage = lazy(() => import('./modules/Login/Login'));

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentRoute(path);
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.debug('Navigation state update suppressed in this environment.');
    }
  };

  const renderContent = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/age-calculator':
        return <AgeCalculatorPage />;
      case '/quote-calculator':
        return <QuoteCalculatorPage />;
      case '/profile':
        return <UserProfilePage />;
      case '/community':
        return <CommunityFeedPage />;
      case '/sales-honor':
        return <SalesHonorPage />;
      case '/important-notice':
        return <ImportantNoticePage />;
      case '/menu':
        return <MenuPage />;
      case '/login':
        return <LoginPage />;
      default:
        return <HomePage />;
    }
  };

  const PageLoader = () => (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPath={currentRoute} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <div key={currentRoute} className="animate-fadeIn h-full">
                {renderContent()}
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default App;