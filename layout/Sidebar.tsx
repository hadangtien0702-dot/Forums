import React from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NavLink: React.FC<{
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ href, isActive, onClick, children }) => {
  const baseClasses = "flex items-center px-3 py-2.5 text-sm font-semibold rounded-md transition-colors duration-150";
  const activeClasses = "text-blue-700 bg-blue-50 border-l-4 border-blue-600";
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


const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="flex items-center justify-center h-20 border-b border-slate-200">
        <div className="flex items-center gap-2 text-blue-600">
            <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M12 16V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
           <span className="font-bold text-xl text-slate-800">7XCRM</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Tools
        </h3>
        <nav className="mt-2">
          <ul className="space-y-1">
            <li>
              <NavLink href="#" isActive={currentPage === 'ageCalculator'} onClick={() => onNavigate('ageCalculator')}>
                Age Calculator
              </NavLink>
            </li>
             <li>
              <NavLink href="#" isActive={currentPage === 'userProfile'} onClick={() => onNavigate('userProfile')}>
                User Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;