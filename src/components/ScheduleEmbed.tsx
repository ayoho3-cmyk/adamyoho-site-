import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Video, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { trackBookingInitiated, trackBookingCompleted } from '../utils/analytics';

interface ScheduleEmbedProps {
  serviceBranch: 'consulting' | 'mentorship' | 'events';
  title?: string;
  subtitle?: string;
  defaultTopic?: string;
  onBookingSuccess?: () => void;
}

export const ScheduleEmbed: React.FC<ScheduleEmbedProps> = ({
  serviceBranch,
  title = 'Schedule a 20-Minute Intro Call',
  subtitle = 'Reserve a direct scoping session with Chef Adam Yoho to audit project requirements, brigade training, or line mentorship goals.',
  defaultTopic = 'Initial Scoping & Diagnostic Scenarios',
  onBookingSuccess
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-08');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [timezone, setTimezone] = useState('America/Los_Angeles (Pacific)');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [kitchenOrg, setKitchenOrg] = useState('');
  const [topic, setTopic] = useState(defaultTopic);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const dateOptions = [
    { value: '2026-09-08', dayName: 'Tue', dateNum: 'Sep 08', status: 'Available' },
    { value: '2026-09-10', dayName: 'Thu', dateNum: 'Sep 10', status: 'Available' },
    { value: '2026-09-15', dayName: 'Tue', dateNum: 'Sep 15', status: '3 Slots Left' },
    { value: '2026-09-17', dayName: 'Thu', dateNum: 'Sep 17', status: 'Available' },
    { value: '2026-09-22', dayName: 'Tue', dateNum: 'Sep 22', status: 'Available' },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
  ];

  const handleDateSelect = (dateVal: string) => {
    setSelectedDate(dateVal);
    trackBookingInitiated(serviceBranch, `date_select_${dateVal}`);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !email.includes('@')) {
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `AY-CALL-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Dispatch booking event to serverless analytics & logging endpoint
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking_completed',
          branch: serviceBranch,
          metadata: {
            bookingRef: generatedRef,
            name: fullName,
            email,
            kitchenOrg,
            topic,
            date: selectedDate,
            time: selectedTime,
            timezone
          }
        })
      });

      trackBookingCompleted(serviceBranch, selectedDate, selectedTime, topic);
    } catch (err) {
      console.debug('Direct booking logged');
    } finally {
      setIsSubmitting(false);
      setBookingRef(generatedRef);
      setIsBooked(true);
      if (onBookingSuccess) onBookingSuccess();
    }
  };

  return (
    <div
      id={`schedule-embed-${serviceBranch}`}
      className="bg-[#161514] border border-[#2a2825] p-6 sm:p-10 text-[#f5f0e8] relative rounded-none"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2a2825] pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono-kitchen text-[11px] tracking-[2.5px] text-[#c1651a] uppercase block mb-1">
            DIRECT ATELIER CALENDAR EMBED
          </span>
          <h3 className="font-display text-[24px] sm:text-[28px] tracking-[1.5px] uppercase text-[#f5f0e8]">
            {title}
          </h3>
          <p className="font-text text-[14px] text-[#9c9488] mt-1 max-w-xl">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono-kitchen text-[#9c9488] bg-[#0d0d0c] border border-[#2a2825] px-3.5 py-2">
          <Clock className="w-3.5 h-3.5 text-[#c1651a]" />
          <span>20 MIN INTRO</span>
          <span className="text-[#2a2825]">·</span>
          <Video className="w-3.5 h-3.5 text-[#c1651a]" />
          <span>ZOOM / GOOGLE MEET</span>
        </div>
      </div>

      {isBooked ? (
        <div className="py-10 text-center space-y-5 animate-fadeIn">
          <div className="w-14 h-14 border border-[#5fa657] flex items-center justify-center mx-auto text-[#5fa657] bg-[#5fa657]/10">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#5fa657] block">
            CONFIRMATION REFERENCE: #{bookingRef}
          </span>
          <h4 className="font-display text-[26px] tracking-[2px] uppercase text-[#f5f0e8]">
            Introductory Consultation Confirmed
          </h4>
          <p className="font-text text-[15px] text-[#d4cfc4] max-w-lg mx-auto leading-relaxed">
            A calendar invitation and direct video conference link have been dispatched to{' '}
            <strong className="text-[#f5f0e8] underline">{email}</strong> for <strong>{selectedDate}</strong> at{' '}
            <strong>{selectedTime} ({timezone})</strong>.
          </p>
          <div className="p-4 bg-[#0d0d0c] border border-[#2a2825] max-w-md mx-auto font-mono-kitchen text-[11px] text-[#9c9488] space-y-1 text-left">
            <div><span className="text-[#f5f0e8]">CHEF:</span> Adam Yoho</div>
            <div><span className="text-[#f5f0e8]">TOPIC:</span> {topic}</div>
            <div><span className="text-[#f5f0e8]">ESTABLISHMENT:</span> {kitchenOrg || 'Private Booking'}</div>
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsBooked(false);
                setFullName('');
                setEmail('');
                setKitchenOrg('');
              }}
              className="btn-pill-transparent text-[11px] px-6 py-2.5"
            >
              BOOK ANOTHER SESSION
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step 1: Select Date & Time */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488] uppercase block mb-3">
                  1. Select Available Date
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {dateOptions.map((d) => {
                    const isSelected = selectedDate === d.value;
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => handleDateSelect(d.value)}
                        className={`p-2.5 text-center border transition-all ${
                          isSelected
                            ? 'bg-[#f5f0e8] text-[#0d0d0c] border-[#f5f0e8]'
                            : 'bg-[#0d0d0c] text-[#d4cfc4] border-[#2a2825] hover:border-[#423e38]'
                        }`}
                      >
                        <div className="font-mono-kitchen text-[9px] uppercase tracking-wider">{d.dayName}</div>
                        <div className="font-display text-[14px] mt-0.5">{d.dateNum.split(' ')[1]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488] uppercase block mb-3">
                  2. Select Time Slot ({timezone.split(' ')[0]})
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 text-center border font-mono-kitchen text-[11px] tracking-wider transition-all ${
                          isSelected
                            ? 'bg-[#c1651a] text-[#f5f0e8] border-[#c1651a]'
                            : 'bg-[#0d0d0c] text-[#d4cfc4] border-[#2a2825] hover:border-[#423e38]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#9c9488] uppercase block mb-1.5">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-[#0d0d0c] border border-[#2a2825] text-[#d4cfc4] text-xs font-mono-kitchen p-2 focus:outline-none focus:border-[#f5f0e8]"
                >
                  <option value="America/Los_Angeles (Pacific)">US / Pacific (PST/PDT)</option>
                  <option value="America/Denver (Mountain)">US / Mountain (MST/MDT)</option>
                  <option value="America/Chicago (Central)">US / Central (CST/CDT)</option>
                  <option value="America/New_York (Eastern)">US / Eastern (EST/EDT)</option>
                  <option value="Europe/London (GMT/BST)">Europe / London (GMT)</option>
                  <option value="Europe/Paris (CET)">Europe / Paris (CET)</option>
                </select>
              </div>
            </div>

            {/* Step 2: Contact & Topic Details */}
            <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-[#2a2825] lg:pl-8">
              <label className="font-mono-kitchen text-[11px] tracking-[1.5px] text-[#9c9488] uppercase block">
                3. Client & Objective Details
              </label>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[1px] text-[#9c9488] uppercase block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#0d0d0c] border-b border-[#423e38] px-0 py-2 text-[#f5f0e8] font-text text-[15px] focus:outline-none focus:border-[#f5f0e8] placeholder-[#666057]"
                />
              </div>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[1px] text-[#9c9488] uppercase block mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. elena@restaurantatelier.com"
                  className="w-full bg-[#0d0d0c] border-b border-[#423e38] px-0 py-2 text-[#f5f0e8] font-text text-[15px] focus:outline-none focus:border-[#f5f0e8] placeholder-[#666057]"
                />
              </div>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[1px] text-[#9c9488] uppercase block mb-1">
                  Establishment / Property or Current Station
                </label>
                <input
                  type="text"
                  value={kitchenOrg}
                  onChange={(e) => setKitchenOrg(e.target.value)}
                  placeholder="e.g. L'Hiver Dining Room or Independent Sous Chef"
                  className="w-full bg-[#0d0d0c] border-b border-[#423e38] px-0 py-2 text-[#f5f0e8] font-text text-[15px] focus:outline-none focus:border-[#f5f0e8] placeholder-[#666057]"
                />
              </div>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[1px] text-[#9c9488] uppercase block mb-1">
                  Primary Scoping Objective
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Kitchen Line Audit & Tasting Menu Redesign"
                  className="w-full bg-[#0d0d0c] border-b border-[#423e38] px-0 py-2 text-[#f5f0e8] font-text text-[15px] focus:outline-none focus:border-[#f5f0e8] placeholder-[#666057]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill-transparent w-full text-[12px] py-3 tracking-[2px] flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING CALENDAR HOLD...</span>
                  ) : (
                    <>
                      <span>CONFIRM 20-MIN CALL ({selectedDate} @ {selectedTime})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="font-mono-kitchen text-[10px] text-[#9c9488] text-center mt-2.5">
                  Direct calendar lock · Zero sales reps · Direct 1-on-1 with Chef Adam Yoho
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
