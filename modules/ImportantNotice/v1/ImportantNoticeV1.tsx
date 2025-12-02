import React, { useState, useMemo, useCallback } from 'react';
import { noticesV1 as noticesData, NoticeV1 } from './data';
import NoticeDetailModal from './components/NoticeDetailModal';

type PriorityFilter = 'all' | 'urgent' | 'important' | 'info' | 'update';

const priorityConfig = {
  all: { label: 'Tất cả', activeClass: 'all active' },
  urgent: { label: '🔴 Khẩn cấp', activeClass: 'urgent active' },
  important: { label: '🟡 Quan trọng', activeClass: 'important active' },
  info: { label: '🔵 Thông tin', activeClass: 'info active' },
  update: { label: '🟢 Cập nhật', activeClass: 'update active' },
};

const FilterTab: React.FC<{
  priority: PriorityFilter;
  activeFilter: PriorityFilter;
  setFilter: (p: PriorityFilter) => void;
}> = ({ priority, activeFilter, setFilter }) => {
  const config = priorityConfig[priority];
  const isActive = activeFilter === priority;
  return (
    <button
      onClick={() => setFilter(priority)}
      className={`filter-tab ${priority} ${isActive ? config.activeClass : ''}`}
    >
      {config.label}
    </button>
  );
};

const NoticeCard: React.FC<{ notice: NoticeV1; onClick: () => void }> = ({ notice, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`notice-card ${notice.priority} ${notice.isUnread ? 'unread' : ''}`}
      data-priority={notice.priority}
    >
      {notice.isPinned && <div className="pin-badge">📌</div>}
      {notice.isNew && <div className="new-badge">NEW</div>}

      <div className={`priority-badge ${notice.priority}`}>
        <span className="priority-icon">
          {notice.priority === 'urgent' && '🔴'}
          {notice.priority === 'important' && '🟡'}
          {notice.priority === 'info' && '🔵'}
          {notice.priority === 'update' && '🟢'}
        </span>
        <span>{notice.priority === 'urgent' ? 'Khẩn cấp' : notice.priority}</span>
      </div>

      <h3 className="notice-title">{notice.title}</h3>

      <div className="notice-tags">
        {notice.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>

      <p className="notice-description">{notice.description}</p>

      {notice.attachmentCount > 0 && (
        <div className="attachment-indicator">
          📎 {notice.attachmentCount} file{notice.attachmentCount > 1 ? 's' : ''} đính kèm
        </div>
      )}

      <div className="notice-meta">
        <div className="notice-author">
          <div className="author-avatar">{notice.author.avatar}</div>
          <div className="author-info">
            <div className="author-name">{notice.author.name}</div>
            <div className="author-role">{notice.author.role}</div>
          </div>
        </div>
        <div className="notice-date">
          <div className="date-text">{notice.date}</div>
          <div className="date-time">{notice.time}</div>
        </div>
      </div>
    </div>
  );
};

const ImportantNoticeV1: React.FC = () => {
  const [filter, setFilter] = useState<PriorityFilter>('all');
  const [notices] = useState(noticesData);
  const [selectedNotice, setSelectedNotice] = useState<NoticeV1 | null>(null);

  const filteredNotices = useMemo(() => {
    if (filter === 'all') return notices;
    return notices.filter(n => n.priority === filter);
  }, [filter, notices]);

  const handleCardClick = useCallback((notice: NoticeV1) => {
    setSelectedNotice(notice);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNotice(null);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 -m-8 p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="header animate-fadeInDown-custom">
          <h1>📢 Important Notices</h1>
          <p>Thông báo quan trọng từ Ban Lãnh Đạo</p>
        </div>

        <div className="filter-tabs">
          {(Object.keys(priorityConfig) as PriorityFilter[]).map(key => (
            <FilterTab key={key} priority={key} activeFilter={filter} setFilter={setFilter} />
          ))}
        </div>

        <div className="notice-grid animate-fadeInUp-custom">
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

      <NoticeDetailModal isOpen={!!selectedNotice} onClose={handleCloseModal} notice={selectedNotice} />
    </div>
  );
};

export default ImportantNoticeV1;