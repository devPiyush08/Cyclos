import React from 'react';
import { Severity } from '../../types';
import { getSeverityStyle } from '../../utils/meteorology';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface SeverityChipProps {
  severity: Severity;
  label?: string;
  size?: 'sm' | 'md';
}

export const SeverityChip: React.FC<SeverityChipProps> = ({ severity, label, size = 'md' }) => {
  const style = getSeverityStyle(severity);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  const renderIcon = () => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 shrink-0" />;
      case 'watch':
        return <AlertCircle className="w-3.5 h-3.5 shrink-0" />;
      case 'info':
        return <Info className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-md border ${style.bg} ${style.ink} ${style.border} ${sizeClasses} tracking-wide select-none`}
      title="Internal advisory severity level (Advisory only)"
    >
      {renderIcon()}
      <span>{label || style.label}</span>
    </span>
  );
};
