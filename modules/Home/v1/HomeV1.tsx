import React, { useState, useMemo } from 'react';

// --- Reusable UI Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md shadow-slate-200/60 border border-slate-200/80 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ title: string; icon: React.ReactNode; action?: React.ReactNode; }> = ({ title, icon, action }) => (
  <div className="flex justify-between items-center p-5 border-b border-slate-100">
    <div className="flex items-center gap-3">
      <span className="text-blue-600">{icon}</span>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    {action}
  </div>
);

// --- New Dashboard Sections ---

// 1. Quick Stats
const QuickStats: React.FC = () => {
  const stats = [
    { value: '1,204', label: 'Active Members', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { value: '82', label: 'New Posts Today', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { value: '29', label: 'Open Topics', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map(stat => (
        <Card key={stat.label}>
          <div className="flex items-center p-5">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// 2. Member Spotlight
const MemberSpotlight: React.FC = () => {
    const member = {
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Community Moderator',
        bio: '"Passionate about creating helpful and inclusive online spaces. Always here to help answer your questions!"'
    };
    return (
        <Card className="flex flex-col">
            <CardHeader title="Member of the Week" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" /></svg>} />
            <div className="p-5 text-center flex-1 flex flex-col items-center justify-center">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-100" />
                <h4 className="font-bold text-slate-800 text-lg">{member.name}</h4>
                <p className="text-sm text-blue-600 font-semibold">{member.role}</p>
                <p className="text-sm text-slate-500 mt-3 italic">{member.bio}</p>
            </div>
            <div className="p-5 mt-auto">
                 <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    View Profile
                </button>
            </div>
        </Card>
    );
};

// 3. Live Activity Feed
const LiveActivityFeed: React.FC = () => {
  const activities = [
    { user: 'Kenji Tanaka', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', action: 'commented on', topic: 'Best practices for REST API design', time: '2m ago' },
    { user: 'Samantha Lee', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', action: 'started a new topic:', topic: 'Showcase: Your latest side project', time: '15m ago' },
    { user: 'David Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', action: 'liked a post in', topic: 'Weekly watercooler thread', time: '28m ago' },
    { user: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', action: 'asked a question in', topic: 'Help: CSS Flexbox issue', time: '45m ago' },
  ];
  return (
    <Card>
      <CardHeader title="Live Activity" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} action={<a href="#" className="text-sm font-semibold text-blue-600 hover:underline">View all</a>} />
      <div className="p-5 space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="text-sm">
              <p className="text-slate-600">
                <span className="font-bold text-slate-800">{item.user}</span> {item.action} <a href="#" className="font-semibold text-blue-600 hover:underline">{item.topic}</a>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 4. Daily Poll
const InteractivePoll: React.FC = () => {
    const poll = useMemo(() => ({
        question: "What's your favorite frontend framework for new projects?",
        options: [
            { id: 'react', label: 'React', votes: 142 },
            { id: 'vue', label: 'Vue.js', votes: 68 },
            { id: 'svelte', label: 'Svelte', votes: 45 },
            { id: 'other', label: 'Something else', votes: 12 },
        ]
    }), []);

    const [voted, setVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

    const handleVote = () => {
        if (selectedOption) {
            setVoted(true);
        }
    };

    return (
        <Card>
            <CardHeader title="Daily Poll" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
            <div className="p-5">
                <p className="font-semibold text-slate-800 mb-4">{poll.question}</p>
                <div className="space-y-3">
                    {poll.options.map(option => {
                        const percentage = voted ? Math.round((option.votes / totalVotes) * 100) : 0;
                        return (
                            <div key={option.id}>
                                {voted ? (
                                    <div className="w-full">
                                        <div className="flex justify-between text-sm font-medium mb-1">
                                            <span className="text-slate-800">{option.label}</span>
                                            <span className="text-slate-500">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex items-center p-3 w-full rounded-md border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                                        <input type="radio" name="poll" value={option.id} checked={selectedOption === option.id} onChange={() => setSelectedOption(option.id)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                                        <span className="ml-3 text-sm font-medium text-slate-700">{option.label}</span>
                                    </label>
                                )}
                            </div>
                        );
                    })}
                </div>
                {!voted && (
                    <button onClick={handleVote} disabled={!selectedOption} className="mt-4 w-full px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                        Vote
                    </button>
                )}
                 {voted && (
                    <p className="text-center text-xs text-slate-500 mt-4">Total Votes: {totalVotes}</p>
                )}
            </div>
        </Card>
    );
};


// 5. Resource Hub
const ResourceHub: React.FC = () => {
  const resources = [
    { name: 'Knowledge Base', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { name: 'API Docs', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
    { name: 'Support Tickets', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg> },
    { name: 'Community Guidelines', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.752A11.959 11.959 0 0115.502 6a11.99 11.99 0 00-9-2.752z" /></svg> },
  ];
  return (
    <Card>
      <CardHeader title="Resource Hub" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
       <div className="p-5 grid grid-cols-2 gap-4">
          {resources.map(resource => (
              <a href="#" key={resource.name} className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors group">
                  <div className="h-10 w-10 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-2">
                    {resource.icon}
                  </div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-800">{resource.name}</p>
              </a>
          ))}
       </div>
    </Card>
  );
};


// --- Main Page Component ---
const HomeV1: React.FC = () => {
  return (
    <div className="bg-slate-100 min-h-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Community Dashboard</h1>
          <p className="mt-1 text-slate-600">Welcome back! Here's a snapshot of what's happening today.</p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
            <QuickStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <LiveActivityFeed />
                    <InteractivePoll />
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <MemberSpotlight />
                    <ResourceHub />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeV1;
