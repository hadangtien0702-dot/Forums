
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { NoticeV2 } from '../data';
import { AttachmentItem } from '../../components';

const priorityClasses = {
  urgent: { icon: '🔴', badgeBg: 'bg-red-100', badgeText: 'text-red-700' },
  important: { icon: '🟡', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
  info: { icon: '🔵', badgeBg: 'bg-blue-100', badgeText: 'text-blue-700' },
  update: { icon: '🟢', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
};

interface NoticeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: NoticeV2 | null;
}

const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ isOpen, onClose, notice }) => {
  if (!notice) return null;

  const p = priorityClasses[notice.priority];

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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${p.badgeBg} ${p.badgeText}`}>
                            <span>{p.icon}</span>
                            <span>{notice.priority}</span>
                        </div>
                        <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900 mt-3">
                            {notice.title}
                        </Dialog.Title>
                    </div>
                     <button
                        type="button"
                        className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                
                <div className="mt-4 flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">{notice.author.avatar}</div>
                    <div>
                        <p className="font-semibold text-slate-800">{notice.author.name}</p>
                        <p className="text-xs text-slate-500">{notice.author.role} - {notice.date} at {notice.time}</p>
                    </div>
                </div>

                <div className="mt-4 max-h-[40vh] overflow-y-auto pr-2">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {notice.description}
                  </p>
                  
                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="mt-5 pt-4 border-t">
                        <h4 className="text-sm font-bold text-slate-800 mb-3">Attachments</h4>
                        <div className="space-y-2">
                            {notice.attachments.map((att, index) => <AttachmentItem key={index} attachment={att} />)}
                        </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Got it, thanks!
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
