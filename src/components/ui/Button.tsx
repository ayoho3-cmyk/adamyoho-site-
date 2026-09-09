import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ember' | 'icon' | 'link';
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  icon,
  ...props
}) => {
  if (variant === 'primary') {
    return (
      <button
        className={`btn-pill-transparent ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'ember') {
    return (
      <button
        className={`btn-pill-ember ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        className={`btn-icon-circle ${className}`}
        {...props}
      >
        {children || icon}
      </button>
    );
  }

  if (variant === 'link') {
    return (
      <button
        className={`text-link-ember font-text text-[15px] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button className={`btn-pill-transparent ${className}`} {...props}>
      {children}
    </button>
  );
};
