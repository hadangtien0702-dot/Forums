
import React from 'react';
import type { Article } from '../Home.types';

const getCategoryImage = (category: string) => {
    const images: Record<string, string> = {
        'auto': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop',
        'audio': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
        'gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
        'mobile': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
        'tech': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        'default': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop'
    };
    return images[category.toLowerCase()] || images['default'];
};

const LatestArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
       <img 
         src={getCategoryImage(article.category)} 
         alt={article.title}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
       />
       <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">
            {article.category}
          </span>
       </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
        {article.title}
      </h2>
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded-full bg-slate-200 flex-shrink-0"></div>
             <span>{article.author}</span>
        </div>
        <span>{article.date}</span>
      </div>
    </div>
  </article>
);

export default LatestArticleCard;
