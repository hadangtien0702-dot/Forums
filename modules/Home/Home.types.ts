
export interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

export interface Article {
  category: string;
  title: string;
  subtitle?: string;
  author: string;
  date?: string;
  image?: string;
}

export interface SalesMember {
  id: number;
  name: string;
  avatar: string;
  rank: number;
  title: string;
  achievement: string;
  color: 'gold' | 'silver' | 'bronze' | 'default' | string;
}

export interface Video {
  thumbnail: string;
  title: string;
  description?: string;
  duration?: string;
}

export interface VideoSectionData {
  featured: Video;
  playlist: Video[];
}

export interface Discussion {
  avatar: string;
  title: string;
  category: string;
  replies: number;
  views: number;
}

export interface Series {
  title: string;
  subtitle: string;
  count: number;
  image: string;
  color: string;
}

export interface Post {
  title: string;
}
