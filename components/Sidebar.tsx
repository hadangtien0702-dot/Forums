
'use client';

import React, { useState } from 'react';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const NavItem: React.FC<{
  href: string;
  isActive: boolean;
  onClick: (href: string) => void;
  children: React.ReactNode;
}> = ({ href, isActive, onClick, children }) => {
  const baseClasses = "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden";
  // Updated to Indigo theme for consistency
  const activeClasses = "text-indigo-700 bg-indigo-50 shadow-sm ring-1 ring-indigo-100"; 
  const inactiveClasses = "text-slate-500 hover:text-slate-900 hover:bg-slate-50";

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick(href);
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {isActive && (
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
      )}
      {children}
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPath: propPath, onNavigate: propNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = propPath || '/';

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    if (propNavigate) {
      propNavigate(path);
    } else {
      try {
        window.history.pushState({}, '', path);
      } catch (e) {
        console.debug('Navigation state update suppressed.');
      }
    }
  };

  return (
    <>
        {/* Mobile Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
             <button
                  onClick={() => setIsOpen(true)}
                  className="p-2.5 rounded-xl bg-white/90 backdrop-blur shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
                  aria-label="Open sidebar"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
            </button>
        </div>

        {/* Overlay */}
        <div
            className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        ></div>

        <aside className={`
            fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 z-50
            transform transition-transform duration-300 ease-out shadow-2xl lg:shadow-none
            lg:relative lg:translate-x-0 lg:flex-shrink-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-24 px-6 lg:justify-start">
                    <div className="flex items-center gap-3 text-indigo-600">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                       <span className="font-bold text-xl text-slate-900 tracking-tight">Forums</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-400" aria-label="Close sidebar">
                         <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="p-4 flex-1 overflow-y-auto space-y-8 scrollbar-hide">
                    <div>
                        <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Overview
                        </h3>
                        <ul className="space-y-1">
                            <li>
                            <NavItem href="/" isActive={currentPath === '/'} onClick={handleNavigate}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                <span>Dashboard</span>
                            </NavItem>
                            </li>
                            <li>
                            <NavItem href="/community" isActive={currentPath === '/community'} onClick={handleNavigate}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/community' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Community</span>
                            </NavItem>
                            </li>
                             <li>
                              <NavItem href="/sales-honor" isActive={currentPath === '/sales-honor'} onClick={handleNavigate}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/sales-honor' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span>Sales Honor</span>
                              </NavItem>
                            </li>
                            <li>
                              <NavItem href="/important-notice" isActive={currentPath === '/important-notice'} onClick={handleNavigate}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/important-notice' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                <span>Notices</span>
                              </NavItem>
                            </li>
                             <li>
                              <NavItem href="/menu" isActive={currentPath === '/menu'} onClick={handleNavigate}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/menu' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Apps</span>
                              </NavItem>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Tools
                        </h3>
                        <ul className="space-y-1">
                            <li>
                              <NavItem href="/age-calculator" isActive={currentPath === '/age-calculator'} onClick={handleNavigate}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/age-calculator' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                  <span>Age Calculator</span>
                              </NavItem>
                            </li>
                            <li>
                              <NavItem href="/quote-calculator" isActive={currentPath === '/quote-calculator'} onClick={handleNavigate}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/quote-calculator' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span>Quote Calculator</span>
                              </NavItem>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Account
                        </h3>
                        <ul className="space-y-1">
                            <li>
                              <NavItem href="/profile" isActive={currentPath === '/profile'} onClick={handleNavigate}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/profile' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  <span>My Profile</span>
                              </NavItem>
                            </li>
                             <li>
                              <NavItem href="/login" isActive={currentPath === '/login'} onClick={handleNavigate}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentPath === '/login' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                  </svg>
                                  <span>Log out</span>
                              </NavItem>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-9 h-9 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-700 truncate">Marilyn Franci</p>
                            <p className="text-xs text-slate-500 truncate">Agent • Level 4</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
