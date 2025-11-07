import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import AgeCalculatorPage from './modules/AgeCalculator';
import UserProfilePage from './modules/UserProfile';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('ageCalculator');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {currentPage === 'ageCalculator' && <AgeCalculatorPage />}
          {currentPage === 'userProfile' && <UserProfilePage />}
        </div>
      </main>
    </div>
  );
};

export default App;