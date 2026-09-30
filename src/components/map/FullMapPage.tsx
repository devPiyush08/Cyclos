import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA } from '../../data/mockData';
import {
  Layers,
  Compass,
  Eye,
  Check,
  RotateCcw,
  Sliders,
  Wind,
  MapPin,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { formatCoords, formatDistance, formatTimeCompact, formatWind } from '../../utils/meteorology';

export const FullMapPage: React.FC = () => {
  const {
    activeStormId,
    setActiveStorm,
    unitWind,
    unitDist,
    mapLayers,
    setMapLayer
  } = useAppStore();

  const [activePreset, setActivePreset] = useState<'forecast' | 'analysis' | 'verification'>('forecast');
  const [selectedPoint, setSelectedPoint] = useState<{
    label: string;
    coords: string;
    vmax: string;
    detail: string;
    time: string;
  } | null>(null);

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId) || STORMS_DATA[0];

  // Map projection: Lon 64° to 96° (dx=32), Lat 6° to 25° (dy=19)
  const mapWidth = 920;
  const mapHeight = 560;
  const mapLonToX = (lon: number) => ((lon - 64) / 32) * mapWidth;
  const mapLatToY = (lat: number) => ((25 - lat) / 19) * mapHeight;

  // Analysed track points
  const trackSvgPoints = currentStorm.track_history
    .map(pt => `${mapLonToX(pt.lon)},${mapLatToY(pt.lat)}`)
    .join(' ');

  // Forecast track points
  const forecastSvgPoints = [
    `${mapLonToX(currentStorm.current_lon)},${mapLatToY(currentStorm.current_lat)}`,
    ...currentStorm.forecast_48h.map(pt => `${mapLonToX(pt.lon)},${mapLatToY(pt.lat)}`)
  ].join(' ');

  // Cone polygon points
  const allPoints = [
    { lat: currentStorm.current_lat, lon: currentStorm.current_lon, radius_km: 15 },
    ...currentStorm.forecast_48h.map(f => ({ lat: f.lat, lon: f.lon, radius_km: f.cone_radius_km }))
  ];

  const coneLeftPoints: string[] = [];
  const coneRightPoints: string[] = [];

  for (let i = 0; i < allPoints.length; i++) {
    const p = allPoints[i];
    const rDeg = p.radius_km / 111;
    let angle = 0;
    if (i < allPoints.length - 1) {
      const next = allPoints[i + 1];
      angle = Math.atan2(next.lat - p.lat, next.lon - p.lon) + Math.PI / 2;
    } else {
      const prev = allPoints[i - 1];
      angle = Math.atan2(p.lat - prev.lat, p.lon - prev.lon) + Math.PI / 2;
    }
    const xL = mapLonToX(p.lon + Math.cos(angle) * rDeg);
    const yL = mapLatToY(p.lat + Math.sin(angle) * rDeg);
    const xR = mapLonToX(p.lon - Math.cos(angle) * rDeg);
    const yR = mapLatToY(p.lat - Math.sin(angle) * rDeg);

    coneLeftPoints.push(`${xL},${yL}`);
    coneRightPoints.unshift(`${xR},${yR}`);
  }

  const conePolygonPoints = [...coneLeftPoints, ...coneRightPoints].join(' ');

  // Preset changer
  const applyPreset = (preset: 'forecast' | 'analysis' | 'verification') => {
    setActivePreset(preset);
    if (preset === 'forecast') {
      setMapLayer('forecast', true);
      setMapLayer('cone', true);
      setMapLayer('track', true);
      setMapLayer('satellite', true);
      setMapLayer('ensemble', false);
    } else if (preset === 'analysis') {
      setMapLayer('forecast', false);
      setMapLayer('cone', false);
      setMapLayer('track', true);
      setMapLayer('satellite', true);
      setMapLayer('ensemble', false);
    } else if (preset === 'verification') {
      setMapLayer('forecast', true);
      setMapLayer('cone', true);
      setMapLayer('track', true);
      setMapLayer('reference', true);
      setMapLayer('ensemble', true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Map Toolbar - Paperpillar style */}
      <div className="bg-white rounded-3xl p-4 border border-[#E8EFEA] paper-shadow flex flex-wrap items-center justify-between gap-3">
        {/* Left: Storm Selector & Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Storm Select Dropdown */}
          <div className="relative">
            <select
              value={activeStormId}
              onChange={e => setActiveStorm(e.target.value)}
              className="text-xs font-semibold font-mono bg-[#F0F5F1] text-[#274332] py-2 pl-3.5 pr-8 rounded-full border border-[#DCE7DF] appearance-none cursor-pointer hover:border-[#B5CDC0]"
            >
              {STORMS_DATA.map(s => (
                <option key={s.id} value={s.id}>
                  Cyclone {s.name} ({s.basin})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C6E63] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Presets Pill */}
          <div className="flex items-center bg-[#F0F5F1] p-1 rounded-full border border-[#DCE7DF] text-xs font-mono">
            <button
              onClick={() => applyPreset('forecast')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activePreset === 'forecast'
                  ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              Forecast View
            </button>
            <button
              onClick={() => applyPreset('analysis')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activePreset === 'analysis'
                  ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              Analysis View
            </button>
            <button
              onClick={() => applyPreset('verification')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activePreset === 'verification'
                  ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              Verification
            </button>
          </div>
        </div>

        {/* Right: Quick Layer Toggles */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setMapLayer('satellite', !mapLayers.satellite)}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              mapLayers.satellite
                ? 'bg-[#E8F4EC] text-[#2F6B48] border-[#CCDCD2] font-semibold'
                : 'bg-white text-[#6A7970] border-[#E8EFEA]'
            }`}
          >
            <span>Satellite</span>
            {mapLayers.satellite && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setMapLayer('cone', !mapLayers.cone)}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              mapLayers.cone
                ? 'bg-[#E8F4EC] text-[#2F6B48] border-[#CCDCD2] font-semibold'
                : 'bg-white text-[#6A7970] border-[#E8EFEA]'
            }`}
          >
            <span>P67 Cone</span>
            {mapLayers.cone && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setMapLayer('ensemble', !mapLayers.ensemble)}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              mapLayers.ensemble
                ? 'bg-[#E8F4EC] text-[#2F6B48] border-[#CCDCD2] font-semibold'
                : 'bg-white text-[#6A7970] border-[#E8EFEA]'
            }`}
          >
            <span>Ensemble</span>
            {mapLayers.ensemble && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setMapLayer('graticule', !mapLayers.graticule)}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              mapLayers.graticule
                ? 'bg-[#E8F4EC] text-[#2F6B48] border-[#CCDCD2] font-semibold'
                : 'bg-white text-[#6A7970] border-[#E8EFEA]'
            }`}
          >
            <span>Grid</span>
            {mapLayers.graticule && <Check className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Stage */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#DCE7DF] bg-[#DCE8E2] paper-shadow">
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-auto select-none block"
          style={{ minHeight: '480px', maxHeight: '680px' }}
        >
          <defs>
            {/* Soft Satellite Cloud Glow Shader */}
            <radialGradient id="cloudGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#C9DCD2" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#9FBBAF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#DCE8E2" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Graticule Grid Lines */}
          {mapLayers.graticule &&
            [10, 15, 20, 25].map(lat => (
              <g key={`lat-${lat}`}>
                <line
                  x1="0"
                  y1={mapLatToY(lat)}
                  x2={mapWidth}
                  y2={mapLatToY(lat)}
                  stroke="#98B2A6"
                  strokeWidth="0.7"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <text
                  x="14"
                  y={mapLatToY(lat) - 5}
                  fill="#5A786B"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {lat}°N
                </text>
              </g>
            ))}

          {mapLayers.graticule &&
            [70, 75, 80, 85, 90, 95].map(lon => (
              <g key={`lon-${lon}`}>
                <line
                  x1={mapLonToX(lon)}
                  y1="0"
                  x2={mapLonToX(lon)}
                  y2={mapHeight}
                  stroke="#98B2A6"
                  strokeWidth="0.7"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <text
                  x={mapLonToX(lon) + 4}
                  y={mapHeight - 12}
                  fill="#5A786B"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {lon}°E
                </text>
              </g>
            ))}

          {/* Coastlines & Landmass Shapes (India, Bay of Bengal, Arabian Sea) */}
          <path
            d={`
              M ${mapLonToX(64)} ${mapLatToY(25)}
              L ${mapLonToX(69)} ${mapLatToY(25)}
              L ${mapLonToX(70)} ${mapLatToY(23)}
              L ${mapLonToX(72)} ${mapLatToY(21.5)}
              L ${mapLonToX(72.8)} ${mapLatToY(19)}
              L ${mapLonToX(73.8)} ${mapLatToY(15.5)}
              L ${mapLonToX(75)} ${mapLatToY(12.5)}
              L ${mapLonToX(77.5)} ${mapLatToY(8.1)}
              L ${mapLonToX(78.5)} ${mapLatToY(9.2)}
              L ${mapLonToX(80.2)} ${mapLatToY(13.1)}
              L ${mapLonToX(82.5)} ${mapLatToY(16.5)}
              L ${mapLonToX(83.3)} ${mapLatToY(17.7)}
              L ${mapLonToX(85.8)} ${mapLatToY(19.8)}
              L ${mapLonToX(86.7)} ${mapLatToY(20.3)}
              L ${mapLonToX(87.5)} ${mapLatToY(21.5)}
              L ${mapLonToX(88.5)} ${mapLatToY(22.2)}
              L ${mapLonToX(90.5)} ${mapLatToY(22.8)}
              L ${mapLonToX(92)} ${mapLatToY(21)}
              L ${mapLonToX(94)} ${mapLatToY(16)}
              L ${mapLonToX(96)} ${mapLatToY(16)}
              L ${mapLonToX(96)} ${mapLatToY(25)}
              Z
            `}
            fill="#E5DDD0"
            stroke="#C4BAA9"
            strokeWidth="1.2"
          />

          {/* Sri Lanka Island */}
          <path
            d={`
              M ${mapLonToX(79.7)} ${mapLatToY(9.8)}
              Q ${mapLonToX(81.8)} ${mapLatToY(8.5)} ${mapLonToX(81.3)} ${mapLatToY(6.5)}
              Q ${mapLonToX(80.5)} ${mapLatToY(6.0)} ${mapLonToX(79.8)} ${mapLatToY(7.5)}
              Z
            `}
            fill="#E5DDD0"
            stroke="#C4BAA9"
            strokeWidth="1.2"
          />

          {/* Ocean Labels */}
          <text
            x={mapLonToX(88)}
            y={mapLatToY(13.5)}
            fill="#6E8A7D"
            fontSize="14"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.6"
          >
            BAY OF BENGAL
          </text>
          <text
            x={mapLonToX(67)}
            y={mapLatToY(15)}
            fill="#6E8A7D"
            fontSize="14"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.6"
          >
            ARABIAN SEA
          </text>

          {/* Coastal Station Anchor Marks */}
          {[
            { name: 'Chennai', lon: 80.27, lat: 13.08 },
            { name: 'Visakhapatnam', lon: 83.3, lat: 17.7 },
            { name: 'Puri / Paradip', lon: 86.6, lat: 20.3 },
            { name: 'Kolkata', lon: 88.36, lat: 22.57 },
            { name: 'Mumbai', lon: 72.87, lat: 19.07 }
          ].map(city => (
            <g key={city.name}>
              <circle
                cx={mapLonToX(city.lon)}
                cy={mapLatToY(city.lat)}
                r="3"
                fill="#554E43"
              />
              <text
                x={mapLonToX(city.lon) + 6}
                y={mapLatToY(city.lat) + 3}
                fill="#554E43"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {city.name}
              </text>
            </g>
          ))}

          {/* Satellite Infrared Cloud Feature */}
          {mapLayers.satellite && (
            <g transform={`translate(${mapLonToX(currentStorm.current_lon)}, ${mapLatToY(currentStorm.current_lat)})`}>
              <circle r="95" fill="url(#cloudGlow)" />
              <circle r="55" fill="#FFFFFF" fillOpacity="0.4" />
              <circle r="25" fill="#FFFFFF" fillOpacity="0.7" />
            </g>
          )}

          {/* Ensemble Members (5 Trajectories) */}
          {mapLayers.ensemble &&
            currentStorm.ensemble_members.map(member => {
              const pts = [
                `${mapLonToX(currentStorm.current_lon)},${mapLatToY(currentStorm.current_lat)}`,
                ...member.track.map(t => `${mapLonToX(t.lon)},${mapLatToY(t.lat)}`)
              ].join(' ');
              return (
                <polyline
                  key={member.member_id}
                  points={pts}
                  fill="none"
                  stroke="#7A9A8B"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                  opacity="0.6"
                />
              );
            })}

          {/* P67 Conformal Cone */}
          {mapLayers.cone && (
            <polygon
              points={conePolygonPoints}
              fill="#2F6B48"
              fillOpacity="0.14"
              stroke="#2F6B48"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          )}

          {/* Analysed Historical Track Line */}
          {mapLayers.track && (
            <polyline
              points={trackSvgPoints}
              fill="none"
              stroke="#1C2520"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* 48-Hour Forecast Track Line */}
          {mapLayers.forecast && (
            <polyline
              points={forecastSvgPoints}
              fill="none"
              stroke="#274332"
              strokeWidth="2.8"
              strokeDasharray="6 5"
              strokeLinecap="round"
            />
          )}

          {/* Analysed Historical Points */}
          {mapLayers.track &&
            currentStorm.track_history.map((pt, idx) => (
              <circle
                key={idx}
                cx={mapLonToX(pt.lon)}
                cy={mapLatToY(pt.lat)}
                r="4.5"
                fill="#1C2520"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="cursor-pointer hover:scale-150 transition-transform"
                onClick={() =>
                  setSelectedPoint({
                    label: `Observed · ${pt.grade}`,
                    coords: formatCoords(pt.lat, pt.lon),
                    vmax: `${pt.vmax_kt} kt (${Math.round(pt.vmax_kt * 1.852)} km/h)`,
                    detail: `MSLP: ${pt.mslp_hpa} hPa · Grade: ${pt.grade}`,
                    time: formatTimeCompact(pt.timestamp)
                  })
                }
              />
            ))}

          {/* 48h Forecast Points (+6h, +12h, +24h, +48h) */}
          {mapLayers.forecast &&
            currentStorm.forecast_48h.map((fpt, idx) => (
              <g
                key={idx}
                className="cursor-pointer group"
                onClick={() =>
                  setSelectedPoint({
                    label: `Forecast +${fpt.lead_h}h`,
                    coords: formatCoords(fpt.lat, fpt.lon),
                    vmax: `${fpt.vmax_mean_kt} kt (Spread ±${fpt.ensemble_spread_km}km)`,
                    detail: `Predicted: ${fpt.predicted_grade} · Land Dist: ${fpt.dist_to_land_km} km`,
                    time: formatTimeCompact(fpt.valid_time)
                  })
                }
              >
                <circle
                  cx={mapLonToX(fpt.lon)}
                  cy={mapLatToY(fpt.lat)}
                  r="6"
                  fill="#FFFFFF"
                  stroke="#274332"
                  strokeWidth="2"
                />
                <circle
                  cx={mapLonToX(fpt.lon)}
                  cy={mapLatToY(fpt.lat)}
                  r="2.5"
                  fill="#274332"
                />
                <text
                  x={mapLonToX(fpt.lon) + 8}
                  y={mapLatToY(fpt.lat) + 3}
                  fill="#274332"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  +{fpt.lead_h}h
                </text>
              </g>
            ))}

          {/* Current Storm Center Pulse Marker */}
          <g transform={`translate(${mapLonToX(currentStorm.current_lon)}, ${mapLatToY(currentStorm.current_lat)})`}>
            <circle r="16" fill="#C25845" opacity="0.25" className="animate-ping" />
            <circle r="8" fill="#C25845" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle r="2.5" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Selected Point Popover Card - Paperpillar style */}
        {selectedPoint && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#DCE7DF] shadow-md w-64 text-xs font-mono z-30">
            <div className="flex items-center justify-between border-b border-[#F0F5F1] pb-2 mb-2">
              <span className="font-bold text-[#1C2520]">{selectedPoint.label}</span>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-[#95A59B] hover:text-[#1C2520] font-bold cursor-pointer text-sm"
              >
                ×
              </button>
            </div>
            <div className="space-y-1 text-[#6A7970]">
              <div className="text-[#1C2520] font-semibold">{selectedPoint.coords}</div>
              <div>Wind: <strong className="text-[#274332]">{selectedPoint.vmax}</strong></div>
              <div>{selectedPoint.detail}</div>
              <div className="text-[10px] text-[#95A59B] pt-1">{selectedPoint.time}</div>
            </div>
          </div>
        )}

        {/* Bottom Legend Pill Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#DCE7DF] text-xs font-mono flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#1C2520]">
              <span className="w-3.5 h-1 bg-[#1C2520] rounded-full inline-block" />
              <span>Analysed</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#1C2520]">
              <span className="w-3.5 h-1 border-t-2 border-dashed border-[#274332] inline-block" />
              <span>48h Forecast</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#1C2520]">
              <span className="w-2.5 h-2.5 bg-[#2F6B48]/20 border border-[#2F6B48] rounded-xs inline-block" />
              <span>P67 Cone</span>
            </span>
          </div>

          <div className="text-[#6A7970]">
            System Center: <strong className="text-[#1C2520]">{formatCoords(currentStorm.current_lat, currentStorm.current_lon)}</strong> · {currentStorm.current_vmax_kt} kt
          </div>
        </div>
      </div>
    </div>
  );
};
