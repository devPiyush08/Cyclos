import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { GLOSSARY } from '../../utils/meteorology';

interface InfoTooltipProps {
  term: keyof typeof GLOSSARY | string;
  customText?: string;
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ term, customText, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const text = customText || GLOSSARY[term] || term;

  return (
    <span className={`relative inline-flex items-center ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-help ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={`Definition of ${term}`}
        className="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5BFF]"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isVisible && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 text-xs font-normal text-white bg-[#0E1726] rounded-lg shadow-lg border border-slate-700 pointer-events-none transition-opacity duration-150 leading-relaxed text-left"
        >
          <strong className="block font-semibold text-slate-200 mb-0.5">{term}</strong>
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0E1726]" />
        </span>
      )}
    </span>
  );
};
