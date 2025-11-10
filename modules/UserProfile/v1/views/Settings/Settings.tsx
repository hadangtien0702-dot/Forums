import React from 'react';

const SettingsSection: React.FC = () => {
  return (
    <div className="text-center text-slate-500 py-16">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.4_8.6_a8 8 0 010 6.8m-14.8-6.8a8 8 0 000 6.8" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">Coming Soon</h3>
      <p className="mt-1 text-sm">This section is under construction.</p>
      <p className="text-sm">New settings and preferences will be available here shortly.</p>
    </div>
  );
};

export default SettingsSection;
