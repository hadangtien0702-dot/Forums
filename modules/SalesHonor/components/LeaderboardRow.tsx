
import React from 'react';
import type { LeaderboardMember } from '../SalesHonor.types';

interface LeaderboardRowProps {
  member: LeaderboardMember;
  index: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ member, index }) => {
  return (
    <div 
        className="group relative flex flex-col sm:flex-row items-center bg-white hover:bg-blue-50/30 border border-slate-100 hover:border-blue-200 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer overflow-hidden"
        style={{ transitionDelay: `${index * 30}ms` }}
    >
      {/* Left Hover Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

      {/* Rank & Avatar */}
      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
          <div className="w-10 sm:w-14 flex-shrink-0 flex items-center justify-center mr-2">
            <span className="text-xl sm:text-2xl font-black text-slate-300 group-hover:text-blue-500/50 transition-colors font-mono italic">
                #{member.rank}
            </span>
          </div>
          
          <div className="relative mr-4">
             <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md group-hover:rotate-3 transition-transform duration-300" 
             />
              {member.trend === 'up' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                  </div>
              )}
          </div>

          <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                  {member.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium truncate">{member.title}</p>
          </div>
      </div>

      {/* Metrics (Right Side) */}
      <div className="flex flex-1 items-center justify-between sm:justify-end w-full gap-6 pl-0 sm:pl-4">
         {/* Sales Volume */}
         <div className="text-right">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volume</p>
             <p className="text-base font-black text-slate-800">{member.volume}</p>
         </div>

         {/* Quota Progress */}
         <div className="flex flex-col items-end w-24 sm:w-32">
             <div className="flex justify-between w-full mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Quota</span>
                <span className="text-[10px] font-bold text-blue-600">{member.quota}%</span>
             </div>
             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative" 
                    style={{ width: `${Math.min(member.quota, 100)}%` }}
                >
                    {/* Shimmer effect on bar */}
                     <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
                </div>
             </div>
         </div>

         {/* Action Button */}
         <div className="hidden sm:block">
            <button className="p-2 rounded-lg text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
         </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
