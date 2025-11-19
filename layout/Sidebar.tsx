
import React from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavLink: React.FC<{
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ href, isActive, onClick, children }) => {
  const baseClasses = "flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-md transition-colors duration-150";
  const activeClasses = "text-blue-700 bg-blue-100";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, onClose }) => {
  return (
    <>
        {/* Overlay for mobile */}
        <div
            className={`fixed inset-0 bg-slate-900/50 z-20 transition-opacity lg:hidden ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
            aria-hidden="true"
        ></div>

        <aside className={`
            fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-30
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:w-72 lg:translate-x-0 lg:flex-shrink-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-20 border-b border-slate-200 px-4 lg:justify-center">
                    <div className="flex items-center gap-2 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v1" />
                        </svg>
                       <span className="font-bold text-xl text-slate-800">Forums</span>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100" aria-label="Close sidebar">
                         <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4 flex-1 overflow-y-auto">
                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Main
                    </h3>
                    <ul className="mt-2 space-y-1">
                        <li>
                        <NavLink href="#" isActive={currentPage === 'home'} onClick={() => onNavigate('home')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            <span>Home</span>
                        </NavLink>
                        </li>
                        <li>
                        <NavLink href="#" isActive={currentPage === 'communityFeed'} onClick={() => onNavigate('communityFeed')}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z" />
                             </svg>
                            <span>Community Feed</span>
                        </NavLink>
                        </li>
                         <li>
                          <NavLink href="#" isActive={currentPage === 'salesHonor'} onClick={() => onNavigate('salesHonor')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span>Sales Honor</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink href="#" isActive={currentPage === 'importantNotice'} onClick={() => onNavigate('importantNotice')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span>Important Notices</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink href="#" isActive={currentPage === 'menu'} onClick={() => onNavigate('menu')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span>Menu</span>
                          </NavLink>
                        </li>
                    </ul>
                    <h3 className="mt-6 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tools
                    </h3>
                    <ul className="mt-2 space-y-1">
                        <li>
                          <NavLink href="#" isActive={currentPage === 'ageCalculator'} onClick={() => onNavigate('ageCalculator')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              <span>Age Calculator</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink href="#" isActive={currentPage === 'quoteCalculator'} onClick={() => onNavigate('quoteCalculator')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Quote Calculator</span>
                          </NavLink>
                        </li>
                    </ul>
                    <h3 className="mt-6 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Account
                    </h3>
                    <ul className="mt-2 space-y-1">
                        <li>
                          <NavLink href="#" isActive={currentPage === 'userProfile'} onClick={() => onNavigate('userProfile')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>My Profile</span>
                          </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
