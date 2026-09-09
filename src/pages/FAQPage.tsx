import React, { useState } from 'react';
import { RoutePath, FAQItem } from '../types';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FAQPageProps {
  faqs?: FAQItem[];
  onNavigate: (route: RoutePath) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ faqs = [], onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-3': true });

  // Quick Question Form state
  const [quickQuestion, setQuickQuestion] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const categories = ['All', 'Consulting', 'Events', 'Mentorship', 'Sourcing & Dietary', 'General'];

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = (faqs || []).filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion || !quickEmail) return;

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'general',
          name: 'FAQ Inquirer',
          email: quickEmail,
          notes: quickQuestion,
          details: { source: 'faq_quick_submit' }
        })
      });
    } catch (e) {
      // Fallback
    }

    setQuickSubmitted(true);
    setQuickQuestion('');
  };

  return (
    <div id="faq-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-16 sm:space-y-24">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            PRACTICE POLICIES & FREQUENT INQUIRIES
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Frequently Asked Questions
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Essential guidelines covering consulting scope, private event booking lead times, mentorship eligibility, and our purveyor standards.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 border-t border-[#1c1a18] pt-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          <div className="flex flex-wrap gap-2 font-mono-kitchen text-[11px] tracking-[1.5px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 border transition-colors ${
                  selectedCategory === cat
                    ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                    : 'border-[#2a2825] text-[#9c9488] hover:border-[#423e38]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9c9488]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-[#161514] border border-[#2a2825] pl-10 pr-4 py-2 text-xs font-text text-[#f5f0e8] placeholder-[#9c9488] focus:border-[#f5f0e8] outline-none"
            />
          </div>

        </div>
      </section>

      {/* 3. Accordion List */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center border border-[#2a2825] bg-[#161514] font-mono-kitchen text-[12px] text-[#9c9488]">
            No questions found matching your search.
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="bg-[#161514] border border-[#2a2825] transition-colors hover:border-[#423e38]"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 text-left flex items-start justify-between space-x-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block uppercase">
                      CATEGORY: {item.category}
                    </span>
                    <h3 className="font-display text-[18px] sm:text-[20px] tracking-[1px] uppercase text-[#f5f0e8]">
                      {item.question}
                    </h3>
                  </div>
                  <div className="p-1 text-[#9c9488]">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#f5f0e8]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#22201d]">
                    <p className="font-text text-[15px] text-[#d4cfc4] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* 4. Quick Custom Question Box */}
      <section className="max-w-3xl mx-auto px-6 pt-12">
        <div className="p-8 bg-[#131211] border border-[#2a2825] space-y-4">
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block">
            HAVE A QUESTION NOT ANSWERED HERE?
          </span>
          <h3 className="font-display text-[20px] tracking-[1.5px] uppercase text-[#f5f0e8]">
            Ask Chef Adam Yoho Directly
          </h3>

          {quickSubmitted ? (
            <div className="p-4 bg-[#161514] border border-[#5fa657]/40 flex items-center space-x-3 text-[#5fa657] font-mono-kitchen text-[12px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you. Your question has been forwarded to the atelier team.</span>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-4 pt-2">
              <div>
                <input
                  type="email"
                  required
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  placeholder="Your email address"
                  className="input-underline text-xs"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={quickQuestion}
                  onChange={(e) => setQuickQuestion(e.target.value)}
                  placeholder="Type your question or specific inquiry..."
                  className="input-underline text-xs"
                />
              </div>
              <button
                type="submit"
                className="btn-pill-transparent text-[11px] px-6 py-2"
              >
                SUBMIT QUESTION
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
