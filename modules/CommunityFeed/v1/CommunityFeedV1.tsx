
import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const initialThreads = [
    {
        id: 1,
        author: { name: 'Milad Irani', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3' },
        title: 'How to assign jobs to others?',
        content: "I'm a project managers and we're thinking about moving from Jira to cotopia. I couldn't find an assign option in jobs and that's a major prt of my job. How should I do it?",
        tags: ['#jobs'],
        timestamp: '2hr ago',
        likes: 123,
        liked: false,
        bookmarked: false,
    },
    {
        id: 2,
        author: { name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3' },
        title: 'Adding CV.PDF to public cotopia profile',
        content: 'Beside the resume the platform builds for us I think the user\'s resume outside cotopia might be valuable for workspaces, so this feature might help a lot to enhance the community activity and job findings.',
        tags: ['#profile'],
        timestamp: '2hr ago',
        likes: 345,
        liked: true,
        bookmarked: false,
    },
    {
        id: 3,
        author: { name: 'TheMMD', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3' },
        title: 'Is it possible to create a new workspace inside another one?',
        content: 'We are a big company and we have a lot of ventures working on different products. so managing those teams are sometimes hard and we also have some employees who work in different ventures so we need a place to gather their job reports and trac...',
        tags: ['#dashboard', '#workspace'],
        timestamp: '2hr ago',
        likes: 80,
        liked: false,
        bookmarked: true,
    },
    {
        id: 4,
        author: { name: 'Eli williams', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3' },
        title: "Isn't there too much non-shared data?",
        content: 'I understand that Cotopia is trying to create a safe space and respects our privacy as team members. But I\'m working with a small startup which makes the team more close and sharing data might help encouraging each other while working so I think...',
        tags: ['#cotopia', '#questions'],
        timestamp: '2hr ago',
        likes: 10,
        liked: false,
        bookmarked: false,
    },
];

const topUsers = [
    { id: 1, name: 'Milad Irani', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', score: '2.3k' },
    { id: 2, name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', score: '1.2' },
    { id: 3, name: 'TheMMD', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', score: '800' },
    { id: 4, name: 'Eli williams', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', score: '700' },
    { id: 5, name: 'Michel polat', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3', score: '12' },
];

const activeTopics = [
    { id: 1, name: '#sidebar', threads: 24 },
    { id: 2, name: '#questions', threads: 22 },
    { id: 3, name: '#jobs', threads: 20 },
    { id: 4, name: '#ideas', threads: 18 },
    { id: 5, name: '#time-tracker', threads: 10 },
    { id: 6, name: '#connection', threads: 10 },
];

// --- SVG ICONS ---
const ThumbsUpIcon: React.FC<{ filled?: boolean }> = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
    <path d="M11 1.33331C11 0.596934 10.4031 0 9.66667 0C8.93029 0 8.33333 0.596934 8.33333 1.33331V6.66665H3.5C2.67157 6.66665 2 7.33822 2 8.16665V17.1666C2 17.9951 2.67157 18.6666 3.5 18.6666H12.25C13.2058 18.6666 14.0263 17.943 14.1527 16.9926L15.0894 9.82594C15.2842 8.34538 14.1311 7.00929 12.6398 6.9882L12.5 6.98763H11V1.33331Z" />
    <path d="M17.5 7.66665C18.3284 7.66665 19 8.33822 19 9.16665V16.1666C19 16.9951 18.3284 17.6666 17.5 17.6666C16.6716 17.6666 16 16.9951 16 16.1666V9.16665C16 8.33822 16.6716 7.66665 17.5 7.66665Z" />
</svg>;
const BookmarkIcon: React.FC<{ filled?: boolean }> = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>;
const RibbonIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v14l3.5-2 3.5 2V3a1 1 0 011-1h2a1 1 0 011 1v15l-5-2.5L5 18V3a1 1 0 011-1h2z" clipRule="evenodd" /></svg>;
const GreenUpArrow: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>;
const Spinner: React.FC = () => <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"><span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span></div>;

// --- UI COMPONENTS ---

const NewThreadModal: React.FC<{ isOpen: boolean; onClose: () => void; onPost: (thread: any) => void; }> = ({ isOpen, onClose, onPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    
    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title || !content) return;
        const newThread = {
            id: Date.now(),
            author: { name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop' },
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            timestamp: 'Just now',
            likes: 0,
            liked: false,
            bookmarked: false,
        };
        onPost(newThread);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-slate-800">Start a New Thread</h2>
                </div>
                <div className="p-6 space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    <textarea placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                    <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div className="p-6 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border rounded-md hover:bg-slate-100">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={!title || !content}>Post</button>
                </div>
            </div>
        </div>
    );
};

const HeaderTab: React.FC<{ label: string; isActive?: boolean }> = ({ label, isActive }) => (
    <button className={`py-3 px-4 text-sm font-semibold transition-colors ${isActive ? 'text-slate-800 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
        {label}
    </button>
);

const FilterButton: React.FC<{ children: React.ReactNode; hasDropdown?: boolean }> = ({ children, hasDropdown }) => (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-600 text-sm font-medium rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
        {children}
        {hasDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
    </button>
);

const ThreadItem: React.FC<{ thread: any; onLike: (id: number) => void; onBookmark: (id: number) => void; onReply: (id: number) => void; isReplying: boolean; }> = ({ thread, onLike, onBookmark, onReply, isReplying }) => (
    <div className="py-6 border-b border-slate-100 last:border-b-0">
        <div className="flex items-start gap-3">
            <img src={thread.author.avatar} alt={thread.author.name} className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
                <div className="flex items-center">
                    <p className="text-sm font-semibold text-slate-800">{thread.author.name}</p>
                    <RibbonIcon />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors break-words">{thread.title}</h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{thread.content}</p>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{thread.tags.join(' ')} - {thread.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <button onClick={() => onBookmark(thread.id)} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${thread.bookmarked ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'text-slate-500 bg-slate-100/80 hover:bg-slate-200'}`}>
                             <BookmarkIcon filled={thread.bookmarked} />
                        </button>
                        <button onClick={() => onLike(thread.id)} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${thread.liked ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'text-slate-500 bg-slate-100/80 hover:bg-slate-200'}`}>
                            <ThumbsUpIcon filled={thread.liked} />
                            <span>{thread.likes}</span>
                        </button>
                        <button onClick={() => onReply(thread.id)} className="flex items-center gap-1.5 px-2.5 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-xs font-medium transition-colors">
                            {isReplying ? 'Close' : 'Reply'}
                        </button>
                    </div>
                </div>
                {isReplying && (
                    <div className="mt-4">
                        <textarea placeholder={`Replying to ${thread.author.name}...`} rows={3} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"></textarea>
                        <div className="flex justify-end mt-2">
                            <button className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Post Reply</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const TopUserItem: React.FC<{ user: typeof topUsers[0] }> = ({ user }) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            <div>
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold">
            <GreenUpArrow />
            <span className="text-slate-600">{user.score}</span>
        </div>
    </div>
);

const ActiveTopicItem: React.FC<{ topic: typeof activeTopics[0], isSelected: boolean, onClick: (name: string) => void }> = ({ topic, isSelected, onClick }) => (
    <div onClick={() => onClick(topic.name)} className={`flex items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-100' : 'hover:bg-slate-50'}`}>
        <p className={`text-sm font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>{topic.name}</p>
        <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{topic.threads} threads</p>
    </div>
);

const SidebarCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-md shadow-slate-200/60 border border-slate-200/80">
        <h3 className="text-base font-bold text-slate-800 p-4 border-b border-slate-100">{title}</h3>
        <div className="p-4">
            {children}
        </div>
    </div>
);


// --- MAIN COMPONENT ---
const CommunityFeedV1: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Community');
    const [threads, setThreads] = useState(initialThreads);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
    const filteredThreads = useMemo(() => {
        return threads.filter(thread => {
            const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) || thread.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTopic = selectedTopic ? thread.tags.includes(selectedTopic) : true;
            return matchesSearch && matchesTopic;
        });
    }, [threads, searchTerm, selectedTopic]);
    
    const handleLike = (id: number) => {
        setThreads(threads.map(t => t.id === id ? { ...t, liked: !t.liked, likes: t.liked ? t.likes - 1 : t.likes + 1 } : t));
    };
    
    const handleBookmark = (id: number) => {
        setThreads(threads.map(t => t.id === id ? { ...t, bookmarked: !t.bookmarked } : t));
    };

    const handleReply = (id: number) => {
        setReplyingTo(replyingTo === id ? null : id);
    };

    const handlePostThread = (newThread: any) => {
        setThreads([newThread, ...threads]);
    };
    
    const handleTopicSelect = (topicName: string) => {
        setSelectedTopic(prev => prev === topicName ? null : topicName);
    };

    return (
        <div className="w-full">
            <NewThreadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onPost={handlePostThread} />
            {/* Header Tabs */}
            <div className="border-b border-slate-200">
                <HeaderTab label="Community" isActive={activeTab === 'Community'} />
                <HeaderTab label="Profile" isActive={activeTab === 'Profile'} />
                <HeaderTab label="My answers" isActive={activeTab === 'My answers'} />
            </div>

            {/* Main Layout Grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column: Threads */}
                <main className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md shadow-slate-200/60 border border-slate-200/80">
                        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">Threads</h2>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <input type="text" placeholder="Search threads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-1.5 bg-white text-slate-600 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="px-4">
                            {filteredThreads.length > 0 ? (
                                filteredThreads.map(thread => <ThreadItem key={thread.id} thread={thread} onLike={handleLike} onBookmark={handleBookmark} onReply={handleReply} isReplying={replyingTo === thread.id} />)
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    <h3 className="font-semibold text-lg">No threads found</h3>
                                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                
                {/* Right Column: Sidebar */}
                <aside className="lg:col-span-1 space-y-6 sticky top-6">
                    <button onClick={() => setModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 active:scale-[0.98]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        <span>Start a New Thread</span>
                    </button>
                    <SidebarCard title="Top Users">
                        <div className="divide-y divide-slate-100">
                            {topUsers.map(user => <TopUserItem key={user.id} user={user} />)}
                        </div>
                    </SidebarCard>
                    <SidebarCard title="Active Topics">
                        <div className="space-y-1">
                            {activeTopics.map(topic => <ActiveTopicItem key={topic.id} topic={topic} isSelected={selectedTopic === topic.name} onClick={handleTopicSelect} />)}
                        </div>
                    </SidebarCard>
                </aside>
            </div>
        </div>
    );
};

export default CommunityFeedV1;