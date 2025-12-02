
import React from 'react';

const WelcomeBanner: React.FC = () => (
  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 to-indigo-900 p-8 sm:p-12 text-white shadow-xl shadow-slate-200 mb-8 isolate border border-slate-700/50">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl mix-blend-overlay animate-pulse-custom"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-10 transform rotate-12">💬</div>
    </div>

    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Community Hub
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        Welcome to the Family
      </h1>
      
      <p className="text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
        This is your space to discuss insurance trends, share sales strategies, and celebrate wins with peers.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all duration-200 shadow-lg">
          Start a Discussion
        </button>
        <button className="px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-xl font-semibold text-sm transition-all duration-200">
          View Guidelines
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeBanner;
