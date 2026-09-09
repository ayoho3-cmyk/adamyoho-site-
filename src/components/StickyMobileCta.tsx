import React from 'react';
import { RoutePath } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface StickyMobileCtaProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  onOpenCalendly: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({
  currentRoute,
  onNavigate,
  onOpenCalendly
}) => {
  return (
    <aside
      id="sticky-mobile-cta-bar"
      aria-label="Mobile quick reservation and inquiry bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0d0d0c]/95 backdrop-blur-md border-t border-[#2a2825] px-4 py-3 transition-transform duration-300"
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex flex-col">
          <span className="font-mono-kitchen text-[9px] tracking-[1.5px] text-[#c1651a] uppercase leading-tight">
            DIRECT ENGAGEMENTS
          </span>
          <span className="font-text text-[13px] text-[#f5f0e8] leading-tight">
            Consulting & Hearth Dining
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="mobile-sticky-intro-btn"
            onClick={onOpenCalendly}
            className="w-10 h-10 rounded-full border border-[#423e38] text-[#f5f0e8] flex items-center justify-center hover:border-[#f5f0e8] transition-colors"
            title="Book Intro Call"
            aria-label="Book 20-minute intro call"
          >
            <Calendar className="w-4 h-4 text-[#c1651a]" />
          </button>
          
          <button
            id="mobile-sticky-reserve-btn"
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-pill-transparent text-[11px] px-4 py-2 min-h-[40px] tracking-[2px]"
          >
            <span>RESERVE / INQUIRE</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </aside>
  );
};
