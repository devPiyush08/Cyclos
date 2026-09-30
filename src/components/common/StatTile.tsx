import React from 'react';
import { InfoTooltip } from './InfoTooltip';

interface StatTileProps {
  label: string;
  value: React.ReactNode;
  unit?: string;
  footnote?: string;
  tooltipTerm?: string;
  tooltipCustom?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  className?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  unit,
  footnote,
  tooltipTerm,
  tooltipCustom,
  trendText,
  className = ''
}) => {
  return (
    <div
      className={`bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-150 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between text-xs font-medium text-[#7A7264] dark:text-[#9BA5B5] mb-2">
        <span className="truncate">{label}</span>
        {tooltipTerm && <InfoTooltip term={tooltipTerm} customText={tooltipCustom} />}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[#1C222B] dark:text-[#EAEFF5] tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono font-medium text-[#8F8778] dark:text-slate-400 uppercase">
            {unit}
          </span>
        )}
      </div>

      {(footnote || trendText) && (
        <div className="mt-2 pt-2 border-t border-[#EFEAE1] dark:border-[#27303E] text-xs text-[#807767] dark:text-[#9BA5B5] flex items-center justify-between">
          <span className="truncate">{footnote}</span>
          {trendText && (
            <span className="font-mono text-[11px] font-semibold text-[#66563A] dark:text-[#CBB58F] bg-[#F5EFE4] dark:bg-[#252E3E] px-1.5 py-0.5 rounded shrink-0 ml-1">
              {trendText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
