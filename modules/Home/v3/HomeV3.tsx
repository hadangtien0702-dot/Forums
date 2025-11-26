
import React, { useRef } from 'react';

// --- Reusable UI Components ---

const FeaturedArticleHero: React.FC<{ article: { category: string; title: string; subtitle?: string; author: string; } }> = ({ article }) => (
  <article className="group relative h-[500px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-900/20 isolate">
    {/* Image Layer with Slow Cinematic Zoom */}
    <div className="absolute inset-0 overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-110 will-change-transform"
        />
        {/* Vignette Overlay - Darkens slightly on hover for better text contrast */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700"></div>
    </div>

    {/* Gradient Layer - Dynamic opacity */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>

    {/* Content Layer - Slide Up Reveal Effect */}
    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end translate-y-12 transition-transform duration-500 cubic-bezier(0.2, 0, 0.2, 1) group-hover:translate-y-0">

      {/* Category - Floating Badge */}
      <div className="mb-4 transform transition-all duration-500 group-hover:-translate-y-1 opacity-90 group-hover:opacity-100">
        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest shadow-lg border border-blue-500/30">
            {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-3 drop-shadow-sm group-hover:text-blue-50 transition-colors duration-300">
        {article.title}
      </h1>

      {/* Subtitle */}
      {article.subtitle && (
        <p className="text-lg text-slate-300 leading-relaxed line-clamp-2 mb-6 max-w-3xl group-hover:text-white transition-colors duration-300">
          {article.subtitle}
        </p>
      )}

      {/* Meta & Action Row */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-2">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {article.author.charAt(0)}
            </div>
            <span>By <span className="text-white">{article.author}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>May 25, 2024</span>
          </div>

          {/* Hidden Button Revealed on Hover */}
          <div className="opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide">
              Read Story
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
          </div>
      </div>
    </div>
  </article>
);

const LatestArticleCard: React.FC<{ article: { category: string; title: string; author: string; date: string; image?: string } }> = ({ article }) => (
  <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
       {/* Placeholder Image logic based on category for visual variety */}
       <img 
         src={`https://source.unsplash.com/random/800x600?${article.category.toLowerCase()}`} 
         alt={article.title}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop';
         }}
       />
       <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">
            {article.category}
          </span>
       </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
        {article.title}
      </h2>
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded-full bg-slate-200 flex-shrink-0"></div>
             <span>{article.author}</span>
        </div>
        <span>{article.date}</span>
      </div>
    </div>
  </article>
);


const PopularPostItem: React.FC<{ post: { title: string }, rank: number }> = ({ post, rank }) => {
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

const VideoCard: React.FC<{ video: { thumbnail: string; title: string; description: string; } }> = ({ video }) => (
  <div className="group cursor-pointer h-full flex flex-col">
    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 shadow-2xl shadow-black/30 ring-1 ring-white/10">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-md border border-white/10">12:45</div>
    </div>
    <div className="mt-5 px-2">
      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">{video.title}</h3>
      <p className="text-sm text-slate-400 mt-3 leading-relaxed line-clamp-2">{video.description}</p>
    </div>
  </div>
);

const VideoPlaylistItem: React.FC<{ video: { thumbnail: string; title: string; duration: string; } }> = ({ video }) => (
  <a href="#" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/5">
    <div className="flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden bg-slate-800 relative shadow-md">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">{video.title}</p>
      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors"></span>
        {video.duration}
      </p>
    </div>
  </a>
);

const SalesHonorCard: React.FC<{ member: any }> = ({ member }) => {
  const rankColors = {
    gold: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-500/20',
      badge: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
      ring: 'ring-yellow-100',
    },
    silver: {
      border: 'border-slate-300',
      shadow: 'shadow-slate-400/20',
      badge: 'bg-gradient-to-br from-slate-300 to-slate-400',
      ring: 'ring-slate-100',
    },
    bronze: {
      border: 'border-orange-300',
      shadow: 'shadow-orange-500/20',
      badge: 'bg-gradient-to-br from-orange-300 to-orange-500',
      ring: 'ring-orange-100',
    },
    default: {
      border: 'border-transparent',
      shadow: 'shadow-slate-200/50',
      badge: 'bg-slate-500',
      ring: 'ring-slate-50',
    }
  };

  const colors = rankColors[member.color as keyof typeof rankColors] || rankColors.default;

  return (
    <div className="snap-start text-center w-48 flex-shrink-0 group relative pt-4 pb-2">
      <div className={`p-5 bg-white rounded-2xl shadow-lg ${colors.shadow} border ${colors.border} group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col`}>
        <div className="relative mx-auto mb-3">
          <img src={member.avatar} alt={member.name} className={`w-20 h-20 object-cover rounded-full mx-auto ring-4 ${colors.ring}`} loading="lazy" />
          <div className={`absolute -top-3 -right-1 h-8 w-8 rounded-full ${colors.badge} flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white`}>
            {member.rank}
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-800 truncate w-full">{member.name}</h3>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{member.title}</p>
        <div className="mt-auto pt-3 border-t border-slate-50">
             <p className="text-xs font-semibold text-slate-600">{member.achievement}</p>
        </div>
      </div>
    </div>
  );
};

const DiscussionRow: React.FC<{ discussion: { avatar: string; title: string; category: string; replies: number; views: number } }> = ({ discussion }) => (
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

const SeriesCard: React.FC<{ series: { title: string; subtitle: string; count: number; image: string; color: string } }> = ({ series }) => {
    // Safe color mapping for Tailwind JIT
    const gradients: Record<string, string> = {
        blue: 'to-blue-900/90',
        emerald: 'to-emerald-900/90',
        purple: 'to-purple-900/90',
    };

    const gradientClass = gradients[series.color] || 'to-slate-900/90';

    return (
        <div className="group relative h-80 rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Background Image */}
            <img 
                src={series.image} 
                alt={series.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Gradient Overlay with Mapping */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 ${gradientClass} mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {series.count} Lessons
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Exclusive Series</p>
                    <h3 className="text-2xl font-extrabold text-white leading-tight mb-1">{series.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100">{series.subtitle}</p>
                    
                    <button className="flex items-center gap-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0 hover:text-blue-300">
                        Start Learning
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Mock Data ---
const topSalesMembers = [
  { id: 1, name: 'Vinh Sale', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 1, title: 'Salesperson of the Month', achievement: '$2.1M in Sales', color: 'gold' },
  { id: 2, name: 'Nguyễn Thị B', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 2, title: 'Top Performer', achievement: '$1.8M in Sales', color: 'silver' },
  { id: 3, name: 'Rubi Lee', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 3, title: 'Rising Star', achievement: '$1.5M in Sales', color: 'bronze' },
  { id: 4, name: 'xedapgiakho', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 4, title: 'Consistent Achiever', achievement: '120 Policies Sold', color: 'default' },
  { id: 5, name: 'hoangdu...', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 5, title: 'Consistent Achiever', achievement: '115 Policies Sold', color: 'default' },
  { id: 6, name: 'officialnpah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 6, title: 'Consistent Achiever', achievement: '112 Policies Sold', color: 'default' },
  { id: 7, name: 'K wang', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 7, title: 'Consistent Achiever', achievement: '109 Policies Sold', color: 'default' },
];

const featuredArticle = {
  category: 'Featured Insight',
  title: 'Recycling Gold from E-Waste with Non-Toxic Methods',
  subtitle: 'A breakthrough in sustainable electronics recycling promises a greener future for tech, reducing reliance on harmful chemicals.',
  author: 'Dr. P.W',
};

const latestArticles = [
  { category: 'Auto', title: 'Aprilia SR GT 400: Powerful, Modern, and Versatile', author: 'Alex Doe', date: 'May 24', image: 'auto' },
  { category: 'Audio', title: 'Audeze LCD-S20: A Niche Headphone for Audiophiles', author: 'Jane Smith', date: 'May 23', image: 'headphones' },
  { category: 'Gaming', title: 'Gaming Review: Does the Xiaomi 15 Ultra Dominate?', author: 'Sam Wilson', date: 'May 22', image: 'gaming' },
  { category: 'Mobile', title: 'First Impressions: The New Foldable Phone Everyone is Talking About', author: 'Chris Lee', date: 'May 21', image: 'phone' },
];

const popularPosts = [
  { title: "Ol' Rip the horned lizard: A Texas Legend" },
  { title: "IOC Nears Decision on Transgender Athlete Participation" },
  { title: "First look: Tilta Khronos Case for iPhone 17 Pro Max" },
  { title: "Razer's new Phantom White Collection is here ❤️" },
  { title: "TRISO-X: The Future of Nuclear Fuel?" },
];

const topics = ["Technology", "Science", "Auto", "Gaming", "Reviews", "Mobile", "AI", "Finance", "Health"];

const videos = {
  featured: { thumbnail: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop', title: 'Building a Design System That Scales', description: 'Join us as we explore the fundamentals of creating a robust and scalable design system for large teams.' },
  playlist: [
    { thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop', title: 'Data Visualization Best Practices', duration: '12:45' },
    { thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=300&auto=format&fit=crop', title: 'Intro to Web3 and Blockchain', duration: '22:10' },
    { thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=300&auto=format&fit=crop', title: 'Advanced CSS Grid Techniques', duration: '18:30' },
    { thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=300&auto=format&fit=crop', title: 'Mastering Tailwind CSS', duration: '25:10' },
  ]
};

const discussions = [
  { avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=facearea', title: 'What are your thoughts on the new AI advancements?', category: 'Artificial Intelligence', replies: 128, views: 5.4 },
  { avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=facearea', title: 'Best budget-friendly mechanical keyboard for programming?', category: 'Hardware', replies: 76, views: 3.1 },
  { avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=facearea', title: 'How do you stay productive when working from home?', category: 'Productivity', replies: 204, views: 8.9 },
  { avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=facearea', title: 'Tips for learning a new programming language in 2024', category: 'Software Development', replies: 98, views: 4.2 },
];

const curatedSeries = [
    {
        title: "The 90-Day Launchpad",
        subtitle: "A complete roadmap for new agents to secure their first 10 clients.",
        count: 12,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        color: "blue"
    },
    {
        title: "Wealth Transfer Mastery",
        subtitle: "Advanced strategies for estate planning and tax-advantaged wealth protection.",
        count: 8,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
        color: "emerald"
    },
    {
        title: "Digital Brand Building",
        subtitle: "How to leverage social media and content marketing to attract high-net-worth leads.",
        count: 15,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
        color: "purple"
    }
];

// --- Main Page Component ---

const HomeV3: React.FC = () => {
  const storiesScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const container = ref.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section 1: Top Sales Performers Carousel */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Top Sales Performers</h2>
                <p className="text-slate-500 text-sm mt-1">Recognizing excellence this month</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleScroll(storiesScrollRef, 'left')} aria-label="Scroll left" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => handleScroll(storiesScrollRef, 'right')} aria-label="Scroll right" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          
          {/* Scroll Snap Container */}
          <div ref={storiesScrollRef} className="flex gap-6 items-stretch overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8 -mx-4 px-4">
            {topSalesMembers.map((member) => <SalesHonorCard key={member.id} member={member} />)}
          </div>
        </section>

        {/* Section 2: Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">

          {/* Left Column */}
          <div className="lg:col-span-8">
            <FeaturedArticleHero article={featuredArticle} />
            
            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                     <h3 className="text-2xl font-bold text-slate-800">Latest Articles</h3>
                     <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">View all</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestArticles.map((article, index) => (
                    <LatestArticleCard key={index} article={article} />
                  ))}
                </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-4 space-y-10">
              {/* Trending Discussions */}
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
        </section>

        {/* Section 3: Curated Series */}
        <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Knowledge Series</h2>
                    <p className="text-slate-500 text-sm mt-1">Deep dive into curated topics</p>
                </div>
                <a href="#" className="hidden sm:block text-sm font-semibold text-blue-600 hover:underline">View all collections</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {curatedSeries.map((series, index) => (
                    <SeriesCard key={index} series={series} />
                ))}
            </div>
        </section>
        
        {/* Section 4: Video Hub (Full Width, Dark Mode) */}
        <section className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 isolate">
             {/* Dynamic Background */}
            <div className="absolute inset-0 bg-slate-950">
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black opacity-90"></div>
            </div>

            {/* Vibrant Glows for Depth */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-custom"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] mix-blend-screen"></div>
            
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 text-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">Video Hub</h3>
                        <p className="text-slate-300 mt-2 max-w-lg text-lg">Curated video content to help you grow, learn, and stay inspired.</p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:scale-105 backdrop-blur-md active:scale-95">
                        Browse All Videos
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured Video - Enhanced Shadow/Border */}
                    <div className="lg:col-span-2 h-full">
                        <div className="h-full bg-slate-800/50 rounded-2xl p-2 border border-white/5 shadow-xl backdrop-blur-sm">
                           <VideoCard video={videos.featured} />
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col h-full">
                        <h4 className="font-bold text-slate-200 mb-4 flex items-center gap-2 text-lg">
                            <span className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            Up Next
                        </h4>
                        <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                          {videos.playlist.map((video, index) => (
                              <VideoPlaylistItem key={index} video={video} />
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default HomeV3;
