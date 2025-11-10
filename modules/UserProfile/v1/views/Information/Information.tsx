import React from 'react';
import type { InformationSectionProps } from './Information.types';
import Spinner from '../../../../../shared/ui/Spinner';

const InformationSection: React.FC<InformationSectionProps> = ({
  details,
  isEditing,
  isSaving,
  showSuccess,
  onCancel,
  onSave,
  onInputChange
}) => {
  return (
    <div>
      {showSuccess && (
         <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
            Profile updated successfully!
        </div>
      )}

      <div>
        <dl className="divide-y divide-slate-100">
            {details.map((item, index) => (
              <div key={index} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-3">
                  <span className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-slate-100 rounded-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 sm:mt-0 sm:col-span-2">
                  {isEditing && item.editable ? (
                    <input
                      type={item.key === 'email' ? 'email' : 'text'}
                      id={item.key}
                      value={item.value}
                      onChange={(e) => onInputChange(item.key!, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base transition-all bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{item.value}</span>
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
