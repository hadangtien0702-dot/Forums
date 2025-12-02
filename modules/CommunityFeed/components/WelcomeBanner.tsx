
import React from 'react';

const WelcomeBanner: React.FC = () => (
  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-8 sm:p-12 text-white shadow-2xl shadow-indigo-200 mb-8 isolate">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl mix-blend-overlay animate-pulse-custom"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl mix-blend-screen"></div>
        
        {/* Floating 3D-ish Elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-20 transform rotate-12 animate-float-pin-featured">❤️</div>
        <div className="absolute bottom-10 left-1/2 text-6xl opacity-10 transform -rotate-12 animate-float-pin-grid" style={{ animationDelay: '1s' }}>✨</div>
    </div>

    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Community Hub
      </div>

      <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight drop-shadow-sm">
        Welcome to the Family <span className="inline-block animate-pulse-custom">👋</span>
      </h1>
      
      <p className="text-indigo-100 text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed font-medium">
        This is your safe space to discuss insurance trends, share sales strategies, and celebrate wins with peers. We're glad you're here!
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button className="px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg shadow-indigo-900/20">
          Start a Discussion
        </button>
        <button className="px-8 py-3.5 bg-indigo-800/30 hover:bg-indigo-800/50 border border-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-sm transition-all duration-200">
          View Guidelines
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeBanner;
