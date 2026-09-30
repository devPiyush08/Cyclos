import React from 'react';
import { AnalysisDetail, Grade } from '../../types';
import { Eye, CheckCircle2, Scan } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

interface AnalysisDetailCardProps {
  analysis: AnalysisDetail;
  stormId: string;
}

export const AnalysisDetailCard: React.FC<AnalysisDetailCardProps> = ({ analysis }) => {
  const grades: { key: Grade; label: string; color: string }[] = [
    { key: 'DEP', label: 'Depression (DEP)', color: '#4E7A66' },
    { key: 'CS', label: 'Cyclonic Storm (CS)', color: '#C99846' },
    { key: 'SCS', label: 'Severe Cyclonic Storm (SCS)', color: '#C27A45' },
    { key: 'VSCS+', label: 'Very Severe+ (VSCS+)', color: '#B85244' }
  ];

  return (
    <div className="bg-white dark:bg-[#1A1F28] border border-[#E6E0D4] dark:border-[#2C3544] rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-[#7A6B52] dark:text-[#CBB58F]" />
          <h3 className="text-sm font-bold text-[#1C222B] dark:text-[#EAEFF5]">
            Structural Analysis & Classification
          </h3>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#E7EFEA] dark:bg-[#1E2E25] text-[#2F5844] dark:text-[#96D1B2] font-semibold flex items-center gap-1 border border-[#CCDCD2] dark:border-[#274233]">
          <CheckCircle2 className="w-3 h-3" />
          <span>Certainty: {analysis.detection_prob_pct.toFixed(1)}%</span>
        </span>
      </div>

      {/* Grade Likelihood Breakdown */}
      <div className="space-y-2.5 my-2">
        <div className="text-xs font-medium text-[#706859] dark:text-[#9BA5B5] flex items-center justify-between">
          <span>Grade Classification Distribution:</span>
          <InfoTooltip term="Grade" />
        </div>

        {grades.map(g => {
          const prob = analysis.grade_probabilities[g.key] || 0;
          return (
            <div key={g.key} className="text-xs font-mono">
              <div className="flex items-center justify-between text-[#474238] dark:text-slate-300 mb-1">
                <span>{g.label}</span>
                <strong className="text-[#1C222B] dark:text-white">{prob.toFixed(1)}%</strong>
              </div>
              <div className="w-full h-2 bg-[#F1ECE3] dark:bg-[#252E3E] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, prob))}%`,
                    backgroundColor: g.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Satellite Observations & Eye Feature */}
      <div className="mt-3 pt-3 border-t border-[#EFE9DF] dark:border-[#272F3E] grid grid-cols-2 gap-2.5 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546]">
          <div className="text-[#847B6D] dark:text-slate-400 text-[11px]">Temporal Frame Buffer</div>
          <div className="font-semibold text-[#1C222B] dark:text-white mt-0.5">
            {analysis.history_frames_used} / 3 Scenes Ingested
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F6F2EA] dark:bg-[#202735] border border-[#E9E2D5] dark:border-[#2B3546]">
          <div className="text-[#847B6D] dark:text-slate-400 text-[11px] flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#B0762E]" />
            <span>Eye Signature</span>
            <InfoTooltip term="Eye flag" />
          </div>
          <div className="font-semibold text-[#1C222B] dark:text-white mt-0.5 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                analysis.eye_flag ? 'bg-[#3F7356]' : 'bg-[#C2BAAB] dark:bg-slate-600'
              }`}
            />
            <span>{analysis.eye_flag ? 'Resolved (Warm Core)' : 'Diffuse / Cloud Covered'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
