
import React from 'react';
import type { CommunityPost, LinkData, EventData, PollOption } from '../CommunityFeed.types';

// --- Sub-components for specific post types ---

export const Poll: React.FC<{ options: PollOption[]; totalVotes: number }> = ({ options, totalVotes }) => {
  return (
    <div className="space-y-3 mb-5">
      {options.map((option) => (
        <div key={option.id} className="relative group cursor-pointer">
          {/* Background Bar */}
          <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${option.isVoted ? 'bg-blue-100/50' : 'bg-slate-100/50 group-hover:bg-slate-100'}`}></div>
          
          {/* Progress Bar */}
          <div 
            className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out ${option.isVoted ? 'bg-blue-100' : 'bg-slate-200'}`} 
            style={{ width: `${option.percentage}%`, opacity: 0.6 }}
          ></div>

          {/* Content */}
          <div className="relative flex justify-between items-center px-4 py-3 z-10">
            <div className="flex items-center gap-3">
               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${option.isVoted ? 'border-blue-500' : 'border-slate-400'}`}>
                  {option.isVoted && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
               </div>
               <span className={`text-sm font-medium ${option.isVoted ? 'text-blue-700' : 'text-slate-700'}`}>{option.text}</span>
            </div>
            <span className="text-xs font-bold text-slate-500">{option.percentage}%</span>
          </div>
        </div>
      ))}
      <div className="px-1 pt-1 text-xs font-medium text-slate-400">
        {totalVotes} votes • 1 day left
      </div>
    </div>
  );
};

export const LinkPreview: React.FC<{ linkData: LinkData }> = ({ linkData }) => (
    <a href={linkData.url} className="block mb-5 group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
        <div className="h-48 overflow-hidden relative">
            <img src={linkData.thumbnail} alt={linkData.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                {linkData.domain}
            </div>
        </div>
        <div className="p-4">
            <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{linkData.title}</h4>
            <p className="text-sm text-slate-500 line-clamp-2">{linkData.description}</p>
        </div>
    </a>
);

export const EventCard: React.FC<{ eventData: EventData }> = ({ eventData }) => (
    <div className="mb-5 p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-blue-300 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-full sm:w-20 h-20 bg-blue-50 rounded-xl flex flex-col items-center justify-center border border-blue-100 text-blue-700">
            <span className="text-xs font-bold uppercase">{eventData.month}</span>
            <span className="text-2xl font-black">{eventData.date}</span>
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">{eventData.title}</h4>
            <div className="text-sm text-slate-500 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {eventData.time}
                </span>
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {eventData.location}
                </span>
            </div>
             <p className="text-xs text-slate-400 mt-2">{eventData.attendees} people attending</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Join
        </button>
    </div>
);

export const MilestoneCard: React.FC<{ content: string }> = ({ content }) => (
    <div className="mb-5 p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
         <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
         <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏆</span>
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md border border-white/30">Achievement Unlocked</span>
             </div>
             <p className="text-lg font-medium leading-relaxed">{content}</p>
         </div>
    </div>
);

export const PhotoAttachment: React.FC<{ src: string }> = ({ src }) => (
    <div className="rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-sm">
        <img src={src} alt="Post Content" className="w-full h-auto object-cover max-h-[400px]" />
    </div>
);
