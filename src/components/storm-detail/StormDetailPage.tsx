import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA } from '../../data/mockData';
import {
  Wind,
  Compass,
  MapPin,
  Gauge,
  Thermometer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { formatCoords, formatDistance, formatTimeCompact, formatWind } from '../../utils/meteorology';

export const StormDetailPage: React.FC = () => {
  const {
    activeStormId,
    setActiveStorm,
    unitWind,
    unitDist,
    setTab
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'forecast' | 'environment'>('forecast');

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId) || STORMS_DATA[0];
  const windDisplay = formatWind(currentStorm.current_vmax_kt, unitWind);

  return (
    <div className="space-y-6">
      {/* Header with quick storm selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6A7970] mb-1">
            <span>{currentStorm.id}</span>
            <span>·</span>
            <span>{currentStorm.basin}</span>
            <span>·</span>
            <span>Season {currentStorm.year}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2520]">
            Cyclone {currentStorm.name}
          </h1>
        </div>

        {/* Storm Selector & Map Quick Jump */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={activeStormId}
              onChange={e => setActiveStorm(e.target.value)}
              className="text-xs font-semibold font-mono bg-[#F0F5F1] text-[#274332] py-2 pl-3.5 pr-8 rounded-full border border-[#DCE7DF] appearance-none cursor-pointer"
            >
              {STORMS_DATA.map(s => (
                <option key={s.id} value={s.id}>
                  Cyclone {s.name} ({s.basin})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C6E63] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setTab('map')}
            className="px-4 py-2 bg-[#274332] hover:bg-[#1C2520] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Track on Map
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row (Paperpillar Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Intensity */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="w-10 h-10 rounded-full bg-[#F5EDE1] text-[#9E6B28] flex items-center justify-center mb-3">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Maximum Sustained Wind</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1C2520] my-1">
              {windDisplay.primary}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] text-[11px] font-mono text-[#6A7970]">
            Spread: ±{currentStorm.current_vmax_std.toFixed(1)} kt · {windDisplay.secondary}
          </div>
        </div>

        {/* Card 2: Center Coordinates */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="w-10 h-10 rounded-full bg-[#E8F4EC] text-[#2F6B48] flex items-center justify-center mb-3">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Center Fix & Basin</span>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#1C2520] my-1">
              {formatCoords(currentStorm.current_lat, currentStorm.current_lon)}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] text-[11px] font-mono text-[#6A7970]">
            {currentStorm.basin} · Fixed via TIR1
          </div>
        </div>

        {/* Card 3: Translation Motion */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="w-10 h-10 rounded-full bg-[#FFF3E3] text-[#B88E2F] flex items-center justify-center mb-3">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Translation Vector</span>
            <div className="text-2xl font-extrabold font-mono text-[#1C2520] my-1">
              {currentStorm.motion_compass} · {currentStorm.motion_speed_kmh} km/h
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] text-[11px] font-mono text-[#6A7970]">
            Heading: {currentStorm.motion_heading_deg}° azimuth
          </div>
        </div>

        {/* Card 4: Distance to Coast */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow flex flex-col justify-between">
          <div className="w-10 h-10 rounded-full bg-[#F9ECE9] text-[#C25845] flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6A7970] block">Nearest Landmass</span>
            <div className="text-2xl font-extrabold font-mono text-[#1C2520] my-1">
              {formatDistance(currentStorm.dist_to_land_km, unitDist)}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F0F5F1] text-[11px] font-mono text-[#C25845] font-semibold">
            {currentStorm.first_land_region || 'Coastal landfall sector watch'}
          </div>
        </div>
      </div>

      {/* Tab Switcher: 48h Prognosis Table vs Environmental Diagnostics */}
      <div className="flex items-center gap-2 border-b border-[#E8EFEA] pb-2">
        <button
          onClick={() => setActiveTab('forecast')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'forecast'
              ? 'bg-[#1C2520] text-white shadow-xs'
              : 'text-[#6A7970] hover:text-[#1C2520] hover:bg-white'
          }`}
        >
          48-Hour Multi-Lead Prognosis
        </button>
        <button
          onClick={() => setActiveTab('environment')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'environment'
              ? 'bg-[#1C2520] text-white shadow-xs'
              : 'text-[#6A7970] hover:text-[#1C2520] hover:bg-white'
          }`}
        >
          Thermodynamic & Shear Diagnostics
        </button>
      </div>

      {/* Tab Content: Forecast Table */}
      {activeTab === 'forecast' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#F0F5F1] text-[#95A59B] font-semibold">
                  <th className="py-3 px-4">Lead Time</th>
                  <th className="py-3 px-4">Valid Time (UTC)</th>
                  <th className="py-3 px-4">Centre Position</th>
                  <th className="py-3 px-4">Vmax Mean [p10-p90]</th>
                  <th className="py-3 px-4">Predicted Grade</th>
                  <th className="py-3 px-4">Cone Radius</th>
                  <th className="py-3 px-4">Coast Distance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F5F1]">
                {currentStorm.forecast_48h.map(f => {
                  const wind = formatWind(f.vmax_mean_kt, unitWind);
                  return (
                    <tr key={f.lead_h} className="hover:bg-[#FAFBF9] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#274332]">
                        +{f.lead_h}h
                      </td>
                      <td className="py-3.5 px-4 text-[#6A7970]">
                        {formatTimeCompact(f.valid_time)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1C2520]">
                        {formatCoords(f.lat, f.lon)}
                      </td>
                      <td className="py-3.5 px-4 text-[#1C2520]">
                        <strong className="text-sm">{wind.primary}</strong>{' '}
                        <span className="text-[#95A59B]">
                          [{Math.round(f.vmax_p10_kt)} - {Math.round(f.vmax_p90_kt)} kt]
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0F5F1] text-[#274332]">
                          {f.predicted_grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6A7970]">
                        ± {formatDistance(f.cone_radius_km, unitDist)}
                      </td>
                      <td className="py-3.5 px-4">
                        {f.landfall_risk ? (
                          <span className="text-[#C25845] font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {formatDistance(f.dist_to_land_km, unitDist)} (Land Contact)
                          </span>
                        ) : (
                          <span className="text-[#6A7970]">
                            {formatDistance(f.dist_to_land_km, unitDist)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Environmental Diagnostics */}
      {activeTab === 'environment' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
            <span className="text-xs font-bold text-[#6A7970] block mb-1">Vertical Wind Shear</span>
            <div className="text-3xl font-extrabold font-mono text-[#1C2520] my-2">
              {currentStorm.env.shear_magnitude_ms.toFixed(1)} m/s
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F4EC] text-[#2F6B48]">
              {currentStorm.env.shear_category} Shear
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
            <span className="text-xs font-bold text-[#6A7970] block mb-1">Sea Surface Temperature (SST)</span>
            <div className="text-3xl font-extrabold font-mono text-[#1C2520] my-2">
              {currentStorm.env.sst_c.toFixed(1)} °C
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F4EC] text-[#2F6B48]">
              {currentStorm.env.sst_category} (&gt;26.5°C threshold)
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
            <span className="text-xs font-bold text-[#6A7970] block mb-1">Mid-Level Moisture (700 hPa)</span>
            <div className="text-3xl font-extrabold font-mono text-[#1C2520] my-2">
              {currentStorm.env.rh700_pct}% RH
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F4EC] text-[#2F6B48]">
              {currentStorm.env.rh_category} (&gt;60% humid)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
