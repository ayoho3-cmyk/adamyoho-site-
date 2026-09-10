import React, { useState } from 'react';
import { RoutePath, Testimonial } from '../types';
import { Calendar } from 'lucide-react';
import { ScheduleEmbed } from '../components/ScheduleEmbed';

interface ConsultingPageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  testimonials?: Testimonial[];
  onOpenCalendly: () => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({
  onNavigate,
  onOpenCalendly
}) => {
  const [showInlineScheduler, setShowInlineScheduler] = useState(false);

  const pillars = [
    {
      num: '01',
      title: 'Kitchen Line Design & Efficiency',
      desc: 'Optimizing station flows and increased line operations.'
    },
    {
      num: '02',
      title: 'Menu Design & Recipe Bibles',
      desc: 'Develop concept-appropriate menus, standardized recipe bibles, prep lists, station guides, and plating specs.'
    },
    {
      num: '03',
      title: 'Operating Cost Engineering & Waste Elimination',
      desc: 'Product cross-utilization, yield audit protocols, purveyor contract negotiations, and precision prime-cost margin control.'
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
              PRACTICE AREA 01 · HOSPITALITY ADVISORY
            </span>
            <h1 className="font-display text-[36px] sm:text-[52px] md:text-[60px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
              Culinary Consulting & Kitchen Architecture
            </h1>
            <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
              Translating over 23 years experience into efficient line operations, disciplined menu development, and sustainable restaurant profitability.
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

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-[#161514] border border-[#2a2825]">
              <img
                src="/culinary-knives-roll.jpg"
                alt="Chef Adam Yoho - Culinary Knives & Tool Roll"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
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

      {/* 4. Closing Action Funnel & Interactive Scheduler */}
      <section className="max-w-4xl mx-auto px-6 space-y-8 pt-12 border-t border-[#1c1a18]">
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
