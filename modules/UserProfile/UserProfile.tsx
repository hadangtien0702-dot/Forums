import React, { useState } from 'react';
import UserProfileV1 from './v1/UserProfileV1';
import UserProfileV2 from './v2/UserProfileV2';
import UserProfileV3 from './v3/UserProfileV3';

// Updated user data structure based on the new design
const initialUser = {
  name: 'Rafiqur Rahman',
  role: 'Team Manager',
  department: 'Sales Department',
  memberSince: 'July 20, 2021',
  location: 'Leeds, United Kingdom',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  personalInfo: {
    firstName: 'Rafiqur',
    lastName: 'Rahman',
    email: 'rafiqurrahman51@gmail.com',
    phone: '+09 345 346 46',
    bio: 'Team Manager',
  },
  address: {
    country: 'United Kingdom',
    cityState: 'Leeds, East London',
    postalCode: 'ERT 2354',
    taxId: 'AS45645756',
  },
};

const LayoutButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
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
);


const UserProfilePage: React.FC = () => {
  const [layout, setLayout] = useState('v2');
  const [user, setUser] = useState(initialUser);
  const [tempUser, setTempUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State for V1 layout
  const [activeTab, setActiveTab] = useState('information');

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
  };
  
  const handleInputChange = (section: 'personalInfo' | 'address', key: string, value: string) => {
    setTempUser(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };
  
  const handleProfileCardChange = (key: 'name' | 'role' | 'location', value: string) => {
    setTempUser(prev => ({ ...prev, [key]: value }));
  };

  const commonProps = {
    user,
    tempUser,
    isEditing,
    isSaving,
    showSuccess,
    onEdit: handleEdit,
    onCancel: handleCancel,
    onSave: handleSave,
    onInputChange: handleInputChange,
    onProfileCardChange: handleProfileCardChange,
  };

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
        <LayoutButton label="Version 2" isActive={layout === 'v2'} onClick={() => setLayout('v2')} />
        <LayoutButton label="Version 3" isActive={layout === 'v3'} onClick={() => setLayout('v3')} />
      </div>

      {layout === 'v1' && (
        <UserProfileV1 
          {...commonProps}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      )}
      {layout === 'v2' && <UserProfileV2 {...commonProps} />}
      {layout === 'v3' && <UserProfileV3 {...commonProps} />}
    </div>
  );
};

export default UserProfilePage;