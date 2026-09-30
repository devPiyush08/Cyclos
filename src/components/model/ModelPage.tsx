import React from 'react';
import { MODEL_SPECS, MODEL_METRICS_DATA } from '../../data/mockData';
import {
  Layers,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  ShieldCheck
} from 'lucide-react';

export const ModelPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6A7970] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#274332]" />
            <span>Operational Architecture & Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2520]">
            System Specifications & Model Benchmarks
          </h1>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#E8F4EC] text-[#2F6B48] self-start md:self-auto">
          {MODEL_SPECS.version} · Active Production
        </span>
      </div>

      {/* 1. Inference Pipeline Flow - 6 clean cards */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow">
        <h2 className="text-base font-bold text-[#1C2520] mb-4 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#274332]" />
          <span>Inference Pipeline Stages</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { stage: '1', title: 'Satellite Ingest', desc: '3 consecutive frames × 3 spectral bands (TIR1, WV, MIR)' },
            { stage: '2', title: 'Feature Backbone', desc: 'Shared ResNet-18 spatial-thermal encoder' },
            { stage: '3', title: 'Multi-Task Heads', desc: 'Detection BCE, Centre L1, Vmax Smooth-L1 & Grade' },
            { stage: '4', title: '5-Seed Ensemble', desc: 'Stochastic weights for mean & spread estimation' },
            { stage: '5', title: 'P67 Error Cone', desc: 'Calibrated empirical error envelopes' },
            { stage: '6', title: 'Advisory Engine', desc: 'Automated landfall & rapid intensification triggers' }
          ].map(s => (
            <div
              key={s.stage}
              className="p-4 rounded-2xl bg-[#F0F5F1] border border-[#E3ECE6] space-y-1.5"
            >
              <span className="text-[10px] text-[#274332] font-mono font-bold">STAGE {s.stage}</span>
              <div className="font-bold text-[#1C2520] text-xs">{s.title}</div>
              <p className="text-[11px] text-[#6A7970] leading-snug">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. System Specifications 4 Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
          <span className="text-xs font-medium text-[#6A7970] block">Deep Learning Backbone</span>
          <strong className="text-sm font-bold text-[#1C2520] block mt-1">{MODEL_SPECS.architecture}</strong>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
          <span className="text-xs font-medium text-[#6A7970] block">Input Tensor Shape</span>
          <strong className="text-sm font-bold text-[#1C2520] block mt-1">{MODEL_SPECS.input_tensors}</strong>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
          <span className="text-xs font-medium text-[#6A7970] block">Training Dataset Span</span>
          <strong className="text-sm font-bold text-[#1C2520] block mt-1">{MODEL_SPECS.training_years}</strong>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#E8EFEA] paper-shadow">
          <span className="text-xs font-medium text-[#6A7970] block">Inference Latency</span>
          <strong className="text-sm font-bold text-[#2F6B48] block mt-1">{MODEL_SPECS.inference_latency_ms} ms per scene</strong>
        </div>
      </div>

      {/* 3. Benchmark Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Track Error vs CLIPER */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow space-y-4">
          <h3 className="text-base font-bold text-[#1C2520] flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#274332]" />
            <span>Forecast Track Error (km) by Lead Time</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {MODEL_METRICS_DATA.track_error_km.map(row => (
              <div key={row.lead} className="space-y-1">
                <div className="flex items-center justify-between text-[#1C2520]">
                  <span className="font-bold text-[#274332]">{row.lead} Lead</span>
                  <span>
                    Model: <strong>{row.model} km</strong> · CLIPER: {row.cliper} km · Persist: {row.persistence} km
                  </span>
                </div>

                <div className="w-full h-3 bg-[#F0F5F1] rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#274332] h-full rounded-full"
                    style={{ width: `${(row.model / row.persistence) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0F5F1] text-xs font-semibold text-[#2F6B48]">
            ✓ 42% average error reduction over standard CLIPER baseline at +48h.
          </div>
        </div>

        {/* Vmax MAE Error */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow space-y-4">
          <h3 className="text-base font-bold text-[#1C2520] flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#274332]" />
            <span>Intensity Mean Absolute Error (MAE kt)</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {MODEL_METRICS_DATA.vmax_mae_kt.map(row => (
              <div key={row.lead} className="space-y-1">
                <div className="flex items-center justify-between text-[#1C2520]">
                  <span className="font-bold text-[#274332]">{row.lead} Lead</span>
                  <span>
                    Model: <strong>{row.model} kt</strong> · CLIPER: {row.cliper} kt · Persist: {row.persistence} kt
                  </span>
                </div>

                <div className="w-full h-3 bg-[#F0F5F1] rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#B88E2F] h-full rounded-full"
                    style={{ width: `${(row.model / row.persistence) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0F5F1] text-xs font-semibold text-[#2F6B48]">
            ✓ Intensity drift maintained strictly under 11.2 kt at +48h lead.
          </div>
        </div>
      </div>
    </div>
  );
};
