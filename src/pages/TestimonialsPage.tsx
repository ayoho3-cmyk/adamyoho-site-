import React, { useState } from 'react';
import { RoutePath, Testimonial, ServiceBranch } from '../types';
import { Quote, ArrowRight, Star } from 'lucide-react';

interface TestimonialsPageProps {
  testimonials?: Testimonial[];
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  testimonials = [],
  onNavigate
}) => {
  const [filter, setFilter] = useState<'all' | ServiceBranch>('all');

  const filterOptions: { label: string; value: 'all' | ServiceBranch }[] = [
    { label: 'ALL ENDORSEMENTS', value: 'all' },
    { label: 'CONSULTING CLIENTS', value: 'consulting' },
    { label: 'PRIVATE EVENT HOSTS', value: 'events' },
    { label: 'MENTEES & CHEFS', value: 'mentorship' }
  ];

  const filteredTestimonials = filter === 'all'
    ? (testimonials || [])
    : (testimonials || []).filter(t => t.serviceType === filter);

  return (
    <div id="testimonials-page" className="pt-28 pb-24 text-[#f5f0e8] space-y-16 sm:space-y-24">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            INDUSTRY VOICES & PATRON DISPATCHES
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Testimonials & Case Endorsements
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Reflections from restaurateurs, Michelin-starred culinary teams, vineyard directors, and mentees who have shared the pass with Chef Adam Yoho.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-10">
        <div className="flex flex-wrap gap-2 font-mono-kitchen text-[11px] tracking-[1.5px]">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 border transition-colors ${
                filter === opt.value
                  ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                  : 'border-[#2a2825] text-[#9c9488] hover:border-[#423e38]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#161514] border border-[#2a2825] p-8 sm:p-10 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a2825] pb-3">
                  <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] uppercase">
                    SERVICE: {item.serviceType}
                  </span>
                  <span className="font-mono-kitchen text-[10px] tracking-[1px] text-[#9c9488]">
                    {item.year}
                  </span>
                </div>
                <p className="font-text text-[16px] sm:text-[18px] text-[#f5f0e8] leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="border-t border-[#2a2825] pt-4">
                <h4 className="font-display text-[16px] sm:text-[18px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                  {item.author}
                </h4>
                <p className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488] mt-0.5">
                  {item.title} — {item.establishmentOrContext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Closing Inquire Prompt */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12">
        <div className="p-10 bg-[#161514] border border-[#423e38] space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            CREATE YOUR OWN CULINARY CHAPTER
          </span>
          <h3 className="font-display text-[26px] sm:text-[36px] tracking-[2px] uppercase text-[#f5f0e8]">
            Begin Your Partnership With Chef Yoho
          </h3>
          <p className="font-text text-[15px] text-[#d4cfc4] max-w-lg mx-auto">
            From comprehensive restaurant line turnarounds to bespoke vineyard tasting salons, we tailor every detail to the highest standard.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              GO TO INTAKE FORM →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
