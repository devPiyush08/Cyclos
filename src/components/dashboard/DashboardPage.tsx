import React from 'react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA, ALERTS_DATA } from '../../data/mockData';
import { HeroStormCard } from './HeroStormCard';
import { MiniMapCard } from './MiniMapCard';
import { KpiTiles } from './KpiTiles';
import { IntensityChartCard } from './IntensityChartCard';
import { AlertsFeedCard } from './AlertsFeedCard';
import { ForecastTableCard } from './ForecastTableCard';
import { EnvironmentCard } from './EnvironmentCard';
import { AnalysisDetailCard } from './AnalysisDetailCard';
import { formatTimeLong } from '../../utils/meteorology';
import { Radio } from 'lucide-react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const DashboardPage: React.FC = () => {
  const { activeStormId, setActiveStorm, asOfTime } = useAppStore();

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId) || STORMS_DATA[0];
  const activeAlerts = ALERTS_DATA.filter(a => a.status === 'active');
  const activeStorms = STORMS_DATA.filter(s => s.status === 'active');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section Header & Storm Switcher Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C8373] dark:text-slate-400 mb-1">
            <Radio className="w-3.5 h-3.5 text-[#3F7356] animate-pulse" />
            <span>North Indian Ocean Operational Basin</span>
            <span>·</span>
            <span>{formatTimeLong(asOfTime)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C222B] dark:text-[#EAEFF5]">
            Synoptic Situation Overview
          </h1>
        </div>

        {/* Storm Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-[#8C8373] dark:text-slate-400 mr-1 shrink-0">Active System:</span>
          {STORMS_DATA.map(s => {
            const isSelected = s.id === currentStorm.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStorm(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#232C37] text-white shadow-xs dark:bg-[#EAE4D9] dark:text-[#161A22]'
                    : 'bg-white dark:bg-[#1A1F28] text-[#5C5547] dark:text-slate-300 border border-[#E6E0D4] dark:border-[#2C3544] hover:bg-[#FAF8F5]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-[#FAF8F5] dark:bg-[#161A22]' : 'bg-[#9C9485]'
                  }`}
                />
                <span>{s.name}</span>
                <span className="text-[10px] opacity-75">({s.year})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 1: Map Card (span 8) + Hero Storm Card (span 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <MiniMapCard storm={currentStorm} allStorms={STORMS_DATA} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <HeroStormCard storm={currentStorm} />
        </div>
      </div>

      {/* Row 2: KPI Tiles (span 12) */}
      <KpiTiles
        storm={currentStorm}
        activeStorms={activeStorms}
        activeAlerts={activeAlerts}
      />

      {/* Row 3: Intensity & Forecast Chart (span 7) + Alerts Feed (span 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <IntensityChartCard storm={currentStorm} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <AlertsFeedCard alerts={ALERTS_DATA} />
        </div>
      </div>

      {/* Row 4: Forecast Table (span 12) */}
      <div>
        <ForecastTableCard storm={currentStorm} />
      </div>

      {/* Row 5: Environment Card (span 6) + Analysis Detail Card (span 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <EnvironmentCard env={currentStorm.env} />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <AnalysisDetailCard
            analysis={currentStorm.analysis}
            stormId={currentStorm.id}
          />
        </div>
      </div>

      {/* Subtle Research Notice Banner */}
      <div className="pt-2">
        <DisclaimerBanner />
      </div>
    </div>
  );
};
