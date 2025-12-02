
'use client';

import React from 'react';

const AppCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href?: string;
}> = ({ title, description, icon, color, href }) => (
  <a 
    href={href || '#'} 
    onClick={(e) => { if(!href) e.preventDefault() }}
    className="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden"
  >
     <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-${color}-500`}></div>
     
     <div className="flex flex-col h-full">
        <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg shadow-${color}-500/30 bg-gradient-to-br from-${color}-400 to-${color}-600 transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
        
        <div className="mt-auto flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
            Launch App 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </div>
     </div>
  </a>
);

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <div className="mb-10 text-center max-w-2xl mx-auto">
         <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            App <span className="text-blue-600">Launchpad</span>
         </h1>
         <p className="text-lg text-slate-500 font-medium">
            Access all your productivity tools, calculators, and community resources in one place.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
          <AppCard 
            title="Age Calculator" 
            description="Calculate actual and insurance age instantly based on DOB. Vital for accurate policy issuance."
            color="blue"
            href="/age-calculator"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          />
          
          <AppCard 
            title="Quote Calculator" 
            description="Generate quick premium estimates for Term Life and IUL products with customizable parameters."
            color="indigo"
            href="/quote-calculator"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
          />

          <AppCard 
            title="Community Hub" 
            description="Connect with other agents, share insights, discuss market trends, and celebrate wins."
            color="pink"
            href="/community"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />

          <AppCard 
            title="Sales Honor" 
            description="View the leaderboard, check your ranking, and see who is leading the pack this month."
            color="amber"
            href="/sales-honor"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />

          <AppCard 
            title="Important Notices" 
            description="Stay updated with the latest company announcements, policy changes, and system alerts."
            color="emerald"
            href="/important-notice"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
          />
          
           <AppCard 
            title="My Profile" 
            description="Manage your account settings, personal information, and preferences."
            color="slate"
            href="/profile"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
      </div>
      
      {/* Quick Tip */}
      <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Pro Tip: Use the sidebar for faster navigation between apps.
          </div>
      </div>
    </div>
  );
}