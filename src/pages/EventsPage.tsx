import React, { useState } from 'react';
import { RoutePath, Testimonial, EventGalleryItem } from '../types';
import { INITIAL_EVENT_GALLERY } from '../data/cms';
import { ArrowRight, Flame, Wine, Users, Sparkles, Eye } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  testimonials?: Testimonial[];
  onOpenLightbox: (item: EventGalleryItem) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onNavigate,
  testimonials = [],
  onOpenLightbox
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const eventTestimonials = (testimonials || []).filter(t => t.serviceType === 'events');

  const tags = ['All', 'Vineyard Banquets', 'Private Dining', 'Tasting Salons', 'Atelier'];

  const filteredGallery = selectedTag === 'All'
    ? INITIAL_EVENT_GALLERY
    : INITIAL_EVENT_GALLERY.filter(item => item.tag === selectedTag);

  const formats = [
    {
      num: '01',
      title: 'The Private Chef’s Table',
      capacity: '8 to 14 Guests',
      courses: '9 to 12 Courses',
      desc: 'An intimate tasting progression of seasonal day-boat finfish, whole dry-aged heritage cuts, and fermented wild alliums plated directly before guests.'
    },
    {
      num: '02',
      title: 'The Vineyard Terroir Banquet',
      capacity: '16 to 60 Guests',
      courses: '6 to 8 Courses',
      desc: 'An open-air long-table feast staged within private vineyard blocks or architectural cellar properties. Designed in meticulous harmony with estate library vintages.'
    },
    {
      num: '03',
      title: 'Private Estate Tasting Salons',
      capacity: '6 to 20 Guests',
      courses: '8 to 10 Courses',
      desc: 'Full culinary brigade takeover for private residence anniversaries, collector weekends, and executive culinary salons with bespoke table styling and porcelain service.'
    }
  ];

  return (
    <div id="events-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            PRACTICE AREA 02 · BESPOKE SERVICE
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Private Dining & Bespoke Culinary Events
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Multi-course live-fire tasting experiences crafted for private patrons, vineyard estates, and cultural salons.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              id="events-inquire-cta-btn"
              onClick={() => onNavigate('contact', { branch: 'events' })}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              REQUEST PRIVATE EVENT DATE
            </button>
            <span className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488]">
              CURRENT CAPACITY: 8–60 GUESTS
            </span>
          </div>
        </div>
      </section>

      {/* 2. Formats Breakdown */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16 max-w-3xl">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            SERVICE FORMATS
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            Curated Tasting Formats
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formats.map((fmt) => (
            <div key={fmt.num} className="bg-[#161514] border border-[#2a2825] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a2825] pb-3">
                  <span className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a]">
                    FORMAT {fmt.num}
                  </span>
                  <span className="font-mono-kitchen text-[11px] text-[#9c9488]">
                    {fmt.capacity}
                  </span>
                </div>
                <h3 className="font-display text-[22px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                  {fmt.title}
                </h3>
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block">
                  SEQUENCE: {fmt.courses}
                </span>
                <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                  {fmt.desc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact', { branch: 'events' })}
                className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] hover:text-[#c1651a] flex items-center space-x-1 pt-4 border-t border-[#2a2825]"
              >
                <span>BOOK THIS FORMAT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Event Photo Gallery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block mb-1">
              THE VISUAL ARCHIVE
            </span>
            <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
              Events & Atmosphere
            </h2>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 font-mono-kitchen text-[11px] tracking-[1.5px]">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 border transition-colors ${
                  selectedTag === tag
                    ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                    : 'border-[#2a2825] text-[#9c9488] hover:border-[#423e38]'
                }`}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group bg-[#0d0d0c] border border-[#2a2825] p-4 space-y-3 cursor-pointer hover:border-[#423e38] transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#161514] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0d0d0c]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="btn-pill-transparent text-[10px] px-4 py-1.5 bg-[#0d0d0c]/80 flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>VIEW PHOTO</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block">
                  {item.tag.toUpperCase()} · {item.guestCount}
                </span>
                <h4 className="font-display text-[16px] tracking-[1px] uppercase text-[#f5f0e8]">
                  {item.title}
                </h4>
                <p className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#9c9488]">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Event Testimonials */}
      {eventTestimonials.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
          <div className="text-center space-y-4 mb-12">
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
              PATRON & HOST VOICES
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] tracking-[2px] uppercase text-[#f5f0e8]">
              Private Dining Impressions
            </h2>
          </div>

          <div className="space-y-8">
            {eventTestimonials.map((t) => (
              <div key={t.id} className="bg-[#161514] border border-[#2a2825] p-8 space-y-4">
                <p className="font-text text-[17px] text-[#f5f0e8] leading-relaxed italic">
                  “{t.quote}”
                </p>
                <div className="border-t border-[#2a2825] pt-4 flex items-center justify-between font-mono-kitchen text-[11px]">
                  <span className="text-[#f5f0e8] tracking-[1.5px] uppercase font-display text-[14px]">
                    {t.author} — {t.title}
                  </span>
                  <span className="text-[#9c9488]">{t.establishmentOrContext}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Closing Funnel */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12">
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
