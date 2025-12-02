
import React from 'react';
import type { Notice } from '../ImportantNotice.types';

const PRIORITY_STYLES = {
    critical: { label: 'Critical', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    important: { label: 'Important', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    info: { label: 'Info', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    update: { label: 'Update', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' }
};

interface NoticeCardProps {
    notice: Notice;
    onClick: () => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onClick }) => {
    const style = PRIORITY_STYLES[notice.priority] || PRIORITY_STYLES.info;

    return (
        <div 
            onClick={onClick}
            className="group bg-white rounded-2xl p-0 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
        >
            {/* Top Color Indicator */}
            <div className={`h-1.5 w-full ${style.dot}`}></div>

            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${style.bg} ${style.text} ${style.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </div>
                    {notice.isNew && (
                         <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">NEW</span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {notice.title}
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                    {notice.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                            {notice.author.avatar}
                        </div>
                        <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-700 uppercase">{notice.author.name}</span>
                             <span className="text-[10px] text-slate-400">{notice.date}</span>
                        </div>
                    </div>
                    {notice.attachments && notice.attachments.length > 0 && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-xs font-bold">{notice.attachments.length}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeCard;
