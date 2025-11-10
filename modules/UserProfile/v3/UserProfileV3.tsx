import React from 'react';
import Spinner from '../../../../shared/ui/Spinner';

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
  />
);

const InfoItem: React.FC<{ label: string; value: string; isEditing?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, isEditing = false, onChange }) => (
    <div className="mb-4 last:mb-0">
        <label className="text-xs text-slate-500 uppercase font-semibold">{label}</label>
        {isEditing && onChange ? (
            <FormInput value={value} onChange={onChange} />
        ) : (
            <p className="text-base text-slate-800 font-medium">{value || '-'}</p>
        )}
    </div>
);


const ColumnCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-50/80 rounded-lg p-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-sm">
                {icon}
            </div>
            <h3 className="font-bold text-slate-700">{title}</h3>
        </div>
        <div>
            {children}
        </div>
    </div>
);


const UserProfileV3 = (props: any) => {
    const { user, tempUser, isEditing, isSaving, showSuccess, onEdit, onCancel, onSave, onInputChange } = props;
    const data = isEditing ? tempUser : user;

    return (
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200">
                <div className="flex items-center gap-5">
                    <img
                      src={data.avatar}
                      alt="User Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{data.name}</h2>
                      <p className="text-slate-500 font-medium">{data.role}</p>
                      <p className="text-sm text-slate-500">{data.location}</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button 
                        onClick={onEdit}
                        className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-blue-700 active:scale-[0.98]"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                        </svg>
                        <span>Edit Profile</span>
                    </button>
                ) : (
                   <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-row items-stretch gap-2">
                        <button 
                          onClick={onCancel}
                          className="px-6 py-2.5 bg-white text-slate-700 rounded-lg text-sm font-semibold border border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                          onClick={onSave}
                          disabled={isSaving}
                          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                          {isSaving && <Spinner />}
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </div>

            {showSuccess && (
                 <div className="mt-6 -mb-2 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
                    Profile updated successfully!
                </div>
            )}
            
            {/* Content Columns */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Column 1: Personal Info */}
                <ColumnCard
                    title="Contact & Personal"
                    icon={
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                >
                    <InfoItem label="First Name" value={data.personalInfo.firstName} isEditing={isEditing} onChange={(e) => onInputChange('personalInfo', 'firstName', e.target.value)} />
                    <InfoItem label="Last Name" value={data.personalInfo.lastName} isEditing={isEditing} onChange={(e) => onInputChange('personalInfo', 'lastName', e.target.value)} />
                    <InfoItem label="Email Address" value={data.personalInfo.email} isEditing={isEditing} onChange={(e) => onInputChange('personalInfo', 'email', e.target.value)} />
                    <InfoItem label="Phone Number" value={data.personalInfo.phone} isEditing={isEditing} onChange={(e) => onInputChange('personalInfo', 'phone', e.target.value)} />
                </ColumnCard>
                
                {/* Column 2: Address */}
                 <ColumnCard
                    title="Location & Address"
                    icon={
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                >
                    <InfoItem label="Country" value={data.address.country} isEditing={isEditing} onChange={(e) => onInputChange('address', 'country', e.target.value)} />
                    <InfoItem label="City / State" value={data.address.cityState} isEditing={isEditing} onChange={(e) => onInputChange('address', 'cityState', e.target.value)} />
                    <InfoItem label="Postal Code" value={data.address.postalCode} isEditing={isEditing} onChange={(e) => onInputChange('address', 'postalCode', e.target.value)} />
                </ColumnCard>
                
                 {/* Column 3: Account Details */}
                 <ColumnCard
                    title="Account Details"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" />
                        </svg>
                    }
                >
                    <InfoItem label="Department" value={data.department} />
                    <InfoItem label="Member Since" value={data.memberSince} />
                    <InfoItem label="Bio / Role" value={data.personalInfo.bio} isEditing={isEditing} onChange={(e) => onInputChange('personalInfo', 'bio', e.target.value)} />
                    <InfoItem label="Tax ID" value={data.address.taxId} isEditing={isEditing} onChange={(e) => onInputChange('address', 'taxId', e.target.value)} />
                </ColumnCard>
            </div>
        </div>
    );
};

export default UserProfileV3;
