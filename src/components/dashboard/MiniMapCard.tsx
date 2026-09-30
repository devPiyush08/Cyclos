import React, { useState } from 'react';
import { Storm } from '../../types';
import { useAppStore } from '../../store/useStore';
import { Maximize2, Layers, Compass } from 'lucide-react';
import { formatCoords, getGradeColor } from '../../utils/meteorology';

interface MiniMapCardProps {
  storm: Storm;
  allStorms: Storm[];
}

export const MiniMapCard: React.FC<MiniMapCardProps> = ({ storm, allStorms }) => {
  const { setTab, setActiveStorm } = useAppStore();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Projection math:
  // Lon: 64° to 96° (dx = 32)
  // Lat: 6° to 25° (dy = 19)
  const mapLonToX = (lon: number) => ((lon - 64) / 32) * 520;
  const mapLatToY = (lat: number) => ((25 - lat) / 19) * 340;

  // Analysed track points
  const trackSvgPoints = storm.track_history.map(pt => `${mapLonToX(pt.lon)},${mapLatToY(pt.lat)}`).join(' ');

  // Forecast track points
  const forecastSvgPoints = [
    `${mapLonToX(storm.current_lon)},${mapLatToY(storm.current_lat)}`,
    ...storm.forecast_48h.map(pt => `${mapLonToX(pt.lon)},${mapLatToY(pt.lat)}`)
  ].join(' ');

  // Build cone polygon:
  // Use cone radius at 6h, 12h, 24h, 48h converted to approx degree offset (1 deg ≈ 111 km)
  const coneLeftPoints: string[] = [];
  const coneRightPoints: string[] = [];

  const allPoints = [
    { lat: storm.current_lat, lon: storm.current_lon, radius_km: 15 },
    ...storm.forecast_48h.map(f => ({ lat: f.lat, lon: f.lon, radius_km: f.cone_radius_km }))
  ];

  for (let i = 0; i < allPoints.length; i++) {
    const p = allPoints[i];
    const rDeg = p.radius_km / 111;
    // Normal vector to track direction
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

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative group transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Synoptic Situation & Track Envelope
          </h3>
          <span className="text-[11px] font-mono text-[#7A7264] bg-[#F4EFE6] dark:bg-[#252E3E] px-2 py-0.5 rounded-lg border border-[#E5DFD4] dark:border-[#2F394A]">
            INSAT-3D TIR1 + P67 Cone
          </span>
        </div>

        <button
          onClick={() => setTab('map')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1C222B] dark:text-white bg-[#F4EFE6] hover:bg-[#EFE9DF] dark:bg-[#252E3E] dark:hover:bg-[#2F394A] border border-[#E6DFD2] dark:border-[#354154] rounded-xl transition-colors cursor-pointer"
        >
          <span>Open Full Interactive Map</span>
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG North Indian Ocean Cartography Canvas */}
      <div className="relative w-full aspect-[16/10] bg-[#E1ECE7] dark:bg-[#151D28] rounded-2xl overflow-hidden border border-[#D8E2DD] dark:border-[#273242]">
        <svg
          viewBox="0 0 520 340"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="cloudSwirl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="stormEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Graticule 5-degree grid lines */}
          {[10, 15, 20].map(lat => (
            <g key={`lat-${lat}`}>
              <line
                x1="0"
                y1={mapLatToY(lat)}
                x2="520"
                y2={mapLatToY(lat)}
                stroke="#94A3B8"
                strokeWidth="0.5"
                strokeDasharray="3 3"
                opacity="0.4"
              />
              <text
                x="8"
                y={mapLatToY(lat) - 3}
                fill="#64748B"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                {lat}°N
              </text>
            </g>
          ))}
          {[70, 75, 80, 85, 90].map(lon => (
            <g key={`lon-${lon}`}>
              <line
                x1={mapLonToX(lon)}
                y1="0"
                x2={mapLonToX(lon)}
                y2="340"
                stroke="#94A3B8"
                strokeWidth="0.5"
                strokeDasharray="3 3"
                opacity="0.4"
              />
              <text
                x={mapLonToX(lon) + 3}
                y="332"
                fill="#64748B"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                {lon}°E
              </text>
            </g>
          ))}

          {/* Landmass Paths - North Indian Ocean, Subcontinent & Coasts */}
          {/* Main India Landmass & Northern Subcontinent */}
          <path
            d="M 0 0 L 260 0 L 270 30 L 285 45 L 305 60 L 325 80 L 340 95 L 350 115 L 345 130 L 335 145 L 325 160 L 310 180 L 295 210 L 280 240 L 265 270 L 255 295 L 245 305 L 235 295 L 220 270 L 205 240 L 195 210 L 180 180 L 165 160 L 150 145 L 130 135 L 110 130 L 95 120 L 80 115 L 60 110 L 40 100 L 20 85 L 0 70 Z"
            fill="currentColor"
            className="text-[#EEF0F5] dark:text-[#1C2538] stroke-[#C9D1DC] dark:stroke-[#2D3B54]"
            strokeWidth="1.2"
          />

          {/* Gujarat & Saurashtra Peninsula */}
          <path
            d="M 95 120 C 85 135, 90 155, 115 158 C 135 160, 145 145, 130 135 Z"
            fill="currentColor"
            className="text-[#EEF0F5] dark:text-[#1C2538] stroke-[#C9D1DC] dark:stroke-[#2D3B54]"
            strokeWidth="1.2"
          />

          {/* Sri Lanka */}
          <path
            d="M 270 300 C 275 290, 285 295, 288 310 C 290 325, 275 330, 270 315 Z"
            fill="currentColor"
            className="text-[#EEF0F5] dark:text-[#1C2538] stroke-[#C9D1DC] dark:stroke-[#2D3B54]"
            strokeWidth="1.2"
          />

          {/* Bangladesh & Bengal Delta */}
          <path
            d="M 345 130 C 355 125, 375 130, 385 145 C 380 155, 360 150, 345 145 Z"
            fill="currentColor"
            className="text-[#EEF0F5] dark:text-[#1C2538] stroke-[#C9D1DC] dark:stroke-[#2D3B54]"
            strokeWidth="1.2"
          />

          {/* Myanmar & Indochina Coastline */}
          <path
            d="M 385 145 L 410 160 L 420 180 L 425 210 L 430 250 L 440 300 L 520 300 L 520 0 L 325 0 Z"
            fill="currentColor"
            className="text-[#EEF0F5] dark:text-[#1C2538] stroke-[#C9D1DC] dark:stroke-[#2D3B54]"
            strokeWidth="1.2"
          />

          {/* Water Bodies Labels */}
          <text
            x="85"
            y="230"
            fill="#3B5BFF"
            opacity="0.3"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            ARABIAN SEA
          </text>
          <text
            x="330"
            y="230"
            fill="#3B5BFF"
            opacity="0.3"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            BAY OF BENGAL
          </text>

          {/* Simulated Satellite TIR1 Cloud Spirals around Storm Center */}
          <g transform={`translate(${mapLonToX(storm.current_lon)}, ${mapLatToY(storm.current_lat)})`}>
            <circle r="45" fill="url(#stormEyeGlow)" />
            <path
              d="M -30 -15 C -45 10, -10 40, 25 30 C 45 20, 40 -15, 15 -35 C -5 -45, -25 -30, -30 -15"
              fill="url(#cloudSwirl)"
              className="animate-spin"
              style={{ animationDuration: '40s', transformOrigin: '0 0' }}
            />
          </g>

          {/* 1. Calibrated P67 Uncertainty Cone Fill */}
          <polygon
            points={conePolygonPoints}
            fill="#3B5BFF"
            fillOpacity="0.14"
            stroke="#3B5BFF"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />

          {/* 2. Analysed Historical Track (Solid) */}
          <polyline
            points={trackSvgPoints}
            fill="none"
            stroke="#0E1726"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-white"
          />

          {/* 3. 48h Forecast Track (Dashed Blue) */}
          <polyline
            points={forecastSvgPoints}
            fill="none"
            stroke="#3B5BFF"
            strokeWidth="2.2"
            strokeDasharray="5 4"
            strokeLinecap="round"
          />

          {/* Analysed Track Points */}
          {storm.track_history.map((pt, idx) => (
            <circle
              key={idx}
              cx={mapLonToX(pt.lon)}
              cy={mapLatToY(pt.lat)}
              r="3.5"
              fill="#0E1726"
              className="dark:fill-white cursor-pointer hover:scale-150 transition-transform"
              onMouseEnter={() => setHoveredPoint(`Analysed: ${pt.timestamp} · ${pt.vmax_kt} kt`)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Forecast Lead Markers (+6h, +12h, +24h, +48h) */}
          {storm.forecast_48h.map((fpt, idx) => (
            <g key={idx} className="cursor-pointer group/lead">
              <circle
                cx={mapLonToX(fpt.lon)}
                cy={mapLatToY(fpt.lat)}
                r="4.5"
                fill="#3B5BFF"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x={mapLonToX(fpt.lon) + 6}
                y={mapLatToY(fpt.lat) + 3}
                fill="#2A45E0"
                className="dark:fill-[#9BB0FF] font-mono font-bold"
                fontSize="9"
              >
                +{fpt.lead_h}h
              </text>
            </g>
          ))}

          {/* Current Storm Position Pulse Marker */}
          <g transform={`translate(${mapLonToX(storm.current_lon)}, ${mapLatToY(storm.current_lat)})`}>
            <circle r="14" fill="#B85244" opacity="0.2" className="animate-ping" />
            <circle r="7.5" fill="#B85244" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle r="2.5" fill="#FFFFFF" />
          </g>

          {/* Other storms markers (if any) */}
          {allStorms
            .filter(s => s.id !== storm.id)
            .map(s => (
              <g
                key={s.id}
                onClick={() => setActiveStorm(s.id)}
                className="cursor-pointer group"
                transform={`translate(${mapLonToX(s.current_lon)}, ${mapLatToY(s.current_lat)})`}
              >
                <circle r="6" fill="#C99846" stroke="#FFFFFF" strokeWidth="1.5" />
                <text
                  x="8"
                  y="3"
                  fill="#1C222B"
                  className="dark:fill-white font-mono font-bold text-[9px]"
                >
                  {s.name}
                </text>
              </g>
            ))}
        </svg>

        {/* Hover Readout Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 left-2 bg-[#1C222B]/90 text-white font-mono text-[11px] py-1 px-2.5 rounded-lg shadow-md pointer-events-none">
            {hoveredPoint}
          </div>
        )}

        {/* Bottom Legend Strip */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 dark:bg-[#1A1F28]/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E6E0D4] dark:border-[#2C3544] text-[11px] font-mono flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#423C32] dark:text-slate-300">
              <span className="w-3 h-0.5 bg-[#1C222B] dark:bg-white inline-block" />
              <span>Analysed Track</span>
            </span>
            <span className="flex items-center gap-1 text-[#423C32] dark:text-slate-300">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-[#7A6B52] dark:border-[#CBB58F] inline-block" />
              <span>48h Forecast</span>
            </span>
            <span className="flex items-center gap-1 text-[#423C32] dark:text-slate-300">
              <span className="w-2.5 h-2.5 bg-[#4E7A66]/20 border border-[#4E7A66] inline-block rounded-xs" />
              <span>P67 Cone</span>
            </span>
          </div>

          <div className="text-[#7A7264] dark:text-slate-400">
            Centre: <strong className="text-[#1C222B] dark:text-white">{formatCoords(storm.current_lat, storm.current_lon)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
