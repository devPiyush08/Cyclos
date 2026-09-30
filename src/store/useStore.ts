import { useState, useEffect } from 'react';
import { STORMS_DATA, REPLAY_SCENARIOS } from '../data/mockData';

export type AppTab = 'dashboard' | 'map' | 'storms' | 'archive' | 'alerts' | 'replay' | 'model';
export type DetailTab = 'overview' | 'forecast' | 'verification' | 'satellite' | 'environment' | 'alerts';

export interface AppState {
  activeStormId: string;
  asOfTime: string;
  mode: 'live' | 'replay';
  isReplayPlaying: boolean;
  replaySpeed: 1 | 2 | 5;
  activeScenarioId: string | null;
  revealTruth: boolean;
  unitWind: 'kt' | 'kmh';
  unitDist: 'km' | 'nm';
  theme: 'light' | 'dark';
  currentTab: AppTab;
  currentDetailTab: DetailTab;
  searchQuery: string;
  isSearchOpen: boolean;
  isTourOpen: boolean;
  tourStep: number;
  compareStormIds: string[];
  isFrameAnalyzerOpen: boolean;
  mapLayers: {
    satellite: boolean;
    channel: 'TIR1' | 'WV' | 'MIR';
    opacity: number;
    track: boolean;
    forecast: boolean;
    cone: boolean;
    ensemble: boolean;
    reference: boolean;
    alerts: boolean;
    graticule: boolean;
  };
}

const defaultState: AppState = {
  activeStormId: 'SYS-2022-001',
  asOfTime: '2022-05-09T12:00:00Z',
  mode: 'replay',
  isReplayPlaying: false,
  replaySpeed: 1,
  activeScenarioId: 'SCN-ASANI-2022',
  revealTruth: false,
  unitWind: 'kt',
  unitDist: 'km',
  theme: 'light',
  currentTab: 'dashboard',
  currentDetailTab: 'overview',
  searchQuery: '',
  isSearchOpen: false,
  isTourOpen: false,
  tourStep: 1,
  compareStormIds: ['SYS-2022-001', 'SYS-2023-002'],
  isFrameAnalyzerOpen: false,
  mapLayers: {
    satellite: true,
    channel: 'TIR1',
    opacity: 0.85,
    track: true,
    forecast: true,
    cone: true,
    ensemble: true,
    reference: false,
    alerts: true,
    graticule: true
  }
};

// Global reactive store
let state: AppState = { ...defaultState };
const listeners = new Set<() => void>();
let replayTimer: ReturnType<typeof setInterval> | null = null;

function notify() {
  listeners.forEach(fn => fn());
}

function updateReplayTimer() {
  if (replayTimer) {
    clearInterval(replayTimer);
    replayTimer = null;
  }
  if (state.isReplayPlaying) {
    const intervalMs = state.replaySpeed === 5 ? 400 : state.replaySpeed === 2 ? 800 : 1600;
    replayTimer = setInterval(() => {
      const currentStorm = STORMS_DATA.find(s => s.id === state.activeStormId);
      if (!currentStorm) return;
      const history = currentStorm.track_history;
      const currentIndex = history.findIndex(h => h.timestamp === state.asOfTime);
      if (currentIndex >= 0 && currentIndex < history.length - 1) {
        state.asOfTime = history[currentIndex + 1].timestamp;
        notify();
      } else if (currentIndex >= history.length - 1) {
        // Reached the end: pause and reset playback state
        state.isReplayPlaying = false;
        updateReplayTimer();
        notify();
      } else {
        state.asOfTime = history[0].timestamp;
        notify();
      }
    }, intervalMs);
  }
}

export function useAppStore() {
  const [snapshot, setSnapshot] = useState<AppState>(state);

  useEffect(() => {
    const listener = () => setSnapshot({ ...state });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    ...snapshot,
    setActiveStorm: (id: string) => {
      state.activeStormId = id;
      const storm = STORMS_DATA.find(s => s.id === id);
      if (storm && storm.track_history.length > 0) {
        state.asOfTime = storm.track_history[storm.track_history.length - 1].timestamp;
      }
      notify();
    },
    setAsOfTime: (time: string) => {
      state.asOfTime = time;
      notify();
    },
    setTab: (tab: AppTab) => {
      state.currentTab = tab;
      notify();
    },
    setDetailTab: (tab: DetailTab) => {
      state.currentDetailTab = tab;
      notify();
    },
    setUnitWind: (u: 'kt' | 'kmh') => {
      state.unitWind = u;
      notify();
    },
    setUnitDist: (u: 'km' | 'nm') => {
      state.unitDist = u;
      notify();
    },
    toggleTheme: () => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      state.theme = next;
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
      notify();
    },
    startScenario: (scenarioId: string) => {
      const scn = REPLAY_SCENARIOS.find(s => s.id === scenarioId);
      if (scn) {
        state.mode = 'replay';
        state.activeScenarioId = scenarioId;
        state.activeStormId = scn.storm_id;
        state.asOfTime = scn.initial_as_of;
        state.isReplayPlaying = false;
        state.currentTab = 'replay';
        updateReplayTimer();
        notify();
      }
    },
    stopReplay: () => {
      state.mode = 'live';
      state.isReplayPlaying = false;
      updateReplayTimer();
      notify();
    },
    toggleReplayPlay: () => {
      state.isReplayPlaying = !state.isReplayPlaying;
      updateReplayTimer();
      notify();
    },
    setReplaySpeed: (spd: 1 | 2 | 5) => {
      state.replaySpeed = spd;
      updateReplayTimer();
      notify();
    },
    setRevealTruth: (v: boolean) => {
      state.revealTruth = v;
      notify();
    },
    stepReplayTime: (direction: 1 | -1) => {
      const currentStorm = STORMS_DATA.find(s => s.id === state.activeStormId);
      if (!currentStorm) return;
      const history = currentStorm.track_history;
      const currentIndex = history.findIndex(h => h.timestamp === state.asOfTime);
      let nextIndex = 0;
      if (currentIndex >= 0) {
        nextIndex = Math.max(0, Math.min(history.length - 1, currentIndex + direction));
      } else {
        nextIndex = direction > 0 ? 0 : history.length - 1;
      }
      state.asOfTime = history[nextIndex].timestamp;
      notify();
    },
    resetReplayToStart: () => {
      const scn = REPLAY_SCENARIOS.find(s => s.id === state.activeScenarioId);
      if (scn) {
        state.asOfTime = scn.start_time;
      } else {
        const storm = STORMS_DATA.find(s => s.id === state.activeStormId);
        if (storm && storm.track_history.length > 0) {
          state.asOfTime = storm.track_history[0].timestamp;
        }
      }
      state.isReplayPlaying = false;
      updateReplayTimer();
      notify();
    },
    setSearchOpen: (open: boolean) => {
      state.isSearchOpen = open;
      notify();
    },
    setSearchQuery: (q: string) => {
      state.searchQuery = q;
      notify();
    },
    setTourOpen: (open: boolean) => {
      state.isTourOpen = open;
      state.tourStep = 1;
      notify();
    },
    setTourStep: (step: number) => {
      state.tourStep = step;
      notify();
    },
    setFrameAnalyzerOpen: (open: boolean) => {
      state.isFrameAnalyzerOpen = open;
      notify();
    },
    toggleCompareStorm: (stormId: string) => {
      if (state.compareStormIds.includes(stormId)) {
        state.compareStormIds = state.compareStormIds.filter(id => id !== stormId);
      } else {
        if (state.compareStormIds.length < 3) {
          state.compareStormIds = [...state.compareStormIds, stormId];
        }
      }
      notify();
    },
    setMapLayer: <K extends keyof AppState['mapLayers']>(layer: K, value: AppState['mapLayers'][K]) => {
      state.mapLayers[layer] = value;
      notify();
    },
    setMapPreset: (preset: 'forecast' | 'analysis' | 'verification') => {
      if (preset === 'forecast') {
        state.mapLayers = {
          ...state.mapLayers,
          satellite: true,
          track: true,
          forecast: true,
          cone: true,
          ensemble: false,
          reference: false
        };
      } else if (preset === 'analysis') {
        state.mapLayers = {
          ...state.mapLayers,
          satellite: true,
          track: true,
          forecast: false,
          cone: false,
          ensemble: false,
          reference: false
        };
      } else if (preset === 'verification') {
        state.mapLayers = {
          ...state.mapLayers,
          satellite: false,
          track: true,
          forecast: true,
          cone: false,
          ensemble: false,
          reference: true
        };
        state.revealTruth = true;
      }
      notify();
    }
  };
}
