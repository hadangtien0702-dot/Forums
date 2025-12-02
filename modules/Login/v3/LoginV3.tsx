'use client';

import React from 'react';

const LoginV3: React.FC = () => {
  return (
    <div className="min-h-[700px] h-full relative flex items-center justify-center overflow-hidden bg-[#111827]">
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[100px] animate-pulse-custom"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[100px] animate-pulse-custom" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-[200px] h-[200px] rounded-full bg-pink-600/20 blur-[80px]"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Access Portal</h2>
            <p className="text-slate-300 mt-2 text-sm">Secure login to your dashboard</p>
        </div>

        <form className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Username</label>
                <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </div>
                    <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your username"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    </div>
                    <input 
                        type="password" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-300 cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded bg-white/10 border-white/20 text-purple-600 focus:ring-purple-500 focus:ring-offset-0" />
                    Remember me
                </label>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Forgot Password?</a>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all active:scale-[0.98]">
                Login Now
            </button>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">Don't have an account? <a href="#" className="text-white font-bold hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginV3;