import React from 'react';
import { salesMembers } from '../SalesHonor.data';
import SuccessStory from '../components/SuccessStory';

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const PodiumCard: React.FC<{ member: any; rank: number }> = ({ member, rank }) => {
    const rankStyles = {
        1: {
            container: "border-yellow-400 bg-yellow-50/50 scale-105 z-10",
            medalBg: "bg-yellow-400",
            textColor: "text-yellow-800",
            height: "mt-0",
        },
        2: {
            container: "border-slate-300 bg-slate-50/50",
            medalBg: "bg-slate-400",
            textColor: "text-slate-800",
            height: "mt-8",
        },
        3: {
            container: "border-orange-400 bg-orange-50/50",
            medalBg: "bg-orange-500",
            textColor: "text-orange-800",
            height: "mt-8",
        },
    }[rank] || {};

    return (
        <div className={`flex-1 flex flex-col items-center justify-end ${rankStyles.height}`}>
            <div className={`relative w-full max-w-xs p-6 text-center bg-white rounded-xl shadow-2xl border-2 ${rankStyles.container} transform transition-transform duration-300 hover:scale-110`}>
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full ${rankStyles.medalBg} flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-lg`}>
                    {member.rank}
                </div>
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mt-6 border-4 border-white shadow-md" />
                <h3 className={`mt-4 text-xl font-bold ${rankStyles.textColor}`}>{member.name}</h3>
                <p className="mt-2 text-3xl font-bold text-slate-800">{formatCurrency(member.salesVolume)}</p>
                <p className="text-sm text-slate-500 font-medium">in sales</p>
            </div>
        </div>
    );
};

const LeaderboardRow: React.FC<{ member: any }> = ({ member }) => {
    const RankChangeIndicator = ({ change }: { change: 'up' | 'down' | 'stable' }) => {
        if (change === 'up') {
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>;
        }
        if (change === 'down') {
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>;
        }
        return <div className="h-4 w-4 flex items-center justify-center text-slate-400">&ndash;</div>;
    };

    return (
        <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
            <td className="p-4 text-slate-800 font-bold text-center">{member.rank}</td>
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold text-slate-800">{member.name}</span>
                </div>
            </td>
            <td className="p-4 text-slate-600 font-semibold">{formatCurrency(member.salesVolume)}</td>
            <td className="p-4 text-slate-600 font-semibold text-center">{member.policiesSold}</td>
            <td className="p-4 text-center">
                 <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${member.quotaPercentage >= 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {member.quotaPercentage}%
                </span>
            </td>
            <td className="p-4">
                <div className="flex justify-center">
                    <RankChangeIndicator change={member.rankChange} />
                </div>
            </td>
        </tr>
    );
};


const SalesHonorV1: React.FC = () => {
    const topPerformer = salesMembers[0];
    const topThree = salesMembers.slice(0, 3);
    const leaderboard = salesMembers.slice(3);

    return (
        <div>
            {/* Podium for Top 3 */}
            <section className="mb-12">
                <div className="flex flex-col md:flex-row items-end justify-center gap-4">
                    {/* Rank 2 */}
                    <PodiumCard member={topThree.find(m => m.rank === 2)} rank={2} />
                    {/* Rank 1 */}
                    <PodiumCard member={topThree.find(m => m.rank === 1)} rank={1} />
                    {/* Rank 3 */}
                    <PodiumCard member={topThree.find(m => m.rank === 3)} rank={3} />
                </div>
            </section>
            
            {/* Winner's Spotlight */}
            {topPerformer.story && topPerformer.storyImage && (
              <section className="mb-12">
                <SuccessStory 
                  member={{ 
                    name: topPerformer.name, 
                    story: topPerformer.story, 
                    storyImage: topPerformer.storyImage 
                  }} 
                />
              </section>
            )}
            
            {/* Leaderboard for others */}
            <section>
                 <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 overflow-hidden">
                    <h2 className="text-xl font-bold text-slate-800 p-5 border-b border-slate-100">Top Performers Leaderboard</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th className="p-4 font-semibold text-center">Rank</th>
                                    <th className="p-4 font-semibold">Agent</th>
                                    <th className="p-4 font-semibold">Sales Volume</th>
                                    <th className="p-4 font-semibold text-center">Policies Sold</th>
                                    <th className="p-4 font-semibold text-center">% of Quota</th>
                                    <th className="p-4 font-semibold text-center">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map(member => (
                                    <LeaderboardRow key={member.rank} member={member} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SalesHonorV1;