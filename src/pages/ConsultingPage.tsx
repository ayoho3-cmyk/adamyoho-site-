import React, { useState } from 'react';
import { RoutePath, Testimonial } from '../types';
import { CONSULTING_CASE_STUDIES } from '../data/cms';
import { ArrowRight, Check, Clock, TrendingUp, Layers, ChefHat, FileSpreadsheet, ShieldCheck, Calendar } from 'lucide-react';
import { ScheduleEmbed } from '../components/ScheduleEmbed';

interface ConsultingPageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  testimonials?: Testimonial[];
  onOpenCalendly: () => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({
  onNavigate,
  testimonials = [],
  onOpenCalendly
}) => {
  const [showInlineScheduler, setShowInlineScheduler] = useState(false);
  const consultingTestimonials = (testimonials || []).filter(t => t.serviceType === 'consulting');

  const pillars = [
    {
      num: '01',
      title: 'Kitchen Line & Ergonomic Architecture',
      desc: 'Optimizing spatial footpaths, sauté-to-pass transfer geometry, station cold-drawers, and brigade flow to eliminate micro-bottlenecks during peak service covers.'
    },
    {
      num: '02',
      title: 'Tasting Menu R&D & Recipe Bibles',
      desc: 'Developing mathematically-paced, 8-to-12 course seasonal tasting progressions. Creating standardized station bibles with gram-accurate yields, prep timing, and plating specs.'
    },
    {
      num: '03',
      title: 'Operating Cost Engineering & Waste Elimination',
      desc: 'Whole-animal butchery cross-utilization, yield audit protocols, direct micro-purveyor contract negotiations, and precision prime-cost margin control.'
    },
    {
      num: '04',
      title: 'Brigade Training & Pass Discipline',
      desc: 'Transforming kitchen culture from panic to calm precision. Training incoming Executive Chefs and Sous Chefs in station mise-en-place, ticket pacing, and quiet leadership.'
    }
  ];

  const processSteps = [
    {
      step: 'STAGE 1',
      title: 'Line Diagnostic & Cover Audit',
      timeline: 'Weeks 1–2',
      desc: 'Chef Yoho observes multiple live services on the hot line, auditing station bottlenecking, ticket cadence, plating consistency, and waste streams.'
    },
    {
      step: 'STAGE 2',
      title: 'Menu R&D & Station Re-Engineering',
      timeline: 'Weeks 3–6',
      desc: 'Developing and test-firing opening menus or seasonal revamps. Streamlining station layouts and building the kitchen’s master recipe and technique documentation.'
    },
    {
      step: 'STAGE 3',
      title: 'Brigade Immersion & Dry-Run Services',
      timeline: 'Weeks 7–10',
      desc: 'Hands-on station coaching with line cooks, sous chefs, and expediter pass leads. Running simulated service marathons under heavy cover pressures.'
    },
    {
      step: 'STAGE 4',
      title: 'Launch Pass Oversight & Retention Audits',
      timeline: 'Weeks 11–16',
      desc: 'Standing shoulder-to-shoulder with the brigade during opening or relaunch weeks, followed by 30-day and 90-day quality and margin checks.'
    }
  ];

  return (
    <div id="consulting-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            PRACTICE AREA 01 · HOSPITALITY ADVISORY
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Culinary Consulting & Kitchen Architecture
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Translating twenty-five years of Michelin-track kitchen standards into ergonomic line operations, disciplined menu development, and sustainable restaurant profitability.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              id="consulting-inquire-cta-btn"
              onClick={() => onNavigate('contact', { branch: 'consulting' })}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              INQUIRE ABOUT CONSULTING
            </button>
            <button
              id="consulting-calendly-btn"
              onClick={onOpenCalendly}
              className="font-mono-kitchen text-[12px] tracking-[2px] text-[#f5f0e8] border border-[#423e38] px-6 py-3 hover:border-[#f5f0e8] transition-colors"
            >
              BOOK 20-MIN SCOPING CALL
            </button>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars of Practice */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16 max-w-3xl">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            OFFERING BREAKDOWN
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            Four Pillars of Kitchen Advisory
          </h2>
          <p className="font-text text-[16px] text-[#9c9488]">
            We do not provide generic hospitality consulting. We provide station-level, high-density culinary engineering derived from daily hot-line execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <div key={p.num} className="bg-[#161514] border border-[#2a2825] p-8 space-y-4">
              <span className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] block">
                {p.num}
              </span>
              <h3 className="font-display text-[22px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                {p.title}
              </h3>
              <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The 4-Stage Engagement Framework */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16 max-w-3xl">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            ENGAGEMENT PROCESS & FORMAT
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            From Diagnostic to Flawless Service
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div key={step.step} className="bg-[#0d0d0c] border border-[#2a2825] p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a2825] pb-2">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a]">
                    {step.step}
                  </span>
                  <span className="font-mono-kitchen text-[10px] text-[#9c9488]">
                    {step.timeline}
                  </span>
                </div>
                <h4 className="font-display text-[18px] tracking-[1px] uppercase text-[#f5f0e8]">
                  {step.title}
                </h4>
                <p className="font-text text-[14px] text-[#d4cfc4] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Detailed Case Studies */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            PROVEN OUTCOMES
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            Selected Case Studies
          </h2>
        </div>

        <div className="space-y-16">
          {CONSULTING_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-[#161514] border border-[#2a2825] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              <div className="lg:col-span-5 space-y-6">
                <div className="aspect-[4/3] overflow-hidden bg-[#0d0d0c] border border-[#2a2825]">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-[#2a2825] pt-4 text-center">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="space-y-1">
                      <span className="font-display text-[22px] sm:text-[26px] text-[#c1651a] block">
                        {m.value}
                      </span>
                      <span className="font-mono-kitchen text-[9px] tracking-[1.5px] text-[#9c9488] block uppercase">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2825] pb-3">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a]">
                    {cs.client} · {cs.location}
                  </span>
                  <span className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488]">
                    DURATION: {cs.duration}
                  </span>
                </div>

                <h3 className="font-display text-[24px] sm:text-[28px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                  {cs.title}
                </h3>

                <div className="space-y-4 font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                  <div>
                    <strong className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase block mb-1">
                      THE OPERATIONAL CHALLENGE:
                    </strong>
                    <p>{cs.challenge}</p>
                  </div>
                  <div>
                    <strong className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase block mb-1">
                      THE ADVISORY INTERVENTION:
                    </strong>
                    <p>{cs.solution}</p>
                  </div>
                  <div>
                    <strong className="font-mono-kitchen text-[11px] tracking-[2px] text-[#5fa657] uppercase block mb-1">
                      THE LONG-TERM OUTCOME:
                    </strong>
                    <p>{cs.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Consulting Testimonials */}
      {consultingTestimonials.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
          <div className="text-center space-y-4 mb-12">
            <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
              RESTAURATEUR & OPERATOR VOICES
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] tracking-[2px] uppercase text-[#f5f0e8]">
              Client Endorsements
            </h2>
          </div>

          <div className="space-y-8">
            {consultingTestimonials.map((t) => (
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

      {/* 6. Closing Action Funnel & Interactive Scheduler */}
      <section className="max-w-4xl mx-auto px-6 space-y-8 pt-12">
        <div className="p-10 bg-[#161514] border border-[#423e38] space-y-6 text-center">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            READY TO ELEVATE YOUR KITCHEN OPERATIONS?
          </span>
          <h3 className="font-display text-[28px] sm:text-[38px] tracking-[2px] uppercase text-[#f5f0e8]">
            Begin Your Consulting Diagnostic
          </h3>
          <p className="font-text text-[16px] text-[#d4cfc4] max-w-xl mx-auto">
            Submit your establishment details through our branching intake form or book a direct 20-minute scoping call.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="consulting-funnel-intake-btn"
              onClick={() => onNavigate('contact', { branch: 'consulting' })}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              GO TO CONSULTING INTAKE →
            </button>
            <button
              id="consulting-funnel-call-btn"
              onClick={() => setShowInlineScheduler(prev => !prev)}
              className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] hover:text-[#c1651a] border border-[#423e38] px-6 py-3 transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c1651a]" />
              <span>{showInlineScheduler ? 'HIDE SCHEDULER' : 'BOOK 20-MIN INTRO CALL DIRECTLY'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Calendar */}
        {showInlineScheduler && (
          <div className="animate-fadeIn">
            <ScheduleEmbed
              serviceBranch="consulting"
              title="Book Culinary Advisory Scoping Call"
              subtitle="Reserve a 20-minute video diagnostic with Chef Adam Yoho to evaluate line redesign, tasting menu engineering, or cost control audits."
              defaultTopic="Culinary Advisory & Kitchen Line Scoping"
            />
          </div>
        )}
      </section>

    </div>
  );
};
