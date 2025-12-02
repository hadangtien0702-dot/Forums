
import React, { memo } from 'react';
import type { PodiumMember } from '../SalesHonor.types';

interface PodiumCardProps {
  member: PodiumMember;
}

// Define themes outside component to prevent recreation on every render
const PODIUM_THEMES = {
  gold: {
      gradient: 'from-yellow-300 via-amber-200 to-yellow-400',
      textGradient: 'from-amber-700 to-yellow-600',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-100',
      bg: 'bg-gradient-to-b from-white to-amber-50',
      ring: 'ring-amber-300',
      icon: '👑'
  },
  silver: {
      gradient: 'from-slate-100 via-slate-200 to-slate-300',
      textGradient: 'from-slate-700 to-slate-500',
      shadow: 'shadow-slate-400/20',
      border: 'border-slate-100',
      bg: 'bg-white',
      ring: 'ring-slate-200',
      icon: '🥈'
  },
  bronze: {
      gradient: 'from-orange-100 via-orange-200 to-orange-300',
      textGradient: 'from-orange-800 to-orange-600',
      shadow: 'shadow-orange-500/20',
      border: 'border-orange-100',
      bg: 'bg-white',
      ring: 'ring-orange-200',
      icon: '🥉'
  }
};

const PodiumCard: React.FC<PodiumCardProps> = memo(({ member }) => {
  const isGold = member.rank === 1;
  const themeKey = member.rank === 1 ? 'gold' : (member.rank === 2 ? 'silver' : 'bronze');
  const theme = PODIUM_THEMES[themeKey];

  return (
    <div className={`relative flex flex-col items-center p-6 sm:p-8 rounded-[2.5rem] border ${theme.border} ${theme.bg} shadow-2xl ${theme.shadow} w-full h-full overflow-hidden group`}>
      
      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Avatar Section */}
      <div className="relative mb-6 mt-2">
        <div className={`absolute -inset-3 rounded-full bg-gradient-to-br ${theme.gradient} opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300`}></div>
        <div className="relative">
            <img 
            src={member.avatar} 
            alt={member.name} 
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-lg ${isGold ? 'scale-110' : ''} transition-transform duration-300`}
            />
            {/* Rank Badge */}
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border-2 border-slate-50 text-2xl`}>
                {theme.icon}
            </div>
        </div>
      </div>

      {/* Name & Title */}
      <div className="text-center w-full mb-6 relative z-10">
        <h3 className={`text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient} mb-1 leading-tight`}>
            {member.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{member.title}</p>
      </div>

      {/* Metrics Grid */}
      <div className="w-full bg-white/50 rounded-2xl p-4 border border-slate-100/50 backdrop-blur-sm">
         <div className="flex flex-col gap-3">
             <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                 <span className="text-xs font-bold text-slate-400 uppercase">Total Sales</span>
                 <span className={`text-xl font-black ${isGold ? 'text-slate-800' : 'text-slate-700'}`}>{member.salesAmount}</span>
             </div>
             
             <div className="flex justify-between items-center">
                <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Policies</p>
                    <p className="text-sm font-bold text-slate-700">{member.policies}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Growth</p>
                    <span className="inline-flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {member.growth}
                    </span>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
});

export default PodiumCard;
