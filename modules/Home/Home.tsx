
'use client';

import React, { useRef } from 'react';
import { 
  topSalesMembers, 
  featuredArticle, 
  latestArticles, 
  popularPosts, 
  topics, 
  videos, 
  discussions, 
  curatedSeries 
} from './Home.data';
import SalesHonorCard from './components/SalesHonorCard';
import FeaturedArticleHero from './components/FeaturedArticleHero';
import LatestArticleCard from './components/LatestArticleCard';
import CommunitySidebar from './components/CommunitySidebar';
import SeriesCard from './components/SeriesCard';
import VideoHub from './components/VideoHub';

/**
 * Standard Home Module
 * 
 * NOTE: The 'v1', 'v2', and 'v3' directories within modules/Home 
 * are now obsolete and can be safely deleted to clean up the codebase.
 * This file serves as the single source of truth for the Home page.
 */

export default function HomePage() {
  const storiesScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const container = ref.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section 1: Top Sales Performers Carousel */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Top Sales Performers</h2>
                <p className="text-slate-500 text-sm mt-1">Recognizing excellence this month</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleScroll(storiesScrollRef, 'left')} aria-label="Scroll left" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => handleScroll(storiesScrollRef, 'right')} aria-label="Scroll right" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          
          {/* Scroll Snap Container */}
          <div ref={storiesScrollRef} className="flex gap-6 items-stretch overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8 -mx-4 px-4">
            {topSalesMembers.map((member) => <SalesHonorCard key={member.id} member={member} />)}
          </div>
        </section>

        {/* Section 2: Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <FeaturedArticleHero article={featuredArticle} />
            
            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                     <h3 className="text-2xl font-bold text-slate-800">Latest Articles</h3>
                     <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">View all</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestArticles.map((article, index) => (
                    <LatestArticleCard key={index} article={article} />
                  ))}
                </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <CommunitySidebar 
            discussions={discussions} 
            popularPosts={popularPosts} 
            topics={topics} 
          />
        </section>

        {/* Section 3: Curated Series */}
        <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Knowledge Series</h2>
                    <p className="text-slate-500 text-sm mt-1">Deep dive into curated topics</p>
                </div>
                <a href="#" className="hidden sm:block text-sm font-semibold text-blue-600 hover:underline">View all collections</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {curatedSeries.map((series, index) => (
                    <SeriesCard key={index} series={series} />
                ))}
            </div>
        </section>
        
        {/* Section 4: Video Hub */}
        <VideoHub videos={videos} />
      </div>
    </div>
  );
}
