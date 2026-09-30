import React from 'react';
import { EnvironmentalParams } from '../../types';
import { Wind, Thermometer, Droplets, Gauge, Navigation } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

interface EnvironmentCardProps {
  env: EnvironmentalParams;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ env }) => {
  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Synoptic & Environmental Diagnostics
          </h3>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#F4EFE6] dark:bg-[#252E3E] text-[#7A7264] dark:text-slate-300 font-medium border border-[#E5DFD4] dark:border-[#2F394A]">
          Source: {env.source}
        </span>
      </div>

      {/* Environmental Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        {/* 1. Vertical Wind Shear */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium">850-200 hPa Shear</span>
            <InfoTooltip term="Shear" />
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.shear_magnitude_ms.toFixed(1)} <span className="text-xs font-normal">m/s</span>
          </div>
          <div className="mt-1 text-[11px] font-mono">
            <span
              className={`font-semibold px-1.5 py-0.5 rounded ${
                env.shear_category === 'Low'
                  ? 'text-[#2F5844] bg-[#E7EFEA] dark:bg-[#1E2E25] dark:text-[#96D1B2]'
                  : env.shear_category === 'Moderate'
                  ? 'text-[#785E2F] bg-[#F2ECE0] dark:bg-[#332A1C] dark:text-[#E2C38A]'
                  : 'text-[#BA5244] bg-[#FDF0EE] dark:bg-[#341C18]'
              }`}
            >
              {env.shear_category}
            </span>{' '}
            <span className="text-[#8C8373]">({env.shear_category === 'Low' ? 'Favourable' : 'Hostile'})</span>
          </div>
        </div>

        {/* 2. Sea-Surface Temperature */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-[#B85244]" />
              <span>SST Heat Flux</span>
            </span>
            <InfoTooltip term="Sea-surface temperature" />
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.sst_c.toFixed(1)} <span className="text-xs font-normal">°C</span>
          </div>
          <div className="mt-1 text-[11px] font-mono">
            <span className="font-semibold text-[#2F5844] bg-[#E7EFEA] dark:bg-[#1E2E25] dark:text-[#96D1B2] px-1.5 py-0.5 rounded">
              {env.sst_category}
            </span>{' '}
            <span className="text-[#8C8373]">(&gt;26.5°C threshold)</span>
          </div>
        </div>

        {/* 3. Steering Flow */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-[#7A6B52]" />
              <span>Steering Flow</span>
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.steer_speed_kmh.toFixed(1)} <span className="text-xs font-normal">km/h</span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#7A7264]">
            Heading: <strong className="text-[#1C222B] dark:text-slate-200">{env.steer_heading_deg}°</strong>
          </div>
        </div>

        {/* 4. Mid-Level Humidity (700 hPa) */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-[#5B7898]" />
              <span>700 hPa RH</span>
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.rh700_pct}%
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#2F5844] dark:text-[#96D1B2]">
            {env.rh_category} (&gt;60%)
          </div>
        </div>

        {/* 5. Peripheral MSLP */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#7C6885]" />
              <span>Peripheral MSLP</span>
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.mslp_hpa} <span className="text-xs font-normal">hPa</span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#8C8373]">
            Outer closed isobar
          </div>
        </div>

        {/* 6. 500 hPa Height */}
        <div className="p-3 rounded-2xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7A7264] dark:text-slate-400 mb-1">
            <span className="font-medium">500 hPa Height</span>
          </div>
          <div className="text-lg font-bold font-mono text-[#1C222B] dark:text-white">
            {env.z500_dam} <span className="text-xs font-normal">dam</span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#8C8373]">
            Subtropical ridge guide
          </div>
        </div>
      </div>
    </div>
  );
};
