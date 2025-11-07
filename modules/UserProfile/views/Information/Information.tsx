import React from 'react';
import type { InformationSectionProps } from './Information.types';
import Spinner from '../../../../shared/ui/Spinner';

const InformationSection: React.FC<InformationSectionProps> = ({
  details,
  isEditing,
  isSaving,
  showSuccess,
  onEdit,
  onCancel,
  onSave,
  onInputChange
}) => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profile Information</h2>
          <p className="mt-1 text-sm text-slate-500">
            {isEditing ? "Update your personal details below." : "View your personal details."}
          </p>
        </div>
        {!isEditing && (
            <button onClick={onEdit} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
                Edit Profile
            </button>
        )}
      </div>

      {showSuccess && (
         <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
            Profile updated successfully!
        </div>
      )}

      <div className="mt-6 border-t border-slate-200">
        <dl className="divide-y divide-slate-200">
            {details.map((item, index) => (
              <div key={index} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-3">
                  <span className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-slate-100 rounded-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {isEditing && item.editable ? (
                    <input
                      type={item.key === 'email' ? 'email' : 'text'}
                      id={item.key}
                      value={item.value}
                      onChange={(e) => onInputChange(item.key!, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="font-semibold">{item.value}</span>
                  )}
                </dd>
              </div>
            ))}
        </dl>
      </div>

      {isEditing && (
        <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end gap-3">
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
    </div>
  );
};

export default InformationSection;