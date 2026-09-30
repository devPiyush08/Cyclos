import React from 'react';
import { useAppStore } from '../../store/useStore';
import { Check, Compass, Clock, ShieldCheck, Zap, X } from 'lucide-react';

export const FirstRunTour: React.FC = () => {
  const { isTourOpen, tourStep, setTourOpen, setTourStep, setTab } = useAppStore();

  if (!isTourOpen) return null;

  const steps = [
    {
      title: '1. The 5-Second Situation Overview',
      icon: <Zap className="w-5 h-5 text-[#274332]" />,
      content:
        'Instantly view active tropical cyclones over the North Indian Ocean, sustained wind intensities, translation vectors, and automated coastal landfall advisories.',
      targetTab: 'dashboard' as const
    },
    {
      title: '2. Calibrated Uncertainty Cones & Live Map',
      icon: <Compass className="w-5 h-5 text-[#2F6B48]" />,
      content:
        'Interactive SVG GIS canvas displaying analysed historical track, 48-hour multi-lead predictions, P67 uncertainty cones, and 5-member stochastic ensemble members.',
      targetTab: 'map' as const
    },
    {
      title: '3. Historical Scene Replay Engine',
      icon: <Clock className="w-5 h-5 text-[#B88E2F]" />,
      content:
        'Evaluate AI inference on historical benchmark cyclones (Asani, Biparjoy) with temporal cutoffs, variable playback speeds (1x, 2x, 5x), and ground truth verification.',
      targetTab: 'replay' as const
    },
    {
      title: '4. Deep Learning Backbone & Verification',
      icon: <ShieldCheck className="w-5 h-5 text-[#274332]" />,
      content:
        'Inspect the ResNet-18 spatial-thermal multi-task model specifications, CLIPER baseline comparisons, and MAE benchmarks.',
      targetTab: 'model' as const
    }
  ];

  const current = steps[tourStep - 1] || steps[0];

  const handleNext = () => {
    if (tourStep < steps.length) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C261F]/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E8EFEA] p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-[#E8F4EC]">
              {current.icon}
            </div>
            <span className="text-xs font-mono font-bold text-[#6A7970]">
              Step {tourStep} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-[#95A59B] hover:text-[#1C2520] cursor-pointer"
          >
            Skip
          </button>
        </div>

        <h3 className="text-lg font-bold text-[#1C2520] mb-2">
          {current.title}
        </h3>

        <p className="text-xs text-[#6A7970] leading-relaxed mb-6">
          {current.content}
        </p>

        {/* Step dots & Next button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F0F5F1]">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx + 1 === tourStep
                    ? 'w-6 bg-[#274332]'
                    : 'w-1.5 bg-[#DCE7DF]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs font-bold text-white bg-[#274332] hover:bg-[#1C2520] rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
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
