import React, { useState, useEffect } from 'react';
import { RoutePath, ServiceBranch, Article, EventGalleryItem, Testimonial, FAQItem } from './types';
import {
  INITIAL_ARTICLES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_EVENT_GALLERY
} from './data/cms';

// Shared Components
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { StickyMobileCta } from './components/StickyMobileCta';
import { CalendlyModal } from './components/CalendlyModal';
import { LightboxModal } from './components/LightboxModal';
import { CMSStudioModal } from './components/CMSStudioModal';

// Route Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { EventsPage } from './pages/EventsPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { PressJournalPage } from './pages/PressJournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [contactInitialBranch, setContactInitialBranch] = useState<ServiceBranch>('consulting');

  // CMS Content State (Live queries from Headless CMS with initial fallback)
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [eventGallery, setEventGallery] = useState<EventGalleryItem[]>(INITIAL_EVENT_GALLERY);

  // Modals
  const [isCalendlyOpen, setIsCalendlyOpen] = useState<boolean>(false);
  const [isCMSStudioOpen, setIsCMSStudioOpen] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<EventGalleryItem | null>(null);

  // Live query CMS data from headless endpoint
  useEffect(() => {
    const loadCmsData = async () => {
      try {
        const [artRes, testRes, faqRes, galRes] = await Promise.all([
          fetch('/api/cms/articles'),
          fetch('/api/cms/testimonials'),
          fetch('/api/cms/faqs'),
          fetch('/api/cms/gallery')
        ]);

        if (artRes.ok) {
          const artData = await artRes.json();
          if (Array.isArray(artData.articles) && artData.articles.length > 0) {
            setArticles(artData.articles);
          }
        }

        if (testRes.ok) {
          const testData = await testRes.json();
          if (Array.isArray(testData.testimonials) && testData.testimonials.length > 0) {
            setTestimonials(testData.testimonials);
          }
        }

        if (faqRes.ok) {
          const faqData = await faqRes.json();
          if (Array.isArray(faqData.faqs) && faqData.faqs.length > 0) {
            setFaqs(faqData.faqs);
          }
        }

        if (galRes.ok) {
          const galData = await galRes.json();
          if (Array.isArray(galData.gallery) && galData.gallery.length > 0) {
            setEventGallery(galData.gallery);
          }
        }
      } catch (err) {
        // Fallback gracefully to pre-bundled data
        console.info('Loaded pre-compiled static CMS dataset');
      }
    };

    loadCmsData();
  }, []);

  // Auto-sync client portrait from localStorage to permanent repository asset files
  useEffect(() => {
    try {
      const savedPortrait = localStorage.getItem('chef_adam_portrait_url');
      if (savedPortrait && savedPortrait.startsWith('data:image')) {
        fetch('/api/upload/portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: savedPortrait }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.success) {
              console.info('[Portrait Sync] Custom chef portrait persisted to public/chef-adam-yoho-bio.jpg');
            }
          })
          .catch((err) => console.warn('[Portrait Sync] Non-blocking upload deferred:', err));
      }
    } catch {
      // localStorage may be restricted or unavailable
    }
  }, []);

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

  const handleNavigate = (route: RoutePath, params?: Record<string, any>) => {
    setCurrentRoute(route);
    if (params?.branch) {
      setContactInitialBranch(params.branch as ServiceBranch);
    }
    if (route !== 'press') {
      setSelectedArticle(null);
    }
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentRoute('press');
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0c] text-[#f5f0e8] flex flex-col font-text selection:bg-[#c1651a] selection:text-[#f5f0e8] relative antialiased">
      
      {/* Shared Persistent Header Navigation */}
      <Navigation
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onOpenCMSStudio={() => setIsCMSStudioOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            articles={articles}
            featuredArticles={articles.filter(a => a.featured)}
            testimonials={testimonials}
            featuredTestimonial={testimonials.find(t => t.featured) || testimonials[0]}
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
            testimonials={testimonials}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentRoute === 'events' && (
          <EventsPage
            onNavigate={handleNavigate}
            testimonials={testimonials}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}

        {currentRoute === 'mentorship' && (
          <MentorshipPage
            onNavigate={handleNavigate}
            testimonials={testimonials}
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

        {currentRoute === 'testimonials' && (
          <TestimonialsPage
            testimonials={testimonials}
            onNavigate={handleNavigate}
          />
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
        onOpenCMSStudio={() => setIsCMSStudioOpen(true)}
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
        defaultTopic={`Culinary Advisory · ${contactInitialBranch.toUpperCase()}`}
      />

      {/* Photo Lightbox */}
      <LightboxModal
        isOpen={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        image={lightboxItem?.image || ''}
        title={lightboxItem?.title || ''}
        caption={lightboxItem?.caption}
      />

      {/* CMS Studio & Analytics Inspector */}
      <CMSStudioModal
        isOpen={isCMSStudioOpen}
        onClose={() => setIsCMSStudioOpen(false)}
        articles={articles}
        testimonials={testimonials}
        faqs={faqs}
        onUpdateArticles={setArticles}
        onUpdateTestimonials={setTestimonials}
        onUpdateFaqs={setFaqs}
      />

    </div>
  );
}
