import React from 'react';
import { salesPerformersPodiumV2, otherPerformersV2 } from '../SalesHonor.data';
import './SalesHonorV2.css';

const PodiumCard: React.FC<{ member: typeof salesPerformersPodiumV2[0] }> = ({ member }) => {
    return (
        <div className={`podium-card rank-${member.rank}`}>
            {member.rank === 1 && (
                <div className="fire-container">
                    {[...Array(10)].map((_, i) => <div key={i} className="fire-particle"></div>)}
                </div>
            )}
            <div className="rank-badge">{member.rank}</div>
            <div className="avatar-container">
                <div className="avatar avatar-placeholder" style={{ background: member.avatarGradient, color: 'white' }}>
                    {member.initials}
                </div>
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
                    <span className="stat-value">{member.growth}</span>
                </div>
                <div className="stat-item">
                    <span>Target</span>
                    <span className="stat-value">{member.target}</span>
                </div>
            </div>
        </div>
    );
};


const OtherPerformerCard: React.FC<{ member: typeof otherPerformersV2[0] }> = ({ member }) => (
    <div className="other-card">
        <div className="other-rank">{member.rank}</div>
        <div className="other-avatar avatar-placeholder" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)', color: 'white', fontSize: '28px', fontWeight: 700 }}>
            {member.initials}
        </div>
        <div className="other-name">{member.name}</div>
        <div className="other-title">{member.title}</div>
        <div className="other-sales">{member.sales}</div>
    </div>
);

const SalesHonorV2: React.FC = () => {
    const rank1 = salesPerformersPodiumV2.find(m => m.rank === 1);
    const rank2 = salesPerformersPodiumV2.find(m => m.rank === 2);
    const rank3 = salesPerformersPodiumV2.find(m => m.rank === 3);

    return (
        <div className="sales-honor-v2-container">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <h1>🏆 Top Sales Performers</h1>
                    <p>Tháng 11, 2025 - Celebrating our champions</p>
                </div>

                {/* Podium - Top 3 */}
                <div className="podium-container">
                    {rank2 && <PodiumCard member={rank2} />}
                    {rank1 && <PodiumCard member={rank1} />}
                    {rank3 && <PodiumCard member={rank3} />}
                </div>

                {/* Others Section */}
                <div className="others-section">
                    <h2 className="others-title">Other Top Performers</h2>
                    <div className="others-grid">
                        {otherPerformersV2.map(member => (
                            <OtherPerformerCard key={member.rank} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesHonorV2;