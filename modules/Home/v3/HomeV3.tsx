import React, { useRef } from 'react';

// --- Reusable UI Components ---

const StoryCircle: React.FC<{ story: { name: string; avatar: string } }> = ({ story }) => (
  <div className="text-center w-20 flex-shrink-0 group">
    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 mx-auto group-hover:scale-110 transition-transform duration-200">
      <div className="bg-white p-0.5 rounded-full">
        <img src={story.avatar} alt={story.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
      </div>
    </div>
    <p className="text-xs font-medium text-slate-600 mt-1.5 truncate">{story.name}</p>
  </div>
);

const CreateStoryCircle: React.FC = () => (
  <div className="text-center w-20 flex-shrink-0 group">
    <div className="w-16 h-16 rounded-full p-0.5 bg-slate-200 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-200 cursor-pointer">
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </div>
    <p className="text-xs font-medium text-slate-600 mt-1.5">Add Story</p>
  </div>
);

const FeaturedArticleCard: React.FC<{ article: { category: string; title: string; author: string; } }> = ({ article }) => (
  <article className="group cursor-pointer">
    <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden bg-slate-200">
    </div>
    <div>
      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{article.category}</p>
      <h1 className="mt-1 text-2xl sm:text-3xl font-bold leading-tight text-slate-800 group-hover:text-blue-700 transition-colors break-words">
        {article.title}
      </h1>
      <p className="mt-2 text-sm text-slate-500 font-medium">By {article.author}</p>
    </div>
  </article>
);

const LatestArticleCard: React.FC<{ article: { category: string; title: string; author: string; date: string; } }> = ({ article }) => (
  <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-slate-200/80">
    <div className="aspect-video bg-slate-200 overflow-hidden">
    </div>
    <div className="p-4 sm:p-5">
      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{article.category}</p>
      <h2 className="mt-1 text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight break-words">
        {article.title}
      </h2>
      <div className="mt-3 flex items-center text-xs text-slate-500 font-medium">
        <span>By {article.author}</span>
        <span className="mx-2">&bull;</span>
        <span>{article.date}</span>
      </div>
    </div>
  </article>
);


const PopularPostItem: React.FC<{ post: { title: string }, rank: number }> = ({ post, rank }) => (
  <li className="flex items-start gap-4 group py-3">
    <span className="text-2xl font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
      {String(rank).padStart(2, '0')}
    </span>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-slate-800 group-hover:text-blue-700 leading-tight cursor-pointer">
        {post.title}
      </p>
    </div>
  </li>
);

const TopicTag: React.FC<{ topic: string }> = ({ topic }) => (
  <a href="#" className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors">
    {topic}
  </a>
);

const SubscribeCard: React.FC = () => (
    <div className="bg-slate-50 rounded-lg p-5 mt-8">
        <h4 className="font-bold text-slate-800">Subscribe to our newsletter</h4>
        <p className="text-sm text-slate-600 mt-1">Get the latest posts delivered right to your inbox.</p>
        <div className="mt-4 flex gap-2">
            <input type="email" placeholder="Your email" className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500" />
            <button className="px-4 py-1.5 bg-slate-800 text-white rounded-md text-sm font-semibold hover:bg-slate-900 transition-colors">
                Go
            </button>
        </div>
    </div>
);

const VideoCard: React.FC<{ video: { thumbnail: string; title: string; description: string; } }> = ({ video }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 shadow-lg">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{video.title}</h3>
      <p className="text-sm text-slate-600 mt-1">{video.description}</p>
    </div>
  </div>
);

const VideoPlaylistItem: React.FC<{ video: { thumbnail: string; title: string; duration: string; } }> = ({ video }) => (
  <a href="#" className="flex items-center gap-4 group p-2 rounded-lg hover:bg-slate-100 transition-colors">
    <div className="flex-shrink-0 w-24 aspect-video rounded-md overflow-hidden bg-slate-300">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors">{video.title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{video.duration}</p>
    </div>
  </a>
);

const DiscussionRow: React.FC<{ discussion: { avatar: string; title: string; category: string; replies: number; views: number; } }> = ({ discussion }) => (
  <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
    <img src={discussion.avatar} alt="author" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
    <div className="flex-1 min-w-0">
      <a href="#" className="font-semibold text-slate-800 hover:text-blue-700 transition-colors break-words">
        {discussion.title}
      </a>
      <p className="text-sm text-slate-500">{discussion.category}</p>
    </div>
    <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
      <div className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{discussion.replies}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{discussion.views}k</span>
      </div>
    </div>
  </div>
);


// --- Mock Data ---

const stories = [
  { name: 'cuhiep', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Nguyễn ...', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Rubi Lee', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'xedapgiakho', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'hoangdu...', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'officialnpah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'K wang', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'huukhanh...', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const featuredArticle = {
  category: 'Technology',
  title: 'Recycling Gold from E-Waste with Non-Toxic Methods',
  author: 'P.W',
};

const latestArticles = [
  { category: 'Auto', title: 'Aprilia SR GT 400: Powerful, Modern, and Versatile', author: 'Alex Doe', date: 'May 24, 2024' },
  { category: 'Audio', title: 'Audeze LCD-S20: A Niche Headphone for Audiophiles', author: 'Jane Smith', date: 'May 23, 2024' },
  { category: 'Gaming', title: 'Gaming Review: Does the Xiaomi 15 Ultra Dominate?', author: 'Sam Wilson', date: 'May 22, 2024' },
  { category: 'Mobile', title: 'First Impressions: The New Foldable Phone Everyone is Talking About', author: 'Chris Lee', date: 'May 21, 2024' },
];

const popularPosts = [
  { title: "Ol' Rip the horned lizard: A Texas Legend" },
  { title: "IOC Nears Decision on Transgender Athlete Participation" },
  { title: "First look: Tilta Khronos Case for iPhone 17 Pro Max" },
  { title: "Razer's new Phantom White Collection is here ❤️" },
  { title: "TRISO-X: The Future of Nuclear Fuel?" },
];

const topics = ["Technology", "Science", "Auto", "Gaming", "Reviews", "Mobile", "AI"];

const videos = {
  featured: { thumbnail: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop', title: 'Building a Design System That Scales', description: 'Join us as we explore the fundamentals of creating a robust and scalable design system.' },
  playlist: [
    { thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop', title: 'Data Visualization Best Practices', duration: '12:45' },
    { thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=300&auto=format&fit=crop', title: 'Intro to Web3 and Blockchain', duration: '22:10' },
    { thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=300&auto=format&fit=crop', title: 'Advanced CSS Grid Techniques', duration: '18:30' },
  ]
};

const discussions = [
  { avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=facearea', title: 'What are your thoughts on the new AI advancements?', category: 'Artificial Intelligence', replies: 128, views: 5.4 },
  { avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=facearea', title: 'Best budget-friendly mechanical keyboard for programming?', category: 'Hardware', replies: 76, views: 3.1 },
  { avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=facearea', title: 'How do you stay productive when working from home?', category: 'Productivity', replies: 204, views: 8.9 },
  { avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=facearea', title: 'Tips for learning a new programming language in 2024', category: 'Software Development', replies: 98, views: 4.2 },
];

// --- Main Page Component ---

const HomeV3: React.FC = () => {
  const storiesScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const container = ref.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth * 0.75 : container.offsetWidth * 0.75;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section 1: Today's Feed & Stories */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Today's Feed</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => handleScroll(storiesScrollRef, 'left')} aria-label="Scroll left" className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => handleScroll(storiesScrollRef, 'right')} aria-label="Scroll right" className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div ref={storiesScrollRef} className="flex gap-4 items-start overflow-x-auto scrollbar-hide scroll-smooth pb-4">
            <CreateStoryCircle />
            {stories.map((story, index) => <StoryCircle key={index} story={story} />)}
          </div>
        </section>

        {/* Section 2: Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Left Column */}
          <div className="lg:col-span-8">
            <FeaturedArticleCard article={featuredArticle} />
            
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Latest Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestArticles.map((article, index) => (
                    <LatestArticleCard key={index} article={article} />
                  ))}
                </div>
            </div>

            {/* Video Hub Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Video Hub</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <VideoCard video={videos.featured} />
                    </div>
                    <div className="lg:col-span-1">
                        <h4 className="font-bold text-slate-800 mb-2">Up Next</h4>
                        <div className="space-y-2">
                          {videos.playlist.map((video, index) => (
                              <VideoPlaylistItem key={index} video={video} />
                          ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Discussions Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Trending Discussions</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 divide-y divide-slate-200/80">
                  {discussions.map((discussion, index) => (
                    <DiscussionRow key={index} discussion={discussion} />
                  ))}
                </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Popular This Week</h3>
                <ul className="border-t border-slate-200 divide-y divide-slate-200">
                  {popularPosts.map((post, index) => (
                    <PopularPostItem key={index} post={post} rank={index + 1} />
                  ))}
                </ul>
              </div>
              
               <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Explore Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <TopicTag key={index} topic={topic} />
                  ))}
                </div>
              </div>

              <SubscribeCard />
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default HomeV3;