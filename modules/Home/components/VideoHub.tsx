
import React from 'react';
import type { VideoSectionData, Video } from '../Home.types';

const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
  <div className="group cursor-pointer h-full flex flex-col">
    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 shadow-2xl shadow-black/30 ring-1 ring-white/10">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-md border border-white/10">12:45</div>
    </div>
    <div className="mt-5 px-2">
      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">{video.title}</h3>
      <p className="text-sm text-slate-400 mt-3 leading-relaxed line-clamp-2">{video.description}</p>
    </div>
  </div>
);

const VideoPlaylistItem: React.FC<{ video: Video }> = ({ video }) => (
  <a href="#" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/5">
    <div className="flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden bg-slate-800 relative shadow-md">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">{video.title}</p>
      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors"></span>
        {video.duration}
      </p>
    </div>
  </a>
);

const VideoHub: React.FC<{ videos: VideoSectionData }> = ({ videos }) => {
    return (
        <section className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 isolate">
            <div className="absolute inset-0 bg-slate-950">
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black opacity-90"></div>
            </div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-custom"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] mix-blend-screen"></div>
            
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 text-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">Video Hub</h3>
                        <p className="text-slate-300 mt-2 max-w-lg text-lg">Curated video content to help you grow, learn, and stay inspired.</p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:scale-105 backdrop-blur-md active:scale-95">
                        Browse All Videos
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-full">
                        <div className="h-full bg-slate-800/50 rounded-2xl p-2 border border-white/5 shadow-xl backdrop-blur-sm">
                           <VideoCard video={videos.featured} />
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col h-full">
                        <h4 className="font-bold text-slate-200 mb-4 flex items-center gap-2 text-lg">
                            <span className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            Up Next
                        </h4>
                        <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                          {videos.playlist.map((video, index) => (
                              <VideoPlaylistItem key={index} video={video} />
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VideoHub;
