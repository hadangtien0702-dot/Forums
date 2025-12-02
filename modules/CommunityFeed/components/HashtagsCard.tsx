
import React from 'react';
import type { Hashtag } from '../CommunityFeed.types';

const HashtagsCard: React.FC<{ hashtags: Hashtag[] }> = ({ hashtags }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 text-lg mb-5">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
             {hashtags.map((tag) => (
                 <a href="#" key={tag.tag} className="group flex items-center bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-lg px-3 py-2 transition-all duration-200">
                     <div>
                         <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 block">{tag.tag}</span>
                         <span className="text-[10px] font-semibold text-slate-400 group-hover:text-blue-400 uppercase tracking-wide">{tag.count}</span>
                     </div>
                 </a>
             ))}
        </div>
        <button className="w-full mt-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 border-t border-slate-100 transition-colors">
            Show more tags
        </button>
    </div>
);

export default HashtagsCard;
