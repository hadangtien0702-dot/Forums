
export interface Author {
  name: string;
  avatar: string;
  role?: string;
  badge?: {
    text: string;
    color: 'blue' | 'green' | 'gold' | 'purple';
  };
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  isVoted?: boolean;
}

export interface LinkData {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  domain: string;
}

export interface EventData {
  date: string;
  month: string;
  title: string;
  time: string;
  location: string;
  attendees: number;
}

export interface CommunityPost {
  id: string;
  type: 'text' | 'image' | 'poll' | 'link' | 'event' | 'milestone';
  author: Author;
  timeAgo: string;
  content: string;
  image?: string;
  pollOptions?: PollOption[];
  totalVotes?: number;
  linkData?: LinkData;
  eventData?: EventData;
  tags: string[];
  stats: {
    likes: string;
    comments: string;
    shares?: string;
  };
}

export interface TopQuestion {
  id: string;
  rank: number;
  title: string;
  replies: number;
}

export interface Hashtag {
  tag: string;
  count: string;
}
