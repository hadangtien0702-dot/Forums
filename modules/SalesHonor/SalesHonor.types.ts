
export interface PodiumMember {
  rank: number;
  name: string;
  title: string;
  salesAmount: string;
  policies: number;
  growth: string;
  target: string;
  initials: string;
  avatar: string;
  avatarGradient: string;
}

export interface LeaderboardMember {
  rank: number;
  name: string;
  title: string;
  volume: string;
  quota: number;
  avatar: string;
  trend: 'up' | 'down' | 'stable';
}
