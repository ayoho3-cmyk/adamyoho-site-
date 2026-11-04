import React from 'react';
import { X, Clock, Video } from 'lucide-react';
import { ServiceBranch } from '../types';
import { CallRequestForm } from './CallRequestForm';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceBranch: ServiceBranch;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose, serviceBranch }) => {
  if (!isOpen) return null;

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
          aria-label="Close call request form"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="border-b border-[#2a2825] pb-4">
            <h3 className="font-display text-[22px] sm:text-[26px] tracking-[2px] uppercase text-[#f5f0e8] pr-10">
              Request a 20-Minute Intro Call
            </h3>
            <div className="flex flex-wrap gap-4 text-xs font-mono-kitchen text-[#9c9488] mt-2">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#c1651a]" />
                <span>20 MINUTES</span>
              </span>
              <span className="flex items-center space-x-1">
                <Video className="w-3.5 h-3.5 text-[#c1651a]" />
                <span>DIRECT WITH CHEF ADAM YOHO</span>
              </span>
            </div>
          </div>
          <CallRequestForm serviceBranch={serviceBranch} />
        </div>
      </div>
    </div>
  );
};
