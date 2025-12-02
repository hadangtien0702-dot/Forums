
'use client';

import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import Spinner from '../../shared/ui/Spinner';
import { initialUser } from './UserProfile.constants';

const UserProfileV1 = lazy(() => import('./v1/UserProfileV1'));
const UserProfileV3 = lazy(() => import('./v3/UserProfileV3'));

const LayoutButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = memo(({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
));


const UserProfilePage: React.FC = () => {
  const [layout, setLayout] = useState('v1');
  const [user, setUser] = useState(initialUser);
  const [tempUser, setTempUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State for V1 layout
  const [activeTab, setActiveTab] = useState('information');

  const handleEdit = useCallback(() => {
    setTempUser(user);
    setIsEditing(true);
  }, [user]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      // Update the top-level name and role from the detailed info for consistency
      const newName = `${tempUser.personalInfo.firstName} ${tempUser.personalInfo.lastName}`;
      const newRole = tempUser.personalInfo.bio;
      const updatedUser = { ...tempUser, name: newName.trim(), role: newRole };
      
      setUser(updatedUser);
      setIsEditing(false);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  }, [tempUser]);
  
  const handleInputChange = useCallback((section: 'personalInfo' | 'address', key: string, value: string) => {
    setTempUser(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);
  
  const handleProfileCardChange = useCallback((key: 'name' | 'role' | 'location', value: string) => {
    setTempUser(prev => ({ ...prev, [key]: value }));
  }, []);

  const SuspenseFallback: React.FC = () => (
    <div className="flex w-full items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
         <p className="mt-2 text-slate-600">
          Manage your account details, preferences, and settings.
        </p>
      </div>

      <div className="mb-6 flex items-center flex-wrap gap-2 border-b border-slate-200 pb-4">
        <span className="text-sm font-medium text-slate-600 mr-2">View Layout:</span>
        <LayoutButton label="Version 1" isActive={layout === 'v1'} onClick={() => setLayout('v1')} />
        <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
      </div>
      
      <Suspense fallback={<SuspenseFallback />}>
        {layout === 'v1' && (
          <UserProfileV1 
            user={user}
            tempUser={tempUser}
            isEditing={isEditing}
            isSaving={isSaving}
            showSuccess={showSuccess}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            onInputChange={handleInputChange}
            onProfileCardChange={handleProfileCardChange}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}
        {layout === 'v3' && (
           <UserProfileV3
            user={user}
            tempUser={tempUser}
            isEditing={isEditing}
            isSaving={isSaving}
            showSuccess={showSuccess}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        )}
      </Suspense>
    </div>
  );
};

export default UserProfilePage;
