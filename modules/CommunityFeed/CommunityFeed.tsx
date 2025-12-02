
'use client';

import React, { useState } from 'react';
import { feedPosts, topQuestions, popularHashtags } from './CommunityFeed.data';
import type { Hashtag } from './CommunityFeed.types';
import WelcomeBanner from './components/WelcomeBanner';
import CreatePostInput from './components/CreatePostInput';
import PostCard from './components/PostCard';
import TopQuestionsCard from './components/TopQuestionsCard';
import HashtagsCard from './components/HashtagsCard';

// --- Local Components for Cleaner Layout ---

const MobileTrendingStrip: React.FC<{ hashtags: Hashtag[] }> = ({ hashtags }) => (
    <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide snap-x">
        {hashtags.map((tag) => (
            <div key={tag.tag} className="snap-start flex-shrink-0 bg-white p-3 rounded-xl border border-slate-100 shadow-sm min-w-[140px]">
                <p className="text-xs font-bold text-slate-800 truncate">{tag.tag}</p>
                <p className="text-[10px] text-slate-500">{tag.count}</p>
            </div>
        ))}
            <div className="snap-start flex-shrink-0 bg-orange-50 p-3 rounded-xl border border-orange-100 shadow-sm min-w-[140px] flex items-center justify-center cursor-pointer">
            <p className="text-xs font-bold text-orange-600">View all tags →</p>
        </div>
    </div>
);

const FeedTabs: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Recent Discussions</h2>
        <div className="flex p-1 bg-slate-200/60 rounded-xl w-full sm:w-auto overflow-x-auto">
                {['Latest', 'Popular', 'Unanswered'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {tab}
                </button>
                ))}
        </div>
    </div>
);

const FooterLinks: React.FC = () => (
    <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 text-xs text-slate-400 font-medium">
        <a href="#" className="hover:text-slate-600">About</a>
        <a href="#" className="hover:text-slate-600">Guidelines</a>
        <a href="#" className="hover:text-slate-600">Help</a>
        <a href="#" className="hover:text-slate-600">Privacy</a>
        <span>© 2025 Forums</span>
    </div>
);

// --- Main Page Component ---

export default function CommunityFeedPage() {
  const [activeTab, setActiveTab] = useState('Latest');

  return (
    <div className="bg-[#f8faff] min-h-screen font-sans relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Mobile Header */}
            <div className="mb-6 lg:hidden">
                <h1 className="text-3xl font-bold text-slate-900">Community</h1>
                <p className="mt-1 text-slate-500 text-sm">Join the conversation</p>
            </div>

            <MobileTrendingStrip hashtags={popularHashtags} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column - Main Feed */}
                <div className="lg:col-span-8 space-y-6">
                    <WelcomeBanner />
                    
                    {/* Desktop Input */}
                    <div className="hidden sm:block">
                        <CreatePostInput />
                    </div>
                    
                    <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="space-y-6">
                        {feedPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    
                    <div className="text-center py-8">
                         <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                             <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin"></div>
                             Loading more discussions...
                         </button>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-6">
                    <TopQuestionsCard questions={topQuestions} />
                    <HashtagsCard hashtags={popularHashtags} />
                    <FooterLinks />
                </div>
            </div>
        </div>

        {/* Mobile FAB */}
        <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </button>
    </div>
  );
}
