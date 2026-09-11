import React from 'react';
import { RoutePath } from '../types';
import { TIMELINE_EVENTS, KITCHEN_PRINCIPLES } from '../data/cms';
import { ArrowRight, Flame, Award, BookOpen, Clock } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: RoutePath) => void;
  onOpenCalendly: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenCalendly }) => {
  return (
    <div id="about-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Header & Hero Retrospective */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 md:px-20 text-center space-y-8">
        <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
          BIOGRAPHY & RETROSPECTIVE · 2002–2026
        </span>
        <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.1]">
          Twenty-Four Years Behind the Line.
        </h1>
        <div className="w-12 h-[1px] bg-[#c1651a] mx-auto" />
        <p className="font-text text-[18px] sm:text-[22px] text-[#e8e3d8] leading-relaxed max-w-3xl mx-auto">
          Twenty four years at the pass, began at The Food Studio in Atlanta and has spanned from the Texas Hill Country to Columbus, Ohio; from Pittsburgh to Austin.
        </p>
        <p className="font-text text-[16px] sm:text-[17px] text-[#d4cfc4] leading-relaxed max-w-2xl mx-auto">
          Over the course of 24 years, has led teams from pizza shops to high end steakhouse, taquerias to bistros, and been part of 8 openings including owning Uptown 51. He has developed an approach defined by passionate ingredient sourcing, calm, concentrated service, and classic technique.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            id="about-schedule-call-btn"
            onClick={onOpenCalendly}
            className="btn-pill-transparent text-[12px] px-8 py-2.5"
          >
            SCHEDULE ADVISORY CALL
          </button>
          <button
            id="about-inquire-btn"
            onClick={() => onNavigate('contact')}
            className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] hover:text-[#f5f0e8] py-2.5 px-4"
          >
            DIRECT INTAKE FORM →
          </button>
        </div>
      </section>

      {/* 2. Linear Career Timeline */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="space-y-4 mb-16">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] block uppercase">
            STATIONS, HOUSES & LINEAGE
          </span>
          <h2 className="font-display text-[30px] sm:text-[40px] tracking-[2px] uppercase text-[#f5f0e8]">
            The Journey to the Pass
          </h2>
        </div>

        <div className="space-y-12">
          {TIMELINE_EVENTS.map((item, idx) => (
            <div
              key={item.year}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#2a2825] pb-10"
            >
              <div className="md:col-span-3">
                <span className="font-mono-kitchen text-[13px] tracking-[2px] text-[#c1651a] block">
                  {item.year}
                </span>
                <span className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488] block mt-1">
                  {item.location}
                </span>
              </div>
              <div className="md:col-span-9 space-y-2">
                <h3 className="font-display text-[22px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                  {item.title}
                </h3>
                <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rules of the Kitchen */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 border-t border-[#1c1a18] pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            THE KITCHEN MANIFESTO
          </span>
          <h2 className="font-display text-[32px] sm:text-[44px] tracking-[2.5px] uppercase text-[#f5f0e8]">
            Rules of the Kitchen
          </h2>
          <p className="font-text text-[16px] text-[#9c9488]">
            Standards cultivated across a quarter-century of hot services, informing every advisory engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KITCHEN_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="bg-[#161514] border border-[#2a2825] p-8 space-y-4 rounded-none"
            >
              <span className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] block">
                RULE {principle.number}
              </span>
              <h3 className="font-display text-[20px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                {principle.title}
              </h3>
              <p className="font-text text-[14px] text-[#d4cfc4] leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
          
          {/* Sixth Summary Card */}
          <div className="bg-[#1c1a18] border border-[#423e38] p-8 space-y-4 rounded-none flex flex-col justify-between">
            <div>
              <span className="font-mono-kitchen text-[12px] tracking-[2px] text-[#f5f0e8] block">
                ATELIER STANDARD
              </span>
              <h3 className="font-display text-[20px] tracking-[1.5px] uppercase text-[#f5f0e8] mt-2">
                Work With Adam
              </h3>
              <p className="font-text text-[14px] text-[#9c9488] leading-relaxed mt-2">
                Bring over 24 years experience, station rigor, and operational clarity to your culinary project.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] hover:text-[#f5f0e8] flex items-center space-x-1 pt-4"
            >
              <span>DISCUSS AN ENGAGEMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
