import React from 'react';
import { AlertItem } from '../../types';
import { useAppStore } from '../../store/useStore';
import { SeverityChip } from '../common/SeverityChip';
import { ArrowRight, BellRing } from 'lucide-react';
import { formatTimeCompact } from '../../utils/meteorology';

interface AlertsFeedCardProps {
  alerts: AlertItem[];
}

export const AlertsFeedCard: React.FC<AlertsFeedCardProps> = ({ alerts }) => {
  const { setTab } = useAppStore();

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BellRing className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Operational Bulletins
          </h3>
        </div>

        <button
          onClick={() => setTab('alerts')}
          className="text-xs font-semibold text-[#8A734D] dark:text-[#E2C38A] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>All Bulletins ({alerts.length})</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-[#EFEAE1] dark:divide-[#27303E] space-y-2.5">
        {alerts.slice(0, 4).map(alert => (
          <div
            key={alert.id}
            onClick={() => setTab('alerts')}
            className="pt-2.5 first:pt-0 hover:bg-[#F8F5EE] dark:hover:bg-[#202735] p-2 rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <SeverityChip severity={alert.severity} size="sm" />
                <span className="text-xs font-bold text-[#1C222B] dark:text-white group-hover:text-[#8A734D] transition-colors truncate">
                  {alert.title}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8C8373] dark:text-slate-400 shrink-0">
                {formatTimeCompact(alert.issued_at)}
              </span>
            </div>

            <p className="text-xs text-[#5C5547] dark:text-[#A8B2C2] line-clamp-2 leading-relaxed">
              {alert.message}
            </p>

            <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-[#8C8373] dark:text-slate-400">
              <span>Target: Cyclone {alert.storm_name}</span>
              <span>·</span>
              <span>Rule: {alert.rule_type.replace('_', ' ')}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#EFEAE1] dark:border-[#27303E] flex items-center justify-between text-[11px] text-[#8C8373] dark:text-slate-400 font-mono">
        <span>Rule engine v2</span>
        <span className="text-[#A8712C] dark:text-[#E2C38A] font-medium">Advisory level</span>
      </div>
    </div>
  );
};
