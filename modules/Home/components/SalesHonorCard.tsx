
import React from 'react';
import type { SalesMember } from '../Home.types';

const SalesHonorCard: React.FC<{ member: SalesMember }> = ({ member }) => {
  const rankColors = {
    gold: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-500/20',
      badge: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
      ring: 'ring-yellow-100',
    },
    silver: {
      border: 'border-slate-300',
      shadow: 'shadow-slate-400/20',
      badge: 'bg-gradient-to-br from-slate-300 to-slate-400',
      ring: 'ring-slate-100',
    },
    bronze: {
      border: 'border-orange-300',
      shadow: 'shadow-orange-500/20',
      badge: 'bg-gradient-to-br from-orange-300 to-orange-500',
      ring: 'ring-orange-100',
    },
    default: {
      border: 'border-transparent',
      shadow: 'shadow-slate-200/50',
      badge: 'bg-slate-500',
      ring: 'ring-slate-50',
    }
  };

  const colors = rankColors[member.color as keyof typeof rankColors] || rankColors.default;

  return (
    <div className="snap-start text-center w-48 flex-shrink-0 group relative pt-4 pb-2">
      <div className={`p-5 bg-white rounded-2xl shadow-lg ${colors.shadow} border ${colors.border} group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col`}>
        <div className="relative mx-auto mb-3">
          <img src={member.avatar} alt={member.name} className={`w-20 h-20 object-cover rounded-full mx-auto ring-4 ${colors.ring}`} loading="lazy" />
          <div className={`absolute -top-3 -right-1 h-8 w-8 rounded-full ${colors.badge} flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white`}>
            {member.rank}
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-800 truncate w-full">{member.name}</h3>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{member.title}</p>
        <div className="mt-auto pt-3 border-t border-slate-50">
             <p className="text-xs font-semibold text-slate-600">{member.achievement}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesHonorCard;
