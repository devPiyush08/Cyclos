import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA, ALERTS_DATA } from '../../data/mockData';
import {
  Wind,
  Compass,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  ShieldAlert,
  Eye,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Maximize2
} from 'lucide-react';
import { formatCoords, formatTimeCompact, formatWind } from '../../utils/meteorology';

export const PaperpillarDashboard: React.FC = () => {
  const {
    activeStormId,
    setActiveStorm,
    setTab,
    setDetailTab,
    unitWind
  } = useAppStore();

  const [activeStep, setActiveStep] = useState<number>(3); // "Now" bar active

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId) || STORMS_DATA[0];
  const activeAlerts = ALERTS_DATA.filter(a => a.status === 'active');
  const windDisplay = formatWind(currentStorm.current_vmax_kt, unitWind);

  // Synoptic timeline bars data for the Paperpillar "Report Sales" style chart
  const timelineBars = [
    { label: '-24h', time: '08 May 12:00', vmax: 35, grade: 'DEP', isPast: true },
    { label: '-18h', time: '08 May 18:00', vmax: 42, grade: 'CS', isPast: true },
    { label: '-12h', time: '09 May 00:00', vmax: 48, grade: 'CS', isPast: true },
    { label: 'Now', time: '09 May 12:00', vmax: currentStorm.current_vmax_kt, grade: currentStorm.current_grade, isNow: true },
    { label: '+12h', time: '10 May 00:00', vmax: 62, grade: 'SCS', isForecast: true },
    { label: '+24h', time: '10 May 12:00', vmax: 65, grade: 'SCS', isForecast: true },
    { label: '+48h', time: '11 May 12:00', vmax: 45, grade: 'CS', isForecast: true }
  ];

  return (
    <div className="space-y-6">
      {/* 1. TOP STAT TILES ROW (Exact match of Paperpillar's 3-4 top cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Active Systems */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F4EC] flex items-center justify-center text-[#2F6B48]">
              <Layers className="w-5 h-5" />
            </div>
            <button
              onClick={() => setTab('map')}
              className="text-[#95A59B] hover:text-[#1C2520] p-1 cursor-pointer"
              title="More info"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Active Disturbances</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#1C2520] my-1">
              {STORMS_DATA.length} Systems
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] flex items-center gap-1.5 text-[11px] font-mono">
            <span className="px-1.5 py-0.5 rounded-full bg-[#E8F4EC] text-[#2F6B48] font-semibold">
              +1 New
            </span>
            <span className="text-[#6A7970] truncate">{currentStorm.basin}</span>
          </div>
        </div>

        {/* Stat 2: Peak Sustained Vmax */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EDE1] text-[#9E6B28]">
              <Wind className="w-5 h-5" />
            </div>
            <button
              onClick={() => {
                setDetailTab('overview');
                setTab('storms');
              }}
              className="text-[#95A59B] hover:text-[#1C2520] p-1 cursor-pointer"
              title="Storm detail"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Sustained Intensity</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#1C2520] my-1">
              {windDisplay.primary}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] flex items-center gap-1.5 text-[11px] font-mono">
            <span className="px-1.5 py-0.5 rounded-full bg-[#F5EDE1] text-[#9E6B28] font-semibold">
              {currentStorm.current_grade}
            </span>
            <span className="text-[#6A7970]">± {currentStorm.current_vmax_std.toFixed(1)} kt spread</span>
          </div>
        </div>

        {/* Stat 3: 24h Conformal Cone */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF3E3] text-[#B88E2F]">
              <Compass className="w-5 h-5" />
            </div>
            <button
              onClick={() => setTab('map')}
              className="text-[#95A59B] hover:text-[#1C2520] p-1 cursor-pointer"
              title="View on Map"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">24h Forecast Cone</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#1C2520] my-1">
              ± 72 km
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] flex items-center gap-1.5 text-[11px] font-mono">
            <span className="px-1.5 py-0.5 rounded-full bg-[#FFF3E3] text-[#B88E2F] font-semibold">
              P67
            </span>
            <span className="text-[#6A7970]">99.4% detection fix</span>
          </div>
        </div>

        {/* Stat 4: Active Bulletins */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F9ECE9] text-[#C25845]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button
              onClick={() => setTab('alerts')}
              className="text-[#95A59B] hover:text-[#1C2520] p-1 cursor-pointer"
              title="All alerts"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Active Advisories</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#1C2520] my-1">
              {activeAlerts.length} Bulletins
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] flex items-center gap-1.5 text-[11px] font-mono">
            <span className="px-1.5 py-0.5 rounded-full bg-[#F9ECE9] text-[#C25845] font-semibold">
              Warning
            </span>
            <span className="text-[#6A7970]">Coastal risk active</span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: Paperpillar "Report Sales" Bar Chart & "Cost Breakdown" Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 Cols): Bar Chart matching Paperpillar "Report Sales" */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          {/* Header & Controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#1C2520]">
                Intensity & Trajectory Evolution
              </h2>
              <span className="text-xs text-[#6A7970]">
                Estimated vs Predicted 1-minute sustained wind (kt)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="text-xs font-medium bg-[#F0F5F1] text-[#274332] py-1.5 pl-3 pr-7 rounded-full border border-[#DCE7DF] appearance-none cursor-pointer">
                  <option>Synoptic 6h Steps</option>
                  <option>Ensemble Mean</option>
                  <option>Best Track Comparison</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#5C6E63] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bar Chart Area matching Paperpillar visual */}
          <div className="relative h-64 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pt-8 pb-4">
            {/* Horizontal Dashed Grid Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-[#95A59B]">
              <div className="border-b border-dashed border-[#E8EFEA] flex justify-between pr-2">
                <span>70 kt</span>
              </div>
              <div className="border-b border-dashed border-[#E8EFEA] flex justify-between pr-2">
                <span>50 kt</span>
              </div>
              <div className="border-b border-dashed border-[#E8EFEA] flex justify-between pr-2">
                <span>35 kt</span>
              </div>
              <div className="border-b border-dashed border-[#E8EFEA] flex justify-between pr-2">
                <span>20 kt</span>
              </div>
              <div className="border-b border-[#E8EFEA] flex justify-between pr-2">
                <span>0 kt</span>
              </div>
            </div>

            {/* Vertical Rounded Bars */}
            {timelineBars.map((bar, idx) => {
              const heightPct = Math.min(100, Math.max(15, (bar.vmax / 70) * 100));
              const isSelected = activeStep === idx;

              return (
                <div
                  key={bar.label}
                  onClick={() => setActiveStep(idx)}
                  className="relative z-10 flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                >
                  {/* Floating Tooltip Card (active on selected bar, matching Paperpillar $4,090 card) */}
                  {isSelected && (
                    <div className="absolute -top-7 transform -translate-y-full bg-[#1C2520] text-white text-[10px] font-mono py-1.5 px-3 rounded-xl shadow-lg flex flex-col items-center whitespace-nowrap z-20 pointer-events-none">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#419B68]" />
                        <span>{bar.vmax} kt · {bar.grade}</span>
                      </div>
                      <span className="text-[9px] text-[#A6B8AC]">{bar.time}</span>
                      {/* Tooltip triangle tail */}
                      <div className="w-2 h-2 bg-[#1C2520] rotate-45 absolute -bottom-1" />
                    </div>
                  )}

                  {/* The Rounded Bar */}
                  <div
                    className={`w-full max-w-[42px] rounded-2xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#274332] shadow-md ring-4 ring-[#274332]/15'
                        : bar.isForecast
                        ? 'bg-[#E3ECE5] hover:bg-[#D5E3D8] border border-dashed border-[#A7C2B0]'
                        : 'bg-[#D2E4D7] hover:bg-[#C2D8C8]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />

                  {/* Bottom Step Label */}
                  <span className={`text-[11px] font-mono mt-3 font-semibold ${
                    isSelected ? 'text-[#1C2520]' : 'text-[#6A7970]'
                  }`}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-2 pt-3 border-t border-[#F0F5F1] flex items-center justify-between text-xs text-[#6A7970]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#D2E4D7]" />
                <span>Analysed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#274332]" />
                <span>Current Analysis</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E3ECE5] border border-dashed border-[#A7C2B0]" />
                <span>48h Forecast</span>
              </span>
            </div>

            <button
              onClick={() => setTab('map')}
              className="text-xs font-semibold text-[#274332] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View On Synoptic Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right (4 Cols): Donut Chart matching Paperpillar "Cost Breakdown" */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1C2520]">
              Grade Likelihood
            </h2>
            <button
              onClick={() => {
                setDetailTab('overview');
                setTab('storms');
              }}
              className="text-xs font-semibold text-[#274332] hover:underline cursor-pointer"
            >
              See Details
            </button>
          </div>

          {/* Centered SVG Donut Ring matching Paperpillar */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#E8EFEA"
                  strokeWidth="12"
                />
                {/* Segment 1: Severe Cyclonic Storm (SCS) - Soft Sage 45% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#5B9A8B"
                  strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="131"
                  strokeLinecap="round"
                />
                {/* Segment 2: Cyclonic Storm (CS) - Warm Mustard 30% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#D8B87B"
                  strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="167"
                  strokeLinecap="round"
                />
                {/* Segment 3: Depression (DEP) - Lavender 15% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#9AA9D4"
                  strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="203"
                  strokeLinecap="round"
                />
                {/* Segment 4: VSCS+ - Terracotta 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#D4846F"
                  strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="215"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Value matching $4,750 in Paperpillar */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#1C2520]">
                  {currentStorm.current_grade}
                </span>
                <span className="text-[11px] font-mono text-[#6A7970]">
                  {windDisplay.primary}
                </span>
              </div>
            </div>
          </div>

          {/* Clean Legend matching Paperpillar list on the right */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#F0F5F1] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B9A8B]" />
              <span className="text-[#6A7970] truncate">SCS (45%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8B87B]" />
              <span className="text-[#6A7970] truncate">CS (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9AA9D4]" />
              <span className="text-[#6A7970] truncate">DEP (15%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4846F]" />
              <span className="text-[#6A7970] truncate">VSCS+ (10%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: "Tracked Tropical Systems" & "Operational Bulletins" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Tracked Systems (matching Paperpillar "Last Transactions" & Furniro product list) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1C2520]">
              Tracked Tropical Systems
            </h2>
            <button
              onClick={() => setTab('archive')}
              className="text-xs font-semibold text-[#274332] hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="divide-y divide-[#F0F5F1] space-y-3">
            {STORMS_DATA.map(storm => {
              const isCurrent = storm.id === currentStorm.id;
              return (
                <div
                  key={storm.id}
                  onClick={() => setActiveStorm(storm.id)}
                  className={`pt-3 first:pt-0 flex items-center justify-between gap-3 p-2.5 rounded-2xl transition-colors cursor-pointer ${
                    isCurrent ? 'bg-[#F2F7F4] border border-[#DCE7DF]' : 'hover:bg-[#FAFBF9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Simulated circular satellite thumbnail */}
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9EB9A7] to-[#D5E5DA] flex items-center justify-center text-[#274332] font-bold text-xs shadow-xs shrink-0 relative overflow-hidden">
                      <svg
                        className="w-7 h-7 text-[#274332]/60 animate-spin-slow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                      </svg>
                      {/* Grade pill badge */}
                      <span className="absolute bottom-0 right-0 text-[8px] font-bold px-1 bg-[#1C2520] text-white rounded-tl">
                        {storm.current_grade}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#1C222B] flex items-center gap-2">
                        <span>Cyclone {storm.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-[#E8F4EC] text-[#2F6B48] rounded-full font-mono font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-[#6A7970] mt-0.5">
                        {storm.basin} · {formatCoords(storm.current_lat, storm.current_lon)}
                      </div>
                    </div>
                  </div>

                  {/* Right metric matching $30K in Paperpillar */}
                  <div className="text-right">
                    <span className="text-sm font-extrabold font-mono text-[#1C2520]">
                      {storm.current_vmax_kt} kt
                    </span>
                    <span className="block text-[10px] font-mono text-[#6A7970]">
                      {formatTimeCompact(storm.last_seen)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Operational Coastal Bulletins (matching Paperpillar "Maintenance Request") */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1C222B]">
              Coastal Advisories & Warnings
            </h2>
            <button
              onClick={() => setTab('alerts')}
              className="text-xs font-semibold text-[#274332] hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="divide-y divide-[#F0F5F1] space-y-3">
            {activeAlerts.slice(0, 3).map(alert => (
              <div
                key={alert.id}
                onClick={() => setTab('alerts')}
                className="pt-3 first:pt-0 flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-[#FAFBF9] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F9ECE9] text-[#C25845] flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C2520] group-hover:text-[#274332] transition-colors">
                      {alert.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#6A7970] mt-0.5">
                      Target: Cyclone {alert.storm_name} · {formatTimeCompact(alert.issued_at)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F5EDE1] text-[#9E6B28] whitespace-nowrap">
                    {alert.severity.toUpperCase()}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E8F2EC] flex items-center justify-center text-[10px] font-bold text-[#274332]">
                    OP
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Footer */}
          <div className="mt-4 pt-3 border-t border-[#F0F5F1] flex items-center justify-between">
            <span className="text-xs text-[#6A7970]">
              Automated Rule Engine v2 · Evaluated every 15 min
            </span>
            <button
              onClick={() => setTab('alerts')}
              className="text-xs font-semibold text-[#274332] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Warnings</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. FURNIRO INSPIRED SECTION: "Browse Synoptic Range & Basins" */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#EBE6DC] paper-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold text-[#B88E2F] uppercase tracking-wider">
              Synoptic Coverage
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#1C2520]">
              Browse Ocean Basins & Sensor Feeds
            </h2>
          </div>
          <button
            onClick={() => setTab('map')}
            className="px-4 py-2 bg-[#B88E2F] hover:bg-[#A37B24] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Open Interactive Map</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Bay of Bengal */}
          <div
            onClick={() => {
              setActiveStorm('SYS-2022-001');
              setTab('map');
            }}
            className="group bg-white rounded-2xl p-4 border border-[#EFEAE1] hover:border-[#B88E2F]/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#E1ECE7] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
              <svg className="w-full h-full text-[#4E7A66]/30" viewBox="0 0 100 60">
                <circle cx="50" cy="30" r="22" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="50" cy="30" r="6" fill="#4E7A66" />
              </svg>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#FFF3E3] text-[#B88E2F] text-[10px] font-mono font-bold">
                Active: Asani
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C2520] group-hover:text-[#B88E2F] transition-colors">
                Bay of Bengal
              </h3>
              <p className="text-xs text-[#6A7970] mt-0.5">
                Current center: 14.8°N, 84.2°E · Coastal heading NNW
              </p>
            </div>
          </div>

          {/* Card 2: Arabian Sea */}
          <div
            onClick={() => {
              setActiveStorm('SYS-2023-002');
              setTab('map');
            }}
            className="group bg-white rounded-2xl p-4 border border-[#EFEAE1] hover:border-[#B88E2F]/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#EBF0F5] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
              <svg className="w-full h-full text-[#5B7898]/30" viewBox="0 0 100 60">
                <circle cx="45" cy="32" r="24" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="45" cy="32" r="6" fill="#5B7898" />
              </svg>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#E8F4EC] text-[#2F6B48] text-[10px] font-mono font-bold">
                Archived: Biparjoy
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C2520] group-hover:text-[#B88E2F] transition-colors">
                Arabian Sea
              </h3>
              <p className="text-xs text-[#6A7970] mt-0.5">
                Historic VSCS track · Landfall Gujarat sector
              </p>
            </div>
          </div>

          {/* Card 3: Satellite Thermal TIR1 Ingest */}
          <div
            onClick={() => setTab('map')}
            className="group bg-white rounded-2xl p-4 border border-[#EFEAE1] hover:border-[#B88E2F]/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#F7F2EA] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
              <svg className="w-full h-full text-[#9E6B28]/30" viewBox="0 0 100 60">
                <rect x="20" y="10" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#F5EDE1] text-[#9E6B28] text-[10px] font-mono font-bold">
                10.8 µm TIR1
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C2520] group-hover:text-[#B88E2F] transition-colors">
                INSAT-3D Multispectral Ingest
              </h3>
              <p className="text-xs text-[#6A7970] mt-0.5">
                4 km sub-satellite thermal infrared band calibrated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
