import React from 'react';

interface SuccessStoryProps {
  member: {
    name: string;
    storyImage: string;
    story: string;
  };
}

const SuccessStory: React.FC<SuccessStoryProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Winner's Spotlight</h2>
        <p className="text-slate-500 mt-1">An interview with our top performer, {member.name}.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 items-start">
        <div className="md:col-span-1">
          <img 
            src={member.storyImage} 
            alt={`Success story of ${member.name}`} 
            className="rounded-lg object-cover w-full shadow-lg aspect-[4/5]"
          />
        </div>
        <div 
          className="md:col-span-2 space-y-4 text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: member.story }} 
        />
      </div>
    </div>
  );
};

export default SuccessStory;
