import { Grade, Severity, Confidence } from '../types';

export function formatTimeLong(isoString: string): string {
  try {
    const d = new Date(isoString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = months[d.getUTCMonth()];
    const year = d.getUTCFullYear();
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const mins = String(d.getUTCMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} · ${hours}:${mins} UTC`;
  } catch {
    return isoString;
  }
}

export function formatTimeCompact(isoString: string): string {
  try {
    const d = new Date(isoString);
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const mins = String(d.getUTCMinutes()).padStart(2, '0');
    return `${m}-${day} ${hours}:${mins}Z`;
  } catch {
    return isoString;
  }
}

export function formatCoords(lat: number, lon: number, precision: 1 | 2 = 1): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(precision)}°${latDir} ${Math.abs(lon).toFixed(precision)}°${lonDir}`;
}

export function ktToKmh(kt: number): number {
  return Math.round(kt * 1.852);
}

export function kmToNm(km: number): number {
  return Math.round(km / 1.852);
}

export function formatWind(kt: number, unit: 'kt' | 'kmh' = 'kt'): { primary: string; secondary: string } {
  if (unit === 'kmh') {
    return {
      primary: `${ktToKmh(kt)} km/h`,
      secondary: `${kt} kt`
    };
  }
  return {
    primary: `${kt} kt`,
    secondary: `${ktToKmh(kt)} km/h`
  };
}

export function formatDistance(km: number, unit: 'km' | 'nm' = 'km'): string {
  if (unit === 'nm') {
    return `${kmToNm(km)} nm`;
  }
  return `${km} km`;
}

export function getGradeColor(grade: Grade): {
  bg: string;
  ink: string;
  dot: string;
  border: string;
  name: string;
} {
  switch (grade) {
    case 'DEP':
      return {
        bg: 'bg-[#E7EFEA] dark:bg-[#1E2E25]',
        ink: 'text-[#285341] dark:text-[#A7D7C1]',
        dot: 'bg-[#4E856D]',
        border: 'border-[#4E856D]/30',
        name: 'Depression'
      };
    case 'CS':
      return {
        bg: 'bg-[#F4EEDF] dark:bg-[#2C271A]',
        ink: 'text-[#6E4D1B] dark:text-[#E2C78E]',
        dot: 'bg-[#B38032]',
        border: 'border-[#B38032]/30',
        name: 'Cyclonic Storm'
      };
    case 'SCS':
      return {
        bg: 'bg-[#F7E8DD] dark:bg-[#32231A]',
        ink: 'text-[#7D3E1E] dark:text-[#EBB599]',
        dot: 'bg-[#C0683A]',
        border: 'border-[#C0683A]/30',
        name: 'Severe Cyclonic Storm'
      };
    case 'VSCS+':
      return {
        bg: 'bg-[#F8E3E3] dark:bg-[#341C1C]',
        ink: 'text-[#842929] dark:text-[#F0A8A8]',
        dot: 'bg-[#B83E3E]',
        border: 'border-[#B83E3E]/30',
        name: 'Very Severe Cyclonic Storm+'
      };
  }
}

export function getSeverityStyle(sev: Severity): {
  bg: string;
  ink: string;
  iconColor: string;
  border: string;
  label: string;
} {
  switch (sev) {
    case 'info':
      return {
        bg: 'bg-[#EBF0F5] dark:bg-[#1C2633]',
        ink: 'text-[#28496B] dark:text-[#97B8DA]',
        iconColor: 'text-[#3E658C]',
        border: 'border-[#3E658C]/25',
        label: 'Advisory Info'
      };
    case 'watch':
      return {
        bg: 'bg-[#F6EEDA] dark:bg-[#2D2619]',
        ink: 'text-[#784E12] dark:text-[#DFB972]',
        iconColor: 'text-[#A06C22]',
        border: 'border-[#A06C22]/25',
        label: 'Coastal Watch'
      };
    case 'warning':
      return {
        bg: 'bg-[#F8E3E3] dark:bg-[#331C1C]',
        ink: 'text-[#842929] dark:text-[#F0A8A8]',
        iconColor: 'text-[#B83E3E]',
        border: 'border-[#B83E3E]/25',
        label: 'Severe Warning'
      };
  }
}

export function getConfidenceStyle(conf: Confidence): {
  bg: string;
  ink: string;
  bars: number;
} {
  switch (conf) {
    case 'HIGH':
      return {
        bg: 'bg-[#E7EFEA] dark:bg-[#1E2E25]',
        ink: 'text-[#285341] dark:text-[#A7D7C1]',
        bars: 3
      };
    case 'MEDIUM':
      return {
        bg: 'bg-[#F4EEDF] dark:bg-[#2C271A]',
        ink: 'text-[#6E4D1B] dark:text-[#E2C78E]',
        bars: 2
      };
    case 'LOW':
      return {
        bg: 'bg-[#F8E3E3] dark:bg-[#341C1C]',
        ink: 'text-[#842929] dark:text-[#F0A8A8]',
        bars: 1
      };
  }
}

export const GLOSSARY: Record<string, string> = {
  Grade: 'Intensity class from wind speed: Depression (<=33 kt), Cyclonic Storm (34-47 kt), Severe Cyclonic Storm (48-63 kt), Very Severe or stronger (>=64 kt).',
  Vmax: 'Estimated maximum sustained wind (3-minute average) near the tropical cyclone circulation centre.',
  kt: 'Knots. 1 kt = 1.852 km/h.',
  Cone: "Area where the storm centre is likely to be (P67 calibrated probability). It is drawn from the model's past empirical errors at each lead time.",
  'Lead time': 'How many hours ahead the forecast looks (+6h, +12h, +24h, +48h).',
  Confidence: 'How much to trust this analysis, evaluated from detection strength, ensemble spread agreement, and historical frames available.',
  Ensemble: 'Five independently trained neural network seeds. The spread between them represents track and intensity uncertainty.',
  'Rapid intensification': 'A gain of 30 knots or more in maximum sustained wind speed within 24 hours.',
  Shear: 'Vertical change of horizontal wind with height (850 to 200 hPa). Strong shear tears storm cores apart; weak shear allows deep organization.',
  'Sea-surface temperature': 'Upper ocean warm layer (>= 26.5°C) provides thermodynamic latent heat flux required to fuel tropical cyclones.',
  'Best track': "India Meteorological Department (IMD)'s official post-event verified record of cyclone path and intensity.",
  Replay: 'Historical satellite frames ingested into the pipeline as if live, strictly respecting temporal cutoff with no future leakage.',
  'Eye flag': 'Experimental thermal heuristic detecting warm central eye pixel signature surrounded by cold dense overcast clouds.'
};
