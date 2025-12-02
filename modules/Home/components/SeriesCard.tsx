
import React from 'react';
import type { Series } from '../Home.types';

const SeriesCard: React.FC<{ series: Series }> = ({ series }) => {
    const gradients: Record<string, string> = {
        blue: 'to-blue-900/90',
        emerald: 'to-emerald-900/90',
        purple: 'to-purple-900/90',
    };

    const gradientClass = gradients[series.color] || 'to-slate-900/90';

    return (
        <div className="group relative h-80 rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
                src={series.image} 
                alt={series.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 ${gradientClass} mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {series.count} Lessons
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Exclusive Series</p>
                    <h3 className="text-2xl font-extrabold text-white leading-tight mb-1">{series.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100">{series.subtitle}</p>
                    
                    <button className="flex items-center gap-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0 hover:text-blue-300">
                        Start Learning
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeriesCard;
