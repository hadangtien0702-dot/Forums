
import React from 'react';
import { featuredNoticeV4, otherNoticesV4 } from './data';
import type { NoticeV4 } from './data';

const FeaturedCard: React.FC<{ notice: NoticeV4 }> = ({ notice }) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-all duration-300 cursor-pointer border-2 border-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-2 before:bg-gradient-to-r before:from-red-500 before:to-red-600">
      <div className="absolute top-6 left-8 text-4xl filter drop-shadow-lg animate-float-pin-featured">📌</div>
      <div className="absolute top-8 right-8 bg-gradient-to-br from-red-500 to-red-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase shadow-lg shadow-red-500/40 animate-pulse-custom">🔴 Khẩn cấp</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-red-100 to-red-200/80 text-red-700 rounded-full text-xs font-bold uppercase mb-5">
            <span>🔴</span>
            <span>Thông báo khẩn cấp - Ưu tiên cao nhất</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 leading-tight mb-5">{notice.title}</h2>
          <div className="flex flex-wrap gap-2.5 mb-6">
            {notice.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{tag}</span>
            ))}
          </div>
          <p className="text-base text-slate-600 leading-relaxed mb-6">{notice.fullDescription}</p>
          {notice.attachmentCount && notice.attachmentCount > 0 && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-red-50 to-red-100/70 border-2 border-red-200/50 rounded-xl text-sm text-red-700 font-semibold">
              <span>📎</span>
              <span>{notice.attachmentCount} files đính kèm - Tải xuống ngay</span>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/80 p-6 rounded-2xl border border-slate-200/80">
            <div className="space-y-3 divide-y divide-slate-200">
              <MetaRow icon="📅" label="Ngày đăng" value={notice.date} />
              <MetaRow icon="🕐" label="Thời gian" value={notice.time || ''} />
              <MetaRow icon="⏰" label="Hiệu lực từ" value={notice.effectiveDate || ''} />
              <MetaRow icon="👁️" label="Lượt xem" value={notice.views || ''} />
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-red-50 to-red-100/70 rounded-2xl border-2 border-red-200/50">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
              {notice.author.avatar}
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">{notice.author.name}</div>
              <div className="text-sm text-slate-600 font-medium">{notice.author.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaRow: React.FC<{ icon: string, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex justify-between items-center pt-3 first:pt-0">
    <div className="text-sm text-slate-600 font-semibold flex items-center gap-2">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <div className="text-sm text-slate-800 font-bold">{value}</div>
  </div>
);

const ListItem: React.FC<{ notice: NoticeV4 }> = ({ notice }) => {
  const p = {
    urgent: { icon: '🔴', before: 'before:bg-gradient-to-b before:from-red-500 before:to-red-600', iconBg: 'bg-gradient-to-br from-red-100 to-red-200/80', hover: 'hover:border-red-500/20 hover:shadow-red-500/10' },
    important: { icon: '🟡', before: 'before:bg-gradient-to-b before:from-amber-500 before:to-amber-600', iconBg: 'bg-gradient-to-br from-amber-100 to-amber-200/80', hover: 'hover:border-amber-500/20 hover:shadow-amber-500/10' },
    info: { icon: '🔵', before: 'before:bg-gradient-to-b before:from-blue-500 before:to-blue-600', iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200/80', hover: 'hover:border-blue-500/20 hover:shadow-blue-500/10' },
    update: { icon: '🟢', before: 'before:bg-gradient-to-b before:from-emerald-500 before:to-emerald-600', iconBg: 'bg-gradient-to-br from-emerald-100 to-emerald-200/80', hover: 'hover:border-emerald-500/20 hover:shadow-emerald-500/10' }
  }[notice.priority];

  return (
    <div className={`bg-white rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 border-2 border-transparent cursor-pointer relative hover:shadow-lg hover:translate-x-2 ${p.hover} ${p.before} before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[5px] before:rounded-l-2xl`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${p.iconBg}`}>
        {p.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-slate-800 truncate">{notice.title}</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5 flex-wrap">
          <div className="flex items-center gap-2 font-medium">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold">{notice.author.avatar}</div>
            <span>{notice.author.name}</span>
          </div>
          <div className="flex items-center gap-1"><span>📅</span><span>{notice.date}</span></div>
          {notice.attachmentCount && notice.attachmentCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-md font-semibold"><span>📎</span><span>{notice.attachmentCount} file{notice.attachmentCount > 1 && 's'}</span></div>
          )}
        </div>
      </div>
      {notice.isNew && (
        <div className="ml-auto text-[10px] font-bold uppercase bg-gradient-to-br from-red-500 to-red-600 text-white px-2.5 py-1 rounded-md">NEW</div>
      )}
    </div>
  );
};

const ImportantNoticeV4: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 -m-8 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fadeInDown-custom">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3">📢 Important Notices</h1>
          <p className="text-base text-slate-600">Thông báo nổi bật và danh sách quan trọng</p>
        </div>

        <section className="mb-12 animate-fadeInUp-custom">
          <FeaturedCard notice={featuredNoticeV4} />
        </section>
        
        <section className="animate-fadeInUp-custom" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-blue-600">Các thông báo khác</h2>
          <div className="space-y-4">
            {otherNoticesV4.map(notice => (
              <ListItem key={notice.id} notice={notice} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImportantNoticeV4;