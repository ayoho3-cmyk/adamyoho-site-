import React, { useState, useRef, useEffect } from 'react';
import { RoutePath } from '../types';
import { TIMELINE_EVENTS, KITCHEN_PRINCIPLES } from '../data/cms';
import { ArrowRight, Flame, Award, BookOpen, Clock, Camera, Upload, Check, AlertCircle, RefreshCw, Globe } from 'lucide-react';
import chefAdamPhoto from '../assets/images/chef_adam_yoho.jpg';

interface AboutPageProps {
  onNavigate: (route: RoutePath) => void;
  onOpenCalendly: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenCalendly }) => {
  const [portraitUrl, setPortraitUrl] = useState<string>(() => {
    const saved = localStorage.getItem('chef_adam_portrait_url');
    if (saved && saved.startsWith('data:image')) {
      return saved;
    }
    return chefAdamPhoto;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-sync custom portrait on component mount to ensure server disk is updated
  useEffect(() => {
    const saved = localStorage.getItem('chef_adam_portrait_url');
    if (saved && saved.startsWith('data:image')) {
      fetch('/api/upload/portrait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: saved })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.success) {
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 5000);
          }
        })
        .catch(err => console.warn('Auto-sync portrait to disk deferred:', err));
    }
  }, []);

  const handleManualSync = async () => {
    if (!portraitUrl || !portraitUrl.startsWith('data:image')) {
      setUploadError('Please select or upload a photo first.');
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    try {
      const res = await fetch('/api/upload/portrait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: portraitUrl })
      });
      if (res.ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 5000);
      } else {
        setUploadError('Could not sync to repository disk.');
      }
    } catch {
      setUploadError('Network error while syncing to server.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    setUploadError(null);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setPortraitUrl(dataUrl);
        try {
          localStorage.setItem('chef_adam_portrait_url', dataUrl);
        } catch (err) {
          console.warn('LocalStorage quota exceeded or unavailable', err);
        }

        // Persist to server backend disk
        try {
          const res = await fetch('/api/upload/portrait', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl })
          });
          if (res.ok) {
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 4000);
          }
        } catch (err) {
          console.error('Failed to sync portrait to backend', err);
        } finally {
          setIsUploading(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleResetDefault = () => {
    localStorage.removeItem('chef_adam_portrait_url');
    setPortraitUrl(chefAdamPhoto);
    setUploadSuccess(false);
    setUploadError(null);
  };

  return (
    <div id="about-page-container" className="pt-28 pb-24 text-[#f5f0e8] space-y-24 sm:space-y-32">
      
      {/* 1. Header & Hero Retrospective */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
              BIOGRAPHY & RETROSPECTIVE · 2002–2026
            </span>
            <h1 className="font-display text-[36px] sm:text-[52px] md:text-[60px] tracking-[3px] uppercase text-[#f5f0e8] leading-[1.1]">
              Twenty-Four Years Behind the Line.
            </h1>
            <p className="font-text text-[18px] sm:text-[20px] text-[#e8e3d8] leading-relaxed">
              Twenty four years at the pass, began at The Food Studio in Atlanta and has spanned from the Texas Hill Country to Columbus, Ohio; from Pittsburgh to Austin.
            </p>
            <p className="font-text text-[16px] text-[#d4cfc4] leading-relaxed">
              Over the course of 24 years, has led teams from pizza shops to high end steakhouse, taquerias to bistros, and been part of 8 openings including owning Uptown 51. He has developed an approach defined by passionate ingredient sourcing, calm, concentrated service, and classic technique.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
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
          </div>

          {/* Circular Chef Portrait with Direct Drag-and-Drop & File Upload Support */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              className={`relative cursor-pointer group transition-all duration-300 ${
                isDragging ? 'scale-105' : ''
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title="Click or drag & drop to upload your chef photo"
            >
              <div
                className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 p-2 bg-[#161514] shadow-2xl transition-colors duration-200 ${
                  isDragging
                    ? 'border-[#c1651a] shadow-[0_0_25px_rgba(193,101,26,0.4)]'
                    : 'border-[#2a2825] group-hover:border-[#c1651a]'
                }`}
              >
                <img
                  src={portraitUrl}
                  alt="Chef Adam Yoho portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />

                {/* Hover overlay with Upload/Camera Prompt */}
                <div className="absolute inset-2 rounded-full bg-[#0d0d0c]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#c1651a] text-[#f5f0e8] flex items-center justify-center shadow-md">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-mono-kitchen text-[11px] tracking-[2px] text-[#f5f0e8] uppercase font-medium">
                    Upload Your Photo
                  </span>
                  <span className="font-text text-[11px] text-[#a8a196]">
                    Click or drag & drop image here
                  </span>
                </div>
              </div>

              {/* Tag below circular frame */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#161514] border border-[#2a2825] px-4 py-1.5 whitespace-nowrap shadow-lg flex items-center gap-2">
                <span className="font-mono-kitchen text-[10px] tracking-[2px] text-[#9c9488]">
                  CHEF ADAM YOHO
                </span>
              </div>
            </div>

            {/* Upload Controls & Status Messages */}
            <div className="mt-8 flex flex-col items-center space-y-2.5 max-w-sm text-center">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="font-mono-kitchen text-[10.5px] tracking-[1.5px] text-[#c1651a] hover:text-[#f5f0e8] bg-[#161514] border border-[#2a2825] hover:border-[#c1651a] px-3.5 py-1.5 flex items-center gap-1.5 transition-colors uppercase"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c1651a]" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-[#c1651a]" />
                      Upload Photo
                    </>
                  )}
                </button>

                {portraitUrl.startsWith('data:image') && (
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isUploading}
                    className="font-mono-kitchen text-[10.5px] tracking-[1.5px] text-emerald-400 hover:text-[#f5f0e8] bg-[#161514] border border-[#2a2825] hover:border-emerald-500 px-3.5 py-1.5 flex items-center gap-1.5 transition-colors uppercase"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Save for Live Site
                  </button>
                )}

                {portraitUrl !== chefAdamPhoto && (
                  <button
                    type="button"
                    onClick={handleResetDefault}
                    className="font-mono-kitchen text-[10px] tracking-[1px] text-[#6e685f] hover:text-[#9c9488] px-2 py-1 underline transition-colors"
                  >
                    Reset default
                  </button>
                )}
              </div>

              {uploadSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono-kitchen text-[11px] tracking-[0.5px] bg-[#161514] border border-emerald-900/50 px-3 py-1.5 rounded">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Photo saved to repository assets for live site deploy</span>
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-1.5 text-rose-400 font-mono-kitchen text-[11px] bg-[#161514] border border-rose-900/50 px-3 py-1.5 rounded">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <p className="font-mono-kitchen text-[9.5px] tracking-[0.5px] text-[#6e685f] leading-relaxed">
                Photos uploaded here are stored in <code className="text-[#9c9488]">public/chef-adam-yoho-bio.jpg</code> so your live domain (<code className="text-[#9c9488]">adamyoho.com</code>) serves your real photo instead of stock images.
              </p>
            </div>

          </div>

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

      {/* 4. Full-Bleed Sourcing & Terroir Band */}
      <section className="relative py-24 px-6 sm:px-12 md:px-20 overflow-hidden border-y border-[#2a2825]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=2000&q=80"
            alt="Sonoma agricultural landscape"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-30 contrast-125"
          />
          <div className="absolute inset-0 bg-[#0d0d0c]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono-kitchen text-[11px] tracking-[3px] text-[#c1651a] uppercase block">
            TERROIR & PURVEYOR FIDELITY
          </span>
          <h2 className="font-display text-[30px] sm:text-[42px] tracking-[2px] uppercase text-[#f5f0e8]">
            The Soil Before the Sauté Pan.
          </h2>
          <p className="font-text text-[16px] sm:text-[18px] text-[#d4cfc4] leading-relaxed">
            We work exclusively with twenty-two family-operated farms, wild seaweed and mushroom foragers, and day-boat fishermen who share our belief that genuine culinary luxury is freshly pulled from cold earth and clean ocean tide.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('press')}
              className="btn-pill-transparent text-[12px] px-8 py-2.5"
            >
              READ SOURCING ESSAYS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
