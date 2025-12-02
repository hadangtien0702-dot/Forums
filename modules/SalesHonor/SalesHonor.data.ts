
import type { PodiumMember, LeaderboardMember } from './SalesHonor.types';

export const podiumMembers: PodiumMember[] = [
  {
    rank: 2,
    name: 'Henry Mai',
    title: 'Top Performer',
    salesAmount: '$1.8M',
    policies: 145,
    growth: '+23%',
    target: '123%',
    initials: 'HM',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&fit=crop',
    avatarGradient: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)'
  },
  {
    rank: 1,
    name: 'Agent Tỷ Triệu',
    title: '🌟 Salesperson of the Month',
    salesAmount: '$2.1M',
    policies: 168,
    growth: '+35%',
    target: '142%',
    initials: 'AT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
    avatarGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  },
  {
    rank: 3,
    name: 'Gus Công',
    title: 'Rising Star',
    salesAmount: '$1.5M',
    policies: 122,
    growth: '+18%',
    target: '105%',
    initials: 'GC',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop',
    avatarGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
  }
];

export const leaderboardMembers: LeaderboardMember[] = [
  { 
    rank: 4, 
    name: 'Thanh Pham', 
    title: 'Consistent Achiever', 
    volume: '$1.2M', 
    quota: 98,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop',
    trend: 'up'
  },
  { 
    rank: 5, 
    name: 'Hoang Duc', 
    title: 'Consistent Achiever', 
    volume: '$1.18M', 
    quota: 95,
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=256&h=256&fit=crop',
    trend: 'up'
  },
  { 
    rank: 6, 
    name: 'Sarah Nguyen', 
    title: 'Consistent Achiever', 
    volume: '$1.15M', 
    quota: 92,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop',
    trend: 'down'
  },
  { 
    rank: 7, 
    name: 'Kevin Wang', 
    title: 'Consistent Achiever', 
    volume: '$1.09M', 
    quota: 90,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop',
    trend: 'stable'
  },
  { 
    rank: 8, 
    name: 'Linda Kim', 
    title: 'Consistent Achiever', 
    volume: '$980K', 
    quota: 88,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop',
    trend: 'up'
  },
];
