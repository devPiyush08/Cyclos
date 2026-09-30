import React, { useState } from 'react';
import { Storm } from '../../types';
import { useAppStore } from '../../store/useStore';
import { formatTimeCompact, formatWind } from '../../utils/meteorology';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface IntensityChartCardProps {
  storm: Storm;
}

export const IntensityChartCard: React.FC<IntensityChartCardProps> = ({ storm }) => {
  const { unitWind, asOfTime } = useAppStore();
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  // Combine track history (analysed) and forecast points into continuous timeline
  const historyPoints = storm.track_history.map(h => ({
    time: h.timestamp,
    vmax: h.vmax_kt,
    p10: h.vmax_kt - 1.28 * h.vmax_std,
    p90: h.vmax_kt + 1.28 * h.vmax_std,
    isForecast: false,
    label: formatTimeCompact(h.timestamp)
  }));

  const forecastPoints = storm.forecast_48h.map(f => ({
    time: f.valid_time,
    vmax: f.vmax_mean_kt,
    p10: f.vmax_p10_kt,
    p90: f.vmax_p90_kt,
    isForecast: true,
    label: `+${f.lead_h}h (${formatTimeCompact(f.valid_time)})`
  }));

  const allPoints = [...historyPoints, ...forecastPoints];
  const maxWind = Math.max(120, ...allPoints.map(p => p.p90 + 10));
  const minWind = 15;

  // SVG Chart Dimensions
  const width = 580;
  const height = 240;
  const padLeft = 45;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;
  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const getX = (idx: number) => padLeft + (idx / (allPoints.length - 1)) * chartWidth;
  const getY = (vmax: number) => padTop + chartHeight - ((vmax - minWind) / (maxWind - minWind)) * chartHeight;

  // Analysed line
  const analysedPoints = historyPoints.map((p, i) => `${getX(i)},${getY(p.vmax)}`).join(' ');

  // Forecast line (starts from last history point)
  const forecastStartIdx = historyPoints.length - 1;
  const forecastLinePoints = [
    `${getX(forecastStartIdx)},${getY(historyPoints[forecastStartIdx].vmax)}`,
    ...forecastPoints.map((p, i) => `${getX(forecastStartIdx + 1 + i)},${getY(p.vmax)}`)
  ].join(' ');

  // Uncertainty band polygon (p10 to p90 for forecast)
  const topBand: string[] = [];
  const bottomBand: string[] = [];
  for (let i = 0; i < forecastPoints.length; i++) {
    const idx = forecastStartIdx + 1 + i;
    const pt = forecastPoints[i];
    topBand.push(`${getX(idx)},${getY(pt.p90)}`);
    bottomBand.unshift(`${getX(idx)},${getY(pt.p10)}`);
  }
  // Connect to forecast start
  const startPt = historyPoints[forecastStartIdx];
  topBand.unshift(`${getX(forecastStartIdx)},${getY(startPt.p90)}`);
  bottomBand.push(`${getX(forecastStartIdx)},${getY(startPt.p10)}`);
  const bandPolygon = [...topBand, ...bottomBand].join(' ');

  // As Of marker index
  const asOfIndex = historyPoints.length - 1;
  const asOfX = getX(asOfIndex);

  // Thresholds
  const thresholds = [
    { value: 34, label: 'CS (34 kt)', color: '#FFB020' },
    { value: 48, label: 'SCS (48 kt)', color: '#FF8A3D' },
    { value: 64, label: 'VSCS+ (64 kt)', color: '#E5484D' }
  ];

  const activePoint = activePointIndex !== null ? allPoints[activePointIndex] : null;

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-colors">
      {/* Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Intensity Evolution & 48h Prediction Envelope
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#7A7264] dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-[#1C222B] dark:bg-white inline-block" />
            <span>Analysed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#8A734D] dark:border-[#E2C38A] inline-block" />
            <span>Forecast</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-[#8A734D]/15 dark:bg-[#E2C38A]/20 border border-[#8A734D]/40 rounded-xs inline-block" />
            <span>p10-p90 Band</span>
          </span>
        </div>
      </div>

      {/* SVG Chart Stage */}
      <div className="relative w-full aspect-[21/9] min-h-[220px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          preserveAspectRatio="none"
        >
          {/* Threshold Lines */}
          {thresholds.map(t => {
            const y = getY(t.value);
            return (
              <g key={t.value}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke={t.color}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.65"
                />
                <text
                  x={width - padRight + 4}
                  y={y + 3}
                  fill={t.color}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* Uncertainty Band */}
          <polygon
            points={bandPolygon}
            fill="#8A734D"
            fillOpacity="0.14"
            stroke="#8A734D"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />

          {/* Vertical 'As Of' Marker */}
          <line
            x1={asOfX}
            y1={padTop}
            x2={asOfX}
            y2={height - padBottom}
            stroke="#7A6B52"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={asOfX}
            y={padTop - 6}
            fill="#7A6B52"
            className="dark:fill-[#CBB58F]"
            textAnchor="middle"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
          >
            as_of (Analysis)
          </text>

          {/* Analysed Path (Solid) */}
          <polyline
            points={analysedPoints}
            fill="none"
            stroke="#1C222B"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="dark:stroke-white"
          />

          {/* Forecast Path (Dashed) */}
          <polyline
            points={forecastLinePoints}
            fill="none"
            stroke="#8A734D"
            className="dark:stroke-[#E2C38A]"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {allPoints.map((p, idx) => {
            const cx = getX(idx);
            const cy = getY(p.vmax);
            const isHovered = activePointIndex === idx;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setActivePointIndex(idx)}
                onMouseLeave={() => setActivePointIndex(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : p.isForecast ? 4 : 3.5}
                  fill={p.isForecast ? '#3B5BFF' : '#0E1726'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className={!p.isForecast ? 'dark:fill-white' : ''}
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {allPoints.map((p, idx) => {
            // Show every 2nd label to avoid crowding
            if (idx % 2 !== 0 && idx !== allPoints.length - 1) return null;
            const x = getX(idx);
            return (
              <text
                key={idx}
                x={x}
                y={height - padBottom + 16}
                fill="#64748B"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {formatTimeCompact(p.time)}
              </text>
            );
          })}

          {/* Y Axis Labels */}
          {[30, 60, 90, 120].map(val => (
            <text
              key={val}
              x={padLeft - 6}
              y={getY(val) + 3}
              fill="#64748B"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              textAnchor="end"
            >
              {val} kt
            </text>
          ))}
        </svg>

        {/* Hover Tooltip Box */}
        {activePoint && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#0E1726]/95 text-white p-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-mono pointer-events-none transition-all duration-700"
          >
            <div className="font-semibold text-slate-300 mb-1">{activePoint.label}</div>
            <div className="flex items-center gap-3">
              <span>
                Vmax: <strong className="text-white">{formatWind(Math.round(activePoint.vmax), unitWind).primary}</strong>
              </span>
              <span className="text-slate-400">
                Range: [{Math.round(activePoint.p10)} - {Math.round(activePoint.p90)} kt]
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
