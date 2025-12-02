
import React, { useState } from 'react';

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; colorClass: string }> = ({ icon, label, colorClass }) => (
    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group`}>
        <div className={`text-slate-400 group-hover:${colorClass} transition-colors`}>
            {icon}
        </div>
        <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">{label}</span>
    </button>
);

const CreatePostInput: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-2xl p-5 mb-8 shadow-sm border border-slate-100 transition-all duration-300 ${isExpanded ? 'shadow-lg ring-1 ring-blue-100' : 'hover:shadow-md'}`}>
      <div className="flex gap-4 mb-4">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          alt="User" 
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex-1">
           <textarea 
              placeholder="What's on your mind, Marilyn?" 
              onFocus={() => setIsExpanded(true)}
              className={`w-full bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl px-4 py-3 outline-none text-base text-slate-700 placeholder-slate-400 border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all resize-none ${isExpanded ? 'h-32' : 'h-14'}`}
          />
        </div>
      </div>
      
      <div className={`flex justify-between items-center pt-2 pl-[3.25rem] transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-80'}`}> 
          <div className="flex gap-1 sm:gap-2">
               <ActionButton 
                  label="Photo" 
                  colorClass="text-green-500"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
               />
               <ActionButton 
                  label="Video" 
                  colorClass="text-blue-500"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
               />
               <ActionButton 
                  label="Poll" 
                  colorClass="text-orange-500"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
               />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5">
              Post
          </button>
      </div>
    </div>
  );
};

export default CreatePostInput;
