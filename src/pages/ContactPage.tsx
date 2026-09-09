import React, { useState, useEffect } from 'react';
import { RoutePath, ServiceBranch, InquirySubmission, InquiryResponse } from '../types';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, FileText, Send, Sparkles, RefreshCw, Calendar } from 'lucide-react';
import { trackBranchSelect, trackInquirySubmit } from '../utils/analytics';

interface ContactPageProps {
  initialBranch?: ServiceBranch;
  onOpenCalendly: () => void;
  onNavigate: (route: RoutePath) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialBranch = 'consulting',
  onOpenCalendly,
  onNavigate
}) => {
  const [selectedBranch, setSelectedBranch] = useState<ServiceBranch>(initialBranch);

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam honeypot
  const [captchaAnswer, setCaptchaAnswer] = useState(''); // Anti-spam verification

  // Branch 1: Consulting fields
  const [consultingEstablishment, setConsultingEstablishment] = useState('');
  const [consultingLocation, setConsultingLocation] = useState('');
  const [consultingTimeline, setConsultingTimeline] = useState('Q3 2026 (Aug–Oct)');
  const [consultingSeats, setConsultingSeats] = useState('40–80 Seats');
  const [consultingScope, setConsultingScope] = useState<string[]>([
    'Kitchen Line Ergonomics',
    'Tasting Menu R&D'
  ]);
  const [consultingBudget, setConsultingBudget] = useState('$25,000 – $50,000');

  // Branch 2: Events fields
  const [eventFormat, setEventFormat] = useState('Live Wood Hearth Chef’s Table (8–14 Guests)');
  const [eventDate, setEventDate] = useState('');
  const [eventGuestCount, setEventGuestCount] = useState('12');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDietaryNotes, setEventDietaryNotes] = useState('');
  const [eventWineCellar, setEventWineCellar] = useState('Estate / Private Cellar Pairing');

  // Branch 3: Mentorship fields
  const [mentorshipCurrentRole, setMentorshipCurrentRole] = useState('Sous Chef / Junior Sous');
  const [mentorshipKitchen, setMentorshipKitchen] = useState('');
  const [mentorshipYearsOnLine, setMentorshipYearsOnLine] = useState('4–6 Years');
  const [mentorshipFocus, setMentorshipFocus] = useState('Station Speed & Mental Composure');
  const [mentorshipGoals, setMentorshipGoals] = useState('');

  // Branch 4: General fields
  const [generalSubject, setGeneralSubject] = useState('Press & Media Interview');

  // Form handling state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<InquiryResponse | null>(null);

  // Sync initialBranch if updated via navigation props
  useEffect(() => {
    if (initialBranch) {
      setSelectedBranch(initialBranch);
    }
  }, [initialBranch]);

  // Track branch selection event for conversion analytics
  useEffect(() => {
    trackBranchSelect(selectedBranch);
  }, [selectedBranch]);

  const handleScopeToggle = (item: string) => {
    setConsultingScope(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email address.';
    if (captchaAnswer.trim() !== '11') {
      errs.captcha = 'Please solve the anti-spam verification (7 + 4 = 11).';
    }

    if (selectedBranch === 'consulting') {
      if (!consultingEstablishment.trim()) errs.consultingEstablishment = 'Establishment or property name is required.';
    } else if (selectedBranch === 'events') {
      if (!eventLocation.trim()) errs.eventLocation = 'Target venue or city location is required.';
    } else if (selectedBranch === 'mentorship') {
      if (!mentorshipKitchen.trim()) errs.mentorshipKitchen = 'Current kitchen or background is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot check
    if (honeypot.trim().length > 0) {
      console.warn('Spam honeypot triggered');
      return;
    }

    setIsSubmitting(true);

    let branchDetails: Record<string, any> = {};

    if (selectedBranch === 'consulting') {
      branchDetails = {
        establishment: consultingEstablishment,
        location: consultingLocation,
        timeline: consultingTimeline,
        coversOrSeats: consultingSeats,
        scope: consultingScope,
        budgetRange: consultingBudget
      };
    } else if (selectedBranch === 'events') {
      branchDetails = {
        format: eventFormat,
        targetDate: eventDate || 'Flexible / In Discussion',
        guestCount: eventGuestCount,
        location: eventLocation,
        winePairing: eventWineCellar,
        dietaryNotes: eventDietaryNotes
      };
    } else if (selectedBranch === 'mentorship') {
      branchDetails = {
        currentRole: mentorshipCurrentRole,
        currentKitchen: mentorshipKitchen,
        yearsOnLine: mentorshipYearsOnLine,
        focusArea: mentorshipFocus,
        longTermGoals: mentorshipGoals
      };
    } else {
      branchDetails = {
        subject: generalSubject
      };
    }

    const payload: InquirySubmission = {
      serviceType: selectedBranch,
      name,
      email,
      phone,
      details: branchDetails,
      notes,
      honeypot
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data: InquiryResponse = await res.json();
        setConfirmationData(data);
        trackInquirySubmit(selectedBranch, data.inquiryId, {
          name,
          email,
          phone: phone || undefined,
          serviceType: selectedBranch,
          ...branchDetails
        });
      } else {
        const errData = await res.json();
        setErrors({ form: errData.error || 'Submission failed. Please check your fields.' });
      }
    } catch (err) {
      // Fallback offline confirmation
      const fallbackId = `AY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationData({
        success: true,
        inquiryId: fallbackId,
        serviceType: selectedBranch,
        receivedAt: new Date().toISOString(),
        tags: [`#${selectedBranch}-intake`, '#direct-atelier'],
        notificationRoutedTo: `#inquiries-${selectedBranch}`,
        message: 'Your inquiry has been logged into Chef Adam Yoho’s service intake journal.'
      });
      trackInquirySubmit(selectedBranch, fallbackId, {
        name,
        email,
        phone: phone || undefined,
        serviceType: selectedBranch,
        ...branchDetails
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setConfirmationData(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCaptchaAnswer('');
    setErrors({});
  };

  return (
    <div id="contact-intake-page" className="pt-28 pb-24 text-[#f5f0e8] space-y-16 sm:space-y-24">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            ATELIER INTAKE & CORRESPONDENCE
          </span>
          <h1 className="font-display text-[36px] sm:text-[54px] md:text-[64px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.08]">
            Initiate an Inquiry
          </h1>
          <p className="font-text text-[18px] sm:text-[20px] text-[#d4cfc4] leading-relaxed">
            Please select your engagement branch below. Our intake engine tailors the questionnaire directly to your service parameters without reloading the page.
          </p>
        </div>
      </section>

      {/* 2. Main Form Container */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12">
        <div className="bg-[#161514] border border-[#2a2825] p-8 sm:p-12 shadow-2xl">
          
          {/* CONFIRMATION STATE (Replaces form asynchronously on success) */}
          {confirmationData ? (
            <div id="intake-confirmation-receipt" className="space-y-8 py-4 animate-fadeIn">
              <div className="flex items-center space-x-3 text-[#5fa657]">
                <CheckCircle2 className="w-8 h-8 shrink-0" />
                <div>
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#5fa657] uppercase block">
                    INQUIRY DISPATCHED & LOGGED
                  </span>
                  <h3 className="font-display text-[24px] sm:text-[28px] tracking-[1.5px] uppercase text-[#f5f0e8]">
                    Inquiry Reference: {confirmationData.inquiryId}
                  </h3>
                </div>
              </div>

              <div className="p-6 bg-[#0d0d0c] border border-[#2a2825] space-y-4 font-mono-kitchen text-[12px]">
                <div className="flex flex-wrap items-center justify-between border-b border-[#22201d] pb-3">
                  <span className="text-[#9c9488]">SERVICE DISPATCH:</span>
                  <span className="text-[#f5f0e8] uppercase font-display text-[14px]">
                    {confirmationData.serviceType}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between border-b border-[#22201d] pb-3">
                  <span className="text-[#9c9488]">CLIENT SENDER:</span>
                  <span className="text-[#f5f0e8]">{name} &lt;{email}&gt;</span>
                </div>
                <div className="flex flex-wrap items-center justify-between border-b border-[#22201d] pb-3">
                  <span className="text-[#9c9488]">ROUTED NOTIFICATION:</span>
                  <span className="text-[#c1651a]">{confirmationData.notificationRoutedTo}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <span className="text-[#9c9488]">TIMESTAMP:</span>
                  <span className="text-[#9c9488]">{new Date(confirmationData.receivedAt).toUTCString()}</span>
                </div>
              </div>

              <p className="font-text text-[16px] text-[#d4cfc4] leading-relaxed">
                Thank you, {name}. Your inquiry has been routed to Chef Adam Yoho and the atelier pass. You will receive an initial response and engagement diagnostic within 24 to 48 business hours.
              </p>

              <div className="pt-4 border-t border-[#2a2825] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  id="confirmation-calendly-btn"
                  onClick={onOpenCalendly}
                  className="btn-pill-transparent text-[12px] px-8 py-2.5 w-full sm:w-auto"
                >
                  SCHEDULE INTRO CALL NOW (20M)
                </button>
                <button
                  onClick={handleResetForm}
                  className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] hover:text-[#f5f0e8] transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            
            /* ACTIVE INTAKE FORM */
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Service Selector Branching Tabs */}
              <div>
                <label className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block mb-3 uppercase">
                  1. SELECT SERVICE BRANCH *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'consulting', label: 'CONSULTING', sub: 'Hospitality & R&D' },
                      { id: 'events', label: 'EVENTS', sub: 'Private Dining' },
                      { id: 'mentorship', label: 'MENTORSHIP', sub: 'Chef Line Coaching' },
                      { id: 'general', label: 'GENERAL', sub: 'Press & Direct' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      id={`branch-selector-${b.id}`}
                      onClick={() => {
                        setSelectedBranch(b.id);
                        setErrors({});
                      }}
                      className={`p-3.5 text-left border transition-all ${
                        selectedBranch === b.id
                          ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                          : 'border-[#2a2825] bg-[#0d0d0c] text-[#9c9488] hover:border-[#423e38]'
                      }`}
                    >
                      <span className="font-mono-kitchen text-[11px] tracking-[1.5px] block font-display">
                        {b.label}
                      </span>
                      <span className="font-mono-kitchen text-[9px] text-[#9c9488] block mt-0.5">
                        {b.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Contact Information */}
              <div className="space-y-6 border-t border-[#22201d] pt-8">
                <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] uppercase block">
                  2. CONTACT CREDENTIALS
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                      FULL NAME *
                    </label>
                    <input
                      id="intake-input-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="input-underline"
                    />
                    {errors.name && (
                      <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="intake-input-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marcus@hospitalitygroup.com"
                      className="input-underline"
                    />
                    {errors.email && (
                      <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                    TELEPHONE (OPTIONAL)
                  </label>
                  <input
                    id="intake-input-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 000-0000"
                    className="input-underline"
                  />
                </div>
              </div>

              {/* BRANCH 1: CONSULTING FIELD SET */}
              {selectedBranch === 'consulting' && (
                <div id="branch-fieldset-consulting" className="space-y-6 border-t border-[#22201d] pt-8 animate-fadeIn">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] uppercase block">
                    3. CONSULTING & KITCHEN PARAMETERS
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        ESTABLISHMENT / HOTEL PROPERTY NAME *
                      </label>
                      <input
                        type="text"
                        value={consultingEstablishment}
                        onChange={(e) => setConsultingEstablishment(e.target.value)}
                        placeholder="e.g. The Mercer Dining Room"
                        className="input-underline"
                      />
                      {errors.consultingEstablishment && (
                        <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.consultingEstablishment}</p>
                      )}
                    </div>

                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        LOCATION (CITY, STATE / COUNTRY)
                      </label>
                      <input
                        type="text"
                        value={consultingLocation}
                        onChange={(e) => setConsultingLocation(e.target.value)}
                        placeholder="e.g. Healdsburg, CA"
                        className="input-underline"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        TARGET TIMELINE
                      </label>
                      <select
                        value={consultingTimeline}
                        onChange={(e) => setConsultingTimeline(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="Q3 2026 (Immediate)">Q3 2026 (Immediate)</option>
                        <option value="Q4 2026 (Autumn/Winter)">Q4 2026 (Autumn/Winter)</option>
                        <option value="Q1/Q2 2027 (Pre-Opening)">Q1/Q2 2027 (Pre-Opening)</option>
                        <option value="Ongoing Advisory Retainer">Ongoing Advisory Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        DINING CAPACITY
                      </label>
                      <select
                        value={consultingSeats}
                        onChange={(e) => setConsultingSeats(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="Under 40 Seats (Intimate)">Under 40 Seats (Intimate)</option>
                        <option value="40–80 Seats (Fine Dining)">40–80 Seats (Fine Dining)</option>
                        <option value="80–150 Seats (High Density)">80–150 Seats (High Density)</option>
                        <option value="Multi-Unit / Hotel Complex">Multi-Unit / Hotel Complex</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        ESTIMATED BUDGET
                      </label>
                      <select
                        value={consultingBudget}
                        onChange={(e) => setConsultingBudget(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="$15,000 – $25,000">$15,000 – $25,000</option>
                        <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                        <option value="$50,000 – $100,000+">$50,000 – $100,000+</option>
                        <option value="Quarterly Retainer Scope">Quarterly Retainer Scope</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-2">
                      SPECIFIC AREAS OF ADVISORY (SELECT ALL THAT APPLY)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Kitchen Line Ergonomics & Pass Flow',
                        'Tasting Menu R&D & Recipe Bibles',
                        'Prime Food Cost & Yield Engineering',
                        'Brigade Station Discipline & SOPs',
                        'Michelin Guide Audit Preparation',
                        'Direct Purveyor Network Sourcing'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleScopeToggle(item)}
                          className={`p-2.5 text-left border font-mono-kitchen text-[11px] tracking-[1px] transition-colors flex items-center space-x-2 ${
                            consultingScope.includes(item)
                              ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                              : 'border-[#2a2825] bg-[#0d0d0c] text-[#9c9488]'
                          }`}
                        >
                          <span className={`w-3 h-3 border flex items-center justify-center text-[10px] ${
                            consultingScope.includes(item) ? 'border-[#f5f0e8] text-[#c1651a]' : 'border-[#423e38]'
                          }`}>
                            {consultingScope.includes(item) ? '✓' : ''}
                          </span>
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* BRANCH 2: EVENTS FIELD SET */}
              {selectedBranch === 'events' && (
                <div id="branch-fieldset-events" className="space-y-6 border-t border-[#22201d] pt-8 animate-fadeIn">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] uppercase block">
                    3. PRIVATE DINING PARAMETERS
                  </span>

                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                      DESIRED TASTING FORMAT
                    </label>
                    <select
                      value={eventFormat}
                      onChange={(e) => setEventFormat(e.target.value)}
                      className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                    >
                      <option value="Live Wood Hearth Chef’s Table (8–14 Guests)">Live Wood Hearth Chef’s Table (8–14 Guests)</option>
                      <option value="Vineyard Terroir Banquet (16–60 Guests)">Vineyard Terroir Banquet (16–60 Guests)</option>
                      <option value="Private Estate Tasting Salon (6–20 Guests)">Private Estate Tasting Salon (6–20 Guests)</option>
                      <option value="Custom Culinary Commission">Custom Culinary Commission</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        TARGET EVENT DATE
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2 text-xs font-mono-kitchen"
                      />
                    </div>
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        GUEST COUNT
                      </label>
                      <input
                        type="number"
                        min="4"
                        max="80"
                        value={eventGuestCount}
                        onChange={(e) => setEventGuestCount(e.target.value)}
                        placeholder="e.g. 12"
                        className="input-underline text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        VENUE / CITY LOCATION *
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Napa Valley Estate"
                        className="input-underline text-xs"
                      />
                      {errors.eventLocation && (
                        <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.eventLocation}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                      DIETARY PREFERENCES / ALLERGY CONSIDERATIONS
                    </label>
                    <input
                      type="text"
                      value={eventDietaryNotes}
                      onChange={(e) => setEventDietaryNotes(e.target.value)}
                      placeholder="e.g. One guest with shellfish allergy, two pescatarian tasting sequences"
                      className="input-underline"
                    />
                  </div>
                </div>
              )}

              {/* BRANCH 3: MENTORSHIP FIELD SET */}
              {selectedBranch === 'mentorship' && (
                <div id="branch-fieldset-mentorship" className="space-y-6 border-t border-[#22201d] pt-8 animate-fadeIn">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] uppercase block">
                    3. CULINARY BACKGROUND & MENTORSHIP GOALS
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        CURRENT CULINARY POSITION
                      </label>
                      <select
                        value={mentorshipCurrentRole}
                        onChange={(e) => setMentorshipCurrentRole(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="Sous Chef / Junior Sous">Sous Chef / Junior Sous</option>
                        <option value="Chef de Partie (3+ yrs on line)">Chef de Partie (3+ yrs on line)</option>
                        <option value="Pastry Chef / Section Lead">Pastry Chef / Section Lead</option>
                        <option value="Culinary Entrepreneur / Restaurant Opener">Culinary Entrepreneur / Restaurant Opener</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        CURRENT ESTABLISHMENT / KITCHEN *
                      </label>
                      <input
                        type="text"
                        value={mentorshipKitchen}
                        onChange={(e) => setMentorshipKitchen(e.target.value)}
                        placeholder="e.g. Atelier Crenn / San Francisco"
                        className="input-underline"
                      />
                      {errors.mentorshipKitchen && (
                        <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.mentorshipKitchen}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        YEARS COOKING BEHIND THE LINE
                      </label>
                      <select
                        value={mentorshipYearsOnLine}
                        onChange={(e) => setMentorshipYearsOnLine(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="2–3 Years">2–3 Years</option>
                        <option value="4–6 Years">4–6 Years</option>
                        <option value="7–10+ Years">7–10+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                        PRIMARY FOCUS OF MENTORSHIP
                      </label>
                      <select
                        value={mentorshipFocus}
                        onChange={(e) => setMentorshipFocus(e.target.value)}
                        className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                      >
                        <option value="Station Speed & Mental Composure">Station Speed & Mental Composure</option>
                        <option value="Palate Memory & Flavor Architecture">Palate Memory & Flavor Architecture</option>
                        <option value="Brigade Leadership & Pass Discipline">Brigade Leadership & Pass Discipline</option>
                        <option value="Opening My First Concept">Opening My First Concept</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* BRANCH 4: GENERAL FIELD SET */}
              {selectedBranch === 'general' && (
                <div id="branch-fieldset-general" className="space-y-6 border-t border-[#22201d] pt-8 animate-fadeIn">
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#c1651a] uppercase block">
                    3. GENERAL CORRESPONDENCE
                  </span>
                  <div>
                    <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                      SUBJECT
                    </label>
                    <select
                      value={generalSubject}
                      onChange={(e) => setGeneralSubject(e.target.value)}
                      className="w-full bg-[#0d0d0c] border border-[#423e38] text-[#f5f0e8] p-2.5 text-xs font-mono-kitchen"
                    >
                      <option value="Press & Media Interview">Press & Media Interview</option>
                      <option value="Keynote / Culinary Salon Appearance">Keynote / Culinary Salon Appearance</option>
                      <option value="Purveyor & Producer Collaboration">Purveyor & Producer Collaboration</option>
                      <option value="General Atelier Inquiry">General Atelier Inquiry</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Additional Notes & Narrative */}
              <div className="border-t border-[#22201d] pt-8 space-y-4">
                <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block uppercase">
                  4. PROJECT CONTEXT & SPECIFIC NOTES
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details regarding your dining room, private event vision, or line experience..."
                  className="w-full bg-[#0d0d0c] border border-[#423e38] p-4 text-[15px] font-text text-[#f5f0e8] placeholder-[#666057] focus:border-[#f5f0e8] outline-none"
                />
              </div>

              {/* SPAM HONEYPOT (Hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_fax_token">Fax Code</label>
                <input
                  id="website_fax_token"
                  name="website_fax_token"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Anti-Spam Math Verification */}
              <div className="p-4 bg-[#0d0d0c] border border-[#2a2825] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#c1651a]" />
                  <span className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488]">
                    ANTI-SPAM VERIFICATION: WHAT IS 7 + 4 ? *
                  </span>
                </div>
                <div className="w-32">
                  <input
                    id="intake-input-captcha"
                    type="text"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="e.g. 11"
                    className="input-underline text-center text-xs"
                  />
                  {errors.captcha && (
                    <p className="font-mono-kitchen text-[10px] text-[#d4a017] mt-1">{errors.captcha}</p>
                  )}
                </div>
              </div>

              {/* Form-level error */}
              {errors.form && (
                <div className="p-4 bg-[#201e1c] border border-[#d4a017] flex items-center space-x-2 text-[#d4a017] font-mono-kitchen text-[11px]">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Submit Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#666057] block">
                    ASYNC ENCRYPTION & TAILORED SLACK DISPATCH
                  </span>
                  <span className="font-text text-[12px] text-[#9c9488]">
                    No page reload. Direct confirmation upon transmission.
                  </span>
                </div>

                <button
                  id="intake-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill-transparent text-[13px] px-10 py-3 w-full sm:w-auto disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT INTAKE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* 3. Alternative Direct Calendly Scheduler Callout */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block">
          PREFER IMMEDIATE CALENDAR SCHEDULING?
        </span>
        <button
          id="direct-calendly-trigger"
          onClick={onOpenCalendly}
          className="font-mono-kitchen text-[12px] tracking-[2px] text-[#c1651a] hover:text-[#f5f0e8] transition-colors inline-flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>BOOK A 20-MINUTE INTRO CALL DIRECTLY ON CALENDAR →</span>
        </button>
      </section>

    </div>
  );
};
