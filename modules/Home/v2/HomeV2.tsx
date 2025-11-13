
import React from 'react';
import { initialUser } from '../../UserProfile/UserProfile.constants';
import { salesMembers } from '../../SalesHonor/SalesHonor.data';

interface HomeV2Props {
  onNavigate: (page: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Reusable UI Components ---
const Card: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg shadow-slate-200/80 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ title: string; icon: React.ReactNode; }> = ({ title, icon }) => (
  <div className="flex items-center gap-3 p-5 border-b border-slate-100">
    <span className="text-blue-600">{icon}</span>
    <h3 className="text-base font-bold text-slate-800">{title}</h3>
  </div>
);


const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl p-5 shadow-md shadow-slate-200/70 border border-slate-200/80 flex items-center gap-4">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const ActionButton: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void; }> = ({ label, icon, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors group text-slate-600 w-full">
        <div className="h-10 w-10 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-1">
            {icon}
        </div>
        <p className="text-sm font-semibold text-center">{label}</p>
    </button>
);


const HomeV2: React.FC<HomeV2Props> = ({ onNavigate }) => {
  const currentUser = salesMembers[0]; // Assume current user is the top performer
  const userName = initialUser.personalInfo.firstName;
  
  // Mock data for reminders
  const upcomingAgeUps = [
      { name: 'John Doe', days: 15, dob: '06/10/1974' },
      { name: 'Jane Smith', days: 28, dob: '06/23/1988' },
  ];

  return (
    <div className="bg-slate-100 min-h-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {userName}!</h1>
          <p className="mt-1 text-slate-600">Here's your personalized dashboard for today.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <main className="lg:col-span-2 space-y-8">
                {/* Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <MetricCard 
                        title="Sales This Month" 
                        value={formatCurrency(currentUser.salesVolume)} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-2v-2m0-2v-2m0-2V7m0 11a9 9 0 110-18 9 9 0 010 18z" /></svg>}
                    />
                    <MetricCard 
                        title="Policies Sold" 
                        value={String(currentUser.policiesSold)} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    />
                    <MetricCard 
                        title="Current Rank" 
                        value={`#${currentUser.rank}`}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                    />
                </div>

                {/* Sales Goal Tracking */}
                 <Card>
                    <CardHeader title="Monthly Goal Progress" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
                    <div className="p-5">
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="text-2xl font-bold text-blue-600">{currentUser.quotaPercentage}%</span>
                             <span className="text-sm font-semibold text-slate-500">Goal: {formatCurrency(currentUser.salesVolume / (currentUser.quotaPercentage / 100))}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${Math.min(currentUser.quotaPercentage, 100)}%` }}></div>
                        </div>
                         <p className="text-sm text-slate-600 mt-3">
                            You've exceeded your goal this month. Keep up the great work!
                        </p>
                    </div>
                 </Card>
            </main>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
                {/* Quick Actions */}
                <Card>
                    <CardHeader title="Quick Actions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                    <div className="p-4 grid grid-cols-2 gap-3">
                        <ActionButton label="Age Calculator" onClick={() => onNavigate('ageCalculator')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>} />
                        <ActionButton label="New Thread" onClick={() => onNavigate('communityFeed')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>} />
                        <ActionButton label="My Profile" onClick={() => onNavigate('userProfile')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                        <ActionButton label="Sales Honor" onClick={() => onNavigate('salesHonor')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} />
                    </div>
                </Card>

                 {/* Reminders Section */}
                <Card>
                    <CardHeader title="Priority Tasks" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} />
                    <div className="p-5">
                        <h4 className="text-sm font-semibold text-slate-600 mb-2">Upcoming Age-Ups</h4>
                        <ul className="space-y-3">
                            {upcomingAgeUps.map(client => (
                                <li key={client.name}>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-slate-700 text-sm">{client.name}</span>
                                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{client.days} days</span>
                                    </div>
                                    <p className="text-xs text-slate-500">DOB: {client.dob}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </aside>
        </div>
      </div>
    </div>
  );
};

export default HomeV2;
