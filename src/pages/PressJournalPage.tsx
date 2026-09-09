import React, { useState } from 'react';
import { RoutePath, Article } from '../types';
import { Search, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

interface PressJournalPageProps {
  articles?: Article[];
  onSelectArticle: (article: Article) => void;
  onNavigate: (route: RoutePath) => void;
}

export const PressJournalPage: React.FC<PressJournalPageProps> = ({
  articles = [],
  onSelectArticle,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Essays', 'Recipes', 'Technique', 'Press'];

  const filteredArticles = (articles || []).filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="press-journal-page" className="pt-28 pb-24 text-[#f5f0e8] space-y-16 sm:space-y-24">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            THE ATELIER DISPATCHES · 1999–2026
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Press & Kitchen Journal
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Essays on thermodynamic fire control, heirloom purveyors, and recipe architecture pulled directly from twenty-five years at the stove.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-12">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono-kitchen text-[11px] tracking-[1.5px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border transition-colors ${
                  selectedCategory === cat
                    ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                    : 'border-[#2a2825] text-[#9c9488] hover:border-[#423e38]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9c9488]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays, techniques, recipes..."
              className="w-full bg-[#161514] border border-[#2a2825] pl-10 pr-4 py-2 text-xs font-text text-[#f5f0e8] placeholder-[#9c9488] focus:border-[#f5f0e8] outline-none"
            />
          </div>

        </div>
      </section>

      {/* 3. Article Grid (2-up per design system specifications) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center border border-[#2a2825] bg-[#161514] space-y-4">
            <p className="font-text text-[18px] text-[#d4cfc4]">
              No articles match the current criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-pill-transparent text-[11px] px-6 py-2"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredArticles.map((art) => (
              <article
                key={art.slug}
                id={`article-card-${art.slug}`}
                onClick={() => onSelectArticle(art)}
                className="group bg-[#0d0d0c] border border-[#2a2825] p-8 space-y-6 cursor-pointer hover:border-[#423e38] transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="aspect-[16/9] overflow-hidden bg-[#161514] border border-[#1f1d1b]">
                    <img
                      src={art.heroImage}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center space-x-3 font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488]">
                    <span className="text-[#c1651a]">{art.category.toUpperCase()}</span>
                    <span>·</span>
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h2 className="font-display text-[22px] sm:text-[26px] tracking-[1.5px] uppercase text-[#f5f0e8] leading-snug group-hover:text-[#f5f0e8]/90">
                    {art.title}
                  </h2>

                  <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1c1a18] flex items-center justify-between">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] group-hover:text-[#f5f0e8] transition-colors">
                    READ FULL DISPATCH
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#c1651a] group-hover:text-[#f5f0e8] transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
