
import React from 'react';
import type { TopQuestion } from '../CommunityFeed.types';

const TopQuestionsCard: React.FC<{ questions: TopQuestion[] }> = ({ questions }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 sticky top-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">🔥 Hot Questions</h3>
            <a href="#" className="text-xs font-bold text-blue-600 hover:underline">View All</a>
        </div>
        <ul className="space-y-5">
            {questions.map((q, index) => (
                <li key={q.id} className="flex gap-4 items-start group cursor-pointer">
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded font-bold text-xs mt-0.5 transition-colors ${
                        index < 3 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                        {q.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                         <a href="#" className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors leading-snug block mb-1.5 line-clamp-2">
                            {q.title}
                         </a>
                         <div className="flex items-center gap-3">
                             <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                {q.replies} replies
                             </span>
                         </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default TopQuestionsCard;
