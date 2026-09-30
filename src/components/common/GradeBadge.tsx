import React from 'react';
import { Grade } from '../../types';
import { getGradeColor } from '../../utils/meteorology';

interface GradeBadgeProps {
  grade: Grade;
  showFullName?: boolean;
  size?: 'sm' | 'md';
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade, showFullName = false, size = 'md' }) => {
  const style = getGradeColor(grade);
  const sizeClasses = size === 'sm' ? 'h-5 px-2 text-[11px]' : 'h-6 px-2.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${style.bg} ${style.ink} ${style.border} ${sizeClasses} whitespace-nowrap tracking-wide select-none`}
      title={`IMD Intensity Grade: ${style.name}`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0 animate-pulse`} aria-hidden="true" />
      <span>{grade}</span>
      {showFullName && <span className="opacity-80 font-normal">· {style.name}</span>}
    </span>
  );
};
