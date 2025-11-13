
import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const initialPostData = [
    {
    id: 1,
    author: { name: 'Marilyn Franci', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3' },
    timestamp: '5 minutes ago',
    title: 'How do you feel about the latest platform update? Worth it or not?',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['#PlatformUpdate', '#CommunityFeedback', '#Tech', '#Discussion'],
    stats: {
        likes: 10800,
        comments: 3700
    },
    liked: false,
}
];

const topQuestions = [
    { rank: 1, title: 'How do you feel about the latest platform update? Worth it or not?', replies: '1289 replies' },
    { rank: 2, title: 'Post your favorite productivity hacks and tools here!', replies: '890 replies' },
    { rank: 3, title: 'What feature would you love to see added next?', replies: '785 replies' },
    { rank: 4, title: 'What\'s the most helpful piece of advice you\'ve received from this community?', replies: '666 replies' },
    { rank: 5, title: 'Rate your top 3 favorite integrations for our platform!', replies: '547 replies' }
];

const popularHashtags = [
    { name: '#CommunityFeedback', posts: '1.2M+ posts' },
    { name: '#FeatureRequests', posts: '900K+ posts' },
    { name: '#TechTalk', posts: '750K+ posts' },
    { name: '#PlatformUpdate', posts: '420K+ posts'}
];

// --- SVG ICONS ---
const ImageIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const VideoIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const PollsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const HeartIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const CommentIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ShareIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;

// --- UI COMPONENTS ---

const WelcomeBanner: React.FC = () => (
    <div className="relative bg-gray-800 text-white rounded-xl p-8 flex items-center justify-between overflow-hidden">
        <div>
            <h1 className="text-2xl font-bold">Welcome to Our Community Forum</h1>
            <p className="mt-2 text-gray-300 max-w-md">Join the ultimate place to discuss, share, and celebrate everything about our platform!</p>
            <button className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Explore Now
            </button>
        </div>
    </div>
);

const PostCreator: React.FC<{ onPublish: (content: string) => void }> = ({ onPublish }) => {
    const [content, setContent] = useState('');
    
    const handlePublish = () => {
        if (content.trim()) {
            onPublish(content.trim());
            setContent('');
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind, Marilyn?" className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500">
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-800"><ImageIcon /> Image</button>
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-800"><VideoIcon /> Video</button>
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-800"><PollsIcon /> Polls</button>
                </div>
                <button onClick={handlePublish} disabled={!content.trim()} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                    Publish
                </button>
            </div>
        </div>
    );
};

const PostCard: React.FC<{ post: any; onLike: (id: number) => void }> = ({ post, onLike }) => {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <p className="font-semibold text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                </div>
                <h2 className="mt-4 font-bold text-xl text-gray-800">{post.title}</h2>
            </div>
            {post.image && <img src={post.image} alt="Post image" className="w-full h-auto object-cover aspect-video bg-gray-200" />}
            <div className="p-4">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {post.tags.map((tag:string) => (
                        <span key={tag} className="text-sm text-gray-600 font-medium cursor-pointer hover:text-blue-600">{tag}</span>
                    ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-6 text-gray-500">
                    <button onClick={() => onLike(post.id)} className={`flex items-center gap-1.5 text-sm font-medium hover:text-red-500 ${post.liked ? 'text-red-500' : ''}`}>
                        <HeartIcon /> {formatNumber(post.stats.likes)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-medium hover:text-gray-800">
                        <CommentIcon /> {formatNumber(post.stats.comments)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-medium hover:text-gray-800">
                        <ShareIcon /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

const SidebarCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-sm">
        <h3 className="text-base font-bold text-gray-800 p-4 border-b border-gray-100">{title}</h3>
        <div className="p-4">
            {children}
        </div>
    </div>
);


const CommunityFeedV3: React.FC = () => {
    const [posts, setPosts] = useState(initialPostData);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

    const handlePublish = (content: string) => {
        const newPost = {
            id: Date.now(),
            author: { name: 'Marilyn Franci', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop&ixlib-rb-4.0.3' },
            timestamp: 'Just now',
            title: content,
            image: null,
            tags: ['#NewPost', '#Discussion'],
            stats: { likes: 0, comments: 0 },
            liked: false,
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const handleLike = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, stats: { ...p.stats, likes: p.liked ? p.stats.likes -1 : p.stats.likes + 1}} : p));
    };

    const filteredPosts = useMemo(() => {
        if (!selectedTag) return posts;
        return posts.filter(p => p.tags.includes(selectedTag));
    }, [posts, selectedTag]);

    return (
        <div className="bg-slate-100/70">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main content */}
                <main className="lg:col-span-8 space-y-6">
                    <WelcomeBanner />
                    <PostCreator onPublish={handlePublish}/>
                    {filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} onLike={handleLike} />
                    ))}
                     {filteredPosts.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
                            <h3 className="font-semibold text-lg">No posts found for {selectedTag}</h3>
                            <p className="text-sm mt-1">Try selecting another hashtag or clearing the filter.</p>
                             <button onClick={() => setSelectedTag(null)} className="mt-4 px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm hover:bg-blue-200">
                                Clear Filter
                            </button>
                        </div>
                    )}
                </main>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6 sticky top-6">
                    <SidebarCard title="Top Questions">
                        <ol className="space-y-4">
                            {topQuestions.map(q => (
                                <li key={q.rank} className="flex items-start gap-3">
                                    <span className="text-2xl font-bold text-gray-200 mt-[-4px]">{q.rank}</span>
                                    <div>
                                        <a href="#" className="font-semibold text-gray-800 hover:text-blue-600 text-sm leading-tight">{q.title}</a>
                                        <p className="text-xs text-gray-500 mt-1">{q.replies}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </SidebarCard>
                    <SidebarCard title="Popular Hashtags This Month">
                        <ul className="space-y-3">
                            {popularHashtags.map(h => (
                                <li key={h.name}>
                                    <button onClick={() => setSelectedTag(h.name)} className={`font-semibold text-sm text-left ${selectedTag === h.name ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}>{h.name}</button>
                                    <p className="text-xs text-gray-500">{h.posts}</p>
                                </li>
                            ))}
                        </ul>
                         {selectedTag && <button onClick={() => setSelectedTag(null)} className="mt-2 text-xs font-semibold text-blue-600 hover:underline">Clear filter</button>}
                    </SidebarCard>
                </aside>
            </div>
        </div>
    );
};

export default CommunityFeedV3;