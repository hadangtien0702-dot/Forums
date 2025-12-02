
'use client';

import React, { useState, useMemo } from 'react';
import { podiumMembers, leaderboardMembers } from './SalesHonor.data';
import PodiumCard from './components/PodiumCard';
import LeaderboardRow from './components/LeaderboardRow';
import TimeFilter from './components/TimeFilter';
import LeaderboardSearch from './components/LeaderboardSearch';

const SalesHonorPage: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState('This Month');
    const [searchQuery, setSearchQuery] = useState('');

    // Optimized Filtering Logic with useMemo
    const filteredLeaderboard = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return leaderboardMembers.filter(member => 
            member.name.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    // Extract Podium Ranks (Assuming simplified data structure where podium is fixed)
    const rank1 = podiumMembers.find(p => p.rank === 1);
    const rank2 = podiumMembers.find(p => p.rank === 2);
    const rank3 = podiumMembers.find(p => p.rank === 3);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 relative overflow-hidden">
            
            {/* Decorative Background Blobs - Toned Down */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none animate-pulse-custom" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-12 animate-fadeInDown-custom">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black uppercase tracking-widest mb-4">
                        <span>🏆</span> Hall of Fame
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                        Sales Leaderboard
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Celebrating the relentless pursuit of excellence. Here are the top performers driving our success.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col items-center mb-16 animate-fadeInUp-custom">
                    <TimeFilter active={timeFilter} onChange={setTimeFilter} />
                </div>

                {/* Podium Section - The Stage */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 lg:gap-10 mb-24 perspective-1000 px-4">
                    {/* Rank 2 */}
                    <div className="order-2 md:order-1 w-full md:w-1/3 lg:w-1/4 transform md:translate-y-0 transition-transform duration-500 hover:-translate-y-2">
                        {rank2 && <PodiumCard member={rank2} />}
                    </div>
                    
                    {/* Rank 1 - Center Stage */}
                    <div className="order-1 md:order-2 w-full md:w-1/3 lg:w-1/3 z-20 transform md:-translate-y-12 transition-transform duration-500 hover:-translate-y-14">
                         {/* Confetti Effect behind Rank 1 */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-6xl animate-bounce opacity-50 pointer-events-none">👑</div>
                        {rank1 && <PodiumCard member={rank1} />}
                    </div>

                    {/* Rank 3 */}
                    <div className="order-3 md:order-3 w-full md:w-1/3 lg:w-1/4 transform md:translate-y-4 transition-transform duration-500 hover:translate-y-2">
                        {rank3 && <PodiumCard member={rank3} />}
                    </div>
                </div>

                {/* Leaderboard List Section */}
                <div className="max-w-4xl mx-auto animate-fadeInUp-custom" style={{ animationDelay: '0.4s' }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                                4+
                            </span>
                            Honorable Mentions
                        </h3>
                        
                        <LeaderboardSearch value={searchQuery} onChange={setSearchQuery} />
                    </div>

                    <div className="space-y-3 bg-white/50 backdrop-blur-sm p-2 rounded-3xl border border-white/50 shadow-sm">
                        {filteredLeaderboard.length > 0 ? (
                            filteredLeaderboard.map((member, index) => (
                                <LeaderboardRow key={member.rank} member={member} index={index} />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3 text-2xl">🔍</div>
                                <p className="text-slate-500 font-medium">No agents found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesHonorPage;
