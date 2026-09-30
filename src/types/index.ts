export type Grade = 'DEP' | 'CS' | 'SCS' | 'VSCS+';
export type Basin = 'Bay of Bengal' | 'Arabian Sea';
export type Severity = 'info' | 'watch' | 'warning';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type EvolutionTrend = 'Intensifying' | 'Steady' | 'Weakening' | 'Rapid intensification expected';

export interface LatLon {
  lat: number;
  lon: number;
}

export interface TrackPoint extends LatLon {
  timestamp: string; // ISO string
  vmax_kt: number;
  vmax_kmh: number;
  vmax_std: number;
  grade: Grade;
  mslp_hpa: number;
  motion_speed_kmh?: number;
  motion_heading_deg?: number;
  motion_compass?: string;
  is_analysed?: boolean;
}

export interface ForecastPoint extends LatLon {
  lead_h: number;
  valid_time: string; // ISO string
  vmax_mean_kt: number;
  vmax_p10_kt: number;
  vmax_p90_kt: number;
  predicted_grade: Grade;
  cone_radius_km: number;
  dist_to_land_km: number;
  landfall_risk: boolean;
  ensemble_spread_km: number;
}

export interface EnsembleMember {
  member_id: number;
  name: string;
  track: { lead_h: number; lat: number; lon: number; vmax_kt: number }[];
}

export interface EnvironmentalParams {
  source: 'ERA5' | 'GFS forecast';
  steer_u_kmh: number;
  steer_v_kmh: number;
  steer_speed_kmh: number;
  steer_heading_deg: number;
  shear_u_ms: number;
  shear_v_ms: number;
  shear_magnitude_ms: number;
  shear_category: 'Low' | 'Moderate' | 'High';
  sst_c: number;
  sst_category: 'Favourable' | 'Marginal' | 'Unfavourable';
  rh700_pct: number;
  rh_category: 'Favourable' | 'Marginal';
  mslp_hpa: number;
  z500_dam: number;
}

export interface AnalysisDetail {
  detection_prob_pct: number;
  grade_probabilities: {
    DEP: number;
    CS: number;
    SCS: number;
    'VSCS+': number;
  };
  eye_flag: boolean;
  history_frames_used: number; // 1-3
  temperature_kelvin_min: number;
  cdore_brightness_temp: number;
}

export interface VerificationRecord {
  issue_time: string;
  lead_h: number;
  pred_lat: number;
  pred_lon: number;
  obs_lat: number;
  obs_lon: number;
  track_error_km: number;
  pred_vmax_kt: number;
  obs_vmax_kt: number;
  vmax_error_kt: number;
}

export interface AlertItem {
  id: string;
  storm_id: string;
  storm_name: string;
  rule_type: 'LANDFALL_RISK' | 'RAPID_INTENSIFICATION' | 'GRADE_UPGRADE' | 'NEW_SYSTEM' | 'DATA_STALE';
  severity: Severity;
  title: string;
  message: string;
  issued_at: string;
  expires_at: string;
  status: 'active' | 'expired';
  trigger_values: {
    lead_h?: number;
    probability_pct?: number;
    vmax_change_kt?: number;
    cone_radius_km?: number;
    members_agreeing?: number;
    coastal_region?: string;
  };
}

export interface SatelliteScene {
  id: string;
  timestamp: string;
  sensor: 'INSAT-3D' | 'INSAT-3DR' | 'INSAT-3DS';
  channel: 'TIR1' | 'WV' | 'MIR';
  resolution_km: number;
  coverage: 'North Indian Ocean Full Disk';
  thumbnail_url?: string;
}

export interface Storm {
  id: string;
  name: string;
  basin: Basin;
  status: 'active' | 'dissipated' | 'replaying';
  year: number;
  first_seen: string;
  last_seen: string;
  peak_grade: Grade;
  peak_vmax_kt: number;
  current_grade: Grade;
  current_vmax_kt: number;
  current_vmax_std: number;
  current_lat: number;
  current_lon: number;
  current_trend: EvolutionTrend;
  confidence: Confidence;
  confidence_reasons?: string[];
  motion_speed_kmh: number;
  motion_heading_deg: number;
  motion_compass: string;
  dist_to_land_km: number;
  first_land_contact_lead: number | null; // e.g. 24 or null if none in 48h
  first_land_region?: string;
  dv_24h_kt: number;
  is_ai_analysed: boolean;
  is_synthetic?: boolean;
  track_history: TrackPoint[];
  forecast_48h: ForecastPoint[];
  ensemble_members: EnsembleMember[];
  imd_best_track: TrackPoint[];
  env: EnvironmentalParams;
  analysis: AnalysisDetail;
  verification: VerificationRecord[];
}

export interface ReplayScenario {
  id: string;
  title: string;
  storm_name: string;
  storm_id: string;
  year: number;
  basin: Basin;
  description: string;
  key_feature: string;
  date_span: string;
  start_time: string;
  end_time: string;
  initial_as_of: string;
  peak_grade: Grade;
  peak_vmax_kt: number;
  is_synthetic: boolean;
  is_failure_case?: boolean;
  notable_outcome: string;
}
