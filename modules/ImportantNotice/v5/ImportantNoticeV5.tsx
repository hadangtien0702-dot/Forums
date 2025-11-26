
import React, { useState, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { otherNoticesV4, featuredNoticeV4 } from '../v4/data'; // Reuse rich data from V4
import type { NoticeV4 } from '../v4/data';

// --- Components ---

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterChip: React.FC<{ label: string; isActive: boolean; onClick: () => void; count?: number }> = ({ label, isActive, onClick, count }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border flex items-center gap-2 ${
            isActive 
            ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
    >
        {label}
        {count !== undefined && (
            <span className={`text-xs py-0.5 px-1.5 rounded-md ${isActive ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {count}
            </span>
        )}
    </button>
);

const NoticeCard: React.FC<{ notice: NoticeV4; onClick: () => void }> = ({ notice, onClick }) => {
    const priorityColors = {
        urgent: 'text-red-600 bg-red-50 border-red-100',
        important: 'text-amber-600 bg-amber-50 border-amber-100',
        info: 'text-blue-600 bg-blue-50 border-blue-100',
        update: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    };

    return (
        <div 
            onClick={onClick}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
        >
            {notice.isNew && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                    NEW
                </div>
            )}

            <div className="flex justify-between items-start mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${priorityColors[notice.priority]}`}>
                    {notice.priority}
                </span>
                <span className="text-xs text-slate-400 font-medium">{notice.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {notice.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
                {notice.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {notice.author.avatar}
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{notice.author.name}</span>
                </div>
                {notice.attachmentCount ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {notice.attachmentCount}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

const HeroNotice: React.FC<{ notice: NoticeV4; onClick: () => void }> = ({ notice, onClick }) => (
    <div 
        onClick={onClick}
        className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-xl shadow-slate-200"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        {/* Abstract decorative circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-100 text-xs font-bold uppercase mb-4 backdrop-blur-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Urgent Notice
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 drop-shadow-sm">
                    {notice.title}
                </h1>
                <p className="text-slate-300 text-lg line-clamp-2 mb-6 max-w-2xl">
                    {notice.fullDescription || "Click to read the full details regarding this important announcement."}
                </p>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg">
                        Read Full Notice
                    </button>
                    <span className="text-slate-400 text-sm font-medium">
                        Posted by {notice.author.name} • {notice.date}
                    </span>
                </div>
            </div>
             {/* Decorative Icon Area */}
            <div className="hidden lg:flex justify-center items-center">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl group-hover:rotate-3 transition-transform duration-500">
                     <span className="text-6xl">📢</span>
                </div>
            </div>
        </div>
    </div>
);


const NoticeDetailModal: React.FC<{ isOpen: boolean; onClose: () => void; notice: NoticeV4 | null }> = ({ isOpen, onClose, notice }) => {
    if (!notice) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                                {/* Header */}
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                                    <div className="flex items-center gap-3">
                                         <div className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase border ${
                                            notice.priority === 'urgent' ? 'bg-red-50 text-red-600 border-red-100' : 
                                            notice.priority === 'important' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                            'bg-blue-50 text-blue-600 border-blue-100'
                                         }`}>
                                            {notice.priority}
                                        </div>
                                        <span className="text-sm text-slate-500 font-medium">{notice.date}</span>
                                    </div>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="px-8 py-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">{notice.title}</h2>
                                    
                                    {/* Author Block */}
                                    <div className="flex items-center gap-3 mb-8 p-3 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                            {notice.author.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{notice.author.name}</p>
                                            <p className="text-xs text-slate-500">{notice.author.role || 'Administrator'}</p>
                                        </div>
                                    </div>

                                    <div className="prose prose-slate max-w-none">
                                        <p className="text-slate-600 text-base leading-8 whitespace-pre-wrap">
                                            {notice.fullDescription || "No additional details provided."}
                                        </p>
                                    </div>
                                    
                                    {/* Meta Info */}
                                    {notice.effectiveDate && (
                                        <div className="mt-8 flex items-center gap-2 text-sm text-slate-600 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <strong>Effective Date:</strong> {notice.effectiveDate}
                                        </div>
                                    )}
                                </div>

                                {/* Attachments Footer */}
                                {notice.attachmentCount && notice.attachmentCount > 0 && (
                                    <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
                                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Attachments ({notice.attachmentCount})</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {/* Mock attachments since data structure differs slightly, robust fallback */}
                                            <div className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                                                <div className="w-8 h-8 bg-red-50 text-red-500 rounded flex items-center justify-center mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600">Official_Document_v2.pdf</p>
                                                    <p className="text-xs text-slate-400">2.4 MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-lg border border-transparent bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


// --- Main Page ---

const ImportantNoticeV5: React.FC = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<string>('All');
    const [selectedNotice, setSelectedNotice] = useState<NoticeV4 | null>(null);

    // Combine all notices for filtering
    const allNotices = [featuredNoticeV4, ...otherNoticesV4];

    const filteredNotices = useMemo(() => {
        return allNotices.filter(notice => {
            const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) || 
                                  notice.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            
            const matchesFilter = filter === 'All' ? true : notice.priority.toLowerCase() === filter.toLowerCase();
            
            // Exclude the featured notice from the grid list if it's currently displayed as Hero
            // AND we are not searching/filtering specifically. 
            // If searching, show everything in grid for clarity.
            if (search === '' && filter === 'All' && notice.id === featuredNoticeV4.id) return false;

            return matchesSearch && matchesFilter;
        });
    }, [allNotices, search, filter]);

    // Should we show the hero? Only if no search/filter is active
    const showHero = search === '' && filter === 'All';

    return (
        <div className="bg-slate-50 -m-6 sm:-m-8 min-h-screen pb-20">
            {/* Header / Sticky Search */}
            <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 sm:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
                        <p className="text-sm text-slate-500">Latest updates from the HQ</p>
                    </div>
                    <div className="relative w-full md:w-96">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search notices, tags..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8">
                
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {['All', 'Urgent', 'Important', 'Info', 'Update'].map(f => (
                        <FilterChip 
                            key={f} 
                            label={f} 
                            isActive={filter === f} 
                            onClick={() => setFilter(f)}
                            // Optional: Calculate counts if needed
                        />
                    ))}
                </div>

                {/* Hero Section (Conditional) */}
                {showHero && (
                    <div className="mb-10 animate-fadeInDown-custom">
                        <HeroNotice notice={featuredNoticeV4} onClick={() => setSelectedNotice(featuredNoticeV4)} />
                    </div>
                )}

                {/* Grid Section */}
                <div>
                     {search === '' && filter === 'All' && (
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                           <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                           Recent Updates
                        </h2>
                     )}
                     
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeInUp-custom">
                        {filteredNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} onClick={() => setSelectedNotice(notice)} />
                        ))}
                    </div>

                    {filteredNotices.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                             <div className="mx-auto h-12 w-12 text-slate-300">
                                <SearchIcon />
                             </div>
                             <h3 className="mt-2 text-sm font-medium text-slate-900">No notices found</h3>
                             <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
                             <button 
                                onClick={() => { setSearch(''); setFilter('All'); }}
                                className="mt-6 text-blue-600 hover:text-blue-800 font-semibold text-sm"
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
};

export default ImportantNoticeV5;
