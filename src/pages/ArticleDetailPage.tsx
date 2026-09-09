import React from 'react';
import { RoutePath, Article } from '../types';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Sparkles, ChefHat } from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  relatedArticles?: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onNavigate,
  relatedArticles = [],
  onSelectArticle
}) => {
  return (
    <div id="article-detail-view" className="pt-28 pb-24 text-[#f5f0e8] space-y-16">
      
      {/* 1. Top Breadcrumb & Metadata */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <button
          id="article-back-btn"
          onClick={onBack}
          className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] hover:text-[#f5f0e8] flex items-center space-x-2 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO JOURNAL INDEX</span>
        </button>

        <div className="space-y-6">
          <div className="flex items-center space-x-3 font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a]">
            <span>{article.category.toUpperCase()}</span>
            <span className="text-[#423e38]">·</span>
            <span className="text-[#9c9488]">{article.date}</span>
            <span className="text-[#423e38]">·</span>
            <span className="text-[#9c9488]">{article.readTime}</span>
          </div>

          <h1 className="font-display text-[32px] sm:text-[46px] md:text-[54px] tracking-[2.5px] uppercase text-[#f5f0e8] leading-[1.12]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-text text-[18px] sm:text-[22px] text-[#d4cfc4] italic leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Hero Photography & Caption */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#161514] border border-[#2a2825]">
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        {article.caption && (
          <p className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] text-center pt-3 uppercase">
            {article.caption}
          </p>
        )}
      </div>

      {/* 3. Main Editorial Body in Lora Text Serif */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Opening Excerpt */}
        <div className="p-6 bg-[#161514] border-l-2 border-[#c1651a]">
          <p className="font-text text-[18px] sm:text-[20px] text-[#f5f0e8] leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-6 font-text text-[17px] sm:text-[18px] text-[#d4cfc4] leading-[1.75]">
          {article.body.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Chef's Note Box */}
        {article.chefNotes && (
          <div className="p-8 bg-[#161514] border border-[#2a2825] space-y-3">
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
              CHEF’S PASS OBSERVATION
            </span>
            <p className="font-text text-[16px] text-[#f5f0e8] leading-relaxed italic">
              “{article.chefNotes}”
            </p>
          </div>
        )}

        {/* Recipe Ingredients & Ticket Spec (If Recipe) */}
        {article.ingredients && article.ingredients.length > 0 && (
          <div className="p-8 bg-[#131211] border border-[#2a2825] space-y-6">
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
              MISE-EN-PLACE SPECIFICATION (KITCHEN TICKET FORMAT)
            </span>
            <div className="divide-y divide-[#2a2825] font-mono-kitchen text-[12px]">
              {article.ingredients.map((ing, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-[#f5f0e8] uppercase font-mono-kitchen tracking-[1.5px]">
                      {ing.item}
                    </span>
                    {ing.provenance && (
                      <span className="text-[10px] text-[#c1651a] block sm:inline sm:ml-2">
                        [{ing.provenance}]
                      </span>
                    )}
                  </div>
                  <span className="text-[#9c9488] tracking-[1px]">{ing.spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Method Steps (If Recipe) */}
        {article.methodSteps && article.methodSteps.length > 0 && (
          <div className="space-y-6 pt-4">
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
              TECHNIQUE & EXECUTION
            </span>
            <div className="space-y-4 font-text text-[16px] text-[#d4cfc4]">
              {article.methodSteps.map((step) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <span className="font-mono-kitchen text-[12px] tracking-[1.5px] text-[#c1651a] mt-1 shrink-0">
                    STEP 0{step.step}
                  </span>
                  <p className="leading-relaxed">{step.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sourcing Cell */}
        {article.harvestProvenance && (
          <div className="p-4 bg-[#0d0d0c] border border-[#2a2825] font-mono-kitchen text-[11px] text-[#9c9488] flex items-center space-x-3">
            <span className="text-[#c1651a]">PROVENANCE:</span>
            <span>{article.harvestProvenance}</span>
          </div>
        )}

        {/* Bottom Navigation within article */}
        <div className="pt-12 border-t border-[#2a2825] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] hover:text-[#c1651a] flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ALL DISPATCHES</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-pill-transparent text-[11px] px-6 py-2"
          >
            INQUIRE WITH ATELIER
          </button>
        </div>
      </div>

      {/* 4. Related Dispatches */}
      {(relatedArticles || []).length > 0 && (
        <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-16 border-t border-[#1c1a18]">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block mb-8">
            RELATED REFLECTIONS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(relatedArticles || []).slice(0, 2).map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onSelectArticle(rel)}
                className="p-6 bg-[#161514] border border-[#2a2825] space-y-3 cursor-pointer hover:border-[#423e38] transition-colors"
              >
                <span className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#c1651a] block">
                  {rel.category.toUpperCase()} · {rel.readTime}
                </span>
                <h4 className="font-display text-[18px] tracking-[1px] uppercase text-[#f5f0e8]">
                  {rel.title}
                </h4>
                <p className="font-text text-[13px] text-[#9c9488] line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
