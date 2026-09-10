import React from 'react';
import { RoutePath, Testimonial, EventGalleryItem } from '../types';

interface EventsPageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  testimonials?: Testimonial[];
  onOpenLightbox?: (item: EventGalleryItem) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onNavigate
}) => {
  return (
    <div id="events-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Private Dining & Bespoke Culinary Events
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Exclusive Chef lead Private Events based on the bounty of local farms and ranches.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              id="events-inquire-cta-btn"
              onClick={() => onNavigate('contact', { branch: 'events' })}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              REQUEST PRIVATE EVENT DATE
            </button>
          </div>
        </div>
      </section>

      {/* 2. Date Reservation & Custom Menus Funnel */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12 border-t border-[#1c1a18]">
        <div className="p-10 bg-[#161514] border border-[#423e38] space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            DATE RESERVATION & CUSTOM MENUS
          </span>
          <h3 className="font-display text-[28px] sm:text-[38px] tracking-[2px] uppercase text-[#f5f0e8]">
            Commission a Private Tasting
          </h3>
          <p className="font-text text-[16px] text-[#d4cfc4] max-w-xl mx-auto">
            Provide your target date, guest count, and location in our event intake to receive menu concepts and availability.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              id="events-funnel-intake-btn"
              onClick={() => onNavigate('contact', { branch: 'events' })}
              className="btn-pill-transparent text-[12px] px-9 py-3"
            >
              GO TO EVENTS INTAKE →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
