import React from 'react';
import { useAppStore } from '../../store/useStore';
import { REPLAY_SCENARIOS, STORMS_DATA } from '../../data/mockData';
import {
  Clock,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Eye,
  Check,
  ArrowRight,
  Wind
} from 'lucide-react';
import { formatTimeLong, formatWind } from '../../utils/meteorology';

export const ReplayPage: React.FC = () => {
  const {
    asOfTime,
    isReplayPlaying,
    replaySpeed,
    activeScenarioId,
    revealTruth,
    toggleReplayPlay,
    stepReplayTime,
    setReplaySpeed,
    setRevealTruth,
    resetReplayToStart,
    startScenario,
    setTab,
    unitWind
  } = useAppStore();

  const currentScenario = REPLAY_SCENARIOS.find(s => s.id === activeScenarioId) || REPLAY_SCENARIOS[0];
  const activeStorm = STORMS_DATA.find(s => s.id === currentScenario.storm_id) || STORMS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Replay Master Controller - Paperpillar style */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#6A7970] mb-1">
              <Clock className="w-3.5 h-3.5 text-[#274332]" />
              <span>Simulated Operational Ingest & Temporal Stepping</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2520]">
              Historical Scene Replay Engine
            </h1>
          </div>

          {/* Time Display */}
          <div className="text-right">
            <span className="text-xs font-mono text-[#6A7970] block">Scene Time As-Of:</span>
            <span className="text-lg sm:text-xl font-extrabold font-mono text-[#1C2520]">
              {formatTimeLong(asOfTime)}
            </span>
          </div>
        </div>

        {/* Playback Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F0F5F1] border border-[#DCE7DF]">
          {/* Main Controls: Step Back, Play/Pause, Step Forward */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => stepReplayTime(-1)}
              className="p-2.5 rounded-full bg-white text-[#1C2520] hover:bg-[#E3ECE6] transition-colors shadow-xs cursor-pointer"
              title="Previous Scene"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={toggleReplayPlay}
              className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isReplayPlaying
                  ? 'bg-[#C25845] text-white hover:bg-[#A84534]'
                  : 'bg-[#274332] text-white hover:bg-[#1C2520]'
              }`}
            >
              {isReplayPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Simulation</span>
                </>
              )}
            </button>

            <button
              onClick={() => stepReplayTime(1)}
              className="p-2.5 rounded-full bg-white text-[#1C2520] hover:bg-[#E3ECE6] transition-colors shadow-xs cursor-pointer"
              title="Next Scene"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={resetReplayToStart}
              className="p-2.5 rounded-full bg-white text-[#6A7970] hover:text-[#1C2520] transition-colors shadow-xs cursor-pointer ml-1"
              title="Reset to Genesis"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Switcher & Ground Truth Toggle */}
          <div className="flex items-center gap-3">
            {/* Speed Pills */}
            <div className="flex items-center bg-white p-1 rounded-full border border-[#DCE7DF] text-xs font-mono">
              {([1, 2, 5] as const).map(spd => (
                <button
                  key={spd}
                  onClick={() => setReplaySpeed(spd)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    replaySpeed === spd
                      ? 'bg-[#1C2520] text-white font-semibold'
                      : 'text-[#6A7970] hover:text-[#1C2520]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Reveal Truth Button */}
            <button
              onClick={() => setRevealTruth(!revealTruth)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                revealTruth
                  ? 'bg-[#274332] text-white shadow-xs'
                  : 'bg-white text-[#6A7970] border border-[#DCE7DF] hover:text-[#1C2520]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{revealTruth ? 'Ground Truth Visible' : 'Reveal Ground Truth'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selectable Historical Scenarios Grid */}
      <div>
        <h2 className="text-base font-bold text-[#1C2520] mb-3">
          Select Historical Evaluation Scenario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPLAY_SCENARIOS.map(scenario => {
            const isSelected = scenario.id === activeScenarioId;
            return (
              <div
                key={scenario.id}
                onClick={() => startScenario(scenario.id)}
                className={`bg-white rounded-3xl p-6 border paper-shadow transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected ? 'border-[#274332] ring-2 ring-[#274332]/10 bg-[#FAFDFB]' : 'border-[#E8EFEA] hover:border-[#B5CDC0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E8F4EC] text-[#2F6B48]">
                      {scenario.year} · {scenario.basin}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-[#274332] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Active Scenario
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#1C2520] mb-1">
                    {scenario.title}
                  </h3>

                  <p className="text-xs text-[#6A7970] leading-relaxed">
                    {scenario.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0F5F1] flex items-center justify-between">
                  <div className="text-xs font-mono text-[#6A7970]">
                    Peak: <strong className="text-[#1C2520]">{scenario.peak_vmax_kt} kt</strong> ({scenario.peak_grade})
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      startScenario(scenario.id);
                      setTab('map');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#F0F5F1] hover:bg-[#274332] text-[#274332] hover:text-white transition-all text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch On Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
