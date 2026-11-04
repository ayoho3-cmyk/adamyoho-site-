import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceBranch } from '../types';

interface CallRequestFormProps {
  serviceBranch: ServiceBranch;
  topicPlaceholder?: string;
}

const detectTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Not provided';
  }
};

// Sends a call request to the inquiry inbox. Nothing is promised until the
// server has saved it, and Adam confirms the actual time by email.
export const CallRequestForm: React.FC<CallRequestFormProps> = ({
  serviceBranch,
  topicPlaceholder = 'e.g. Pre-opening kitchen audit for a 60-seat restaurant'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [topic, setTopic] = useState('');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: serviceBranch,
          name,
          email,
          notes: topic,
          honeypot,
          details: {
            requestType: 'intro_call',
            establishment,
            preferredTimes,
            timezone: detectTimezone()
          }
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }
      setIsSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== 'Failed to fetch' && err.message !== 'Request failed'
          ? err.message
          : 'Your request did not go through.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border border-[#5fa657] flex items-center justify-center mx-auto text-[#5fa657]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#5fa657] block">
          REQUEST RECEIVED
        </span>
        <p className="font-text text-[15px] text-[#d4cfc4] max-w-md mx-auto">
          Thanks, {name}. Adam will email <strong className="text-[#f5f0e8]">{email}</strong> within
          two business days to confirm a time. Your call isn't scheduled until then.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
            YOUR NAME *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            className="input-underline text-[14px]"
          />
        </div>
      </div>

      <div>
        <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
          RESTAURANT, VENUE OR CURRENT KITCHEN
        </label>
        <input
          type="text"
          value={establishment}
          onChange={(e) => setEstablishment(e.target.value)}
          className="input-underline text-[14px]"
        />
      </div>

      <div>
        <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
          WHAT WOULD YOU LIKE TO TALK ABOUT?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={topicPlaceholder}
          className="input-underline text-[14px]"
        />
      </div>

      <div>
        <label className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488] block mb-1">
          BEST DAYS AND TIMES
        </label>
        <input
          type="text"
          value={preferredTimes}
          onChange={(e) => setPreferredTimes(e.target.value)}
          placeholder="e.g. Tuesday or Thursday afternoons"
          className="input-underline text-[14px]"
        />
      </div>

      {/* Spam honeypot, hidden from real visitors */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_fax_token"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <div className="p-3 bg-[#201e1c] border border-[#d4a017] flex items-start space-x-2 text-[#d4a017] font-mono-kitchen text-[11px]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            {error} Please try again or email{' '}
            <a href="mailto:chef@adamyoho.com" className="underline">
              chef@adamyoho.com
            </a>
            .
          </span>
        </div>
      )}

      <div className="pt-2 flex justify-end">
        <button
          id="submit-call-request-btn"
          type="submit"
          disabled={isSubmitting}
          className="btn-pill-transparent text-[12px] px-8 py-2.5 disabled:opacity-50 flex items-center space-x-2"
        >
          <span>{isSubmitting ? 'SENDING...' : 'REQUEST INTRO CALL'}</span>
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
};
