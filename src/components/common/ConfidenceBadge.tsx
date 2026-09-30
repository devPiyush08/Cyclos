import React from 'react';
import { Confidence } from '../../types';
import { getConfidenceStyle } from '../../utils/meteorology';
import { InfoTooltip } from './InfoTooltip';

interface ConfidenceBadgeProps {
  confidence: Confidence;
  reasons?: string[];
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence, reasons }) => {
  const style = getConfidenceStyle(confidence);

  return (
    <div className="inline-flex items-center gap-1.5" title={`Model Confidence: ${confidence}`}>
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ${style.bg} ${style.ink}`}>
        {/* Signal bars icon */}
        <span className="flex items-end gap-0.5 h-3 w-3.5" aria-hidden="true">
          <span className={`w-0.5 rounded-full ${style.bars >= 1 ? 'h-1.5 bg-current' : 'h-1.5 bg-current/30'}`} />
          <span className={`w-0.5 rounded-full ${style.bars >= 2 ? 'h-2.5 bg-current' : 'h-2.5 bg-current/30'}`} />
          <span className={`w-0.5 rounded-full ${style.bars >= 3 ? 'h-3.5 bg-current' : 'h-3.5 bg-current/30'}`} />
        </span>
        <span>{confidence} CONFIDENCE</span>
      </span>
      <InfoTooltip
        term="Confidence"
        customText={
          reasons && reasons.length > 0
            ? `Confidence criteria: ${reasons.join(' · ')}`
            : undefined
        }
      />
    </div>
  );
};
