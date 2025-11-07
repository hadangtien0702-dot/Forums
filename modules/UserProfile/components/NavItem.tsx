import React from 'react';

interface NavItemProps {
  tabName: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (tabName: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ tabName, label, icon, isActive, onClick }) => {
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick(tabName);
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <span className={isActive ? 'text-red-600' : 'text-slate-400'}>{icon}</span>
        {label}
      </a>
    </li>
  );
};

export default NavItem;