import React, { useState, useEffect } from 'react';
import { RoutePath } from '../types';
import { Menu, X, ArrowUpRight, Clock, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  onOpenInquiry?: (branch?: string) => void;
  onOpenCalendly?: () => void;
  onOpenCMSInspector?: () => void;
  onOpenCMSStudio?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  onNavigate,
  onOpenInquiry = () => {},
  onOpenCalendly = () => {},
  onOpenCMSInspector,
  onOpenCMSStudio
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenStudio = onOpenCMSStudio || onOpenCMSInspector || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: RoutePath; num: string }[] = [
    { label: 'HOME', route: 'home', num: '01' },
    { label: 'ABOUT & RETROSPECTIVE', route: 'about', num: '02' },
    { label: 'CULINARY CONSULTING', route: 'consulting', num: '03' },
    { label: 'BESPOKE EVENTS', route: 'events', num: '04' },
    { label: 'CHEF MENTORSHIP', route: 'mentorship', num: '05' },
    { label: 'FAQ', route: 'faq', num: '06' },
    { label: 'CONTACT & INTAKE', route: 'contact', num: '07' },
  ];

  const handleRouteClick = (route: RoutePath) => {
    setIsMenuOpen(false);
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0d0c]/95 backdrop-blur-md border-b border-[#2a2825] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Left: Menu Trigger / Desktop Links */}
          <div className="flex items-center space-x-6">
            <button
              id="nav-menu-toggle-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-mono-kitchen text-[12px] tracking-[2px] text-[#f5f0e8] hover:text-[#f5f0e8]/80 transition-colors flex items-center space-x-2 py-2 group"
              aria-label="Toggle navigation menu"
            >
              <span className="w-2 h-2 rounded-none bg-[#c1651a] inline-block transition-transform group-hover:scale-125" />
              <span>{isMenuOpen ? 'CLOSE' : 'INDEX'}</span>
            </button>

            {/* Quick Desktop Category Links */}
            <nav className="hidden lg:flex items-center space-x-8 pl-4 border-l border-[#2a2825]">
              <button
                id="quick-nav-consulting"
                onClick={() => handleRouteClick('consulting')}
                className={`font-mono-kitchen text-[11px] tracking-[2px] transition-colors ${
                  currentRoute === 'consulting' ? 'text-[#f5f0e8] underline underline-offset-8 decoration-[#c1651a]' : 'text-[#9c9488] hover:text-[#f5f0e8]'
                }`}
              >
                CONSULTING
              </button>
              <button
                id="quick-nav-events"
                onClick={() => handleRouteClick('events')}
                className={`font-mono-kitchen text-[11px] tracking-[2px] transition-colors ${
                  currentRoute === 'events' ? 'text-[#f5f0e8] underline underline-offset-8 decoration-[#c1651a]' : 'text-[#9c9488] hover:text-[#f5f0e8]'
                }`}
              >
                EVENTS
              </button>
              <button
                id="quick-nav-mentorship"
                onClick={() => handleRouteClick('mentorship')}
                className={`font-mono-kitchen text-[11px] tracking-[2px] transition-colors ${
                  currentRoute === 'mentorship' ? 'text-[#f5f0e8] underline underline-offset-8 decoration-[#c1651a]' : 'text-[#9c9488] hover:text-[#f5f0e8]'
                }`}
              >
                MENTORSHIP
              </button>
            </nav>
          </div>

          {/* Center: Chef's Wordmark */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <button
              id="nav-brand-wordmark"
              onClick={() => handleRouteClick('home')}
              className="font-display text-[13px] sm:text-[14px] text-[#f5f0e8] tracking-[6px] uppercase hover:opacity-85 transition-opacity"
            >
              ADAM YOHO
            </button>
          </div>

          {/* Right: Inquire CTA & Studio Hub */}
          <div className="flex items-center space-x-3">
            <button
              id="nav-studio-cms-btn"
              onClick={handleOpenStudio}
              title="Inspect Headless CMS & Attribution Analytics"
              className="hidden sm:inline-flex font-mono-kitchen text-[10px] tracking-[1.5px] text-[#9c9488] hover:text-[#f5f0e8] border border-[#2a2825] px-2.5 py-1.5 transition-colors"
            >
              CMS & DATA
            </button>
            <button
              id="nav-primary-inquire-btn"
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate('contact');
              }}
              className="btn-pill-transparent text-[11px] sm:text-[12px] px-5 sm:px-7 py-2 sm:py-2.5"
            >
              INQUIRE
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Navigation */}
      {isMenuOpen && (
        <div
          id="fullscreen-overlay-menu"
          className="fixed inset-0 z-40 bg-[#0d0d0c] text-[#f5f0e8] flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 md:px-20 overflow-y-auto animate-fadeIn"
        >
          {/* Top Info Bar inside menu */}
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#2a2825] pb-8">
            <div className="md:col-span-4">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block mb-2">
                CURRENT ATELIER STATUS
              </span>
              <p className="font-text text-[15px] text-[#d4cfc4]">
                Accepting Q3/Q4 2026 restaurant consulting engagements, bespoke private dining experiences, and selective line mentorship.
              </p>
            </div>
            <div className="md:col-span-4">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block mb-2">
                STUDIO LOCATION & ADVISORY HUBS
              </span>
              <p className="font-text text-[15px] text-[#d4cfc4]">
                Texas Hill Country · Austin · Pittsburgh · Columbus. Available for national culinary advisory.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end items-start space-x-3">
              <button
                id="overlay-schedule-intro-btn"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenCalendly();
                }}
                className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] border border-[#423e38] px-4 py-2 hover:border-[#f5f0e8] transition-colors flex items-center space-x-2"
              >
                <Clock className="w-3.5 h-3.5 text-[#c1651a]" />
                <span>BOOK INTRO CALL (20M)</span>
              </button>
            </div>
          </div>

          {/* Center: Main 9 Routes List */}
          <div className="max-w-7xl w-full mx-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ul className="space-y-4 sm:space-y-6">
                {navItems.map((item) => (
                  <li key={item.route} className="border-b border-[#161514] pb-3">
                    <button
                      id={`overlay-nav-link-${item.route}`}
                      onClick={() => handleRouteClick(item.route)}
                      className="group flex items-baseline justify-between w-full text-left"
                    >
                      <div className="flex items-baseline space-x-4 sm:space-x-6">
                        <span className="font-mono-kitchen text-[11px] sm:text-[12px] tracking-[2px] text-[#666057] group-hover:text-[#c1651a] transition-colors">
                          {item.num}
                        </span>
                        <span
                          className={`font-display text-[22px] sm:text-[32px] md:text-[36px] tracking-[2px] uppercase transition-all ${
                            currentRoute === item.route
                              ? 'text-[#f5f0e8] translate-x-2'
                              : 'text-[#9c9488] group-hover:text-[#f5f0e8] group-hover:translate-x-2'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#423e38] opacity-0 group-hover:opacity-100 group-hover:text-[#c1651a] transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column in Overlay Menu: Quick Services Cards */}
            <div className="lg:col-span-4 space-y-6 lg:pl-12 lg:border-l lg:border-[#2a2825]">
              <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block">
                DIRECT PRACTICE AREAS
              </span>

              <div
                onClick={() => handleRouteClick('consulting')}
                className="p-5 bg-[#161514] border border-[#2a2825] cursor-pointer hover:border-[#423e38] transition-colors"
              >
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block mb-1">
                  HOSPITALITY ADVISORY
                </span>
                <h4 className="font-display text-[18px] text-[#f5f0e8] tracking-[1.5px] uppercase mb-2">
                  Culinary Consulting
                </h4>
                <p className="font-text text-[13px] text-[#9c9488]">
                  Kitchen line design, tasting menu R&D, operating cost modeling, brigade standard operating procedures.
                </p>
              </div>

              <div
                onClick={() => handleRouteClick('events')}
                className="p-5 bg-[#161514] border border-[#2a2825] cursor-pointer hover:border-[#423e38] transition-colors"
              >
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block mb-1">
                  EXCLUSIVE SERVICE
                </span>
                <h4 className="font-display text-[18px] text-[#f5f0e8] tracking-[1.5px] uppercase mb-2">
                  Bespoke Events
                </h4>
                <p className="font-text text-[13px] text-[#9c9488]">
                  Custom private dining tables, estate cellar celebrations, and seasonal terroir banquets (8–60 guests).
                </p>
              </div>

              <div
                onClick={() => handleRouteClick('mentorship')}
                className="p-5 bg-[#161514] border border-[#2a2825] cursor-pointer hover:border-[#423e38] transition-colors"
              >
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block mb-1">
                  KITCHEN MASTERY
                </span>
                <h4 className="font-display text-[18px] text-[#f5f0e8] tracking-[1.5px] uppercase mb-2">
                  Chef Mentorship
                </h4>
                <p className="font-text text-[13px] text-[#9c9488]">
                  Intensive 1-on-1 coaching for sous chefs and culinary entrepreneurs ready to step onto the pass.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar in Overlay */}
          <div className="max-w-7xl w-full mx-auto pt-6 border-t border-[#2a2825] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9c9488] font-mono-kitchen tracking-[1.5px]">
            <span>ADAM YOHO · 24 YEARS AT THE STOVE</span>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="mailto:chef@adamyoho.com" className="text-[#f5f0e8] hover:text-[#c1651a] transition-colors">
                DIRECT: CHEF@ADAMYOHO.COM
              </a>
              <span>TEXAS HILL COUNTRY · AUSTIN · PITTSBURGH · COLUMBUS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
