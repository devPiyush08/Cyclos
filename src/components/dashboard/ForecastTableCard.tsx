import React from 'react';
import { Storm } from '../../types';
import { useAppStore } from '../../store/useStore';
import { GradeBadge } from '../common/GradeBadge';
import { formatCoords, formatDistance, formatTimeCompact, formatWind } from '../../utils/meteorology';
import { CalendarClock, ShieldAlert } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

interface ForecastTableCardProps {
  storm: Storm;
}

export const ForecastTableCard: React.FC<ForecastTableCardProps> = ({ storm }) => {
  const { unitWind, unitDist } = useAppStore();

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Multi-Lead 48-Hour Prognosis Table
          </h3>
          <InfoTooltip term="Lead time" />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#7A7264] dark:text-slate-400">
          <span>Ensemble Mean</span>
          <span>·</span>
          <span>P67 Conformal Cone</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#EFEAE1] dark:border-[#283244] text-[#8C8373] dark:text-slate-400 font-semibold">
              <th className="py-2.5 px-3">Lead Time</th>
              <th className="py-2.5 px-3">Valid Time (UTC)</th>
              <th className="py-2.5 px-3">Centre Position</th>
              <th className="py-2.5 px-3 text-right">Vmax (Mean [p10-p90])</th>
              <th className="py-2.5 px-3 text-center">Predicted Grade</th>
              <th className="py-2.5 px-3 text-right">Cone Radius</th>
              <th className="py-2.5 px-3 text-right">Dist to Land</th>
              <th className="py-2.5 px-3 text-center">Land Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4EFE6] dark:divide-[#242C3A]">
            {storm.forecast_48h.map(f => {
              const wind = formatWind(f.vmax_mean_kt, unitWind);
              const p10 = Math.round(f.vmax_p10_kt);
              const p90 = Math.round(f.vmax_p90_kt);

              return (
                <tr
                  key={f.lead_h}
                  className="hover:bg-[#FAF8F5] dark:hover:bg-[#202735] transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-[#8A734D] dark:text-[#E2C38A]">
                    +{f.lead_h}h
                  </td>
                  <td className="py-3 px-3 text-[#5C5547] dark:text-slate-300">
                    {formatTimeCompact(f.valid_time)}
                  </td>
                  <td className="py-3 px-3 text-[#1C222B] dark:text-slate-200 font-semibold">
                    {formatCoords(f.lat, f.lon)}
                  </td>
                  <td className="py-3 px-3 text-right text-[#1C222B] dark:text-white font-bold tabular-nums">
                    <span>{wind.primary}</span>{' '}
                    <span className="text-[#8C8373] font-normal">
                      [{p10} - {p90} kt]
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <GradeBadge grade={f.predicted_grade} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right text-[#5C5547] dark:text-slate-300 tabular-nums">
                    ± {formatDistance(f.cone_radius_km, unitDist)}
                  </td>
                  <td className="py-3 px-3 text-right text-[#5C5547] dark:text-slate-300 tabular-nums">
                    {formatDistance(f.dist_to_land_km, unitDist)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {f.landfall_risk ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#BA5244] bg-[#FDF0EE] dark:bg-[#341C18] px-2 py-0.5 rounded-full border border-[#F2C7C0] dark:border-[#52251E]">
                        <ShieldAlert className="w-3 h-3" />
                        Cone touches land
                      </span>
                    ) : (
                      <span className="text-[#968E7E] text-[11px]">Open sea</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
