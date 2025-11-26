
import React from 'react';
import { salesPerformersPodiumV2, otherPerformersV2 } from '../SalesHonor.data';
import './SalesHonorV2.css';

// Trend Icons
const TrendUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const TrendDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
);

const TrendStable = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
);


const PodiumCard: React.FC<{ member: typeof salesPerformersPodiumV2[0] }> = ({ member }) => {
    return (
        <div className={`podium-card rank-${member.rank}`}>
            <div className="rank-badge">{member.rank}</div>
            <div className="avatar-container">
                <img src={member.avatar} alt={member.name} className="avatar" />
            </div>
            <div className="sales-name">{member.name}</div>
            <div className="title-badge" dangerouslySetInnerHTML={{ __html: member.title }}></div>
            <div className="sales-amount">{member.salesAmount}</div>
            <div className="sales-label">Total Sales</div>
            <div className="stats">
                <div className="stat-item">
                    <span>Policies</span>
                    <span className="stat-value">{member.policies}</span>
                </div>
                <div className="stat-item">
                    <span>Growth</span>
                    <span className="stat-value text-green-600">{member.growth}</span>
                </div>
                <div className="stat-item">
                    <span>Target</span>
                    <span className="stat-value">{member.target}</span>
                </div>
            </div>
        </div>
    );
};

const LeaderboardRow: React.FC<{ member: typeof otherPerformersV2[0] }> = ({ member }) => {
    return (
        <div className="leaderboard-row">
            <div className="col-rank">
                <span className="rank-number">#{member.rank}</span>
                <div className="rank-trend">
                    {member.trend === 'up' && <TrendUp />}
                    {member.trend === 'down' && <TrendDown />}
                    {member.trend === 'stable' && <TrendStable />}
                </div>
            </div>
            
            <div className="col-agent">
                <img src={member.avatar} alt={member.name} className="agent-avatar" />
                <div className="agent-info">
                    <h4>{member.name}</h4>
                    <p>{member.title}</p>
                </div>
            </div>

            <div className="col-volume">
                <div className="volume-text">
                    <span>Sales Volume</span>
                    <span className="volume-value">{member.volume}</span>
                </div>
                <div className="progress-bg">
                    <div className="progress-bar" style={{ width: `${member.quota}%` }}></div>
                </div>
            </div>
            
            <div className="col-action">
                 <button className="action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                 </button>
            </div>
        </div>
    )
}

const SalesHonorV2: React.FC = () => {
    const rank1 = salesPerformersPodiumV2.find(m => m.rank === 1);
    const rank2 = salesPerformersPodiumV2.find(m => m.rank === 2);
    const rank3 = salesPerformersPodiumV2.find(m => m.rank === 3);

    return (
        <div className="sales-honor-v2-container">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <h1>🏆 Champions League</h1>
                    <p>Honoring the top performers of November 2025</p>
                </div>

                {/* Podium - Top 3 */}
                <div className="podium-container">
                    {rank2 && <PodiumCard member={rank2} />}
                    {rank1 && <PodiumCard member={rank1} />}
                    {rank3 && <PodiumCard member={rank3} />}
                </div>

                {/* Others Section (Leaderboard List) */}
                <div className="others-section">
                    <h2 className="others-title">
                        Runner-Ups & Rising Stars
                    </h2>
                    <div className="leaderboard-list">
                        {otherPerformersV2.map(member => (
                            <LeaderboardRow key={member.rank} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesHonorV2;
