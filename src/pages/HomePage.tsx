import React from 'react';
import { RoutePath, Article, Testimonial } from '../types';
import { ArrowRight } from 'lucide-react';
import kitchenPassHero from '../assets/images/kitchen_pass_hero.jpg';
import bespokeEventsDinner from '../assets/images/bespoke_events_dinner.jpg';

interface HomePageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  articles?: Article[];
  featuredArticles?: Article[];
  testimonials?: Testimonial[];
  featuredTestimonial?: Testimonial;
  onOpenCalendly?: () => void;
  onSelectArticle: (article: Article) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  articles = [],
  featuredArticles,
  onOpenCalendly = () => {},
  onSelectArticle
}) => {
  const displayArticles = (featuredArticles && featuredArticles.length > 0)
    ? featuredArticles
    : (articles && articles.length > 0)
    ? articles
    : [];

  return (
    <div id="homepage-container" className="space-y-0 text-[#f5f0e8]">
      
      {/* 1. HERO PHOTO BAND WITH PARALLAX RESTING BACKGROUND */}
      <section
        id="hero-photo-band"
        className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-20 px-6 sm:px-12 md:px-20 overflow-hidden"
      >
        {/* Background Culinary Photography with Linear Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={kitchenPassHero}
            alt="Chef Adam Yoho kitchen line and hearth pass with suspended shelving and warm Edison filament lighting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-60 contrast-115 transition-transform duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/60 to-[#0d0d0c]/30" />
          <div className="absolute inset-0 culinary-grain pointer-events-none" />
        </div>

        {/* Top Spacer */}
        <div className="relative z-10" />

        {/* Hero Central Headline & Restraint */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-12 pb-8">
          <span className="font-mono-kitchen text-[11px] sm:text-[13px] tracking-[3px] text-[#c1651a] uppercase block">
            TEXAS HILL COUNTRY · AUSTIN · PITTSBURGH · COLUMBUS
          </span>

          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[68px] lg:text-[76px] tracking-[3px] sm:tracking-[4px] uppercase text-[#f5f0e8] leading-[1.08]">
            Twenty-Four Years at the Pass.
          </h1>

          <p className="font-text text-[16px] sm:text-[20px] text-[#d4cfc4] max-w-2xl mx-auto leading-relaxed">
            Culinary consulting for hospitality groups, bespoke private dining experiences, and master mentorship for the next generation of chefs.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-inquire-btn"
              onClick={() => onNavigate('contact')}
              className="btn-pill-transparent text-[13px] px-9 py-3"
            >
              INQUIRE / DISCUSS AN ENGAGEMENT
            </button>
            <button
              id="hero-explore-services-btn"
              onClick={() => onNavigate('consulting')}
              className="font-mono-kitchen text-[12px] tracking-[2px] text-[#9c9488] hover:text-[#f5f0e8] transition-colors py-2 px-4"
            >
              EXPLORE SERVICES →
            </button>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="relative z-10" />
      </section>

      {/* 2. PHILOSOPHY & RESTRAINT BLURB (Generous 120px whitespace pacing) */}
      <section id="philosophy-section" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto text-center space-y-8">
        <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#9c9488] uppercase block">
          RULES OF THE KITCHEN
        </span>
        <blockquote className="font-display text-[24px] sm:text-[34px] md:text-[40px] tracking-[2px] uppercase text-[#f5f0e8] leading-[1.25]">
          “Over 23 years behind the line teaches you one enduring truth: you do not force greatness, its achieved through patience, resilience, dedicated technique, and well oiled teamwork.”
        </blockquote>
        <div className="w-12 h-[1px] bg-[#c1651a] mx-auto" />
        <p className="font-text text-[16px] sm:text-[18px] text-[#d4cfc4] leading-relaxed max-w-2xl mx-auto">
          From pizza shops to high end steakhouse, taquerias to bistros, and eight restaurant openings including owning Uptown 51, Chef Adam Yoho works at the intersection of operational ergonomics, recipe architecture, and station consistency.
        </p>
        <div className="pt-2">
          <button
            id="home-read-biography-btn"
            onClick={() => onNavigate('about')}
            className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] hover:text-[#f5f0e8] transition-colors"
          >
            READ THE 24-YEAR RETROSPECTIVE →
          </button>
        </div>
      </section>

      {/* 3. THREE SERVICE CARDS (Consulting, Events, Mentorship) */}
      <section id="services-summary-section" className="py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1c1a18]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] block mb-2">
              CORE PRACTICE AREAS
            </span>
            <h2 className="font-display text-[32px] sm:text-[44px] tracking-[2.5px] uppercase text-[#f5f0e8]">
              Three Pillars of Craft
            </h2>
          </div>
          <p className="font-text text-[15px] text-[#9c9488] max-w-md">
            Each discipline represents an independent engagement model with tailored deliverables, kitchen oversight, and measurable culinary outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Consulting */}
          <div
            id="card-service-consulting"
            onClick={() => onNavigate('consulting')}
            className="group bg-[#0d0d0c] border border-[#2a2825] p-8 flex flex-col justify-between cursor-pointer hover:border-[#423e38] transition-all"
          >
            <div className="space-y-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#161514] border border-[#1f1d1b]">
                <img
                  src="/culinary-knives-roll.jpg"
                  alt="Culinary Consulting & Kitchen Line Design"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block">
                01 · HOSPITALITY ADVISORY
              </span>
              <h3 className="font-display text-[24px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                Culinary Consulting
              </h3>
              <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                Kitchen line design, concept development, station timing optimization, and operating cost engineering for hospitality operators.
              </p>
            </div>
            <div className="pt-8 border-t border-[#1c1a18] mt-6 flex items-center justify-between">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] group-hover:text-[#c1651a] transition-colors">
                EXPLORE CONSULTING
              </span>
              <ArrowRight className="w-4 h-4 text-[#9c9488] group-hover:text-[#c1651a] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Events */}
          <div
            id="card-service-events"
            onClick={() => onNavigate('events')}
            className="group bg-[#0d0d0c] border border-[#2a2825] p-8 flex flex-col justify-between cursor-pointer hover:border-[#423e38] transition-all"
          >
            <div className="space-y-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#161514] border border-[#1f1d1b]">
                <img
                  src={bespokeEventsDinner}
                  alt="Bespoke Events candlelit private dining table gathering at twilight"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block">
                02 · PRIVATE DINING
              </span>
              <h3 className="font-display text-[24px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                Bespoke Events
              </h3>
              <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                Custom multi-course dining experiences and intimate culinary events.
              </p>
            </div>
            <div className="pt-8 border-t border-[#1c1a18] mt-6 flex items-center justify-between">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] group-hover:text-[#c1651a] transition-colors">
                EXPLORE EVENTS
              </span>
              <ArrowRight className="w-4 h-4 text-[#9c9488] group-hover:text-[#c1651a] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Mentorship */}
          <div
            id="card-service-mentorship"
            onClick={() => onNavigate('mentorship')}
            className="group bg-[#0d0d0c] border border-[#2a2825] p-8 flex flex-col justify-between cursor-pointer hover:border-[#423e38] transition-all"
          >
            <div className="space-y-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#161514] border border-[#1f1d1b]">
                <img
                  src="/mentorship-pans.jpg"
                  alt="Chef Mentorship and Kitchen Line Craft"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block">
                03 · MASTER LINE COACHING
              </span>
              <h3 className="font-display text-[24px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                Chef Mentorship
              </h3>
              <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                Rigorous 1-on-1 coaching for working sous chefs, culinary entrepreneurs, and line leaders preparing to take the pass.
              </p>
            </div>
            <div className="pt-8 border-t border-[#1c1a18] mt-6 flex items-center justify-between">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] group-hover:text-[#c1651a] transition-colors">
                EXPLORE MENTORSHIP
              </span>
              <ArrowRight className="w-4 h-4 text-[#9c9488] group-hover:text-[#c1651a] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. JOURNAL TEASER PREVIEW */}
      <section id="journal-teaser-section" className="py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 space-y-3 md:space-y-0">
          <div>
            <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] block mb-1">
              THE KITCHEN NOTEBOOK
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] tracking-[2px] uppercase text-[#f5f0e8]">
              Recent Dispatches
            </h2>
          </div>
          <button
            id="view-all-journal-btn"
            onClick={() => onNavigate('press')}
            className="font-mono-kitchen text-[12px] tracking-[2px] text-[#9c9488] hover:text-[#f5f0e8] transition-colors"
          >
            VIEW ALL DISPATCHES →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(displayArticles || []).slice(0, 2).map((art) => (
            <div
              key={art.slug}
              id={`home-article-card-${art.slug}`}
              onClick={() => onSelectArticle(art)}
              className="group bg-[#0d0d0c] border border-[#2a2825] p-6 space-y-4 cursor-pointer hover:border-[#423e38] transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#161514]">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  loading="lazy"
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
              <h3 className="font-display text-[20px] sm:text-[22px] tracking-[1.5px] uppercase text-[#f5f0e8] group-hover:text-[#f5f0e8]/90">
                {art.title}
              </h3>
              <p className="font-text text-[14px] text-[#d4cfc4] line-clamp-2">
                {art.excerpt}
              </p>
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] inline-block pt-2">
                READ ARTICLE →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLOSING CTA BAND */}
      <section
        id="cta-band-photo"
        className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-20 text-center overflow-hidden border-t border-[#2a2825] bg-[#121110]"
      >
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            THE PASS IS OPEN
          </span>
          <h2 className="font-display text-[32px] sm:text-[46px] md:text-[54px] tracking-[3px] uppercase text-[#f5f0e8] leading-tight">
            Reserve Your Season at the Stove.
          </h2>
          <p className="font-text text-[16px] sm:text-[18px] text-[#d4cfc4] leading-relaxed">
            Whether scoping a restaurant pre-opening, commissioning an intimate private dining experience, or applying for 1-on-1 line mentorship, the conversation begins here.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-band-inquire-btn"
              onClick={() => onNavigate('contact')}
              className="btn-pill-transparent text-[13px] px-9 py-3"
            >
              INITIATE INQUIRY
            </button>
            <button
              id="cta-band-calendly-btn"
              onClick={onOpenCalendly}
              className="font-mono-kitchen text-[12px] tracking-[2px] text-[#f5f0e8] border border-[#423e38] px-6 py-3 hover:border-[#f5f0e8] transition-colors"
            >
              BOOK 20-MIN INTRO CALL
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

