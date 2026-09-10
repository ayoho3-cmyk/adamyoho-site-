import React, { useState } from 'react';
import { RoutePath, Testimonial } from '../types';
import { Calendar } from 'lucide-react';
import { ScheduleEmbed } from '../components/ScheduleEmbed';

interface MentorshipPageProps {
  onNavigate: (route: RoutePath, params?: Record<string, any>) => void;
  testimonials?: Testimonial[];
  onOpenCalendly: () => void;
}

export const MentorshipPage: React.FC<MentorshipPageProps> = ({
  onNavigate,
  onOpenCalendly
}) => {
  const [showInlineScheduler, setShowInlineScheduler] = useState(false);

  const syllabusStages = [
    {
      num: 'STAGE 01',
      title: 'Station Speed & Mental Mise-en-Place',
      focus: 'Eliminating Motion Waste & Building Internal Stillness',
      points: [
        'Proper line set up',
        'Managing the flow of service',
        'Proper cookery techniques'
      ]
    },
    {
      num: 'STAGE 02',
      title: 'Palate Memory & Flavor Architecture',
      focus: 'Subtractive Cooking & Micro-Seasoning',
      points: [
        'Deconstructing classical sauce reductions, acids, and emulsion balances',
        'Sourcing purveyor negotiations and respecting seasonal harvest limits'
      ]
    },
    {
      num: 'STAGE 03',
      title: 'Brigade Leadership & The Quiet Pass',
      focus: 'Leading with Authority Without Raising Your Voice',
      points: [
        'Calling the board: cadence, urgency, and psychological composure on the pass',
        'Conflict resolution and station triage during catastrophic line equipment failures',
        'Menu cost engineering, labor budgets, and building high-retention culinary cultures'
      ]
    }
  ];

  return (
    <div id="mentorship-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
              PRACTICE AREA 03 · LINE MASTERY
            </span>
            <h1 className="font-display text-[36px] sm:text-[52px] md:text-[60px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
              Master Culinary Mentorship & Stage Coaching
            </h1>
            <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
              Direct, intensive coaching for working sous chefs, chef de parties, and culinary leaders preparing to take command of their own kitchen pass.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                id="mentorship-inquire-cta-btn"
                onClick={() => onNavigate('contact', { branch: 'mentorship' })}
                className="btn-pill-transparent text-[12px] px-8 py-3"
              >
                APPLY FOR MENTORSHIP
              </button>
              <button
                id="mentorship-call-btn"
                onClick={onOpenCalendly}
                className="font-mono-kitchen text-[12px] tracking-[2px] text-[#f5f0e8] border border-[#423e38] px-6 py-3 hover:border-[#f5f0e8] transition-colors"
              >
                SCHEDULE 20-MIN INTERVIEW
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-[#161514] border border-[#2a2825]">
              <img
                src="/mentorship-pans.jpg"
                alt="Chef Cookware & Station Pans Wall"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Mentorship Philosophy */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6 border-t border-[#1c1a18] pt-20">
        <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
          WHY 1-ON-1 COACHING
        </span>
        <h2 className="font-display text-[28px] sm:text-[38px] tracking-[2px] uppercase text-[#f5f0e8]">
          “Recipes are Everywhere. Composure is Taught.”
        </h2>
        <p className="font-text text-[16px] sm:text-[18px] text-[#d4cfc4] leading-relaxed">
          Culinary school gives you terminology. Working the line gives you scars. But transitioning from a cook who follows tickets into a Chef who orchestrates seventy covers in serenity requires deep, individualized mentorship.
        </p>
      </section>

      {/* 3. The 3 Stages of Mastery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16 max-w-3xl">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            THE CURRICULUM
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            Three Stages of Command
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {syllabusStages.map((stg) => (
            <div key={stg.num} className="bg-[#161514] border border-[#2a2825] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] block">
                  {stg.num}
                </span>
                <h3 className="font-display text-[22px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                  {stg.title}
                </h3>
                <p className="font-text text-[13px] text-[#9c9488] italic">
                  {stg.focus}
                </p>
                <ul className="space-y-2 pt-2 border-t border-[#2a2825]">
                  {stg.points.map((pt, idx) => (
                    <li key={idx} className="font-text text-[14px] text-[#d4cfc4] flex items-start space-x-2">
                      <span className="text-[#c1651a] font-mono-kitchen text-xs mt-1">·</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Closing Application & Interactive Booking Embed */}
      <section className="max-w-4xl mx-auto px-6 space-y-8 pt-12 border-t border-[#1c1a18]">
        <div className="p-10 bg-[#161514] border border-[#423e38] space-y-6 text-center">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            QUARTERLY APPLICATION COHORT
          </span>
          <h3 className="font-display text-[28px] sm:text-[38px] tracking-[2px] uppercase text-[#f5f0e8]">
            Apply for Line Mentorship
          </h3>
          <p className="font-text text-[16px] text-[#d4cfc4] max-w-xl mx-auto">
            Applications are accepted on a rolling basis. Mentees work directly with Chef Adam Yoho across virtual line audits and kitchen stage sessions.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="mentorship-funnel-apply-btn"
              onClick={() => onNavigate('contact', { branch: 'mentorship' })}
              className="btn-pill-transparent text-[12px] px-8 py-3"
            >
              SUBMIT MENTORSHIP APPLICATION →
            </button>
            <button
              id="mentorship-funnel-call-btn"
              onClick={() => setShowInlineScheduler(prev => !prev)}
              className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] hover:text-[#c1651a] border border-[#423e38] px-6 py-3 transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c1651a]" />
              <span>{showInlineScheduler ? 'HIDE SCHEDULER' : 'BOOK 20-MIN INTERVIEW DIRECTLY'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Calendar */}
        {showInlineScheduler && (
          <div className="animate-fadeIn">
            <ScheduleEmbed
              serviceBranch="mentorship"
              title="Book Mentorship Intake Interview"
              subtitle="Lock a 20-minute 1-on-1 video scoping conversation directly on Chef Adam Yoho's calendar."
              defaultTopic="Chef Mentorship & Brigade Line Coaching"
            />
          </div>
        )}
      </section>

    </div>
  );
};
