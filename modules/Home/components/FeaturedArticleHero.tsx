
import React from 'react';
import type { Article } from '../Home.types';

const FeaturedArticleHero: React.FC<{ article: Article }> = ({ article }) => (
  <article className="group relative h-[500px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-900/20 isolate">
    <div className="absolute inset-0 overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700"></div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>

    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end translate-y-12 transition-transform duration-500 cubic-bezier(0.2, 0, 0.2, 1) group-hover:translate-y-0">
      <div className="mb-4 transform transition-all duration-500 group-hover:-translate-y-1 opacity-90 group-hover:opacity-100">
        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest shadow-lg border border-blue-500/30">
            {article.category}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-3 drop-shadow-sm group-hover:text-blue-50 transition-colors duration-300">
        {article.title}
      </h1>
      {article.subtitle && (
        <p className="text-lg text-slate-300 leading-relaxed line-clamp-2 mb-6 max-w-3xl group-hover:text-white transition-colors duration-300">
          {article.subtitle}
        </p>
      )}
      <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-2">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {article.author.charAt(0)}
            </div>
            <span>By <span className="text-white">{article.author}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>May 25, 2024</span>
          </div>
          <div className="opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide">
              Read Story
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
          </div>
      </div>
    </div>
  </article>
);

export default FeaturedArticleHero;
