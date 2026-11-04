import React from 'react';
import { CallRequestForm } from './CallRequestForm';

interface ScheduleEmbedProps {
  serviceBranch: 'consulting' | 'mentorship' | 'events';
  title?: string;
  subtitle?: string;
  topicPlaceholder?: string;
}

export const ScheduleEmbed: React.FC<ScheduleEmbedProps> = ({
  serviceBranch,
  title = 'Request a 20-Minute Intro Call',
  subtitle = 'Tell Chef Adam Yoho what you are working on and when you are free. He will email you to confirm a time.',
  topicPlaceholder
}) => (
  <div
    id={`schedule-embed-${serviceBranch}`}
    className="bg-[#161514] border border-[#2a2825] p-6 sm:p-10 text-[#f5f0e8] relative rounded-none"
  >
    <div className="border-b border-[#2a2825] pb-6 mb-8">
      <h3 className="font-display text-[24px] sm:text-[28px] tracking-[1.5px] uppercase text-[#f5f0e8]">
        {title}
      </h3>
      <p className="font-text text-[14px] text-[#9c9488] mt-1 max-w-xl">{subtitle}</p>
    </div>
    <CallRequestForm serviceBranch={serviceBranch} topicPlaceholder={topicPlaceholder} />
  </div>
);
