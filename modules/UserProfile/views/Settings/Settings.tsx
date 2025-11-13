import React from 'react';

const SettingsSection: React.FC = () => {
  return (
    <div className="text-center text-slate-500 py-16">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.113-1.113l.448-.11c.542-.132 1.097-.132 1.639 0l.448.11c.553.106 1.023.571 1.113 1.113l.068.418c.49.372.955.78 1.384 1.21l.393-.148c.51-.192 1.054-.192 1.565 0l.285.108c.502.19.898.631.996 1.13l.068.348c.062.355.093.714.093 1.076s-.031.721-.093 1.076l-.068.347c-.098.5-.494.94-.996 1.13l-.285.108c-.51.192-1.054.192-1.565 0l-.393-.148c-.43-.43-.894-.838-1.384-1.21l-.068.418c-.09.542-.56 1.007-1.113 1.113l-.448.11c-.542.132-1.097.132-1.639 0l-.448-.11c-.553-.106-1.023.571-1.113-1.113l-.068-.418c-.49-.372-.955-.78-1.384-1.21l-.393.148c-.51.192-1.054.192-1.565 0l-.285-.108c-.502-.19-.898.631-.996 1.13l-.068-.348c-.062-.355-.093.714-.093 1.076s.031-.721.093-1.076l.068-.347c.098-.5.494-.94.996-1.13l.285.108c.51-.192-1.054-.192-1.565 0l.393.148c.43.43.894.838 1.384 1.21l.068-.418zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">Coming Soon</h3>
      <p className="mt-1 text-sm">This section is under construction.</p>
      <p className="text-sm">New settings and preferences will be available here shortly.</p>
    </div>
  );
};

export default SettingsSection;