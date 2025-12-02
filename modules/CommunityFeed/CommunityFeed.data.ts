
import type { CommunityPost, TopQuestion, Hashtag } from './CommunityFeed.types';

export const feedPosts: CommunityPost[] = [
  {
    id: 'post-event-1',
    type: 'event',
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      badge: { text: 'Event Organizer', color: 'blue' }
    },
    timeAgo: '20 minutes ago',
    content: 'Don\'t miss our exclusive webinar this Friday on "Closing High-Net-Worth Clients". We have a special guest speaker!',
    eventData: {
      month: 'NOV',
      date: '15',
      title: 'Closing High-Net-Worth Clients Strategy Session',
      time: '10:00 AM - 11:30 AM EST',
      location: 'Zoom Webinar',
      attendees: 142
    },
    tags: ['#Webinar', '#SalesTraining', '#Networking'],
    stats: {
      likes: '89',
      comments: '24',
      shares: '12',
    },
  },
  {
    id: 'post-poll-1',
    type: 'poll',
    author: {
      name: 'David Nguyen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      badge: { text: 'Moderator', color: 'purple' }
    },
    timeAgo: '1 hour ago',
    content: 'Which insurance product are you finding easiest to sell in the current Q3 market conditions?',
    pollOptions: [
      { id: 'opt1', text: 'Term Life (Traditional)', votes: 45, percentage: 15 },
      { id: 'opt2', text: 'IUL (Index Universal Life)', votes: 150, percentage: 50, isVoted: true },
      { id: 'opt3', text: 'Whole Life', votes: 75, percentage: 25 },
      { id: 'opt4', text: 'Annuities', votes: 30, percentage: 10 },
    ],
    totalVotes: 300,
    tags: ['#MarketTrends', '#SalesStrategy', '#Poll'],
    stats: {
      likes: '245',
      comments: '128',
      shares: 'Share',
    },
  },
  {
    id: 'post-milestone-1',
    type: 'milestone',
    author: {
      name: 'Michael Chang',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      badge: { text: 'Rising Star', color: 'green' }
    },
    timeAgo: '2 hours ago',
    content: 'Hard work pays off! I just qualified for MDRT for the first time. Thank you everyone for the support and advice along the way! 🚀',
    tags: ['#MDRT', '#Achievement', '#Blessed'],
    stats: {
      likes: '856',
      comments: '142',
      shares: '5',
    },
  },
  {
    id: 'post-link-1',
    type: 'link',
    author: {
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    timeAgo: '3 hours ago',
    content: 'Interesting read on the future of AI in underwriting. It suggests we might see approval times drop to under 5 minutes for standard policies.',
    linkData: {
      title: 'AI in Insurance: The End of Waiting Periods?',
      description: 'How artificial intelligence is reshaping risk assessment and what it means for agents in 2026.',
      domain: 'insurancenews.net',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      url: '#'
    },
    tags: ['#InsurTech', '#FutureOfWork', '#AI'],
    stats: {
      likes: '67',
      comments: '12',
      shares: '8',
    },
  },
  {
    id: 'post-1',
    type: 'image',
    author: {
      name: 'Marilyn Franci',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      badge: { text: 'Top Contributor', color: 'gold' }
    },
    timeAgo: '5 hours ago',
    content: 'How do you feel about the latest platform update? The new dashboard metrics seem much more actionable.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', 
    tags: ['#PlatformUpdate', '#CommunityFeedback', '#Tech'],
    stats: {
      likes: '10.8K',
      comments: '3.7K',
      shares: 'Share',
    },
  },
];

export const topQuestions: TopQuestion[] = [
  {
    id: 'q1',
    rank: 1,
    title: 'How do you feel about the latest platform update? Worth it or not?',
    replies: 1289,
  },
  {
    id: 'q2',
    rank: 2,
    title: 'Post your favorite productivity hacks and tools here!',
    replies: 890,
  },
  {
    id: 'q3',
    rank: 3,
    title: 'What feature would you love to see added next?',
    replies: 785,
  },
  {
    id: 'q4',
    rank: 4,
    title: "What's the most helpful piece of advice you've received?",
    replies: 666,
  },
  {
    id: 'q5',
    rank: 5,
    title: 'Rate your top 3 favorite integrations for our platform!',
    replies: 547,
  },
];

export const popularHashtags: Hashtag[] = [
  { tag: '#CommunityFeedback', count: '1.2M+ posts' },
  { tag: '#FeatureRequests', count: '900K+ posts' },
  { tag: '#TechTalk', count: '750K+ posts' },
  { tag: '#PlatformUpdate', count: '420K+ posts' },
];
