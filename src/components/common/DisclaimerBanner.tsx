import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2 text-[11px] text-[#706757] dark:text-[#A8B2C2] py-1 px-3 bg-[#F4EFE6]/80 dark:bg-[#1A202C]/60 rounded-xl border border-[#E6DFD2] dark:border-[#2C3544]">
        <div className="flex items-center gap-2 truncate">
          <AlertCircle className="w-3.5 h-3.5 text-[#B0762E] dark:text-[#E0A84D] shrink-0" />
          <span className="truncate">
            Research advisory prototype · For official bulletins, visit{' '}
            <a
              href="https://mausam.imd.gov.in"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[#1C222B] dark:hover:text-white font-medium inline-flex items-center gap-0.5"
            >
              IMD / RSMC New Delhi <ExternalLink className="w-2.5 h-2.5 inline" />
            </a>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F0E6] dark:bg-[#1B212D] border border-[#E7DFD1] dark:border-[#2C3545] rounded-2xl py-2.5 px-4 text-xs text-[#6B6252] dark:text-[#A7B2C2] transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#A8712C] dark:text-[#D99F44] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-semibold text-[#1C222B] dark:text-white">Advisory Notice:</span>{' '}
            AI identification and 48h track/intensity predictions are generated for research & evaluation (SIH PS 26070). Refer to the{' '}
            <a
              href="https://mausam.imd.gov.in"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold text-[#1C222B] dark:text-white hover:text-[#B0762E] inline-flex items-center gap-1"
            >
              India Meteorological Department (IMD)
              <ExternalLink className="w-3 h-3 inline" />
            </a>{' '}
            for official public safety warnings.
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-[#8C8270] hover:text-[#1C222B] dark:hover:text-white rounded-lg hover:bg-[#EBE3D3] dark:hover:bg-[#252E3E] transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss notice"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
