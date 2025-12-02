
import React, { useState, useMemo } from 'react';
import { noticesData } from '../ImportantNotice.data';
import type { Notice } from '../ImportantNotice.types';
import NoticeDetailModal from '../components/NoticeDetailModal';
import QuickStats from '../components/QuickStats';
import HeroNotice from '../components/HeroNotice';
import NoticeCard from '../components/NoticeCard';

const FilterChip: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
            isActive 
            ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
    >
        {label}
    </button>
);

export default function ImportantNoticeV5() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<string>('All');
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    // Featured logic: The newest critical notice
    const featuredNotice = useMemo(() => 
        noticesData.find(n => n.priority === 'critical' && n.isPinned) || noticesData[0]
    , []);

    const filteredNotices = useMemo(() => {
        return noticesData.filter(notice => {
            const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) || 
                                  notice.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            
            const matchesFilter = filter === 'All' ? true : notice.priority === filter;
            
            // Exclude the featured notice from the grid only if showing All and no search
            if (search === '' && filter === 'All' && notice.id === featuredNotice.id) return false;

            return matchesSearch && matchesFilter;
        });
    }, [search, filter, featuredNotice]);

    const showHero = search === '' && filter === 'All';

    return (
        <div className="bg-slate-50 -m-4 sm:-m-6 lg:-m-8 min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notice Board</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Updates</p>
                    </div>
                    
                    <div className="relative w-full md:w-96 group">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search notices..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 border-0 bg-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium shadow-inner"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8">
                <QuickStats notices={noticesData} />

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    <span className="text-sm font-bold text-slate-400 mr-2 uppercase tracking-wider">Filter:</span>
                    <FilterChip label="All" isActive={filter === 'All'} onClick={() => setFilter('All')} />
                    <FilterChip label="Critical" isActive={filter === 'critical'} onClick={() => setFilter('critical')} />
                    <FilterChip label="Important" isActive={filter === 'important'} onClick={() => setFilter('important')} />
                    <FilterChip label="Updates" isActive={filter === 'update'} onClick={() => setFilter('update')} />
                    <FilterChip label="Info" isActive={filter === 'info'} onClick={() => setFilter('info')} />
                </div>

                {/* Hero Section */}
                {showHero && (
                    <div className="animate-fadeInDown-custom">
                         <HeroNotice notice={featuredNotice} onClick={() => setSelectedNotice(featuredNotice)} />
                    </div>
                )}

                {/* Grid Section */}
                <div className="animate-fadeInUp-custom">
                     {showHero && (
                        <div className="flex items-center gap-4 mb-6 mt-12">
                           <h2 className="text-xl font-black text-slate-800">Recent & Past Updates</h2>
                           <div className="h-px bg-slate-200 flex-grow"></div>
                        </div>
                     )}
                     
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} onClick={() => setSelectedNotice(notice)} />
                        ))}
                    </div>

                    {filteredNotices.length === 0 && (
                        <div className="text-center py-24">
                             <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4 text-2xl">
                                🔍
                             </div>
                             <h3 className="text-lg font-bold text-slate-900">No notices found</h3>
                             <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
                             <button 
                                onClick={() => { setSearch(''); setFilter('All'); }}
                                className="mt-6 text-blue-600 font-bold hover:underline"
                             >
                                Clear all filters
                             </button>
                        </div>
                    )}
                </div>
            </div>

            <NoticeDetailModal 
                isOpen={!!selectedNotice} 
                onClose={() => setSelectedNotice(null)} 
                notice={selectedNotice} 
            />
        </div>
    );
}
