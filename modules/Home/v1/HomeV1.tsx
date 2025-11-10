import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';

// Data for the product cards in the carousel
const CARDS_DATA = [
  {
    title: 'Phone',
    imageUrl: 'https://images.unsplash.com/photo-1598550463109-a5b82a022137?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Whiteboard',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Webinars',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Docs',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Contact Center',
    imageUrl: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Team Chat',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop',
  }
];

// Reusable component for the product cards
const ProductCard: React.FC<{ card: typeof CARDS_DATA[0] & { icon: React.ReactNode } }> = ({ card }) => (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl shadow-blue-900/30 transform hover:scale-105 transition-transform duration-300">
        <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
            {card.icon}
            <span>{card.title}</span>
        </div>
    </div>
);

// Main component for the new HomeV1 layout
const HomeV1: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScrollUpdate = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollLeft = el.scrollLeft;
            const scrollWidth = el.scrollWidth;
            const clientWidth = el.clientWidth;
            
            // Check scrollability
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for precision
            
            // Update active index
            const cardWidth = el.children[0]?.clientWidth || 0;
            const gap = 24;
            const itemWidth = cardWidth + gap;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setActiveIndex(newIndex);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        el?.addEventListener('scroll', handleScrollUpdate);
        // Initial check
        handleScrollUpdate();
        return () => el?.removeEventListener('scroll', handleScrollUpdate);
    }, [handleScrollUpdate]);

    const handleNavClick = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
            const gap = 24; // Corresponds to gap-6
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const scrollToIndex = (index: number) => {
         if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
            const gap = 24;
            const scrollPosition = (cardWidth + gap) * index;
            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    };
    
    // Using useMemo to prevent re-creating icons on every render
    const cardIcons = useMemo(() => ({
        Phone: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        Whiteboard: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        Webinars: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        Docs: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        'Contact Center': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        'Team Chat': (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    }), []);

    const cardsWithIcons = useMemo(() => CARDS_DATA.map(card => ({...card, icon: cardIcons[card.title as keyof typeof cardIcons]})), [cardIcons]);

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1E2A7A] to-[#0A103D] text-white text-center py-20 sm:py-28 px-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
                    Find out what's possible when work connects
                </h1>
                <p className="mt-6 text-lg text-blue-200 max-w-2xl mx-auto">
                    Whether you're chatting with teammates or supporting customers, our platform makes it easier to connect, collaborate, and reach goals.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-full text-base font-semibold transition-all hover:bg-slate-800 active:scale-[0.98]">
                        Explore products
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 bg-white text-slate-900 rounded-full text-base font-semibold transition-all hover:bg-slate-200 active:scale-[0.98]">
                        Find your plan
                    </button>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="bg-white relative py-16 sm:py-20">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 pb-8 scrollbar-hide"
                >
                    {cardsWithIcons.map((card, index) => (
                        <div key={index} className="snap-start">
                            <ProductCard card={card} />
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-center items-center gap-8">
                    {/* Left Arrow */}
                    <button 
                        onClick={() => handleNavClick('left')} 
                        disabled={!canScrollLeft}
                        className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    
                    {/* Pagination Dots */}
                    <div className="flex items-center gap-2">
                        {CARDS_DATA.map((_, index) => (
                             <button 
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === index ? 'bg-slate-800' : 'bg-slate-300 hover:bg-slate-400'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                     <button 
                        onClick={() => handleNavClick('right')} 
                        disabled={!canScrollRight}
                        className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next slide"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeV1;
