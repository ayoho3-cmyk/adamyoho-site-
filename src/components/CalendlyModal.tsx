import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, Globe } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Culinary Advisory & Project Scoping'
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-08');
  const [selectedTime, setSelectedTime] = useState('10:00 AM PST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const availableDates = [
    { date: '2026-09-08', label: 'Tuesday, Sep 8' },
    { date: '2026-09-10', label: 'Thursday, Sep 10' },
    { date: '2026-09-15', label: 'Tuesday, Sep 15' },
    { date: '2026-09-17', label: 'Thursday, Sep 17' },
  ];

  const availableSlots = [
    '09:00 AM PST',
    '10:00 AM PST',
    '01:30 PM PST',
    '03:00 PM PST',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsBooked(true);
  };

  return (
    <div
      id="calendly-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#0d0d0c]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="calendly-modal-content"
        className="bg-[#161514] border border-[#2a2825] w-full max-w-2xl rounded-none p-6 sm:p-8 text-[#f5f0e8] relative shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
      >
        <button
          id="close-calendly-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#9c9488] hover:text-[#f5f0e8] transition-colors p-2"
          aria-label="Close scheduling modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border border-[#5fa657] flex items-center justify-center mx-auto text-[#5fa657]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#5fa657] block">
              RESERVATION CONFIRMED
            </span>
            <h3 className="font-display text-[24px] tracking-[2px] uppercase text-[#f5f0e8]">
              Introductory Call Scheduled
            </h3>
            <p className="font-text text-[15px] text-[#d4cfc4] max-w-md mx-auto">
              A private calendar invitation with video conference coordinates has been dispatched to <strong className="text-[#f5f0e8]">{email}</strong> for {selectedDate} at {selectedTime}.
            </p>
            <div className="pt-4">
              <button
                id="calendly-finish-btn"
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="btn-pill-transparent text-[12px] px-8 py-2.5"
              >
                RETURN TO SITE
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-[#2a2825] pb-4">
              <span className="font-mono-kitchen text-[10px] tracking-[2.5px] text-[#c1651a] block mb-1">
                PRIVATE CULINARY ADVISORY SCHEDULER
              </span>
              <h3 className="font-display text-[22px] sm:text-[26px] tracking-[2px] uppercase text-[#f5f0e8]">
                20-Minute Intro Consultation
              </h3>
              <div className="flex flex-wrap gap-4 text-xs font-mono-kitchen text-[#9c9488] mt-2">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#c1651a]" />
                  <span>20 MINUTES</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Video className="w-3.5 h-3.5 text-[#c1651a]" />
                  <span>GOOGLE MEET / SECURE VIDEO</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-[#c1651a]" />
                  <span>DIRECT WITH CHEF ADAM YOHO</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              {/* Select Date */}
              <div>
                <label className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block mb-2">
                  1. SELECT DATE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDates.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`p-2.5 text-center font-mono-kitchen text-[11px] tracking-[1.5px] border transition-all ${
                        selectedDate === item.date
                          ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                          : 'border-[#2a2825] bg-[#0d0d0c] text-[#9c9488] hover:border-[#423e38]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] block mb-2">
                  2. SELECT TIME SLOT
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2.5 text-center font-mono-kitchen text-[11px] tracking-[1.5px] border transition-all ${
                        selectedTime === slot
                          ? 'border-[#f5f0e8] bg-[#201e1c] text-[#f5f0e8]'
                          : 'border-[#2a2825] bg-[#0d0d0c] text-[#9c9488] hover:border-[#423e38]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="input-underline text-[14px]"
                  />
                </div>
                <div>
                  <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. marcus@hospitality.com"
                    className="input-underline text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
                  BRIEF OBJECTIVE / ESTABLISHMENT CONTEXT
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pre-opening kitchen audit for 60-seat restaurant in Napa"
                  className="input-underline text-[14px]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="font-mono-kitchen text-[10px] tracking-[1.5px] text-[#666057]">
                  TIMEZONE: PACIFIC TIME (PT)
                </span>
                <button
                  id="confirm-calendly-booking-btn"
                  type="submit"
                  className="btn-pill-transparent text-[12px] px-8 py-2.5"
                >
                  CONFIRM INTRO CALL
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
