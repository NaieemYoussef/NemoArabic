import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  value: string;
  isLoading?: boolean;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ id, value, isLoading = false, className = '', ...props }) => {
  const textAreaMinHeight = "268px";

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        id={id}
        value={value}
        style={{ minHeight: textAreaMinHeight }}
        className={`w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors duration-150 text-right resize-y text-base md:text-lg
                    ${props.readOnly ? 'bg-slate-100 text-slate-700 cursor-default' : 'bg-white text-slate-800'}
                    ${props.disabled ? 'bg-slate-200 cursor-not-allowed' : ''}
                    ${isLoading && props.readOnly ? 'text-transparent' : ''}
                  `}
        dir="rtl"
        {...props}
      />
      {isLoading && props.readOnly && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg"
          style={{ minHeight: textAreaMinHeight }}
        >
          <LoadingSpinner size="large" />
        </div>
      )}
      {isLoading && !props.readOnly && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};
