
import type { Article, SalesMember, VideoSectionData, Discussion, Series, Post } from './Home.types';

export const topSalesMembers: SalesMember[] = [
  { id: 1, name: 'Vinh Sale', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 1, title: 'Salesperson of the Month', achievement: '$2.1M in Sales', color: 'gold' },
  { id: 2, name: 'Nguyễn Thị B', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 2, title: 'Top Performer', achievement: '$1.8M in Sales', color: 'silver' },
  { id: 3, name: 'Rubi Lee', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 3, title: 'Rising Star', achievement: '$1.5M in Sales', color: 'bronze' },
  { id: 4, name: 'xedapgiakho', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 4, title: 'Consistent Achiever', achievement: '120 Policies Sold', color: 'default' },
  { id: 5, name: 'hoangdu...', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 5, title: 'Consistent Achiever', achievement: '115 Policies Sold', color: 'default' },
  { id: 6, name: 'officialnpah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 6, title: 'Consistent Achiever', achievement: '112 Policies Sold', color: 'default' },
  { id: 7, name: 'K wang', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', rank: 7, title: 'Consistent Achiever', achievement: '109 Policies Sold', color: 'default' },
];

export const featuredArticle: Article = {
  category: 'Featured Insight',
  title: 'Recycling Gold from E-Waste with Non-Toxic Methods',
  subtitle: 'A breakthrough in sustainable electronics recycling promises a greener future for tech, reducing reliance on harmful chemicals.',
  author: 'Dr. P.W',
};

export const latestArticles: Article[] = [
  { category: 'Auto', title: 'Aprilia SR GT 400: Powerful, Modern, and Versatile', author: 'Alex Doe', date: 'May 24', image: 'auto' },
  { category: 'Audio', title: 'Audeze LCD-S20: A Niche Headphone for Audiophiles', author: 'Jane Smith', date: 'May 23', image: 'headphones' },
  { category: 'Gaming', title: 'Gaming Review: Does the Xiaomi 15 Ultra Dominate?', author: 'Sam Wilson', date: 'May 22', image: 'gaming' },
  { category: 'Mobile', title: 'First Impressions: The New Foldable Phone Everyone is Talking About', author: 'Chris Lee', date: 'May 21', image: 'phone' },
];

export const popularPosts: Post[] = [
  { title: "Ol' Rip the horned lizard: A Texas Legend" },
  { title: "IOC Nears Decision on Transgender Athlete Participation" },
  { title: "First look: Tilta Khronos Case for iPhone 17 Pro Max" },
  { title: "Razer's new Phantom White Collection is here ❤️" },
  { title: "TRISO-X: The Future of Nuclear Fuel?" },
];

export const topics: string[] = ["Technology", "Science", "Auto", "Gaming", "Reviews", "Mobile", "AI", "Finance", "Health"];

export const videos: VideoSectionData = {
  featured: { thumbnail: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop', title: 'Building a Design System That Scales', description: 'Join us as we explore the fundamentals of creating a robust and scalable design system for large teams.' },
  playlist: [
    { thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop', title: 'Data Visualization Best Practices', duration: '12:45' },
    { thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=300&auto=format&fit=crop', title: 'Intro to Web3 and Blockchain', duration: '22:10' },
    { thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=300&auto=format&fit=crop', title: 'Advanced CSS Grid Techniques', duration: '18:30' },
    { thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=300&auto=format&fit=crop', title: 'Mastering Tailwind CSS', duration: '25:10' },
  ]
};

export const discussions: Discussion[] = [
  { avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=facearea', title: 'What are your thoughts on the new AI advancements?', category: 'Artificial Intelligence', replies: 128, views: 5.4 },
  { avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=facearea', title: 'Best budget-friendly mechanical keyboard for programming?', category: 'Hardware', replies: 76, views: 3.1 },
  { avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=facearea', title: 'How do you stay productive when working from home?', category: 'Productivity', replies: 204, views: 8.9 },
  { avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=facearea', title: 'Tips for learning a new programming language in 2024', category: 'Software Development', replies: 98, views: 4.2 },
];

export const curatedSeries: Series[] = [
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
