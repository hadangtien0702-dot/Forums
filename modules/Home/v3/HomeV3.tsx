import React, { memo } from 'react';
import { 
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { navItems, teams, projects } from './data';

// --- Reusable Components ---

const StatusIndicator: React.FC<{ status: 'success' | 'pending' | 'failed' }> = ({ status }) => {
    const color = {
        success: 'bg-green-400',
        pending: 'bg-gray-400',
        failed: 'bg-red-500',
    }[status];
    return <div className={`w-2 h-2 rounded-full ${color}`}></div>;
};

const NavItem: React.FC<{ item: typeof navItems[0] }> = memo(({ item }) => (
    <li>
        <a href="#" className={`flex items-center gap-3 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 ${item.active ? 'bg-white/10 text-white font-semibold' : 'text-slate-300 hover:bg-white/5'}`}>
            <item.icon className="h-5 w-5 flex-shrink-0 text-slate-400" />
            <span>{item.name}</span>
        </a>
    </li>
));

const TeamItem: React.FC<{ team: typeof teams[0] }> = memo(({ team }) => (
    <li>
        <a href="#" className="flex items-center gap-3 px-2 py-1.5 text-sm rounded-md text-slate-300 hover:bg-white/5 transition-colors duration-150">
            <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${team.color}`}>{team.initial}</span>
            <span>{team.name}</span>
        </a>
    </li>
));

const ProjectListItem: React.FC<{ project: typeof projects[0] }> = memo(({ project }) => (
    <li className="flex items-center gap-3 text-sm p-2 -mx-2 rounded-md hover:bg-white/5 transition-colors duration-150">
        <StatusIndicator status={project.status as any} />
        <span className="text-slate-300 truncate">{project.team} <span className="text-slate-500">/</span> <span className="font-semibold text-white">{project.name}</span></span>
        <span className="text-slate-400 flex-1 text-right text-xs truncate">{project.source} &middot; {project.time}</span>
    </li>
));


// --- Major Layout Sections ---

const HeroSection: React.FC = memo(() => (
    <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "30px 30px" }}>
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true"></div>
        <div className="z-10">
            <div className="w-12 h-12 flex items-center justify-center mb-8">
               <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white h-8">
                   <path d="M21.9999 35.1538C15.9333 35.1538 11.2307 38.3077 8.07686 41.4615C13.4615 42.5384 18.8461 44 21.9999 44C25.1538 44 30.5384 42.5384 35.923 41.4615C32.7692 38.3077 28.0666 35.1538 21.9999 35.1538Z" fill="currentColor" fillOpacity="0.5"></path>
                   <path d="M21.9999 8.84615C28.0666 8.84615 32.7692 5.69231 35.923 2.53846C30.5384 1.46154 25.1538 0 21.9999 0C18.8461 0 13.4615 1.46154 8.07686 2.53846C11.2307 5.69231 15.9333 8.84615 21.9999 8.84615Z" fill="currentColor"></path>
                </svg>
            </div>
            <a href="#" className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 mb-6 group transition-colors hover:border-white/20">
                <span className="text-sm font-semibold text-indigo-300">What's new</span>
                <span className="text-sm text-slate-400">Just shipped v1.0</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Deploy to the cloud with confidence</h1>
            <p className="mt-6 text-lg text-slate-300 max-w-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button className="px-6 py-3 bg-indigo-500 rounded-md font-semibold hover:bg-indigo-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                    Get started
                </button>
                <a href="#" className="font-semibold flex items-center gap-1 group">
                    Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
            </div>
        </div>
    </div>
));

const DashboardSidebar: React.FC = memo(() => (
     <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-slate-700/50 p-4 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white h-6">
                       <path d="M21.9999 35.1538C15.9333 35.1538 11.2307 38.3077 8.07686 41.4615C13.4615 42.5384 18.8461 44 21.9999 44C25.1538 44 30.5384 42.5384 35.923 41.4615C32.7692 38.3077 28.0666 35.1538 21.9999 35.1538Z" fill="currentColor" fillOpacity="0.5"></path>
                       <path d="M21.9999 8.84615C28.0666 8.84615 32.7692 5.69231 35.923 2.53846C30.5384 1.46154 25.1538 0 21.9999 0C18.8461 0 13.4615 1.46154 8.07686 2.53846C11.2307 5.69231 15.9333 8.84615 21.9999 8.84615Z" fill="currentColor"></path>
                    </svg>
                </div>
                <button className="text-slate-400 hover:text-white" aria-label="More options">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
            </div>
            <nav className="space-y-4">
                <div>
                    <h3 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">Navigation</h3>
                    <ul className="mt-2 space-y-1">
                        {navItems.map(item => <NavItem key={item.name} item={item} />)}
                    </ul>
                </div>
                <div>
                    <h3 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">Your teams</h3>
                    <ul className="mt-2 space-y-1">
                       {teams.map(team => <TeamItem key={team.name} team={team} />)}
                    </ul>
                </div>
            </nav>
        </div>
        <div className="mt-4">
             <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-150">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Benjamin Button" className="w-8 h-8 rounded-full" />
                <div>
                    <p className="text-sm font-semibold text-white">Benjamin Button <span className="text-blue-400">✓</span></p>
                    <p className="text-xs text-slate-400">benjbutt</p>
                </div>
            </a>
        </div>
    </div>
));

const DashboardContent: React.FC = memo(() => (
    <div className="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6 flex flex-col">
        <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input type="search" placeholder="Search projects..." className="w-full bg-slate-700/50 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide -mr-2 pr-2">
            <h3 className="text-sm font-semibold mb-3 px-2">All projects</h3>
             <ul className="space-y-1">
                {projects.map((project, index) => <ProjectListItem key={index} project={project} />)}
            </ul>
        </div>
    </div>
));


// --- Main Exported Component ---

const HomeV3: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full bg-slate-900 text-white">
            <HeroSection />

            <div className="bg-slate-800 rounded-xl lg:rounded-l-2xl lg:rounded-r-none m-4 lg:m-0 lg:my-4 flex flex-col">
                <div className="flex-1 flex flex-col md:flex-row min-h-0">
                    <DashboardSidebar />
                    <DashboardContent />
                </div>
            </div>
        </div>
    );
};

export default HomeV3;
