
import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import type { Notice, NoticePriority } from '../ImportantNotice.types';
import { noticesV3 as notices } from './data';
import { AttachmentItem } from '../components/AttachmentItem';

const icons: Record<NoticePriority, React.ReactNode> = {
  critical: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  important: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  update: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const priorityStyles: Record<NoticePriority, { bg: string; iconColor: string; ring: string }> = {
  critical: { bg: 'bg-red-500', iconColor: 'text-red-500', ring: 'ring-red-200' },
  important: { bg: 'bg-amber-500', iconColor: 'text-amber-600', ring: 'ring-amber-200' },
  update: { bg: 'bg-blue-500', iconColor: 'text-blue-600', ring: 'ring-blue-200' },
  info: { bg: 'bg-slate-500', iconColor: 'text-slate-600', ring: 'ring-slate-200' },
};

const NoticeTimelineItem: React.FC<{ notice: Notice }> = ({ notice }) => {
  const styles = priorityStyles[notice.priority];

  return (
    <Disclosure as="div" className="relative">
    {({ open }) => (
        <>
            {/* Timeline event marker - FIX: Centered the marker on the timeline correctly. */}
            <div className="absolute left-4 top-0 flex items-center justify-center w-8 h-8 bg-white rounded-full ring-4 ring-white" style={{ transform: 'translateX(-50%)' }}>
                <div className={`h-full w-full rounded-full flex items-center justify-center text-white ${styles.bg}`}>
                    {icons[notice.priority]}
                </div>
            </div>

            <div className="ml-10">
                <Disclosure.Button className="flex justify-between items-center w-full p-4 text-left rounded-xl bg-slate-50 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800">{notice.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{notice.date}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-4 h-5 w-5 text-slate-500 transform transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                </Disclosure.Button>
                 <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform -translate-y-2 opacity-0"
                    enterTo="transform translate-y-0 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform translate-y-0 opacity-100"
                    leaveTo="transform -translate-y-2 opacity-0"
                  >
                    <Disclosure.Panel className="mt-2 p-4 text-sm text-slate-600 bg-white rounded-xl shadow-inner-soft">
                        <p className="leading-relaxed whitespace-pre-line">{notice.fullContent || notice.description}</p>

                        {notice.image && (
                            <div className="mt-4">
                                <img src={notice.image} alt={notice.title} className="w-full max-w-md rounded-lg shadow-md" />
                            </div>
                        )}

                        {notice.attachments && notice.attachments.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-bold text-slate-800 mb-2">Attachments</h4>
                                <div className="space-y-2">
                                    {notice.attachments.map((att, index) => <AttachmentItem key={index} attachment={att} />)}
                                </div>
                            </div>
                        )}
                    </Disclosure.Panel>
                </Transition>
            </div>
         </>
      )}
    </Disclosure>
  );
};

const ActionButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSpecial?: boolean;
}> = ({ label, icon, onClick, isSpecial }) => {
  const specialClasses = 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
  const defaultClasses = 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors duration-200 text-center border ${
        isSpecial ? specialClasses : defaultClasses
      }`}
    >
      <div className="mb-2 h-8 flex items-center justify-center">{icon}</div>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
};


const QuickActions: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const actions = [
    { page: 'ageCalculator', label: 'Age Calculator', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    { page: 'communityFeed', label: 'New Thread', icon: <span className="text-4xl font-thin text-blue-700">+</span>, special: true },
    { page: 'userProfile', label: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { page: 'salesHonor', label: 'Sales Honor', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-5 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <ActionButton
            key={action.page}
            label={action.label}
            icon={action.icon}
            onClick={() => onNavigate(action.page)}
            isSpecial={action.special}
          />
        ))}
      </div>
    </div>
  );
};


interface ImportantNoticeV3Props {
  onNavigate: (page: string) => void;
}

const ImportantNoticeV3: React.FC<ImportantNoticeV3Props> = ({ onNavigate }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Important Notices</h1>
            <p className="mt-2 text-slate-600">
                A timeline of all important company announcements.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative">
                {/* The timeline's vertical line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200"></div>
                <div className="space-y-8">
                    {notices.map((notice) => (
                        <NoticeTimelineItem key={notice.id} notice={notice} />
                    ))}
                </div>
            </div>
            <aside className="lg:col-span-1">
                <QuickActions onNavigate={onNavigate} />
            </aside>
            <style>{`.shadow-inner-soft { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }`}</style>
        </div>
      </div>
    </div>
  );
};

export default ImportantNoticeV3;
