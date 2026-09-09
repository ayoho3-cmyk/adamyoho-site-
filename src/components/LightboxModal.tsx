import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  caption?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  caption,
  onPrev,
  onNext
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="photo-lightbox-backdrop"
      className="fixed inset-0 z-50 bg-[#0d0d0c]/98 flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full max-w-6xl flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#c1651a] block">
            ATELIER ARCHIVE PHOTO
          </span>
          <h4 className="font-display text-[16px] sm:text-[20px] text-[#f5f0e8] uppercase tracking-[1.5px]">
            {title}
          </h4>
        </div>
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="btn-icon-circle text-[#f5f0e8] hover:bg-[#f5f0e8]/10"
          aria-label="Close photo view"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {onPrev && (
          <button
            id="lightbox-prev-btn"
            onClick={onPrev}
            className="absolute left-2 sm:-left-12 z-20 btn-icon-circle bg-[#0d0d0c]/80 text-[#f5f0e8]"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="max-h-[72vh] max-w-full object-contain rounded-none border border-[#2a2825] shadow-2xl"
        />

        {onNext && (
          <button
            id="lightbox-next-btn"
            onClick={onNext}
            className="absolute right-2 sm:-right-12 z-20 btn-icon-circle bg-[#0d0d0c]/80 text-[#f5f0e8]"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div
        className="w-full max-w-4xl text-center pb-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {caption && (
          <p className="font-mono-kitchen text-[11px] tracking-[2px] text-[#9c9488] uppercase">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};
