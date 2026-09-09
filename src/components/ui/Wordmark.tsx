import React from 'react';

export interface WordmarkProps {
  onClick?: () => void;
  className?: string;
  id?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  onClick,
  className = '',
  id = 'wordmark-adam-yoho'
}) => {
  return (
    <span
      id={id}
      onClick={onClick}
      className={`font-display text-[14px] leading-none tracking-[6px] uppercase text-[#f5f0e8] select-none ${
        onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''
      } ${className}`}
    >
      ADAM YOHO
    </span>
  );
};
