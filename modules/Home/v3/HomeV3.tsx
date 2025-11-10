import React from 'react';

const KpiCard: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-white rounded-lg text-blue-600 shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    </div>
);

const HomeV3: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Primary Action */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg shadow-slate-200/80 p-8 flex flex-col justify-center items-start">
                <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Ready to get started?</h2>
                <p className="mt-2 text-slate-600 max-w-lg">
                    Instantly calculate a client's insurance age, find their next age-up date, and keep track of your calculations all in one place.
                </p>
                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-base font-semibold transition-all hover:bg-blue-700 active:scale-[0.98]">
                    Start a New Calculation
                </button>
            </div>

            {/* Right Column: KPIs */}
            <div className="lg:col-span-1 bg-slate-50/80 rounded-xl p-6 space-y-6">
                 <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-3">At a Glance</h3>
                 <KpiCard
                    value="1,204"
                    label="Active Clients"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>}
                 />
                 <KpiCard
                    value="28"
                    label="Upcoming Age-Ups"
                     icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>}
                 />
                 <KpiCard
                    value="312"
                    label="Calculations This Month"
                     icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>}
                 />
            </div>
        </div>
    );
};

export default HomeV3;
