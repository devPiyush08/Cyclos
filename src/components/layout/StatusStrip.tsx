import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useStore';
import { formatTimeLong, formatTimeCompact } from '../../utils/meteorology';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Clock, Eye, ShieldAlert } from 'lucide-react';
import { STORMS_DATA, REPLAY_SCENARIOS } from '../../data/mockData';

export const StatusStrip: React.FC = () => {
  const {
    asOfTime,
    mode,
    isReplayPlaying,
    replaySpeed,
    activeScenarioId,
    revealTruth,
    toggleReplayPlay,
    stepReplayTime,
    setReplaySpeed,
    setRevealTruth,
    resetReplayToStart,
    activeStormId
  } = useAppStore();

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId);
  const scenario = REPLAY_SCENARIOS.find(s => s.id === activeScenarioId);

  // Playback timer tick
  useEffect(() => {
    if (!isReplayPlaying) return;
    const intervalMs = 1500 / replaySpeed;
    const timer = setInterval(() => {
      stepReplayTime(1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isReplayPlaying, replaySpeed, stepReplayTime]);

  return (
    <div className="h-9 bg-[#F4EFE6] dark:bg-[#191E28] border-b border-[#E7E1D4] dark:border-[#262E3B] px-4 lg:px-8 text-xs text-[#635E54] dark:text-[#9BA5B5] flex items-center justify-between overflow-x-auto select-none font-mono">
      {/* Left: As Of Time & Clean Ingest Meta */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[#1C222B] dark:text-[#EAEFF5] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#8A734D] dark:text-[#CBB58F]" />
          <span className="hidden sm:inline text-[#847E72] dark:text-slate-400">As of:</span>
          <span className="font-semibold">{formatTimeLong(asOfTime)}</span>
        </div>

        <span className="text-[#DDD6C8] dark:text-slate-700">|</span>

        <div className="hidden md:flex items-center gap-2 text-[#7A7468] dark:text-slate-400">
          <span>Scene: <strong className="text-[#1C222B] dark:text-slate-200">{formatTimeCompact(asOfTime)}</strong></span>
          <span>·</span>
          <span>Ingest: <strong className="text-[#3F7356] dark:text-[#88C4A0] font-semibold">TIR1 (0m delay)</strong></span>
          <span>·</span>
          <span>Specs: <strong className="text-[#1C222B] dark:text-slate-200">v2.0 (ResNet-18)</strong></span>
        </div>
      </div>

      {/* Center/Right: Replay Clock Controls (when in replay mode) */}
      {mode === 'replay' ? (
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-4">
          <div className="flex items-center bg-white dark:bg-[#202734] px-2 py-0.5 rounded-lg border border-[#E5DFD4] dark:border-[#2C3545] gap-1">
            <button
              onClick={() => stepReplayTime(-1)}
              className="p-1 hover:text-[#1C222B] text-[#716B61] dark:text-slate-300 transition-colors cursor-pointer"
              title="Previous scene frame (Left Arrow)"
              aria-label="Previous scene"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            <button
              onClick={toggleReplayPlay}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isReplayPlaying
                  ? 'bg-[#232C37] text-white dark:bg-[#EAE4D9] dark:text-[#161A22]'
                  : 'hover:text-[#1C222B] text-[#1C222B] dark:text-slate-200'
              }`}
              title={isReplayPlaying ? 'Pause replay (Space)' : 'Play replay (Space)'}
              aria-label={isReplayPlaying ? 'Pause' : 'Play'}
            >
              {isReplayPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={() => stepReplayTime(1)}
              className="p-1 hover:text-[#1C222B] text-[#716B61] dark:text-slate-300 transition-colors cursor-pointer"
              title="Next scene frame (Right Arrow)"
              aria-label="Next scene"
            >
              <SkipForward className="w-3 h-3" />
            </button>

            <button
              onClick={resetReplayToStart}
              className="p-1 hover:text-[#B25D44] transition-colors ml-0.5 text-[#918B7F] cursor-pointer"
              title="Reset scenario to start"
              aria-label="Reset scenario"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Speed switcher */}
          <div className="flex items-center bg-white dark:bg-[#202734] px-1 py-0.5 rounded-lg border border-[#E5DFD4] dark:border-[#2C3545] text-[11px]">
            {([1, 2, 5] as const).map(spd => (
              <button
                key={spd}
                onClick={() => setReplaySpeed(spd)}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  replaySpeed === spd
                    ? 'font-bold text-[#1C222B] dark:text-white bg-[#F3EFE7] dark:bg-[#2C3646]'
                    : 'text-[#8A8477] hover:text-[#1C222B] dark:hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Reveal Truth switch */}
          <button
            onClick={() => setRevealTruth(!revealTruth)}
            className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] border transition-colors cursor-pointer ${
              revealTruth
                ? 'bg-[#EAE4F5] dark:bg-[#2F2742] text-[#4A3275] dark:text-[#D1B8F5] border-[#D6C7EC] dark:border-[#4B3B68] font-semibold'
                : 'bg-white dark:bg-[#202734] text-[#635E54] dark:text-slate-300 border-[#E5DFD4] dark:border-[#2C3545] hover:text-[#1C222B]'
            }`}
            title="Reveal verified Best Track outcome"
          >
            <Eye className="w-3 h-3" />
            <span>Verify Truth</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-[#827A6C] dark:text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-[#B87A2B]" />
          <span>Research Advisory</span>
        </div>
      )}
    </div>
  );
};
