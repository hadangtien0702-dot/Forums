
import React, { useState, useMemo, useCallback, Fragment } from 'react';
import { noticesV2 as noticesData, NoticeV2 } from './data';
import NoticeDetailModal from './components/NoticeDetailModal';

type PriorityFilter = 'all' | 'urgent' | 'important' | 'info' | 'update';

const priorityConfig = {
  all: {
    label: 'Tất cả',
    activeClass: 'bg-blue-600 text-white',
  },
  urgent: {
    label: 'Khẩn cấp',
    iconColor: 'bg-red-500',
    activeClass: 'bg-red-500 text-white',
    topBar: 'before:bg-red-500',
    badge: 'bg-red-100 text-red-700',
  },
  important: {
    label: 'Quan trọng',
    iconColor: 'bg-amber-400',
    activeClass: 'bg-amber-400 text-white',
    topBar: 'before:bg-amber-400',
    badge: 'bg-amber-100 text-amber-700',
  },
  info: {
    label: 'Thông tin',
    iconColor: 'bg-blue-500',
    activeClass: 'bg-blue-500 text-white',
    topBar: 'before:bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
  },
  update: {
    label: 'Cập nhật',
    iconColor: 'bg-green-500',
    activeClass: 'bg-green-500 text-white',
    topBar: 'before:bg-green-500',
    badge: 'bg-green-100 text-green-700',
  },
};

const FilterTab: React.FC<{
  priority: PriorityFilter;
  activeFilter: PriorityFilter;
  setFilter: (p: PriorityFilter) => void;
}> = ({ priority, activeFilter, setFilter }) => {
  const config = priorityConfig[priority];
  const isActive = activeFilter === priority;
  
  const activeClasses = config.activeClass;
  const inactiveClasses = "bg-white text-slate-700 hover:bg-slate-50";

  return (
    <button
      onClick={() => setFilter(priority)}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${isActive ? activeClasses : inactiveClasses}`}
    >
      {/* FIX: The type of `config` is a union where not all members have `iconColor`. Using the `in` operator as a type guard to check for the existence of `iconColor` on `config` resolves the TypeScript error and correctly handles the conditional rendering of the icon. */}
      {'iconColor' in config && <span className={`w-2.5 h-2.5 rounded-full ${config.iconColor}`}></span>}
      {config.label}
    </button>
  );
};

const NoticeCard: React.FC<{ notice: NoticeV2; onClick: () => void }> = ({ notice, onClick }) => {
  const config = priorityConfig[notice.priority];

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-1.5 before:w-full ${config.topBar}`}
    >
      {/* Badges */}
      <div className="flex justify-between items-start mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.badge}`}>
          {notice.priority}
        </span>
        <div className="flex items-center gap-2 h-5">
          {notice.isNew && <span className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">NEW</span>}
          {notice.isPinned && <span className="text-red-500 text-lg">📌</span>}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 min-h-[56px]">{notice.title}</h3>
      <div className="flex flex-wrap gap-1.5 mb-3 min-h-[26px]">
        {notice.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">{tag}</span>
        ))}
      </div>
      <p className="text-sm text-slate-600 mb-4 line-clamp-3 min-h-[60px]">{notice.description}</p>
      
      {notice.attachmentCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium p-2 bg-slate-50 rounded-md mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          <span>{notice.attachmentCount} file{notice.attachmentCount > 1 ? 's' : ''} attached</span>
        </div>
      )}
      
      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{notice.author.avatar}</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{notice.author.name}</p>
            <p className="text-xs text-slate-500">{notice.author.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-600">{notice.date}</p>
          <p className="text-xs text-slate-500">{notice.time}</p>
        </div>
      </div>
    </div>
  );
};

const ImportantNoticeV2: React.FC = () => {
    const [filter, setFilter] = useState<PriorityFilter>('all');
    const [notices, setNotices] = useState(noticesData);
    const [selectedNotice, setSelectedNotice] = useState<NoticeV2 | null>(null);

    const filteredNotices = useMemo(() => {
        if (filter === 'all') return notices;
        return notices.filter(n => n.priority === filter);
    }, [filter, notices]);

    const handleCardClick = useCallback((notice: NoticeV2) => {
        setSelectedNotice(notice);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedNotice(null);
    }, []);
    
    return (
        <div className="bg-slate-50 -m-8 p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold text-slate-800">Thông báo quan trọng từ Ban Lãnh Đạo</h1>
                </div>
                
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                  {(Object.keys(priorityConfig) as PriorityFilter[]).map(key => (
                      <FilterTab 
                          key={key}
                          priority={key}
                          activeFilter={filter}
                          setFilter={setFilter}
                      />
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredNotices.map(notice => (
                        <NoticeCard key={notice.id} notice={notice} onClick={() => handleCardClick(notice)} />
                    ))}
                </div>

                {filteredNotices.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-500">
                        <h3 className="text-lg font-semibold">No notices match your filter.</h3>
                        <p className="text-sm">Try selecting another category.</p>
                    </div>
                )}
            </div>

            <NoticeDetailModal
                isOpen={!!selectedNotice}
                onClose={handleCloseModal}
                notice={selectedNotice}
            />
        </div>
    );
};

export default ImportantNoticeV2;