import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-slate-800">Welcome to Forums</h1>
      <p className="mt-2 text-slate-600">
        This is your dashboard. Please select a tool from the sidebar to get started.
      </p>
      <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-lg text-center">
        <p className="text-slate-500">Home page content will be displayed here.</p>
      </div>
    </div>
  );
};

export default HomePage;