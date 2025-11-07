import React, { useState, useEffect } from 'react';
import InformationSection from './views/Information';
import SettingsSection from './views/Settings';
import NavItem from './components/NavItem';
import type { UserDetail } from './UserProfile.types';

const initialUser = {
  name: 'Alex Doe',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  details: [
    {
      label: 'Full Name',
      value: 'Alex Doe',
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
      value: 'alex.doe@example.com',
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
      value: 'Admin Department',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6.75 3.75l-1.5-1.5m0 0l-1.5 1.5m1.5-1.5v12" />
        </svg>
      ),
    },
    {
      label: 'Role',
      value: 'Admin',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.752A11.959 11.959 0 0115.502 6a11.99 11.99 0 00-9-2.752z" />
        </svg>
      ),
    },
    {
      label: 'Member Since',
      value: 'October 13, 2024',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
        </svg>
      ),
    },
  ] as UserDetail[],
};

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('information');
  const [user, setUser] = useState(initialUser);
  const [tempUser, setTempUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Sync main user name with details
    const nameDetail = user.details.find(d => d.key === 'name');
    if (nameDetail && nameDetail.value !== user.name) {
      setUser(prev => ({...prev, name: nameDetail.value}));
    }
  }, [user.details]);

  const handleEdit = () => {
    setTempUser(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setUser(tempUser);
      setIsEditing(false);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };
  
  const handleInputChange = (key: string, value: string) => {
    const updatedDetails = tempUser.details.map(detail =>
      detail.key === key ? { ...detail, value } : detail
    );
    setTempUser(prev => ({ ...prev, details: updatedDetails }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-slate-100 object-cover"
          />
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <div className="mt-2">
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 18.5a11.954 11.954 0 007.834-13.501 1.5 1.5 0 00-1.423-2.455 1.5 1.5 0 00-1.043.533A9.957 9.957 0 0110 15.5a9.957 9.957 0 01-6.367-3.001 1.5 1.5 0 00-1.467 2.5z" clipRule="evenodd" />
              </svg>
              {user.role}
            </span>
          </div>
        </div>
        <nav className="mt-6 bg-white rounded-xl shadow-lg shadow-slate-200/80 p-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </ul>
        </nav>
      </aside>

      {/* Right Content */}
      <main className="lg:col-span-8 xl:col-span-9">
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
          {activeTab === 'information' && (
             <InformationSection
                details={isEditing ? tempUser.details : user.details}
                isEditing={isEditing}
                isSaving={isSaving}
                showSuccess={showSuccess}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
                onInputChange={handleInputChange}
            />
          )}
          {activeTab === 'settings' && <SettingsSection />}
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;