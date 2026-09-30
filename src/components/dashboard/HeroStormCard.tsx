import React from 'react';
import { Storm } from '../../types';
import { useAppStore } from '../../store/useStore';
import { GradeBadge } from '../common/GradeBadge';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { formatWind, formatCoords } from '../../utils/meteorology';
import { ArrowRight, Compass, Navigation, MapPin } from 'lucide-react';

interface HeroStormCardProps {
  storm: Storm;
}

export const HeroStormCard: React.FC<HeroStormCardProps> = ({ storm }) => {
  const { unitWind, setTab, setDetailTab } = useAppStore();
  const windDisplay = formatWind(storm.current_vmax_kt, unitWind);

  // Semicircle gauge calculation: 0 to 120 kt range
  const minKts = 0;
  const maxKts = 120;
  const clampedWind = Math.min(maxKts, Math.max(minKts, storm.current_vmax_kt));
  const progressRatio = (clampedWind - minKts) / (maxKts - minKts);
  const radius = 64;
  const strokeWidth = 9;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const handleOpenDetail = () => {
    setDetailTab('overview');
    setTab('storms');
  };

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full relative overflow-hidden transition-colors">
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C8373] dark:text-[#9BA5B5] uppercase tracking-wider mb-1">
              <span>{storm.id}</span>
              <span>·</span>
              <span>{storm.basin}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C222B] dark:text-[#EAEFF5]">
              Cyclone {storm.name}
            </h2>
          </div>

          <GradeBadge grade={storm.current_grade} showFullName size="md" />
        </div>

        {/* Confidence & Coordinates */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <ConfidenceBadge confidence={storm.confidence} reasons={storm.confidence_reasons} />
          <span className="text-xs font-mono bg-[#F4EFE6] dark:bg-[#222937] text-[#5C5547] dark:text-[#B0BCCB] px-2.5 py-0.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F394A]">
            {formatCoords(storm.current_lat, storm.current_lon)}
          </span>
        </div>
      </div>

      {/* Semicircle Vmax Gauge */}
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="relative w-44 h-26 flex items-end justify-center">
          <svg className="w-44 h-26 overflow-visible" viewBox="0 0 160 85">
            {/* Background Arc */}
            <path
              d="M 16 80 A 64 64 0 0 1 144 80"
              fill="none"
              stroke="currentColor"
              className="text-[#EBE4D8] dark:text-[#2C3545]"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Active Colored Arc */}
            <path
              d="M 16 80 A 64 64 0 0 1 144 80"
              fill="none"
              stroke="currentColor"
              className="text-[#232C37] dark:text-[#E2C38A] transition-all duration-700 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            {/* Category threshold marks */}
            <circle cx="56" cy="27" r="2.5" fill="#C99846" aria-label="CS 34 kt" />
            <circle cx="80" cy="16" r="2.5" fill="#C27A45" aria-label="SCS 48 kt" />
            <circle cx="108" cy="25" r="2.5" fill="#B85244" aria-label="VSCS+ 64 kt" />
          </svg>

          {/* Central Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 text-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#1C222B] dark:text-[#EAEFF5] tabular-nums">
              {windDisplay.primary}
            </span>
            <span className="text-[11px] font-mono text-[#827A6D] dark:text-[#9AA5B6] font-medium">
              ± {storm.current_vmax_std.toFixed(1)} kt · {windDisplay.secondary}
            </span>
          </div>
        </div>

        {/* Small legend for gauge ticks */}
        <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-[#8C8373] dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99846]" />
            CS 34kt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C27A45]" />
            SCS 48kt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B85244]" />
            VSCS+ 64kt
          </span>
        </div>
      </div>

      {/* Metrics Row: Heading & Landfall */}
      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#EFE9DF] dark:border-[#272F3E] text-xs font-mono mb-4">
        <div className="p-2.5 rounded-xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546]">
          <div className="text-[11px] text-[#8A8171] dark:text-slate-400 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#635E54] dark:text-slate-300" />
            <span>Motion Vector</span>
          </div>
          <div className="font-semibold text-[#1C222B] dark:text-[#EAEFF5] mt-0.5">
            {storm.motion_compass} ({storm.motion_heading_deg}°) · {storm.motion_speed_kmh} km/h
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546]">
          <div className="text-[11px] text-[#8A8171] dark:text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B85244]" />
            <span>Nearest Coast</span>
          </div>
          <div className="font-semibold text-[#1C222B] dark:text-[#EAEFF5] mt-0.5 truncate">
            {storm.dist_to_land_km} km to coast
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleOpenDetail}
        className="w-full py-2.5 px-4 bg-[#232C37] hover:bg-[#34404F] dark:bg-[#EAE4D9] dark:text-[#161A22] text-[#FAF8F5] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
      >
        <span>Open Storm Diagnostics</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
