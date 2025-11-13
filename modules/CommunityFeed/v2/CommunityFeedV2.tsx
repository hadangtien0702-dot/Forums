
import React, { useState } from 'react';

// --- MOCK DATA ---
const initialThreadsData = [
  {
    id: 1,
    author: { name: 'Elisabeth May', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3' },
    timestamp: '6h ago',
    title: 'Critique Session for Project 1',
    content: 'Hi everyone, I\'ve uploaded my initial wireframes for Project 1. I\'m looking for feedback on the user flow and overall layout before I move to high-fidelity mockups. Any thoughts would be appreciated!',
    tags: ['Design Critique', 'UI/UX'],
    responders: [
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&h=64&fit=crop'
    ],
    responderCount: 11,
    bookmarked: false,
  },
  {
    id: 2,
    author: { name: 'Sophia Carter', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3' },
    timestamp: '3d ago',
    title: 'Resources for Color Theory',
    content: 'Hi Designers, for those asking about color theory, I\'ve compiled a list of great resources including books, websites, and tools to help you master color in your projects. Please find the link in the resources channel. Let me know if you have any questions!',
    tags: ['Resources', 'Design Theory'],
    responders: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&h=64&fit=crop'
    ],
    responderCount: 3,
    bookmarked: true,
  }
];

const facilitatorData = {
  name: 'Sophia Carter',
  avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=256&h=256&fit=crop&ixlib=rb-4.0.3',
  phone: '+1 (555) 123-4567',
  email: 'sophia.carter@design.edu'
};

const attendeesData = [
  { id: 1, name: 'Leslie Alexander', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&h=128&fit=crop' },
  { id: 2, name: 'Darlene Robertson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&h=128&fit=crop' },
  { id: 3, name: 'Albert Flores', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=128&h=128&fit=crop' },
  { id: 4, name: 'Jane Cooper', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=128&h=128&fit=crop' },
  { id: 5, name: 'Brooklyn Simmons', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&h=128&fit=crop' },
  { id: 6, name: 'Annette Black', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=128&h=128&fit=crop' },
  { id: 7, name: 'Cameron Williamson', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=128&h=128&fit=crop' },
  { id: 8, name: 'Jenny Wilson', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=128&h=128&fit=crop' },
];


// --- SVG ICONS ---
const PlusIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const BookmarkIcon: React.FC<{ filled?: boolean }> = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;
const PhoneIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const EmailIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;


// --- UI COMPONENTS ---

const NewThreadInput: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    
    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
            <input 
                type="text" 
                placeholder="Add a new thread..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                className="w-full bg-slate-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button onClick={handleAdd} className="flex-shrink-0 w-11 h-11 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors active:scale-95">
                <PlusIcon />
            </button>
        </div>
    );
};

const ThreadCard: React.FC<{ thread: any; onBookmark: (id: number) => void }> = ({ thread, onBookmark }) => {
    const Tag: React.FC<{ label: string }> = ({ label }) => {
        const colors: { [key: string]: string } = {
            'Design Critique': 'bg-purple-100 text-purple-700',
            'UI/UX': 'bg-cyan-100 text-cyan-700',
            'Resources': 'bg-green-100 text-green-700',
            'Design Theory': 'bg-pink-100 text-pink-700'
        };
        const colorClass = colors[label] || 'bg-slate-100 text-slate-700';

        return (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
                {label}
            </span>
        );
    };
    
    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/70 p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img src={thread.author.avatar} alt={thread.author.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <p className="font-bold text-slate-800">{thread.author.name}</p>
                        <p className="text-xs text-slate-500">{thread.timestamp}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {thread.tags.map(tag => <Tag key={tag} label={tag} />)}
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-extrabold text-slate-900">{thread.title}</h2>
                <p className="mt-2 text-slate-600 leading-relaxed">{thread.content}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={() => onBookmark(thread.id)} className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors ${thread.bookmarked ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        <BookmarkIcon filled={thread.bookmarked} />
                    </button>
                    <button className="ml-2 px-5 py-2 flex items-center gap-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                        <span>Add Response</span>
                    </button>
                </div>
                <div className="flex items-center">
                    {thread.responders.map((avatar, i) => (
                        <img 
                            key={i}
                            src={avatar}
                            alt={`responder ${i+1}`}
                            className={`w-8 h-8 rounded-full object-cover border-2 border-white ${i > 0 ? '-ml-3' : ''}`}
                        />
                    ))}
                    {thread.responderCount > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center border-2 border-white -ml-3">
                            +{thread.responderCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GroupInfo: React.FC = () => (
    <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800">Design Fundamentals</h2>
        <p className="text-sm text-slate-500 mt-1">Study Group: DES101</p>
        <img src={facilitatorData.avatar} alt={facilitatorData.name} className="w-28 h-28 rounded-full object-cover mx-auto mt-6 border-4 border-white shadow-md" />
        <h3 className="text-2xl font-bold text-slate-900 mt-4">{facilitatorData.name}</h3>
        <div className="mt-2 inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 font-semibold px-3 py-1 rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            Group Facilitator
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mt-6 space-y-3 text-left shadow-inner-soft">
             <div className="flex items-center gap-3 text-slate-600">
                <PhoneIcon />
                <span className="font-medium">{facilitatorData.phone}</span>
            </div>
             <div className="flex items-center gap-3 text-slate-600">
                <EmailIcon />
                <span className="font-medium">{facilitatorData.email}</span>
            </div>
        </div>
    </div>
);

const AttendeesList: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mt-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h4 className="font-bold text-slate-800">{attendeesData.length} Members</h4>
                <ChevronUpIcon className={`transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 space-y-4">
                    {attendeesData.map(attendee => (
                        <div key={attendee.id} className="flex items-center gap-3">
                            <img src={attendee.avatar} alt={attendee.name} className="w-9 h-9 rounded-full object-cover" />
                            <p className="font-semibold text-slate-700">{attendee.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- MAIN COMPONENT ---
const CommunityFeedV2: React.FC = () => {
    const [threads, setThreads] = useState(initialThreadsData);

    const handleAddThread = (title: string) => {
        const newThread = {
            id: Date.now(),
            author: { name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop' },
            timestamp: 'Just now',
            title,
            content: 'Just created this thread. Looking forward to the discussion!',
            tags: ['New', 'Discussion'],
            responders: [],
            responderCount: 0,
            bookmarked: false,
        };
        setThreads(prev => [newThread, ...prev]);
    };

    const handleBookmark = (id: number) => {
        setThreads(threads.map(t => t.id === id ? { ...t, bookmarked: !t.bookmarked } : t));
    };

    return (
    <div className="bg-slate-50/70">
       <style>{`
            .shadow-inner-soft {
                box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
            }
        `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            <NewThreadInput onAdd={handleAddThread} />
            {threads.map(thread => <ThreadCard key={thread.id} thread={thread} onBookmark={handleBookmark} />)}
        </div>
        
        {/* Right Column */}
        <aside className="lg:col-span-1 sticky top-6">
            <div className="bg-gradient-to-b from-purple-100/60 to-pink-100/60 rounded-2xl p-6">
                <GroupInfo />
                <AttendeesList />
            </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityFeedV2;