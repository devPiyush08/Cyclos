import React from 'react';
import { Storm, AlertItem } from '../../types';
import { StatTile } from '../common/StatTile';
import { useAppStore } from '../../store/useStore';
import { formatDistance, formatTimeCompact } from '../../utils/meteorology';

interface KpiTilesProps {
  storm: Storm;
  activeStorms: Storm[];
  activeAlerts: AlertItem[];
}

export const KpiTiles: React.FC<KpiTilesProps> = ({ storm, activeStorms, activeAlerts }) => {
  const { unitDist } = useAppStore();

  const highestSeverity = activeAlerts.some(a => a.severity === 'warning')
    ? 'Severe Warning'
    : activeAlerts.some(a => a.severity === 'watch')
    ? 'Coastal Watch'
    : 'Advisory Info';

  const forecast24h = storm.forecast_48h.find(f => f.lead_h === 24);
  const coneRadiusKm = forecast24h ? forecast24h.cone_radius_km : 72;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tile 1: Active Systems */}
      <StatTile
        label="Active Tropical Systems"
        value={activeStorms.length}
        unit="Over NIO"
        footnote={`First tracked: ${formatTimeCompact(storm.first_seen)}`}
        tooltipTerm="Confidence"
        tooltipCustom="Active cyclonic disturbances currently meeting depression or higher criteria over the North Indian Ocean."
      />

      {/* Tile 2: Active Alerts */}
      <StatTile
        label="Active Operational Alerts"
        value={activeAlerts.length}
        unit="Bulletins"
        footnote="Advisory level only"
        trendText={highestSeverity}
        tooltipTerm="Lead time"
        tooltipCustom="Active rule-based alerts triggered by landfall risk, rapid intensification, or grade thresholds."
      />

      {/* Tile 3: 24h Forecast Uncertainty */}
      <StatTile
        label="24h Forecast Cone Radius"
        value={`± ${formatDistance(coneRadiusKm, unitDist)}`}
        footnote="Calibrated P67 empirical spread"
        trendText={`Ensemble spread: ±${forecast24h?.ensemble_spread_km || 44} km`}
        tooltipTerm="Cone"
      />
    </div>
  );
};
