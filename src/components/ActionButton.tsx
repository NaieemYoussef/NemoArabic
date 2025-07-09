import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const ActionButtonComponent: React.FC<ActionButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle = "flex items-center justify-center px-5 py-2.5 border rounded-lg shadow-sm text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";

  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border-transparent';
      break;
    case 'secondary':
      variantStyle = 'text-teal-700 bg-teal-100 hover:bg-teal-200 focus:ring-teal-500 border-teal-300';
      break;
    case 'danger':
      variantStyle = 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border-transparent';
      break;
  }

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && variant === 'primary' ? <LoadingSpinner size="small" color="text-white" /> :
        isLoading && (variant === 'secondary' || variant === 'danger') ? <LoadingSpinner size="small" color="text-teal-700" /> :
        children}
    </button>
  );
};

export const ActionButton = React.memo(ActionButtonComponent);
