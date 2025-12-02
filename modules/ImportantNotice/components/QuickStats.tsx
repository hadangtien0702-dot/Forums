
import React from 'react';
import type { Notice } from '../ImportantNotice.types';

interface QuickStatsProps {
    notices: Notice[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ notices }) => {
    const urgentCount = notices.filter(n => n.priority === 'critical').length;
    const newCount = notices.filter(n => n.isNew).length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200/50 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Total Notices</p>
                    <p className="text-3xl font-black">{notices.length}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Critical</p>
                </div>
                <p className="text-2xl font-black text-slate-800">{urgentCount}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">New</p>
                </div>
                <p className="text-2xl font-black text-slate-800">{newCount}</p>
            </div>
            
             <div className="bg-slate-800 rounded-2xl p-5 text-white shadow-lg flex flex-col justify-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Effective Today</p>
                <p className="text-2xl font-black">1</p>
            </div>
        </div>
    );
};

export default QuickStats;
