
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { Notice } from '../ImportantNotice.types';
import { AttachmentItem } from '../../components';

const PRIORITY_STYLES = {
    critical: { label: 'Critical', bg: 'bg-red-100', text: 'text-red-700', icon: '🔴' },
    important: { label: 'Important', bg: 'bg-amber-100', text: 'text-amber-700', icon: '🟡' },
    info: { label: 'Info', bg: 'bg-blue-100', text: 'text-blue-700', icon: '🔵' },
    update: { label: 'Update', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '🟢' }
};

interface NoticeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice | null;
}

const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ isOpen, onClose, notice }) => {
  if (!notice) return null;

  const style = PRIORITY_STYLES[notice.priority] || PRIORITY_STYLES.info;

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
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-8"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                     <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${style.bg} ${style.text}`}>
                        <span>{style.icon}</span>
                        {style.label}
                    </div>
                     <button
                        type="button"
                        className="p-2 rounded-full text-slate-400 hover:bg-white hover:shadow-sm hover:text-slate-600 transition-all"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                
                <div className="p-6 sm:p-8">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {notice.author.avatar}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-lg">{notice.author.name}</p>
                            <p className="text-sm text-slate-500">{notice.author.role} • {notice.date}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                        {notice.title}
                    </h3>
                    
                    <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                        <p className="whitespace-pre-line leading-relaxed">
                            {notice.fullContent || notice.description}
                        </p>
                    </div>
                    
                    {/* Attachments */}
                    {notice.attachments && notice.attachments.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Attached Files</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {notice.attachments.map((att, index) => (
                                <AttachmentItem key={index} attachment={att} />
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                <div className="bg-slate-50 px-6 py-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all shadow-lg shadow-slate-200"
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

export default NoticeDetailModal;
