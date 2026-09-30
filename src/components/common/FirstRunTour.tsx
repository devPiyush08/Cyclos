import React from 'react';
import { useAppStore } from '../../store/useStore';
import { Check, Compass, Clock, ShieldCheck, Zap } from 'lucide-react';

export const FirstRunTour: React.FC = () => {
  const { isTourOpen, tourStep, setTourOpen, setTourStep, setTab } = useAppStore();

  if (!isTourOpen) return null;

  const steps = [
    {
      title: '1. The 5-Second Situation Test',
      icon: <Zap className="w-5 h-5 text-[#3B5BFF]" />,
      content:
        'Within 5 seconds of opening CycloneWatch, you immediately know: (1) Is there an active tropical cyclone? (2) How intense is it? (3) Where is it headed? (4) How confident is the ensemble model? (5) Are there any immediate coastal landfall watches or warnings?',
      targetTab: 'dashboard'
    },
    {
      title: '2. Global Replay & Temporal Cutoff',
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      content:
        'CycloneWatch strictly enforces the "as_of" temporal cutoff rule. Historical satellite scenes run through the inference pipeline as if live. Nothing from the future is ever revealed until the playback clock advances to it.',
      targetTab: 'replay'
    },
    {
      title: '3. Calibrated Uncertainty Cones',
      icon: <Compass className="w-5 h-5 text-emerald-500" />,
      content:
        'Deterministic lines alone are misleading. Every forecast is bounded by empirical P67 uncertainty cones and 5-member ensemble spread, reflecting realistic atmospheric predictability over the North Indian Ocean.',
      targetTab: 'map'
    },
    {
      title: '4. Rigorous Model Verification & IMD Comparison',
      icon: <ShieldCheck className="w-5 h-5 text-violet-500" />,
      content:
        'Explore the Model & AI tab to inspect the 4x4 confusion matrix, baseline benchmarks against CLIPER and Persistence, and post-event track error verification against official IMD Best Track records.',
      targetTab: 'model'
    }
  ];

  const current = steps[tourStep - 1] || steps[0];

  const handleNext = () => {
    if (tourStep < steps.length) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      // Optionally switch tabs to show the user the section
      // @ts-expect-error valid tab
      setTab(steps[nextStep - 1].targetTab);
    } else {
      setTourOpen(false);
      localStorage.setItem('cyclonewatch_tour_completed', 'true');
    }
  };

  const handleSkip = () => {
    setTourOpen(false);
    localStorage.setItem('cyclonewatch_tour_completed', 'true');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#171D2B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
              {current.icon}
            </div>
            <span className="text-xs font-mono font-medium text-slate-400">
              Step {tourStep} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Skip tour
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
          {current.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {current.content}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx + 1 === tourStep
                    ? 'w-6 bg-[#3B5BFF]'
                    : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#3B5BFF] hover:bg-[#2A45E0] rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>{tourStep === steps.length ? 'Get Started' : 'Next'}</span>
              {tourStep === steps.length && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
