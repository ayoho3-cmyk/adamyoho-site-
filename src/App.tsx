import React, { useState, useEffect } from 'react';
import { RoutePath, ServiceBranch, Article, FAQItem } from './types';
import {
  INITIAL_ARTICLES,
  INITIAL_FAQS
} from './data/cms';

// Shared Components
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { StickyMobileCta } from './components/StickyMobileCta';
import { CalendlyModal } from './components/CalendlyModal';

// Route Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { EventsPage } from './pages/EventsPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { PressJournalPage } from './pages/PressJournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

import { buildPath, pageTitle, parseLocation } from './routes';

export default function App() {
  const [initialLocation] = useState(() => parseLocation(window.location.pathname, window.location.search));
  const [homeTitle] = useState(() => document.title);
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(initialLocation.route);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    () => INITIAL_ARTICLES.find((a) => a.slug === initialLocation.articleSlug) || null
  );
  const [contactInitialBranch, setContactInitialBranch] = useState<ServiceBranch>(initialLocation.branch || 'consulting');

  // CMS Content State (Live queries from Headless CMS with initial fallback)
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);

  // Modals
  const [isCalendlyOpen, setIsCalendlyOpen] = useState<boolean>(false);

  // Live query CMS data from headless endpoint
  useEffect(() => {
    const loadCmsData = async () => {
      try {
        const [artRes, faqRes] = await Promise.all([
          fetch('/api/cms/articles'),
          fetch('/api/cms/faqs')
        ]);

        if (artRes.ok) {
          const artData = await artRes.json();
          if (Array.isArray(artData.articles) && artData.articles.length > 0) {
            setArticles(artData.articles);
          }
        }

        if (faqRes.ok) {
          const faqData = await faqRes.json();
          if (Array.isArray(faqData.faqs) && faqData.faqs.length > 0) {
            setFaqs(faqData.faqs);
          }
        }

      } catch (err) {
        // Fallback gracefully to pre-bundled data
        console.info('Loaded pre-compiled static CMS dataset');
      }
    };

    loadCmsData();
  }, []);

  // Back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const next = parseLocation(window.location.pathname, window.location.search);
      setCurrentRoute(next.route);
      setSelectedArticle(INITIAL_ARTICLES.find((a) => a.slug === next.articleSlug) || null);
      if (next.branch) setContactInitialBranch(next.branch);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep the tab title and search tags in step with the current page
  useEffect(() => {
    document.title = pageTitle(currentRoute, selectedArticle?.title, homeTitle);
    const canonicalUrl = `https://adamyoho.com${buildPath(currentRoute, selectedArticle?.slug)}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  }, [currentRoute, selectedArticle, homeTitle]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedArticle]);

  // Track page view analytics
  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        page: currentRoute,
        metadata: {
          article: selectedArticle ? selectedArticle.slug : undefined,
          timestamp: new Date().toISOString()
        }
      })
    }).catch(() => {});
  }, [currentRoute, selectedArticle]);

  const pushPath = (path: string) => {
    if (path !== window.location.pathname + window.location.search) {
      window.history.pushState(null, '', path);
    }
  };

  const handleNavigate = (route: RoutePath, params?: Record<string, any>) => {
    setCurrentRoute(route);
    if (params?.branch) {
      setContactInitialBranch(params.branch as ServiceBranch);
    }
    setSelectedArticle(null);
    pushPath(buildPath(route, null, params?.branch));
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentRoute('press');
    pushPath(buildPath('press', article.slug));
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
    pushPath(buildPath('press'));
  };

  const callRequestBranch: ServiceBranch =
    currentRoute === 'consulting' || currentRoute === 'events' || currentRoute === 'mentorship'
      ? currentRoute
      : currentRoute === 'contact'
      ? contactInitialBranch
      : 'general';

  return (
    <div className="min-h-screen bg-[#0d0d0c] text-[#f5f0e8] flex flex-col font-text selection:bg-[#c1651a] selection:text-[#f5f0e8] relative antialiased">
      
      {/* Shared Persistent Header Navigation */}
      <Navigation
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            articles={articles}
            featuredArticles={articles.filter(a => a.featured)}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentRoute === 'consulting' && (
          <ConsultingPage
            onNavigate={handleNavigate}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentRoute === 'events' && (
          <EventsPage
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'mentorship' && (
          <MentorshipPage
            onNavigate={handleNavigate}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentRoute === 'press' && (
          selectedArticle ? (
            <ArticleDetailPage
              article={selectedArticle}
              onBack={handleBackToArticles}
              onNavigate={handleNavigate}
              relatedArticles={articles.filter(a => a.slug !== selectedArticle.slug)}
              onSelectArticle={handleSelectArticle}
            />
          ) : (
            <PressJournalPage
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onNavigate={handleNavigate}
            />
          )
        )}

        {currentRoute === 'faq' && (
          <FAQPage
            faqs={faqs}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            initialBranch={contactInitialBranch}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Shared Footer with Newsletter & Quick Nav */}
      <Footer
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
      />

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCta
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
      />

      {/* Calendly Booking Modal Embed */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        serviceBranch={callRequestBranch}
      />

    </div>
  );
}
