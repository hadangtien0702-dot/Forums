import React from 'react';
import Spinner from '../../../shared/ui/Spinner';
import EditButton from './components/EditButton';

const V2NavItem: React.FC<{
  label: string;
  isActive?: boolean;
  isDanger?: boolean;
}> = ({ label, isActive = false, isDanger = false }) => {
  const baseClasses = "block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors";
  let activeClasses = '';
  if (isDanger) {
    activeClasses = "text-red-600 hover:bg-red-50";
  } else if (isActive) {
    activeClasses = "bg-blue-100 text-blue-700";
  } else {
    activeClasses = "text-slate-600 hover:bg-slate-100";
  }

  return (
    <button className={`${baseClasses} ${activeClasses}`}>
      {label}
    </button>
  );
};

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <div className="mt-1 text-base font-semibold text-slate-800">{children}</div>
  </div>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
  />
);

const Card: React.FC<{ title: string; onEdit?: () => void; isEditing?: boolean; children: React.ReactNode }> = ({ title, onEdit, isEditing, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
             <h2 className="text-xl font-bold text-slate-800">{title}</h2>
             {onEdit && !isEditing && <EditButton onClick={onEdit} />}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);


const UserProfileV2 = (props: any) => {
  const { user, tempUser, isEditing, isSaving, onEdit, onCancel, onSave, onInputChange } = props;
  const data = isEditing ? tempUser : user;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3">
          <nav className="space-y-1">
            <V2NavItem label="My Profile" isActive />
            <V2NavItem label="Security" />
            <V2NavItem label="Teams" />
            <V2NavItem label="Team Member" />
            <V2NavItem label="Notifications" />
            <V2NavItem label="Billing" />
            <V2NavItem label="Data Export" />
            <V2NavItem label="Delete Account" isDanger />
          </nav>
        </div>
      </aside>

      <main className="lg:col-span-3 space-y-6">
        {/* My Profile Card */}
        <Card title="My Profile" onEdit={onEdit} isEditing={isEditing}>
            <div className="flex items-center gap-5">
                <img
                  src={data.avatar}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-slate-800">{data.name}</p>
                  <p className="text-slate-500">{data.role}</p>
                  <p className="text-sm text-slate-500">{data.location}</p>
                </div>
            </div>
        </Card>
        
        {/* Personal Information Card */}
        <Card title="Personal Information" onEdit={onEdit} isEditing={isEditing}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <InfoRow label="First Name">
                  {isEditing ? <FormInput value={data.personalInfo.firstName} onChange={(e) => onInputChange('personalInfo', 'firstName', e.target.value)} /> : data.personalInfo.firstName}
                </InfoRow>
                 <InfoRow label="Last Name">
                  {isEditing ? <FormInput value={data.personalInfo.lastName} onChange={(e) => onInputChange('personalInfo', 'lastName', e.target.value)} /> : data.personalInfo.lastName}
                </InfoRow>
                 <InfoRow label="Email address">
                  {isEditing ? <FormInput type="email" value={data.personalInfo.email} onChange={(e) => onInputChange('personalInfo', 'email', e.target.value)} /> : data.personalInfo.email}
                </InfoRow>
                 <InfoRow label="Phone">
                  {isEditing ? <FormInput value={data.personalInfo.phone} onChange={(e) => onInputChange('personalInfo', 'phone', e.target.value)} /> : data.personalInfo.phone}
                </InfoRow>
                <div className="sm:col-span-2">
                     <InfoRow label="Bio">
                      {isEditing ? <FormInput value={data.personalInfo.bio} onChange={(e) => onInputChange('personalInfo', 'bio', e.target.value)} /> : data.personalInfo.bio}
                    </InfoRow>
                </div>
            </div>
        </Card>

        {/* Address Card */}
        <Card title="Address" onEdit={onEdit} isEditing={isEditing}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <InfoRow label="Country">
              {isEditing ? <FormInput value={data.address.country} onChange={(e) => onInputChange('address', 'country', e.target.value)} /> : data.address.country}
            </InfoRow>
            <InfoRow label="City/State">
              {isEditing ? <FormInput value={data.address.cityState} onChange={(e) => onInputChange('address', 'cityState', e.target.value)} /> : data.address.cityState}
            </InfoRow>
            <InfoRow label="Postal Code">
              {isEditing ? <FormInput value={data.address.postalCode} onChange={(e) => onInputChange('address', 'postalCode', e.target.value)} /> : data.address.postalCode}
            </InfoRow>
            <InfoRow label="TAX ID">
              {isEditing ? <FormInput value={data.address.taxId} onChange={(e) => onInputChange('address', 'taxId', e.target.value)} /> : data.address.taxId}
            </InfoRow>
          </div>
        </Card>
        
        {isEditing && (
        <div className="flex justify-end gap-3">
            <button 
              onClick={onCancel}
              className="px-6 py-2 bg-white text-slate-700 rounded-lg text-sm font-semibold border border-slate-300 hover:bg-slate-50 transition-colors"
            >
                Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isSaving && <Spinner />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      )}
      </main>
    </div>
  );
};

export default UserProfileV2;
