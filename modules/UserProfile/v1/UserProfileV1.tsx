import React from 'react';
import NavItem from './components/NavItem';
import InformationSection from './views/Information';
import SettingsSection from './views/Settings';
import EditButton from './components/EditButton';
import type { UserDetail } from './types';

// Adapter to transform new user object into the flat 'details' array V1 expects.
const adaptUserToV1Details = (user: any): UserDetail[] => [
  {
    label: 'Full Name',
    value: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    editable: true,
    key: 'name'
  },
  {
    label: 'Email',
    value: user.personalInfo.email,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    editable: true,
    key: 'email'
  },
   {
    label: 'Department',
    value: user.department,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-2.25a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21" />
      </svg>
    ),
  },
  {
    label: 'Role',
    value: user.role,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.752A11.959 11.959 0 0115.502 6a11.99 11.99 0 00-9-2.752z" />
      </svg>
    ),
  },
  {
    label: 'Member Since',
    value: user.memberSince,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];


const UserProfileV1 = (props: any) => {
  const { user, tempUser, activeTab, setActiveTab, onInputChange, onEdit, isEditing } = props;

  const detailsForDisplay = adaptUserToV1Details(props.isEditing ? tempUser : user);

  // Adapter to map V1's flat key-value change to V2's structured change
  const handleV1InputChange = (key: string, value: string) => {
    if (key === 'name') {
      const [firstName, ...lastNameParts] = value.split(' ');
      onInputChange('personalInfo', 'firstName', firstName || '');
      onInputChange('personalInfo', 'lastName', lastNameParts.join(' '));
    } else if (key === 'email') {
      onInputChange('personalInfo', 'email', value);
    }
  };
  
  const pageInfo = {
    information: {
      title: 'Profile Information',
    },
    settings: {
      title: 'Settings',
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 text-center sticky top-24">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-slate-100 object-cover"
          />
          <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
          <div className="mt-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        
          <nav className="mt-6 pt-6 border-t border-slate-100">
            <ul className="space-y-2">
              <NavItem
                tabName="information"
                label="Information"
                isActive={activeTab === 'information'}
                onClick={setActiveTab}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <NavItem
                tabName="settings"
                label="Settings"
                isActive={activeTab === 'settings'}
                onClick={setActiveTab}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
            </ul>
             <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                  onClick={() => alert('Log-out functionality is not yet implemented.')}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all duration-200 text-left"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log-out</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Right Content */}
      <main className="lg:col-span-8 xl:col-span-9">
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{pageInfo[activeTab as keyof typeof pageInfo].title}</h2>
                {activeTab === 'information' && !isEditing && <EditButton onClick={onEdit} />}
            </div>
            <div className="p-6">
              {activeTab === 'information' && (
                 <InformationSection
                    {...props}
                    details={detailsForDisplay}
                    onInputChange={handleV1InputChange}
                />
              )}
              {activeTab === 'settings' && <SettingsSection />}
            </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileV1;
