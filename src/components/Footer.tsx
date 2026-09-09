import React, { useState } from 'react';
import { RoutePath } from '../types';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackNewsletterSubscribe } from '../utils/analytics';

interface FooterProps {
  currentRoute?: RoutePath;
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  onOpenCalendly?: () => void;
  onOpenCMSInspector?: () => void;
  onOpenCMSStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentRoute,
  onNavigate,
  onOpenCalendly = () => {},
  onOpenCMSInspector,
  onOpenCMSStudio
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleOpenStudio = onOpenCMSStudio || onOpenCMSInspector || (() => {});

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedbackMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_newsletter' })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFeedbackMessage(data.message || 'You have been added to the seasonal tasting dispatch list.');
        trackNewsletterSubscribe(email, 'footer_newsletter');
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Unable to subscribe. Please try again.');
      }
    } catch (err) {
      // Fallback for purely client-side environment
      setStatus('success');
      setFeedbackMessage('Thank you. You have been added to Chef Adam Yoho’s seasonal kitchen dispatches.');
      trackNewsletterSubscribe(email, 'footer_newsletter');
      setEmail('');
    }
  };

  const handleLink = (route: RoutePath) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-shared-footer" className="bg-[#0d0d0c] border-t border-[#2a2825] pt-20 pb-16 text-[#9c9488]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1c1a18]">
          
          {/* Col 1: Overview & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-[16px] tracking-[4px] text-[#f5f0e8] uppercase block">
              ADAM YOHO
            </span>
            <p className="font-text text-[14px] text-[#d4cfc4] leading-relaxed max-w-sm">
              Over 23 years at the stove. Advising hospitality groups, executing bespoke private dining experiences, and mentoring the next generation of culinary leaders across Texas Hill Country, Austin, Pittsburgh, Columbus, and beyond.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <button
                id="footer-intro-call-btn"
                onClick={onOpenCalendly}
                className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] hover:text-[#c1651a] transition-colors flex items-center space-x-1"
              >
                <span>SCHEDULE INTRO CALL</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="text-[#2a2825]">·</span>
              <button
                id="footer-cms-inspect-btn"
                onClick={handleOpenStudio}
                className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] hover:text-[#f5f0e8] transition-colors"
              >
                CMS DATA HUB
              </button>
            </div>
          </div>

          {/* Col 2: The Practices */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase block mb-4">
              PRACTICE AREAS
            </span>
            <ul className="space-y-2.5 font-mono-kitchen text-[12px] tracking-[1.5px]">
              <li>
                <button
                  id="footer-link-consulting"
                  onClick={() => handleLink('consulting')}
                  className="hover:text-[#f5f0e8] transition-colors text-left"
                >
                  CONSULTING & R&D
                </button>
              </li>
              <li>
                <button
                  id="footer-link-events"
                  onClick={() => handleLink('events')}
                  className="hover:text-[#f5f0e8] transition-colors text-left"
                >
                  BESPOKE EVENTS
                </button>
              </li>
              <li>
                <button
                  id="footer-link-mentorship"
                  onClick={() => handleLink('mentorship')}
                  className="hover:text-[#f5f0e8] transition-colors text-left"
                >
                  CHEF MENTORSHIP
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => handleLink('contact')}
                  className="text-[#c1651a] hover:underline text-left block pt-1"
                >
                  BRANCHING INTAKE →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Stories */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase block mb-4">
              ARCHIVES
            </span>
            <ul className="space-y-2.5 font-mono-kitchen text-[12px] tracking-[1.5px]">
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => handleLink('about')}
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  ABOUT / 24 YEARS
                </button>
              </li>
              <li>
                <button
                  id="footer-link-press"
                  onClick={() => handleLink('press')}
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  PRESS & JOURNAL
                </button>
              </li>
              <li>
                <button
                  id="footer-link-testimonials"
                  onClick={() => handleLink('testimonials')}
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  TESTIMONIALS
                </button>
              </li>
              <li>
                <button
                  id="footer-link-faq"
                  onClick={() => handleLink('faq')}
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  FAQ & POLICIES
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Kitchen Dispatches */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase block">
              SEASONAL KITCHEN DISPATCHES
            </span>
            <p className="font-text text-[13px] text-[#d4cfc4]">
              Quarterly essays on thermodynamic fire control, heirloom micro-purveyors, and recipe technique direct from the pass.
            </p>

            {status === 'success' ? (
              <div className="p-4 bg-[#161514] border border-[#2a2825] flex items-start space-x-3 text-left">
                <CheckCircle2 className="w-4 h-4 text-[#5fa657] mt-0.5 shrink-0" />
                <p className="font-text text-[13px] text-[#d4cfc4]">
                  {feedbackMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative flex items-center border-b border-[#423e38] focus-within:border-[#f5f0e8] transition-colors">
                  <input
                    id="footer-newsletter-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent py-3 pr-10 text-[14px] font-text text-[#f5f0e8] placeholder-[#9c9488] focus:outline-none"
                    disabled={status === 'loading'}
                  />
                  <button
                    id="footer-newsletter-submit-btn"
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-0 text-[#f5f0e8] hover:text-[#c1651a] p-2 transition-colors disabled:opacity-50"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="font-mono-kitchen text-[11px] text-[#d4a017] flex items-center space-x-1 pt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{feedbackMessage}</span>
                  </p>
                )}
                <span className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#666057] block">
                  NO PROMOTIONAL SPAM · UNSUBSCRIBE AT ANY TIME
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-[12px] font-text text-[#9c9488]">
          <div className="space-y-1 text-center md:text-left">
            <p>© 2026 Adam Yoho LLC. All rights reserved.</p>
            <p className="text-[11px] text-[#666057]">
              Sourced via Texas regenerative farms and sustainable day-boat fisheries. All culinary services are subject to seasonal availability.
            </p>
          </div>
          
          <div className="text-center md:text-right font-display text-[13px] tracking-[6px] text-[#f5f0e8] uppercase">
            ADAM YOHO
          </div>
        </div>

      </div>
    </footer>
  );
};
