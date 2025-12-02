
import React from 'react';
import type { CommunityPost } from '../CommunityFeed.types';
import { Poll, LinkPreview, EventCard, MilestoneCard, PhotoAttachment } from './FeedAttachments';

const Badge: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const colorClasses: Record<string, string> = {
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorClasses[color] || colorClasses.blue} uppercase tracking-wide`}>
      {text}
    </span>
  );
};

const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        link: 'Link Preview',
        event: 'Event',
        milestone: 'Milestone',
        poll: 'Poll',
        image: 'Photo'
    };
    return labels[type] || null;
};

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => {
    const typeLabel = getTypeLabel(post.type);
    
    return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 hover:shadow-md transition-all duration-300 animate-fadeInUp-custom">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover border border-slate-100" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 cursor-pointer transition-colors">{post.author.name}</h3>
                        {post.author.badge && <Badge text={post.author.badge.text} color={post.author.badge.color} />}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <span>{post.timeAgo}</span>
                        {typeLabel && (
                            <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{typeLabel}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
        </div>
        
        {/* Content & Attachments */}
        <div className="mb-2 pl-1">
            {post.type !== 'milestone' && (
                 <p className="text-slate-700 text-[15px] leading-relaxed mb-4">{post.content}</p>
            )}
            
            {post.type === 'image' && post.image && <PhotoAttachment src={post.image} />}
            {post.type === 'poll' && post.pollOptions && <Poll options={post.pollOptions} totalVotes={post.totalVotes || 0} />}
            {post.type === 'link' && post.linkData && <LinkPreview linkData={post.linkData} />}
            {post.type === 'event' && post.eventData && <EventCard eventData={post.eventData} />}
            {post.type === 'milestone' && <MilestoneCard content={post.content} />}

            <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md cursor-pointer transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
             <div className="flex gap-6">
                <button className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors group">
                    <div className="p-1.5 rounded-full group-hover:bg-pink-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <span className="text-sm font-semibold">{post.stats.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group">
                    <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <span className="text-sm font-semibold">{post.stats.comments}</span>
                </button>
             </div>
             <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group">
                <span className="text-sm font-semibold">Share</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
             </button>
        </div>
    </div>
    );
};

export default PostCard;
