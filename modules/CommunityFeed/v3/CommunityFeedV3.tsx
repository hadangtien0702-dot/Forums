
import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const initialPostData = [
    {
        id: 1,
        author: { name: 'Marilyn Franci', role: 'Senior Agent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3', isOnline: true },
        timestamp: '5 minutes ago',
        title: 'How do you feel about the latest platform update? Worth it or not?',
        content: "I've been testing the new CRM features for a few hours. The interface is cleaner, but I'm missing the quick-add button for leads. Has anyone found a workaround?",
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        tags: ['#PlatformUpdate', '#Tech', '#Discussion'],
        stats: {
            likes: 124,
            comments: 45,
            shares: 12
        },
        liked: false,
        trending: true,
    },
    {
        id: 2,
        author: { name: 'David Chen', role: 'Financial Advisor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', isOnline: false },
        timestamp: '2 hours ago',
        title: 'Strategies for closing high-net-worth clients in Q4',
        content: "Sharing my top 3 strategies that helped me close 2 major deals last week. 1. Focus on estate planning tax benefits. 2....",
        image: null,
        tags: ['#SalesTips', '#WealthManagement'],
        stats: {
            likes: 89,
            comments: 22,
            shares: 5
        },
        liked: true,
        trending: false,
    },
    {
        id: 3,
        author: { name: 'Sarah Wilson', role: 'Insurance Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', isOnline: true },
        timestamp: '4 hours ago',
        title: 'Anyone attending the Global Summit next month?',
        content: "I just got my tickets for the insurance summit in Chicago. Would love to organize a meetup for our community members!",
        image: null,
        tags: ['#Events', '#Networking'],
        stats: {
            likes: 56,
            comments: 18,
            shares: 2
        },
        liked: false,
        trending: false,
    }
];

const topDiscussions = [
    { rank: 1, title: 'Best productivity tools for remote agents?', replies: 128, trend: 'up' },
    { rank: 2, title: 'Understanding the new tax laws for 2025', replies: 89, trend: 'up' },
    { rank: 3, title: 'Client retention strategies that actually work', replies: 75, trend: 'stable' },
    { rank: 4, title: 'Weekly Wins: Share your success story!', replies: 66, trend: 'up' },
    { rank: 5, title: 'Debate: Term Life vs. Whole Life for millennials', replies: 54, trend: 'down' }
];

const trendingTopics = [
    { name: 'Technology', count: '2.4k posts', color: 'bg-blue-100 text-blue-700' },
    { name: 'Sales Tactics', count: '1.8k posts', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Regulation', count: '900 posts', color: 'bg-purple-100 text-purple-700' },
    { name: 'Marketing', count: '750 posts', color: 'bg-orange-100 text-orange-700' }
];

const upcomingEvents = [
    { id: 1, day: '24', month: 'OCT', title: 'Tax Strategy Workshop', attendees: 120, time: '2:00 PM EST' },
    { id: 2, day: '02', month: 'NOV', title: 'Q4 Sales Kickoff', attendees: 85, time: '10:00 AM EST' },
];

// --- ICONS ---
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const PollIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const HeartIcon = ({ filled }: { filled: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${filled ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-500 group-hover:text-red-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;
const TrendingIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

// --- UI COMPONENTS ---

const CommunityHero: React.FC = () => (
    <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 isolate">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                    Community Hub
                </h1>
                <p className="text-indigo-200 text-lg leading-relaxed">
                    Join 12,000+ professionals discussing insurance trends, sharing advice, and growing together.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-semibold text-white">432 Online Now</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-sm font-semibold text-white">🔥 125 New Posts Today</span>
                    </div>
                </div>
            </div>
            {/* Illustration or Action */}
            <div className="hidden md:block">
                 <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">
                    My Dashboard
                 </button>
            </div>
        </div>
    </div>
);

const PostCreator: React.FC<{ onPublish: (content: string) => void }> = ({ onPublish }) => {
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handlePublish = () => {
        if (content.trim()) {
            onPublish(content.trim());
            setContent('');
            setIsFocused(false);
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 p-5 mb-8 ${isFocused ? 'border-indigo-300 ring-4 ring-indigo-50 shadow-md' : 'border-slate-100'}`}>
            <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop" alt="User" className="w-11 h-11 rounded-full object-cover border-2 border-slate-50 shadow-sm" />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => !content && setIsFocused(false)}
                        placeholder="What's on your mind, Marilyn?"
                        rows={isFocused ? 3 : 1}
                        className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none resize-none transition-all"
                    />
                    
                    {(isFocused || content) && (
                        <div className="mt-3 flex items-center justify-between animate-fadeIn">
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors" title="Add Image"><ImageIcon /></button>
                                <button className="p-2 text-slate-500 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors" title="Add Video"><VideoIcon /></button>
                                <button className="p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors" title="Create Poll"><PollIcon /></button>
                            </div>
                            <button 
                                onClick={handlePublish}
                                disabled={!content.trim()}
                                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
                            >
                                Post
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FeedCard: React.FC<{ post: any; onLike: (id: number) => void }> = ({ post, onLike }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 mb-6 hover:shadow-md transition-shadow duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-50" />
                        {post.author.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" title="Online"></span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">{post.author.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            {post.author.role} • {post.timestamp}
                        </p>
                    </div>
                </div>
                {post.trending && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        Trending
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{post.title}</h2>
                {post.content && <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>}
            </div>

            {/* Media */}
            {post.image && (
                <div className="mb-5 rounded-xl overflow-hidden border border-slate-100 group cursor-pointer">
                     <img src={post.image} alt="Post content" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                    onClick={() => onLike(post.id)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-500 group px-2 py-1 rounded-lg hover:bg-red-50 transition-all"
                >
                    <HeartIcon filled={post.liked} />
                    <span>{post.stats.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 group px-2 py-1 rounded-lg hover:bg-blue-50 transition-all">
                    <CommentIcon />
                    <span>{post.stats.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-500 group px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all">
                    <ShareIcon />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

const SidebarSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
            {icon}
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

const EventCard: React.FC<{ event: typeof upcomingEvents[0] }> = ({ event }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
        <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600 border border-indigo-100">
            <span className="text-xs font-bold uppercase">{event.month}</span>
            <span className="text-xl font-extrabold leading-none">{event.day}</span>
        </div>
        <div>
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{event.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{event.time}</p>
            <p className="text-xs font-medium text-indigo-500 mt-1">{event.attendees} attending</p>
        </div>
    </div>
);

const FilterChip: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
    >
        {label}
    </button>
);

const CommunityFeedV3: React.FC = () => {
    const [posts, setPosts] = useState(initialPostData);
    const [activeFilter, setActiveFilter] = useState('All Posts');

    const handlePublish = (content: string) => {
        const newPost = {
            id: Date.now(),
            author: { name: 'Marilyn Franci', role: 'Senior Agent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop', isOnline: true },
            timestamp: 'Just now',
            title: content,
            content: '',
            image: null,
            tags: ['#NewPost', '#Discussion'],
            stats: { likes: 0, comments: 0, shares: 0 },
            liked: false,
            trending: false,
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const handleLike = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, stats: { ...p.stats, likes: p.liked ? p.stats.likes -1 : p.stats.likes + 1}} : p));
    };
    
    const filterCategories = ['All Posts', 'Popular', 'Recent', 'Unanswered', 'Events'];

    return (
        <div className="bg-slate-50/50 pb-10">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <CommunityHero />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Content: Feed */}
                    <main className="lg:col-span-8">
                        <PostCreator onPublish={handlePublish} />
                        
                        {/* Modern Filter Chips */}
                        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {filterCategories.map(category => (
                                <FilterChip 
                                    key={category} 
                                    label={category} 
                                    isActive={activeFilter === category} 
                                    onClick={() => setActiveFilter(category)} 
                                />
                            ))}
                        </div>

                        <div className="space-y-6">
                            {posts.map(post => (
                                <FeedCard key={post.id} post={post} onLike={handleLike} />
                            ))}
                        </div>

                        {posts.length === 0 && (
                             <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-slate-100">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">No posts found</h3>
                                <button onClick={() => setActiveFilter('All Posts')} className="text-indigo-600 font-medium hover:underline">Clear filter</button>
                            </div>
                        )}
                    </main>

                    {/* Right Content: Sidebar */}
                    <aside className="lg:col-span-4 space-y-6 sticky top-6">
                        <SidebarSection title="Upcoming Events" icon={<CalendarIcon />}>
                            <div className="space-y-2">
                                {upcomingEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                View Calendar
                            </button>
                        </SidebarSection>

                        <SidebarSection title="Top Questions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>}>
                             <div className="space-y-4">
                                {topDiscussions.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                                        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border ${idx === 0 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : idx === 1 ? 'bg-slate-100 text-slate-700 border-slate-200' : idx === 2 ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-white text-slate-500 border-slate-100'}`}>
                                            {item.rank}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">{item.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-slate-400">{item.replies} replies</span>
                                                {item.trend === 'up' && <TrendingIcon className="text-green-500 h-3 w-3" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </SidebarSection>

                        <SidebarSection title="Trending Topics" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" /></svg>}>
                            <div className="flex flex-wrap gap-2">
                                {trendingTopics.map((topic, idx) => (
                                    <button key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 ${topic.color}`}>
                                        #{topic.name}
                                    </button>
                                ))}
                            </div>
                        </SidebarSection>

                         {/* Suggested Experts (Mini) */}
                         <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg">
                            <h3 className="font-bold mb-3">Expert Q&A</h3>
                            <p className="text-indigo-100 text-sm mb-4">Join our weekly live session with top industry leaders.</p>
                            <button className="w-full py-2 bg-white text-indigo-700 font-bold rounded-lg text-xs hover:bg-indigo-50 transition-colors">
                                View Schedule
                            </button>
                         </div>
                    </aside>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default CommunityFeedV3;
