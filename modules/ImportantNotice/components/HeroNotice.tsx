
import React from 'react';
import type { Notice } from '../ImportantNotice.types';

interface HeroNoticeProps {
    notice: Notice;
    onClick: () => void;
}

const HeroNotice: React.FC<HeroNoticeProps> = ({ notice, onClick }) => (
    <div 
        onClick={onClick}
        className="relative w-full rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-2xl shadow-slate-300/40 transform transition-all duration-500 hover:scale-[1.005] mb-12"
    >
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 opacity-90"></div>
        
        {/* Glassy Overlay Decoration */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase shadow-lg shadow-red-500/30 animate-pulse">
                        Critical Update
                    </div>
                    <span className="text-slate-400 text-sm font-medium border-l border-slate-600 pl-3">{notice.date}</span>
                </div>
               
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                    {notice.title}
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed line-clamp-2 mb-8 max-w-2xl font-medium">
                    {notice.fullContent || notice.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                    <button className="px-8 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:translate-x-1 duration-300">
                        Read Full Notice
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    
                    {notice.attachments && notice.attachments.length > 0 && (
                         <div className="flex items-center gap-2 text-slate-400 text-sm font-medium px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            <span>{notice.attachments.length} attachments</span>
                        </div>
                    )}
                </div>
            </div>
             
            {/* Right decoration (Icon) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
                <div className="w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-6xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-all duration-500">
                    📢
                </div>
            </div>
        </div>
    </div>
);

export default HeroNotice;
