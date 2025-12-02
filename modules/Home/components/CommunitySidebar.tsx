
import React from 'react';
import type { Discussion, Post } from '../Home.types';

const DiscussionRow: React.FC<{ discussion: Discussion }> = ({ discussion }) => (
  <div className="p-5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
      <img src={discussion.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">{discussion.category}</p>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-2">
              {discussion.title}
          </h4>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {discussion.replies}
              </span>
               <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  {discussion.views}k
              </span>
          </div>
      </div>
  </div>
);

const PopularPostItem: React.FC<{ post: Post, rank: number }> = ({ post, rank }) => {
    const getRankStyle = (r: number) => {
        if (r === 1) return 'text-yellow-500 bg-yellow-50 border-yellow-100';
        if (r === 2) return 'text-slate-400 bg-slate-50 border-slate-100';
        if (r === 3) return 'text-orange-400 bg-orange-50 border-orange-100';
        return 'text-slate-400 bg-transparent border-transparent';
    };

    return (
        <li className="flex items-start gap-4 group py-3 cursor-pointer">
            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${getRankStyle(rank)}`}>
            {rank}
            </span>
            <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                {post.title}
            </p>
            </div>
        </li>
    );
};

const TopicTag: React.FC<{ topic: string }> = ({ topic }) => (
  <a href="#" className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all duration-200">
    #{topic}
  </a>
);

const CommunitySidebar: React.FC<{ discussions: Discussion[], popularPosts: Post[], topics: string[] }> = ({ discussions, popularPosts, topics }) => {
    return (
        <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Trending Discussions
                    </h3>
                </div>
                <div className="divide-y divide-slate-100">
                {discussions.map((discussion, index) => (
                    <DiscussionRow key={index} discussion={discussion} />
                ))}
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors w-full">View all discussions</button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pl-2 border-l-4 border-blue-500">Popular This Week</h3>
                <ul className="space-y-1">
                {popularPosts.map((post, index) => (
                    <PopularPostItem key={index} post={post} rank={index + 1} />
                ))}
                </ul>
            </div>
            
            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pl-2 border-l-4 border-purple-500">Explore Topics</h3>
                <div className="flex flex-wrap gap-2.5">
                {topics.map((topic, index) => (
                    <TopicTag key={index} topic={topic} />
                ))}
                </div>
            </div>
        </aside>
    );
}

export default CommunitySidebar;
