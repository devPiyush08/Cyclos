import { Storm, AlertItem, ReplayScenario, SatelliteScene } from '../types';

export const COASTLINE_REGIONS = [
  { name: 'Gujarat / Saurashtra', lat: 21.8, lon: 70.2 },
  { name: 'Konkan / Mumbai', lat: 18.9, lon: 72.8 },
  { name: 'Goa / Karnataka', lat: 14.8, lon: 74.1 },
  { name: 'Kerala / Malabar', lat: 9.9, lon: 76.2 },
  { name: 'Tamil Nadu / Chennai', lat: 13.1, lon: 80.3 },
  { name: 'Andhra Pradesh / Kakinada', lat: 16.9, lon: 82.2 },
  { name: 'Odisha / Paradip', lat: 20.3, lon: 86.6 },
  { name: 'West Bengal / Sundarbans', lat: 21.8, lon: 88.6 },
  { name: 'Bangladesh / Chittagong', lat: 22.3, lon: 91.8 },
  { name: 'Myanmar / Rakhine', lat: 19.5, lon: 93.5 },
  { name: 'Oman / Salalah', lat: 17.0, lon: 54.1 },
  { name: 'Pakistan / Karachi', lat: 24.8, lon: 66.9 },
  { name: 'Sri Lanka / Trincomalee', lat: 8.5, lon: 81.2 }
];

export const STORMS_DATA: Storm[] = [
  {
    id: 'SYS-2022-001',
    name: 'Asani',
    basin: 'Bay of Bengal',
    status: 'active',
    year: 2022,
    first_seen: '2022-05-07T06:00:00Z',
    last_seen: '2022-05-12T18:00:00Z',
    peak_grade: 'SCS',
    peak_vmax_kt: 65,
    current_grade: 'SCS',
    current_vmax_kt: 58,
    current_vmax_std: 3.8,
    current_lat: 14.8,
    current_lon: 84.1,
    current_trend: 'Intensifying',
    confidence: 'HIGH',
    confidence_reasons: [
      'High detection probability (94.2%) across all ensemble members',
      'Ensemble track spread (±38 km) well within calibrated 24h cone radius (72 km)',
      '3 continuous INSAT infrared frames available with high temporal fidelity'
    ],
    motion_speed_kmh: 14,
    motion_heading_deg: 305,
    motion_compass: 'NW',
    dist_to_land_km: 210,
    first_land_contact_lead: 30,
    first_land_region: 'Andhra Pradesh Coast (near Machilipatnam)',
    dv_24h_kt: 18,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2022-05-07T06:00:00Z', lat: 9.8, lon: 90.5, vmax_kt: 25, vmax_kmh: 46, vmax_std: 2.1, grade: 'DEP', mslp_hpa: 1002, motion_speed_kmh: 12, motion_heading_deg: 310, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-07T18:00:00Z', lat: 10.9, lon: 89.2, vmax_kt: 30, vmax_kmh: 56, vmax_std: 2.3, grade: 'DEP', mslp_hpa: 998, motion_speed_kmh: 13, motion_heading_deg: 315, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-08T06:00:00Z', lat: 11.8, lon: 88.0, vmax_kt: 40, vmax_kmh: 74, vmax_std: 2.8, grade: 'CS', mslp_hpa: 994, motion_speed_kmh: 14, motion_heading_deg: 315, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-08T18:00:00Z', lat: 12.6, lon: 86.8, vmax_kt: 45, vmax_kmh: 83, vmax_std: 3.1, grade: 'CS', mslp_hpa: 990, motion_speed_kmh: 15, motion_heading_deg: 320, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-09T00:00:00Z', lat: 13.2, lon: 86.1, vmax_kt: 50, vmax_kmh: 93, vmax_std: 3.4, grade: 'SCS', mslp_hpa: 986, motion_speed_kmh: 14, motion_heading_deg: 315, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-09T06:00:00Z', lat: 13.8, lon: 85.3, vmax_kt: 54, vmax_kmh: 100, vmax_std: 3.6, grade: 'SCS', mslp_hpa: 984, motion_speed_kmh: 14, motion_heading_deg: 310, motion_compass: 'NW', is_analysed: true },
      { timestamp: '2022-05-09T12:00:00Z', lat: 14.8, lon: 84.1, vmax_kt: 58, vmax_kmh: 107, vmax_std: 3.8, grade: 'SCS', mslp_hpa: 982, motion_speed_kmh: 14, motion_heading_deg: 305, motion_compass: 'NW', is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2022-05-09T18:00:00Z', lat: 15.3, lon: 83.4, vmax_mean_kt: 62, vmax_p10_kt: 56, vmax_p90_kt: 67, predicted_grade: 'SCS', cone_radius_km: 32, dist_to_land_km: 145, landfall_risk: false, ensemble_spread_km: 18 },
      { lead_h: 12, valid_time: '2022-05-10T00:00:00Z', lat: 15.7, lon: 82.9, vmax_mean_kt: 64, vmax_p10_kt: 57, vmax_p90_kt: 70, predicted_grade: 'SCS', cone_radius_km: 46, dist_to_land_km: 98, landfall_risk: false, ensemble_spread_km: 26 },
      { lead_h: 24, valid_time: '2022-05-10T12:00:00Z', lat: 16.3, lon: 82.5, vmax_mean_kt: 60, vmax_p10_kt: 52, vmax_p90_kt: 68, predicted_grade: 'SCS', cone_radius_km: 72, dist_to_land_km: 42, landfall_risk: true, ensemble_spread_km: 44 },
      { lead_h: 48, valid_time: '2022-05-11T12:00:00Z', lat: 17.1, lon: 83.2, vmax_mean_kt: 46, vmax_p10_kt: 38, vmax_p90_kt: 54, predicted_grade: 'CS', cone_radius_km: 118, dist_to_land_km: 15, landfall_risk: true, ensemble_spread_km: 78 }
    ],
    ensemble_members: [
      {
        member_id: 1,
        name: 'Seed-42 (ResNet-18 M1)',
        track: [
          { lead_h: 6, lat: 15.2, lon: 83.3, vmax_kt: 63 },
          { lead_h: 12, lat: 15.6, lon: 82.8, vmax_kt: 66 },
          { lead_h: 24, lat: 16.2, lon: 82.3, vmax_kt: 62 },
          { lead_h: 48, lat: 17.0, lon: 83.0, vmax_kt: 48 }
        ]
      },
      {
        member_id: 2,
        name: 'Seed-137 (ResNet-18 M2)',
        track: [
          { lead_h: 6, lat: 15.3, lon: 83.5, vmax_kt: 61 },
          { lead_h: 12, lat: 15.8, lon: 83.0, vmax_kt: 63 },
          { lead_h: 24, lat: 16.4, lon: 82.7, vmax_kt: 59 },
          { lead_h: 48, lat: 17.3, lon: 83.4, vmax_kt: 44 }
        ]
      },
      {
        member_id: 3,
        name: 'Seed-256 (ResNet-18 M3)',
        track: [
          { lead_h: 6, lat: 15.4, lon: 83.4, vmax_kt: 62 },
          { lead_h: 12, lat: 15.7, lon: 82.9, vmax_kt: 65 },
          { lead_h: 24, lat: 16.3, lon: 82.5, vmax_kt: 61 },
          { lead_h: 48, lat: 17.1, lon: 83.3, vmax_kt: 47 }
        ]
      },
      {
        member_id: 4,
        name: 'Seed-512 (ResNet-18 M4)',
        track: [
          { lead_h: 6, lat: 15.3, lon: 83.3, vmax_kt: 60 },
          { lead_h: 12, lat: 15.6, lon: 82.7, vmax_kt: 62 },
          { lead_h: 24, lat: 16.1, lon: 82.2, vmax_kt: 58 },
          { lead_h: 48, lat: 16.8, lon: 82.8, vmax_kt: 43 }
        ]
      },
      {
        member_id: 5,
        name: 'Seed-1024 (ResNet-18 M5)',
        track: [
          { lead_h: 6, lat: 15.3, lon: 83.6, vmax_kt: 64 },
          { lead_h: 12, lat: 15.8, lon: 83.1, vmax_kt: 66 },
          { lead_h: 24, lat: 16.5, lon: 82.8, vmax_kt: 61 },
          { lead_h: 48, lat: 17.2, lon: 83.6, vmax_kt: 49 }
        ]
      }
    ],
    imd_best_track: [
      { timestamp: '2022-05-07T06:00:00Z', lat: 9.7, lon: 90.6, vmax_kt: 25, vmax_kmh: 46, vmax_std: 0, grade: 'DEP', mslp_hpa: 1002 },
      { timestamp: '2022-05-07T18:00:00Z', lat: 10.8, lon: 89.3, vmax_kt: 30, vmax_kmh: 56, vmax_std: 0, grade: 'DEP', mslp_hpa: 998 },
      { timestamp: '2022-05-08T06:00:00Z', lat: 11.7, lon: 88.1, vmax_kt: 40, vmax_kmh: 74, vmax_std: 0, grade: 'CS', mslp_hpa: 994 },
      { timestamp: '2022-05-08T18:00:00Z', lat: 12.5, lon: 86.9, vmax_kt: 45, vmax_kmh: 83, vmax_std: 0, grade: 'CS', mslp_hpa: 990 },
      { timestamp: '2022-05-09T00:00:00Z', lat: 13.1, lon: 86.2, vmax_kt: 50, vmax_kmh: 93, vmax_std: 0, grade: 'SCS', mslp_hpa: 986 },
      { timestamp: '2022-05-09T06:00:00Z', lat: 13.9, lon: 85.4, vmax_kt: 55, vmax_kmh: 102, vmax_std: 0, grade: 'SCS', mslp_hpa: 984 },
      { timestamp: '2022-05-09T12:00:00Z', lat: 14.7, lon: 84.0, vmax_kt: 60, vmax_kmh: 111, vmax_std: 0, grade: 'SCS', mslp_hpa: 982 },
      { timestamp: '2022-05-09T18:00:00Z', lat: 15.2, lon: 83.3, vmax_kt: 65, vmax_kmh: 120, vmax_std: 0, grade: 'SCS', mslp_hpa: 980 },
      { timestamp: '2022-05-10T00:00:00Z', lat: 15.6, lon: 82.8, vmax_kt: 65, vmax_kmh: 120, vmax_std: 0, grade: 'SCS', mslp_hpa: 980 },
      { timestamp: '2022-05-10T12:00:00Z', lat: 16.1, lon: 82.4, vmax_kt: 55, vmax_kmh: 102, vmax_std: 0, grade: 'SCS', mslp_hpa: 986 },
      { timestamp: '2022-05-11T12:00:00Z', lat: 16.9, lon: 83.1, vmax_kt: 45, vmax_kmh: 83, vmax_std: 0, grade: 'CS', mslp_hpa: 992 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: -11.2,
      steer_v_kmh: 8.6,
      steer_speed_kmh: 14.1,
      steer_heading_deg: 307,
      shear_u_ms: 6.8,
      shear_v_ms: -4.2,
      shear_magnitude_ms: 8.0,
      shear_category: 'Low',
      sst_c: 30.2,
      sst_category: 'Favourable',
      rh700_pct: 78,
      rh_category: 'Favourable',
      mslp_hpa: 982,
      z500_dam: 588
    },
    analysis: {
      detection_prob_pct: 94.2,
      grade_probabilities: {
        DEP: 1.2,
        CS: 11.5,
        SCS: 82.1,
        'VSCS+': 5.2
      },
      eye_flag: false,
      history_frames_used: 3,
      temperature_kelvin_min: 198.4,
      cdore_brightness_temp: 202.1
    },
    verification: [
      { issue_time: '2022-05-08T06:00:00Z', lead_h: 6, pred_lat: 12.3, pred_lon: 87.2, obs_lat: 12.5, obs_lon: 86.9, track_error_km: 36.4, pred_vmax_kt: 43, obs_vmax_kt: 45, vmax_error_kt: -2 },
      { issue_time: '2022-05-08T06:00:00Z', lead_h: 12, pred_lat: 12.9, pred_lon: 86.5, obs_lat: 13.1, obs_lon: 86.2, track_error_km: 41.2, pred_vmax_kt: 48, obs_vmax_kt: 50, vmax_error_kt: -2 },
      { issue_time: '2022-05-08T06:00:00Z', lead_h: 24, pred_lat: 14.2, pred_lon: 85.0, obs_lat: 13.9, obs_lon: 85.4, track_error_km: 54.8, pred_vmax_kt: 56, obs_vmax_kt: 55, vmax_error_kt: 1 },
      { issue_time: '2022-05-08T06:00:00Z', lead_h: 48, pred_lat: 16.5, pred_lon: 82.2, obs_lat: 16.1, obs_lon: 82.4, track_error_km: 68.2, pred_vmax_kt: 52, obs_vmax_kt: 55, vmax_error_kt: -3 }
    ]
  },
  {
    id: 'SYS-2023-002',
    name: 'Biparjoy',
    basin: 'Arabian Sea',
    status: 'dissipated',
    year: 2023,
    first_seen: '2023-06-06T00:00:00Z',
    last_seen: '2023-06-19T06:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 90,
    current_grade: 'VSCS+',
    current_vmax_kt: 85,
    current_vmax_std: 4.2,
    current_lat: 20.4,
    current_lon: 66.8,
    current_trend: 'Steady',
    confidence: 'HIGH',
    confidence_reasons: [
      'Well-formed central dense overcast with visible eye signature',
      'Consistent steering agreement across ERA5 and GFS deterministic analyses'
    ],
    motion_speed_kmh: 8,
    motion_heading_deg: 5,
    motion_compass: 'N',
    dist_to_land_km: 260,
    first_land_contact_lead: 24,
    first_land_region: 'Saurashtra & Kutch Coast (near Jakhau Port)',
    dv_24h_kt: 5,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2023-06-06T06:00:00Z', lat: 11.5, lon: 66.0, vmax_kt: 30, vmax_kmh: 56, vmax_std: 2.1, grade: 'DEP', mslp_hpa: 998, is_analysed: true },
      { timestamp: '2023-06-07T06:00:00Z', lat: 12.8, lon: 66.2, vmax_kt: 45, vmax_kmh: 83, vmax_std: 2.7, grade: 'CS', mslp_hpa: 990, is_analysed: true },
      { timestamp: '2023-06-08T06:00:00Z', lat: 14.1, lon: 66.0, vmax_kt: 65, vmax_kmh: 120, vmax_std: 3.4, grade: 'SCS', mslp_hpa: 980, is_analysed: true },
      { timestamp: '2023-06-10T06:00:00Z', lat: 16.8, lon: 67.4, vmax_kt: 90, vmax_kmh: 167, vmax_std: 4.5, grade: 'VSCS+', mslp_hpa: 958, is_analysed: true },
      { timestamp: '2023-06-12T06:00:00Z', lat: 19.3, lon: 67.5, vmax_kt: 85, vmax_kmh: 157, vmax_std: 4.1, grade: 'VSCS+', mslp_hpa: 964, is_analysed: true },
      { timestamp: '2023-06-14T06:00:00Z', lat: 21.8, lon: 66.7, vmax_kt: 80, vmax_kmh: 148, vmax_std: 4.0, grade: 'VSCS+', mslp_hpa: 968, is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2023-06-14T12:00:00Z', lat: 22.2, lon: 67.1, vmax_mean_kt: 78, vmax_p10_kt: 72, vmax_p90_kt: 84, predicted_grade: 'VSCS+', cone_radius_km: 30, dist_to_land_km: 190, landfall_risk: true, ensemble_spread_km: 19 },
      { lead_h: 12, valid_time: '2023-06-14T18:00:00Z', lat: 22.6, lon: 67.7, vmax_mean_kt: 75, vmax_p10_kt: 68, vmax_p90_kt: 81, predicted_grade: 'VSCS+', cone_radius_km: 44, dist_to_land_km: 125, landfall_risk: true, ensemble_spread_km: 27 },
      { lead_h: 24, valid_time: '2023-06-15T06:00:00Z', lat: 23.1, lon: 68.4, vmax_mean_kt: 70, vmax_p10_kt: 62, vmax_p90_kt: 78, predicted_grade: 'VSCS+', cone_radius_km: 68, dist_to_land_km: 45, landfall_risk: true, ensemble_spread_km: 41 },
      { lead_h: 48, valid_time: '2023-06-16T06:00:00Z', lat: 24.2, lon: 70.3, vmax_mean_kt: 40, vmax_p10_kt: 32, vmax_p90_kt: 48, predicted_grade: 'CS', cone_radius_km: 110, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 72 }
    ],
    ensemble_members: [
      {
        member_id: 1,
        name: 'Seed-42',
        track: [
          { lead_h: 6, lat: 22.1, lon: 67.0, vmax_kt: 79 },
          { lead_h: 12, lat: 22.5, lon: 67.6, vmax_kt: 76 },
          { lead_h: 24, lat: 23.0, lon: 68.3, vmax_kt: 71 },
          { lead_h: 48, lat: 24.1, lon: 70.1, vmax_kt: 41 }
        ]
      },
      {
        member_id: 2,
        name: 'Seed-137',
        track: [
          { lead_h: 6, lat: 22.3, lon: 67.2, vmax_kt: 77 },
          { lead_h: 12, lat: 22.7, lon: 67.8, vmax_kt: 74 },
          { lead_h: 24, lat: 23.2, lon: 68.5, vmax_kt: 69 },
          { lead_h: 48, lat: 24.3, lon: 70.5, vmax_kt: 39 }
        ]
      },
      {
        member_id: 3,
        name: 'Seed-256',
        track: [
          { lead_h: 6, lat: 22.2, lon: 67.1, vmax_kt: 78 },
          { lead_h: 12, lat: 22.6, lon: 67.7, vmax_kt: 75 },
          { lead_h: 24, lat: 23.1, lon: 68.4, vmax_kt: 70 },
          { lead_h: 48, lat: 24.2, lon: 70.3, vmax_kt: 40 }
        ]
      },
      {
        member_id: 4,
        name: 'Seed-512',
        track: [
          { lead_h: 6, lat: 22.2, lon: 67.0, vmax_kt: 80 },
          { lead_h: 12, lat: 22.5, lon: 67.5, vmax_kt: 77 },
          { lead_h: 24, lat: 22.9, lon: 68.2, vmax_kt: 72 },
          { lead_h: 48, lat: 23.9, lon: 69.9, vmax_kt: 42 }
        ]
      },
      {
        member_id: 5,
        name: 'Seed-1024',
        track: [
          { lead_h: 6, lat: 22.3, lon: 67.3, vmax_kt: 76 },
          { lead_h: 12, lat: 22.8, lon: 67.9, vmax_kt: 73 },
          { lead_h: 24, lat: 23.3, lon: 68.6, vmax_kt: 68 },
          { lead_h: 48, lat: 24.5, lon: 70.6, vmax_kt: 38 }
        ]
      }
    ],
    imd_best_track: [
      { timestamp: '2023-06-06T06:00:00Z', lat: 11.5, lon: 66.0, vmax_kt: 30, vmax_kmh: 56, vmax_std: 0, grade: 'DEP', mslp_hpa: 998 },
      { timestamp: '2023-06-08T06:00:00Z', lat: 14.0, lon: 66.1, vmax_kt: 65, vmax_kmh: 120, vmax_std: 0, grade: 'SCS', mslp_hpa: 980 },
      { timestamp: '2023-06-10T06:00:00Z', lat: 16.7, lon: 67.4, vmax_kt: 90, vmax_kmh: 167, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 958 },
      { timestamp: '2023-06-14T06:00:00Z', lat: 21.9, lon: 66.6, vmax_kt: 80, vmax_kmh: 148, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 968 },
      { timestamp: '2023-06-15T18:00:00Z', lat: 23.2, lon: 68.6, vmax_kt: 65, vmax_kmh: 120, vmax_std: 0, grade: 'SCS', mslp_hpa: 978 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: 3.2,
      steer_v_kmh: 12.4,
      steer_speed_kmh: 12.8,
      steer_heading_deg: 14,
      shear_u_ms: -3.8,
      shear_v_ms: 7.1,
      shear_magnitude_ms: 8.1,
      shear_category: 'Low',
      sst_c: 31.4,
      sst_category: 'Favourable',
      rh700_pct: 72,
      rh_category: 'Favourable',
      mslp_hpa: 968,
      z500_dam: 590
    },
    analysis: {
      detection_prob_pct: 98.6,
      grade_probabilities: {
        DEP: 0.1,
        CS: 1.2,
        SCS: 6.4,
        'VSCS+': 92.3
      },
      eye_flag: true,
      history_frames_used: 3,
      temperature_kelvin_min: 191.2,
      cdore_brightness_temp: 195.8
    },
    verification: [
      { issue_time: '2023-06-13T06:00:00Z', lead_h: 6, pred_lat: 20.8, pred_lon: 66.8, obs_lat: 20.7, obs_lon: 66.9, track_error_km: 18.2, pred_vmax_kt: 82, obs_vmax_kt: 85, vmax_error_kt: -3 },
      { issue_time: '2023-06-13T06:00:00Z', lead_h: 12, pred_lat: 21.3, pred_lon: 66.8, obs_lat: 21.2, obs_lon: 66.7, track_error_km: 22.4, pred_vmax_kt: 80, obs_vmax_kt: 80, vmax_error_kt: 0 },
      { issue_time: '2023-06-13T06:00:00Z', lead_h: 24, pred_lat: 22.2, pred_lon: 67.2, obs_lat: 21.9, obs_lon: 66.6, track_error_km: 56.1, pred_vmax_kt: 78, obs_vmax_kt: 80, vmax_error_kt: -2 },
      { issue_time: '2023-06-13T06:00:00Z', lead_h: 48, pred_lat: 23.4, pred_lon: 68.7, obs_lat: 23.2, obs_lon: 68.6, track_error_km: 26.5, pred_vmax_kt: 68, obs_vmax_kt: 65, vmax_error_kt: 3 }
    ]
  },
  {
    id: 'SYS-2020-001',
    name: 'Amphan',
    basin: 'Bay of Bengal',
    status: 'dissipated',
    year: 2020,
    first_seen: '2020-05-16T00:00:00Z',
    last_seen: '2020-05-21T12:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 130,
    current_grade: 'VSCS+',
    current_vmax_kt: 120,
    current_vmax_std: 4.8,
    current_lat: 16.5,
    current_lon: 86.8,
    current_trend: 'Rapid intensification expected',
    confidence: 'HIGH',
    confidence_reasons: [
      'Very high optical and thermal contrast with clear circular pinhole eye',
      'Optimal oceanic heat content (>120 kJ/cm²) and near-zero vertical wind shear'
    ],
    motion_speed_kmh: 16,
    motion_heading_deg: 10,
    motion_compass: 'N',
    dist_to_land_km: 540,
    first_land_contact_lead: 36,
    first_land_region: 'West Bengal - Bangladesh Coast (Sundarbans)',
    dv_24h_kt: 45,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2020-05-16T06:00:00Z', lat: 10.4, lon: 86.8, vmax_kt: 30, vmax_kmh: 56, vmax_std: 2.0, grade: 'DEP', mslp_hpa: 998, is_analysed: true },
      { timestamp: '2020-05-17T06:00:00Z', lat: 11.5, lon: 86.0, vmax_kt: 50, vmax_kmh: 93, vmax_std: 2.8, grade: 'CS', mslp_hpa: 988, is_analysed: true },
      { timestamp: '2020-05-17T18:00:00Z', lat: 12.5, lon: 86.3, vmax_kt: 75, vmax_kmh: 139, vmax_std: 3.5, grade: 'VSCS+', mslp_hpa: 968, is_analysed: true },
      { timestamp: '2020-05-18T06:00:00Z', lat: 13.4, lon: 86.2, vmax_kt: 120, vmax_kmh: 222, vmax_std: 4.9, grade: 'VSCS+', mslp_hpa: 925, is_analysed: true },
      { timestamp: '2020-05-18T18:00:00Z', lat: 14.8, lon: 86.4, vmax_kt: 130, vmax_kmh: 241, vmax_std: 5.1, grade: 'VSCS+', mslp_hpa: 907, is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2020-05-19T00:00:00Z', lat: 15.6, lon: 86.6, vmax_mean_kt: 125, vmax_p10_kt: 118, vmax_p90_kt: 132, predicted_grade: 'VSCS+', cone_radius_km: 28, dist_to_land_km: 420, landfall_risk: false, ensemble_spread_km: 15 },
      { lead_h: 12, valid_time: '2020-05-19T06:00:00Z', lat: 16.5, lon: 86.8, vmax_mean_kt: 115, vmax_p10_kt: 106, vmax_p90_kt: 122, predicted_grade: 'VSCS+', cone_radius_km: 42, dist_to_land_km: 310, landfall_risk: false, ensemble_spread_km: 24 },
      { lead_h: 24, valid_time: '2020-05-19T18:00:00Z', lat: 18.4, lon: 87.3, vmax_mean_kt: 100, vmax_p10_kt: 90, vmax_p90_kt: 110, predicted_grade: 'VSCS+', cone_radius_km: 65, dist_to_land_km: 180, landfall_risk: true, ensemble_spread_km: 38 },
      { lead_h: 48, valid_time: '2020-05-20T18:00:00Z', lat: 22.1, lon: 88.4, vmax_mean_kt: 85, vmax_p10_kt: 75, vmax_p90_kt: 94, predicted_grade: 'VSCS+', cone_radius_km: 105, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 68 }
    ],
    ensemble_members: [
      { member_id: 1, name: 'Seed-42', track: [{ lead_h: 6, lat: 15.5, lon: 86.5, vmax_kt: 126 }, { lead_h: 12, lat: 16.4, lon: 86.7, vmax_kt: 116 }, { lead_h: 24, lat: 18.3, lon: 87.2, vmax_kt: 101 }, { lead_h: 48, lat: 22.0, lon: 88.3, vmax_kt: 86 }] },
      { member_id: 2, name: 'Seed-137', track: [{ lead_h: 6, lat: 15.7, lon: 86.7, vmax_kt: 124 }, { lead_h: 12, lat: 16.6, lon: 86.9, vmax_kt: 114 }, { lead_h: 24, lat: 18.5, lon: 87.4, vmax_kt: 99 }, { lead_h: 48, lat: 22.2, lon: 88.5, vmax_kt: 84 }] },
      { member_id: 3, name: 'Seed-256', track: [{ lead_h: 6, lat: 15.6, lon: 86.6, vmax_kt: 125 }, { lead_h: 12, lat: 16.5, lon: 86.8, vmax_kt: 115 }, { lead_h: 24, lat: 18.4, lon: 87.3, vmax_kt: 100 }, { lead_h: 48, lat: 22.1, lon: 88.4, vmax_kt: 85 }] },
      { member_id: 4, name: 'Seed-512', track: [{ lead_h: 6, lat: 15.6, lon: 86.5, vmax_kt: 127 }, { lead_h: 12, lat: 16.5, lon: 86.7, vmax_kt: 117 }, { lead_h: 24, lat: 18.3, lon: 87.1, vmax_kt: 102 }, { lead_h: 48, lat: 21.9, lon: 88.2, vmax_kt: 87 }] },
      { member_id: 5, name: 'Seed-1024', track: [{ lead_h: 6, lat: 15.7, lon: 86.7, vmax_kt: 123 }, { lead_h: 12, lat: 16.6, lon: 87.0, vmax_kt: 113 }, { lead_h: 24, lat: 18.6, lon: 87.5, vmax_kt: 98 }, { lead_h: 48, lat: 22.3, lon: 88.6, vmax_kt: 83 }] }
    ],
    imd_best_track: [
      { timestamp: '2020-05-16T06:00:00Z', lat: 10.4, lon: 86.8, vmax_kt: 30, vmax_kmh: 56, vmax_std: 0, grade: 'DEP', mslp_hpa: 998 },
      { timestamp: '2020-05-18T06:00:00Z', lat: 13.3, lon: 86.3, vmax_kt: 120, vmax_kmh: 222, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 925 },
      { timestamp: '2020-05-18T18:00:00Z', lat: 14.9, lon: 86.5, vmax_kt: 130, vmax_kmh: 241, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 907 },
      { timestamp: '2020-05-20T12:00:00Z', lat: 21.7, lon: 88.3, vmax_kt: 85, vmax_kmh: 157, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 950 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: 3.5,
      steer_v_kmh: 15.8,
      steer_speed_kmh: 16.2,
      steer_heading_deg: 12,
      shear_u_ms: 2.1,
      shear_v_ms: 3.4,
      shear_magnitude_ms: 4.0,
      shear_category: 'Low',
      sst_c: 32.1,
      sst_category: 'Favourable',
      rh700_pct: 86,
      rh_category: 'Favourable',
      mslp_hpa: 910,
      z500_dam: 592
    },
    analysis: {
      detection_prob_pct: 99.8,
      grade_probabilities: {
        DEP: 0.0,
        CS: 0.1,
        SCS: 1.1,
        'VSCS+': 98.8
      },
      eye_flag: true,
      history_frames_used: 3,
      temperature_kelvin_min: 184.6,
      cdore_brightness_temp: 188.2
    },
    verification: [
      { issue_time: '2020-05-18T06:00:00Z', lead_h: 6, pred_lat: 14.1, pred_lon: 86.3, obs_lat: 14.0, obs_lon: 86.4, track_error_km: 15.1, pred_vmax_kt: 128, obs_vmax_kt: 130, vmax_error_kt: -2 },
      { issue_time: '2020-05-18T06:00:00Z', lead_h: 12, pred_lat: 14.9, pred_lon: 86.4, obs_lat: 14.9, obs_lon: 86.5, track_error_km: 10.8, pred_vmax_kt: 132, obs_vmax_kt: 130, vmax_error_kt: 2 },
      { issue_time: '2020-05-18T06:00:00Z', lead_h: 24, pred_lat: 16.7, pred_lon: 86.8, obs_lat: 16.5, obs_lon: 86.8, track_error_km: 22.3, pred_vmax_kt: 120, obs_vmax_kt: 115, vmax_error_kt: 5 },
      { issue_time: '2020-05-18T06:00:00Z', lead_h: 48, pred_lat: 21.9, pred_lon: 88.5, obs_lat: 21.7, obs_lon: 88.3, track_error_km: 31.4, pred_vmax_kt: 80, obs_vmax_kt: 85, vmax_error_kt: -5 }
    ]
  },
  {
    id: 'SYS-2023-001',
    name: 'Mocha',
    basin: 'Bay of Bengal',
    status: 'dissipated',
    year: 2023,
    first_seen: '2023-05-09T00:00:00Z',
    last_seen: '2023-05-15T00:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 115,
    current_grade: 'VSCS+',
    current_vmax_kt: 110,
    current_vmax_std: 4.1,
    current_lat: 17.5,
    current_lon: 90.8,
    current_trend: 'Steady',
    confidence: 'HIGH',
    confidence_reasons: [
      'Pronounced deep convection core with symmetry index >0.88',
      'Consistent northeasterly steering ridge'
    ],
    motion_speed_kmh: 21,
    motion_heading_deg: 42,
    motion_compass: 'NE',
    dist_to_land_km: 280,
    first_land_contact_lead: 18,
    first_land_region: 'Myanmar / Sittwe Coast',
    dv_24h_kt: 32,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2023-05-09T06:00:00Z', lat: 9.2, lon: 88.4, vmax_kt: 25, vmax_kmh: 46, vmax_std: 2.1, grade: 'DEP', mslp_hpa: 1002, is_analysed: true },
      { timestamp: '2023-05-10T18:00:00Z', lat: 11.2, lon: 88.0, vmax_kt: 40, vmax_kmh: 74, vmax_std: 2.6, grade: 'CS', mslp_hpa: 994, is_analysed: true },
      { timestamp: '2023-05-12T06:00:00Z', lat: 13.5, lon: 88.2, vmax_kt: 65, vmax_kmh: 120, vmax_std: 3.5, grade: 'SCS', mslp_hpa: 980, is_analysed: true },
      { timestamp: '2023-05-13T06:00:00Z', lat: 15.6, lon: 89.2, vmax_kt: 105, vmax_kmh: 194, vmax_std: 4.6, grade: 'VSCS+', mslp_hpa: 945, is_analysed: true },
      { timestamp: '2023-05-13T18:00:00Z', lat: 17.5, lon: 90.8, vmax_kt: 115, vmax_kmh: 213, vmax_std: 4.8, grade: 'VSCS+', mslp_hpa: 938, is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2023-05-14T00:00:00Z', lat: 18.6, lon: 91.8, vmax_mean_kt: 110, vmax_p10_kt: 102, vmax_p90_kt: 118, predicted_grade: 'VSCS+', cone_radius_km: 26, dist_to_land_km: 180, landfall_risk: true, ensemble_spread_km: 14 },
      { lead_h: 12, valid_time: '2023-05-14T06:00:00Z', lat: 19.6, lon: 92.7, vmax_mean_kt: 105, vmax_p10_kt: 96, vmax_p90_kt: 112, predicted_grade: 'VSCS+', cone_radius_km: 38, dist_to_land_km: 65, landfall_risk: true, ensemble_spread_km: 22 },
      { lead_h: 24, valid_time: '2023-05-14T18:00:00Z', lat: 21.2, lon: 94.2, vmax_mean_kt: 60, vmax_p10_kt: 50, vmax_p90_kt: 70, predicted_grade: 'SCS', cone_radius_km: 62, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 36 },
      { lead_h: 48, valid_time: '2023-05-15T18:00:00Z', lat: 24.5, lon: 97.4, vmax_mean_kt: 25, vmax_p10_kt: 18, vmax_p90_kt: 32, predicted_grade: 'DEP', cone_radius_km: 98, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 58 }
    ],
    ensemble_members: [
      { member_id: 1, name: 'Seed-42', track: [{ lead_h: 6, lat: 18.5, lon: 91.7, vmax_kt: 111 }, { lead_h: 12, lat: 19.5, lon: 92.6, vmax_kt: 106 }, { lead_h: 24, lat: 21.1, lon: 94.1, vmax_kt: 61 }, { lead_h: 48, lat: 24.4, lon: 97.3, vmax_kt: 26 }] },
      { member_id: 2, name: 'Seed-137', track: [{ lead_h: 6, lat: 18.7, lon: 91.9, vmax_kt: 109 }, { lead_h: 12, lat: 19.7, lon: 92.8, vmax_kt: 104 }, { lead_h: 24, lat: 21.3, lon: 94.3, vmax_kt: 59 }, { lead_h: 48, lat: 24.6, lon: 97.5, vmax_kt: 24 }] },
      { member_id: 3, name: 'Seed-256', track: [{ lead_h: 6, lat: 18.6, lon: 91.8, vmax_kt: 110 }, { lead_h: 12, lat: 19.6, lon: 92.7, vmax_kt: 105 }, { lead_h: 24, lat: 21.2, lon: 94.2, vmax_kt: 60 }, { lead_h: 48, lat: 24.5, lon: 97.4, vmax_kt: 25 }] },
      { member_id: 4, name: 'Seed-512', track: [{ lead_h: 6, lat: 18.5, lon: 91.7, vmax_kt: 112 }, { lead_h: 12, lat: 19.5, lon: 92.6, vmax_kt: 107 }, { lead_h: 24, lat: 21.1, lon: 94.0, vmax_kt: 62 }, { lead_h: 48, lat: 24.3, lon: 97.2, vmax_kt: 27 }] },
      { member_id: 5, name: 'Seed-1024', track: [{ lead_h: 6, lat: 18.7, lon: 91.9, vmax_kt: 108 }, { lead_h: 12, lat: 19.7, lon: 92.8, vmax_kt: 103 }, { lead_h: 24, lat: 21.4, lon: 94.4, vmax_kt: 58 }, { lead_h: 48, lat: 24.7, lon: 97.6, vmax_kt: 23 }] }
    ],
    imd_best_track: [
      { timestamp: '2023-05-09T06:00:00Z', lat: 9.2, lon: 88.4, vmax_kt: 25, vmax_kmh: 46, vmax_std: 0, grade: 'DEP', mslp_hpa: 1002 },
      { timestamp: '2023-05-12T06:00:00Z', lat: 13.4, lon: 88.3, vmax_kt: 65, vmax_kmh: 120, vmax_std: 0, grade: 'SCS', mslp_hpa: 980 },
      { timestamp: '2023-05-13T18:00:00Z', lat: 17.6, lon: 90.7, vmax_kt: 115, vmax_kmh: 213, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 938 },
      { timestamp: '2023-05-14T07:00:00Z', lat: 20.1, lon: 92.8, vmax_kt: 105, vmax_kmh: 194, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 945 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: 15.2,
      steer_v_kmh: 14.6,
      steer_speed_kmh: 21.1,
      steer_heading_deg: 46,
      shear_u_ms: 3.4,
      shear_v_ms: 4.8,
      shear_magnitude_ms: 5.9,
      shear_category: 'Low',
      sst_c: 31.0,
      sst_category: 'Favourable',
      rh700_pct: 82,
      rh_category: 'Favourable',
      mslp_hpa: 938,
      z500_dam: 590
    },
    analysis: {
      detection_prob_pct: 99.4,
      grade_probabilities: {
        DEP: 0.0,
        CS: 0.2,
        SCS: 2.4,
        'VSCS+': 97.4
      },
      eye_flag: true,
      history_frames_used: 3,
      temperature_kelvin_min: 189.5,
      cdore_brightness_temp: 193.1
    },
    verification: [
      { issue_time: '2023-05-13T06:00:00Z', lead_h: 6, pred_lat: 16.6, pred_lon: 89.9, obs_lat: 16.5, obs_lon: 90.0, track_error_km: 14.8, pred_vmax_kt: 110, obs_vmax_kt: 110, vmax_error_kt: 0 },
      { issue_time: '2023-05-13T06:00:00Z', lead_h: 12, pred_lat: 17.7, pred_lon: 90.8, obs_lat: 17.6, obs_lon: 90.7, track_error_km: 15.4, pred_vmax_kt: 114, obs_vmax_kt: 115, vmax_error_kt: -1 },
      { issue_time: '2023-05-13T06:00:00Z', lead_h: 24, pred_lat: 19.9, pred_lon: 92.7, obs_lat: 20.1, obs_lon: 92.8, track_error_km: 24.2, pred_vmax_kt: 100, obs_vmax_kt: 105, vmax_error_kt: -5 },
      { issue_time: '2023-05-13T06:00:00Z', lead_h: 48, pred_lat: 24.2, pred_lon: 96.9, obs_lat: 24.0, obs_lon: 97.2, track_error_km: 38.6, pred_vmax_kt: 30, obs_vmax_kt: 30, vmax_error_kt: 0 }
    ]
  },
  {
    id: 'SYS-2021-002',
    name: 'Tauktae',
    basin: 'Arabian Sea',
    status: 'dissipated',
    year: 2021,
    first_seen: '2021-05-14T00:00:00Z',
    last_seen: '2021-05-19T12:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 100,
    current_grade: 'VSCS+',
    current_vmax_kt: 95,
    current_vmax_std: 4.0,
    current_lat: 18.7,
    current_lon: 71.5,
    current_trend: 'Steady',
    confidence: 'HIGH',
    confidence_reasons: [
      'Very strong coastal parallel trajectory well constrained by Western Ghats topography',
      'High agreement across ensemble members'
    ],
    motion_speed_kmh: 18,
    motion_heading_deg: 340,
    motion_compass: 'NNW',
    dist_to_land_km: 140,
    first_land_contact_lead: 20,
    first_land_region: 'Gujarat / Saurashtra Coast',
    dv_24h_kt: 20,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2021-05-14T06:00:00Z', lat: 10.5, lon: 73.0, vmax_kt: 30, vmax_kmh: 56, vmax_std: 2.2, grade: 'DEP', mslp_hpa: 998, is_analysed: true },
      { timestamp: '2021-05-15T06:00:00Z', lat: 12.8, lon: 72.5, vmax_kt: 45, vmax_kmh: 83, vmax_std: 2.8, grade: 'CS', mslp_hpa: 990, is_analysed: true },
      { timestamp: '2021-05-16T06:00:00Z', lat: 15.3, lon: 72.1, vmax_kt: 75, vmax_kmh: 139, vmax_std: 3.5, grade: 'VSCS+', mslp_hpa: 970, is_analysed: true },
      { timestamp: '2021-05-17T06:00:00Z', lat: 18.7, lon: 71.5, vmax_kt: 95, vmax_kmh: 176, vmax_std: 4.1, grade: 'VSCS+', mslp_hpa: 950, is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2021-05-17T12:00:00Z', lat: 19.6, lon: 71.3, vmax_mean_kt: 95, vmax_p10_kt: 88, vmax_p90_kt: 102, predicted_grade: 'VSCS+', cone_radius_km: 28, dist_to_land_km: 110, landfall_risk: true, ensemble_spread_km: 16 },
      { lead_h: 12, valid_time: '2021-05-17T18:00:00Z', lat: 20.6, lon: 71.2, vmax_mean_kt: 90, vmax_p10_kt: 82, vmax_p90_kt: 98, predicted_grade: 'VSCS+', cone_radius_km: 42, dist_to_land_km: 40, landfall_risk: true, ensemble_spread_km: 25 },
      { lead_h: 24, valid_time: '2021-05-18T06:00:00Z', lat: 21.8, lon: 71.5, vmax_mean_kt: 65, vmax_p10_kt: 56, vmax_p90_kt: 74, predicted_grade: 'SCS', cone_radius_km: 66, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 40 },
      { lead_h: 48, valid_time: '2021-05-19T06:00:00Z', lat: 24.8, lon: 73.2, vmax_mean_kt: 25, vmax_p10_kt: 18, vmax_p90_kt: 32, predicted_grade: 'DEP', cone_radius_km: 102, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 65 }
    ],
    ensemble_members: [
      { member_id: 1, name: 'Seed-42', track: [{ lead_h: 6, lat: 19.5, lon: 71.2, vmax_kt: 96 }, { lead_h: 12, lat: 20.5, lon: 71.1, vmax_kt: 91 }, { lead_h: 24, lat: 21.7, lon: 71.4, vmax_kt: 66 }, { lead_h: 48, lat: 24.7, lon: 73.1, vmax_kt: 26 }] },
      { member_id: 2, name: 'Seed-137', track: [{ lead_h: 6, lat: 19.7, lon: 71.4, vmax_kt: 94 }, { lead_h: 12, lat: 20.7, lon: 71.3, vmax_kt: 89 }, { lead_h: 24, lat: 21.9, lon: 71.6, vmax_kt: 64 }, { lead_h: 48, lat: 24.9, lon: 73.3, vmax_kt: 24 }] },
      { member_id: 3, name: 'Seed-256', track: [{ lead_h: 6, lat: 19.6, lon: 71.3, vmax_kt: 95 }, { lead_h: 12, lat: 20.6, lon: 71.2, vmax_kt: 90 }, { lead_h: 24, lat: 21.8, lon: 71.5, vmax_kt: 65 }, { lead_h: 48, lat: 24.8, lon: 73.2, vmax_kt: 25 }] },
      { member_id: 4, name: 'Seed-512', track: [{ lead_h: 6, lat: 19.5, lon: 71.2, vmax_kt: 97 }, { lead_h: 12, lat: 20.5, lon: 71.1, vmax_kt: 92 }, { lead_h: 24, lat: 21.7, lon: 71.3, vmax_kt: 67 }, { lead_h: 48, lat: 24.6, lon: 73.0, vmax_kt: 27 }] },
      { member_id: 5, name: 'Seed-1024', track: [{ lead_h: 6, lat: 19.7, lon: 71.4, vmax_kt: 93 }, { lead_h: 12, lat: 20.7, lon: 71.3, vmax_kt: 88 }, { lead_h: 24, lat: 21.9, lon: 71.7, vmax_kt: 63 }, { lead_h: 48, lat: 25.0, lon: 73.4, vmax_kt: 23 }] }
    ],
    imd_best_track: [
      { timestamp: '2021-05-14T06:00:00Z', lat: 10.5, lon: 73.0, vmax_kt: 30, vmax_kmh: 56, vmax_std: 0, grade: 'DEP', mslp_hpa: 998 },
      { timestamp: '2021-05-16T06:00:00Z', lat: 15.3, lon: 72.1, vmax_kt: 75, vmax_kmh: 139, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 970 },
      { timestamp: '2021-05-17T15:00:00Z', lat: 20.8, lon: 71.1, vmax_kt: 100, vmax_kmh: 185, vmax_std: 0, grade: 'VSCS+', mslp_hpa: 950 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: -5.4,
      steer_v_kmh: 17.2,
      steer_speed_kmh: 18.0,
      steer_heading_deg: 343,
      shear_u_ms: -2.1,
      shear_v_ms: 6.5,
      shear_magnitude_ms: 6.8,
      shear_category: 'Low',
      sst_c: 30.8,
      sst_category: 'Favourable',
      rh700_pct: 75,
      rh_category: 'Favourable',
      mslp_hpa: 950,
      z500_dam: 588
    },
    analysis: {
      detection_prob_pct: 98.9,
      grade_probabilities: {
        DEP: 0.0,
        CS: 0.5,
        SCS: 4.5,
        'VSCS+': 95.0
      },
      eye_flag: true,
      history_frames_used: 3,
      temperature_kelvin_min: 187.8,
      cdore_brightness_temp: 191.4
    },
    verification: [
      { issue_time: '2021-05-16T06:00:00Z', lead_h: 6, pred_lat: 16.1, pred_lon: 72.0, obs_lat: 16.0, obs_lon: 72.0, track_error_km: 11.1, pred_vmax_kt: 80, obs_vmax_kt: 80, vmax_error_kt: 0 },
      { issue_time: '2021-05-16T06:00:00Z', lead_h: 12, pred_lat: 17.0, pred_lon: 71.8, obs_lat: 16.9, obs_lon: 71.9, track_error_km: 15.2, pred_vmax_kt: 85, obs_vmax_kt: 85, vmax_error_kt: 0 },
      { issue_time: '2021-05-16T06:00:00Z', lead_h: 24, pred_lat: 18.8, pred_lon: 71.6, obs_lat: 18.7, obs_lon: 71.5, track_error_km: 15.8, pred_vmax_kt: 92, obs_vmax_kt: 95, vmax_error_kt: -3 },
      { issue_time: '2021-05-16T06:00:00Z', lead_h: 48, pred_lat: 21.7, pred_lon: 71.3, obs_lat: 21.6, obs_lon: 71.2, track_error_km: 15.1, pred_vmax_kt: 70, obs_vmax_kt: 65, vmax_error_kt: 5 }
    ]
  },
  {
    id: 'SYS-2021-MON',
    name: 'BOB-04 (Monsoon Depression)',
    basin: 'Bay of Bengal',
    status: 'dissipated',
    year: 2021,
    first_seen: '2021-09-12T00:00:00Z',
    last_seen: '2021-09-15T12:00:00Z',
    peak_grade: 'DEP',
    peak_vmax_kt: 30,
    current_grade: 'DEP',
    current_vmax_kt: 28,
    current_vmax_std: 5.6,
    current_lat: 20.8,
    current_lon: 87.4,
    current_trend: 'Weakening',
    confidence: 'LOW',
    confidence_reasons: [
      'High vertical wind shear (>22 m/s) tearing the deep convective canopy',
      'Broad asymmetric monsoon low-level circulation without consolidated eye/core',
      'Wide divergence across 5 ensemble seeds (spread ±112 km at 24h)'
    ],
    motion_speed_kmh: 24,
    motion_heading_deg: 295,
    motion_compass: 'WNW',
    dist_to_land_km: 65,
    first_land_contact_lead: 6,
    first_land_region: 'Odisha Coast (near Chandbali)',
    dv_24h_kt: -4,
    is_ai_analysed: true,
    is_synthetic: false,
    track_history: [
      { timestamp: '2021-09-12T06:00:00Z', lat: 19.5, lon: 89.2, vmax_kt: 25, vmax_kmh: 46, vmax_std: 3.8, grade: 'DEP', mslp_hpa: 1000, is_analysed: true },
      { timestamp: '2021-09-12T18:00:00Z', lat: 20.2, lon: 88.4, vmax_kt: 30, vmax_kmh: 56, vmax_std: 4.2, grade: 'DEP', mslp_hpa: 996, is_analysed: true },
      { timestamp: '2021-09-13T06:00:00Z', lat: 20.8, lon: 87.4, vmax_kt: 28, vmax_kmh: 52, vmax_std: 5.6, grade: 'DEP', mslp_hpa: 994, is_analysed: true }
    ],
    forecast_48h: [
      { lead_h: 6, valid_time: '2021-09-13T12:00:00Z', lat: 21.2, lon: 86.4, vmax_mean_kt: 26, vmax_p10_kt: 18, vmax_p90_kt: 34, predicted_grade: 'DEP', cone_radius_km: 45, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 35 },
      { lead_h: 12, valid_time: '2021-09-13T18:00:00Z', lat: 21.6, lon: 85.2, vmax_mean_kt: 24, vmax_p10_kt: 15, vmax_p90_kt: 32, predicted_grade: 'DEP', cone_radius_km: 68, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 58 },
      { lead_h: 24, valid_time: '2021-09-14T06:00:00Z', lat: 22.3, lon: 83.1, vmax_mean_kt: 20, vmax_p10_kt: 12, vmax_p90_kt: 28, predicted_grade: 'DEP', cone_radius_km: 115, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 112 },
      { lead_h: 48, valid_time: '2021-09-15T06:00:00Z', lat: 23.4, lon: 79.5, vmax_mean_kt: 15, vmax_p10_kt: 10, vmax_p90_kt: 22, predicted_grade: 'DEP', cone_radius_km: 180, dist_to_land_km: 0, landfall_risk: true, ensemble_spread_km: 165 }
    ],
    ensemble_members: [
      { member_id: 1, name: 'Seed-42', track: [{ lead_h: 6, lat: 21.1, lon: 86.2, vmax_kt: 25 }, { lead_h: 12, lat: 21.4, lon: 84.9, vmax_kt: 23 }, { lead_h: 24, lat: 22.0, lon: 82.6, vmax_kt: 19 }, { lead_h: 48, lat: 23.1, lon: 78.8, vmax_kt: 14 }] },
      { member_id: 2, name: 'Seed-137', track: [{ lead_h: 6, lat: 21.4, lon: 86.6, vmax_kt: 28 }, { lead_h: 12, lat: 21.9, lon: 85.5, vmax_kt: 26 }, { lead_h: 24, lat: 22.7, lon: 83.6, vmax_kt: 22 }, { lead_h: 48, lat: 23.8, lon: 80.2, vmax_kt: 16 }] },
      { member_id: 3, name: 'Seed-256', track: [{ lead_h: 6, lat: 21.2, lon: 86.4, vmax_kt: 26 }, { lead_h: 12, lat: 21.6, lon: 85.2, vmax_kt: 24 }, { lead_h: 24, lat: 22.3, lon: 83.1, vmax_kt: 20 }, { lead_h: 48, lat: 23.4, lon: 79.5, vmax_kt: 15 }] },
      { member_id: 4, name: 'Seed-512', track: [{ lead_h: 6, lat: 21.0, lon: 86.3, vmax_kt: 24 }, { lead_h: 12, lat: 21.3, lon: 85.0, vmax_kt: 22 }, { lead_h: 24, lat: 21.9, lon: 82.8, vmax_kt: 18 }, { lead_h: 48, lat: 22.9, lon: 79.0, vmax_kt: 13 }] },
      { member_id: 5, name: 'Seed-1024', track: [{ lead_h: 6, lat: 21.3, lon: 86.5, vmax_kt: 27 }, { lead_h: 12, lat: 21.8, lon: 85.4, vmax_kt: 25 }, { lead_h: 24, lat: 22.6, lon: 83.4, vmax_kt: 21 }, { lead_h: 48, lat: 23.7, lon: 80.0, vmax_kt: 16 }] }
    ],
    imd_best_track: [
      { timestamp: '2021-09-12T06:00:00Z', lat: 19.5, lon: 89.2, vmax_kt: 25, vmax_kmh: 46, vmax_std: 0, grade: 'DEP', mslp_hpa: 1000 },
      { timestamp: '2021-09-13T06:00:00Z', lat: 20.7, lon: 87.3, vmax_kt: 30, vmax_kmh: 56, vmax_std: 0, grade: 'DEP', mslp_hpa: 994 },
      { timestamp: '2021-09-13T12:00:00Z', lat: 21.0, lon: 86.6, vmax_kt: 25, vmax_kmh: 46, vmax_std: 0, grade: 'DEP', mslp_hpa: 996 }
    ],
    env: {
      source: 'ERA5',
      steer_u_kmh: -21.4,
      steer_v_kmh: 9.8,
      steer_speed_kmh: 23.5,
      steer_heading_deg: 295,
      shear_u_ms: -18.4,
      shear_v_ms: 12.2,
      shear_magnitude_ms: 22.1,
      shear_category: 'High',
      sst_c: 28.5,
      sst_category: 'Favourable',
      rh700_pct: 92,
      rh_category: 'Favourable',
      mslp_hpa: 994,
      z500_dam: 586
    },
    analysis: {
      detection_prob_pct: 68.4,
      grade_probabilities: {
        DEP: 84.6,
        CS: 14.8,
        SCS: 0.6,
        'VSCS+': 0.0
      },
      eye_flag: false,
      history_frames_used: 2,
      temperature_kelvin_min: 218.4,
      cdore_brightness_temp: 224.2
    },
    verification: [
      { issue_time: '2021-09-12T18:00:00Z', lead_h: 6, pred_lat: 20.6, pred_lon: 87.6, obs_lat: 20.7, obs_lon: 87.3, track_error_km: 33.2, pred_vmax_kt: 28, obs_vmax_kt: 30, vmax_error_kt: -2 },
      { issue_time: '2021-09-12T18:00:00Z', lead_h: 12, pred_lat: 21.2, pred_lon: 86.7, obs_lat: 21.0, obs_lon: 86.6, track_error_km: 24.1, pred_vmax_kt: 26, obs_vmax_kt: 25, vmax_error_kt: 1 }
    ]
  }
];

export const ALERTS_DATA: AlertItem[] = [
  {
    id: 'ALT-2022-004',
    storm_id: 'SYS-2022-001',
    storm_name: 'Asani',
    rule_type: 'LANDFALL_RISK',
    severity: 'watch',
    title: 'Coastal Proximity Watch (Lead +30h)',
    message: 'Calibrated 24h-48h uncertainty cone intersects Andhra Pradesh coastline between Kakinada and Machilipatnam. Sustained gale winds likely.',
    issued_at: '2022-05-09T10:30:00Z',
    expires_at: '2022-05-11T12:00:00Z',
    status: 'active',
    trigger_values: {
      lead_h: 30,
      probability_pct: 78,
      cone_radius_km: 72,
      coastal_region: 'Andhra Pradesh Coast'
    }
  },
  {
    id: 'ALT-2022-003',
    storm_id: 'SYS-2022-001',
    storm_name: 'Asani',
    rule_type: 'GRADE_UPGRADE',
    severity: 'watch',
    title: 'Upgraded to Severe Cyclonic Storm (SCS)',
    message: 'Estimated maximum sustained winds reached 58 kt (±3.8 kt). Multi-spectral INSAT-3D analysis confirms deepening central dense overcast.',
    issued_at: '2022-05-09T02:00:00Z',
    expires_at: '2022-05-10T14:00:00Z',
    status: 'active',
    trigger_values: {
      lead_h: 0,
      vmax_change_kt: 18,
      members_agreeing: 5
    }
  },
  {
    id: 'ALT-2020-001',
    storm_id: 'SYS-2020-001',
    storm_name: 'Amphan',
    rule_type: 'RAPID_INTENSIFICATION',
    severity: 'warning',
    title: 'Rapid Intensification (RI) Detected (+45 kt / 24h)',
    message: 'Intensification exceeds 30 kt threshold over past 24 hours. Pinhole eye observed on TIR1 channel. Extreme destructive potential.',
    issued_at: '2020-05-18T00:00:00Z',
    expires_at: '2020-05-19T18:00:00Z',
    status: 'active',
    trigger_values: {
      lead_h: 0,
      vmax_change_kt: 45,
      probability_pct: 99,
      members_agreeing: 5
    }
  },
  {
    id: 'ALT-2023-002',
    storm_id: 'SYS-2023-002',
    storm_name: 'Biparjoy',
    rule_type: 'LANDFALL_RISK',
    severity: 'warning',
    title: 'Landfall Warning - Saurashtra & Kutch',
    message: 'Storm centre forecast to make landfall near Jakhau Port within 24h at Very Severe intensity (70-75 kt). Extreme storm surge risk.',
    issued_at: '2023-06-14T06:00:00Z',
    expires_at: '2023-06-16T00:00:00Z',
    status: 'active',
    trigger_values: {
      lead_h: 24,
      probability_pct: 94,
      cone_radius_km: 68,
      coastal_region: 'Saurashtra & Kutch (Gujarat)'
    }
  },
  {
    id: 'ALT-2022-001',
    storm_id: 'SYS-2022-001',
    storm_name: 'Asani',
    rule_type: 'NEW_SYSTEM',
    severity: 'info',
    title: 'New Tropical System Identified (SYS-2022-001)',
    message: 'Persistent cyclonic vortex consolidated over Southeast Bay of Bengal. Two consecutive INSAT scenes confirmed 25 kt circulation.',
    issued_at: '2022-05-07T06:00:00Z',
    expires_at: '2022-05-08T06:00:00Z',
    status: 'expired',
    trigger_values: {
      lead_h: 0,
      probability_pct: 88,
      members_agreeing: 4
    }
  }
];

export const REPLAY_SCENARIOS: ReplayScenario[] = [
  {
    id: 'SCN-ASANI-2022',
    title: 'Recurvature Decision - Cyclone Asani (2022)',
    storm_name: 'Asani',
    storm_id: 'SYS-2022-001',
    year: 2022,
    basin: 'Bay of Bengal',
    description: 'Track the northwestward march across central Bay of Bengal and AI detection of recurvature near Andhra Pradesh coast under increasing southwesterly shear.',
    key_feature: 'Sharp track recurvature prediction 36 hours prior to best-track confirmation.',
    date_span: '07 May 2022 · 06:00 UTC - 12 May 2022 · 18:00 UTC',
    start_time: '2022-05-07T06:00:00Z',
    end_time: '2022-05-12T18:00:00Z',
    initial_as_of: '2022-05-09T12:00:00Z',
    peak_grade: 'SCS',
    peak_vmax_kt: 65,
    is_synthetic: false,
    notable_outcome: 'Near-coast stalling prevented direct catastrophic landfall; model correctly tightened cone.'
  },
  {
    id: 'SCN-BIPARJOY-2023',
    title: 'Long-Duration Track - Cyclone Biparjoy (2023)',
    storm_name: 'Biparjoy',
    storm_id: 'SYS-2023-002',
    year: 2023,
    basin: 'Arabian Sea',
    description: 'Analyze an exceptionally long-lived Arabian Sea system (13 days) undergoing dual track shifts before heading towards Gujarat.',
    key_feature: 'Extended lead-time track stability despite multiple steering flow transitions.',
    date_span: '06 Jun 2023 · 00:00 UTC - 19 Jun 2023 · 06:00 UTC',
    start_time: '2023-06-06T00:00:00Z',
    end_time: '2023-06-19T06:00:00Z',
    initial_as_of: '2023-06-14T06:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 90,
    is_synthetic: false,
    notable_outcome: 'Zero human casualties achieved through precision 48h warning and mass evacuation.'
  },
  {
    id: 'SCN-AMPHAN-2020',
    title: 'Extreme Rapid Intensification - Super Cyclone Amphan (2020)',
    storm_name: 'Amphan',
    storm_id: 'SYS-2020-001',
    year: 2020,
    basin: 'Bay of Bengal',
    description: 'Watch the explosive +45 kt / 24h intensification from Cyclonic Storm to Category 5 Super Cyclone in ideal oceanic thermal environment.',
    key_feature: 'Automatic RI advisory triggered 18 hours before IMD special bulletin issuance.',
    date_span: '16 May 2020 · 00:00 UTC - 21 May 2020 · 12:00 UTC',
    start_time: '2020-05-16T00:00:00Z',
    end_time: '2020-05-21T12:00:00Z',
    initial_as_of: '2020-05-18T06:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 130,
    is_synthetic: false,
    notable_outcome: 'Accurate Sundarbans landfall track forecast verified within 31 km at 48h.'
  },
  {
    id: 'SCN-MOCHA-2023',
    title: 'High-Speed Translation - Cyclone Mocha (2023)',
    storm_name: 'Mocha',
    storm_id: 'SYS-2023-001',
    year: 2023,
    basin: 'Bay of Bengal',
    description: 'Fast-moving 115 kt system across northern Bay of Bengal into Rakhine state, Myanmar. Tests rapid inference latency.',
    key_feature: 'Tight ensemble consensus despite high translation speed (>21 km/h).',
    date_span: '09 May 2023 · 00:00 UTC - 15 May 2023 · 00:00 UTC',
    start_time: '2023-05-09T00:00:00Z',
    end_time: '2023-05-15T00:00:00Z',
    initial_as_of: '2023-05-13T18:00:00Z',
    peak_grade: 'VSCS+',
    peak_vmax_kt: 115,
    is_synthetic: false,
    notable_outcome: 'Early Myanmar border warning facilitated cross-agency disaster mobilization.'
  },
  {
    id: 'SCN-FAILURE-2021',
    title: 'High-Uncertainty Failure Case - Monsoon Depression BOB-04 (2021)',
    storm_name: 'BOB-04',
    storm_id: 'SYS-2021-MON',
    year: 2021,
    basin: 'Bay of Bengal',
    description: 'An honest look at model limitations: a sheared monsoon low with ill-defined centre and heavy ensemble spread. Displayed with LOW confidence flag.',
    key_feature: 'System surfaces honest wide uncertainty cones and flags environmental hostility.',
    date_span: '12 Sep 2021 · 00:00 UTC - 15 Sep 2021 · 12:00 UTC',
    start_time: '2021-09-12T00:00:00Z',
    end_time: '2021-09-15T12:00:00Z',
    initial_as_of: '2021-09-13T06:00:00Z',
    peak_grade: 'DEP',
    peak_vmax_kt: 30,
    is_synthetic: false,
    is_failure_case: true,
    notable_outcome: 'Exemplifies calibrated uncertainty bounds when satellite cloud structure is sheared.'
  }
];

export const SATELLITE_SCENES: SatelliteScene[] = [
  { id: 'SCN-20220509-0000Z', timestamp: '2022-05-09T00:00:00Z', sensor: 'INSAT-3D', channel: 'TIR1', resolution_km: 4, coverage: 'North Indian Ocean Full Disk' },
  { id: 'SCN-20220509-0300Z', timestamp: '2022-05-09T03:00:00Z', sensor: 'INSAT-3DR', channel: 'TIR1', resolution_km: 4, coverage: 'North Indian Ocean Full Disk' },
  { id: 'SCN-20220509-0600Z', timestamp: '2022-05-09T06:00:00Z', sensor: 'INSAT-3D', channel: 'WV', resolution_km: 8, coverage: 'North Indian Ocean Full Disk' },
  { id: 'SCN-20220509-0900Z', timestamp: '2022-05-09T09:00:00Z', sensor: 'INSAT-3DR', channel: 'MIR', resolution_km: 4, coverage: 'North Indian Ocean Full Disk' },
  { id: 'SCN-20220509-1200Z', timestamp: '2022-05-09T12:00:00Z', sensor: 'INSAT-3D', channel: 'TIR1', resolution_km: 4, coverage: 'North Indian Ocean Full Disk' }
];

export const MODEL_SPECS = {
  version: 'CycloneWatch v2.0-Prod',
  architecture: 'ResNet-18 Multi-Task Backbone with 5-Seed Ensemble',
  input_tensors: '9 Channels (3 consecutive frames × 3 spectral bands: TIR1 10.8µm, WV 6.9µm, MIR 3.9µm)',
  training_years: '2014 - 2021 (INSAT-3D/3DR archived L1B + IMD Best Track labels)',
  validation_years: '2022 - 2024 (Held-out North Indian Ocean seasons)',
  loss_function: 'Weighted Multi-Task Loss: Smooth-L1 for Center & Vmax, Temperature-Scaled Cross-Entropy for Grade, BCE for Detection',
  ensemble_size: 5,
  inference_latency_ms: 184,
  calibration_method: 'Conformalized Quantile Regression with P67 / P90 Empirical Error Floors',
  limitations: [
    'Sub-optimal center localization on monsoon depressions with deep convective shearing (>20 m/s shear)',
    'Secondary eyewall replacement cycles (ERC) may cause transient underestimation of outer gale radius',
    'Rapid transition across shallow coastal waters (depth <15m) requires coupling with high-res tidal bathymetry',
    'Cloud-top temperature smearing during localized convective overshooting tops'
  ]
};

export const MODEL_METRICS_DATA = {
  overall_detection: {
    accuracy_pct: 95.8,
    f1_score: 0.942,
    precision: 0.938,
    recall: 0.947,
    auc_roc: 0.984
  },
  track_error_km: [
    { lead: '+6h', model: 28.4, cliper: 42.1, persistence: 48.6, imd_ref: 26.2 },
    { lead: '+12h', model: 41.2, cliper: 68.4, persistence: 84.1, imd_ref: 39.5 },
    { lead: '+24h', model: 68.7, cliper: 118.2, persistence: 156.4, imd_ref: 64.1 },
    { lead: '+48h', model: 114.5, cliper: 198.6, persistence: 285.2, imd_ref: 108.9 }
  ],
  vmax_mae_kt: [
    { lead: '+6h', model: 3.8, cliper: 7.2, persistence: 6.8 },
    { lead: '+12h', model: 5.4, cliper: 9.8, persistence: 10.2 },
    { lead: '+24h', model: 7.9, cliper: 14.1, persistence: 16.5 },
    { lead: '+48h', model: 11.2, cliper: 21.4, persistence: 25.8 }
  ],
  confusion_matrix: [
    { actual: 'DEP', DEP: 142, CS: 11, SCS: 2, 'VSCS+': 0, row_total: 155, recall_pct: 91.6 },
    { actual: 'CS', DEP: 9, CS: 186, SCS: 14, 'VSCS+': 1, row_total: 210, recall_pct: 88.6 },
    { actual: 'SCS', DEP: 1, CS: 12, SCS: 128, 'VSCS+': 9, row_total: 150, recall_pct: 85.3 },
    { actual: 'VSCS+', DEP: 0, CS: 2, SCS: 8, 'VSCS+': 114, row_total: 124, recall_pct: 91.9 }
  ],
  calibration_coverage: [
    { nominal: '50%', empirical: '51.4%', mean_cone_km: 46 },
    { nominal: '67% (P67 Cone)', empirical: '68.2%', mean_cone_km: 72 },
    { nominal: '90%', empirical: '89.1%', mean_cone_km: 124 }
  ]
};
