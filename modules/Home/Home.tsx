import React from 'react';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="bg-slate-50/80 rounded-lg p-4 flex items-center gap-4">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white rounded-full text-blue-600 shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-lg font-bold text-slate-800">{value}</p>
        </div>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Welcome to Forums</h1>
            <p className="mt-2 text-slate-600">
                This is your dashboard. Please select a tool from the sidebar to get started.
            </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800">Overview</h2>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <StatCard 
                    label="Active Clients" 
                    value="1,204"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
                 <StatCard 
                    label="Upcoming Age-Ups (30 Days)" 
                    value="28"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <StatCard 
                    label="Calculations This Month" 
                    value="312"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    }
                />
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
                 <h3 className="text-lg font-semibold text-slate-700">Quick Actions</h3>
                 <p className="text-sm text-slate-500 mt-1">Use the main sidebar navigation to access your tools.</p>
            </div>
        </div>
    </div>
  );
};

export default HomePage;