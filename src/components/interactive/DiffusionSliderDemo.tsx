import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';

export const DiffusionSliderDemo: React.FC = () => {
  const [timestep, setTimestep] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('reverse');

  // Calculates noise ratio from timestep 0 to 1000
  const noiseRatio = timestep / 1000;
  const signalRatio = Math.sqrt(1 - noiseRatio);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Interactive Diffusion Model Denoising Timeline (DDPM)
            </h4>
            <p className="text-xs text-slate-500">
              Drag the timeline slider to observe the transition between pure Gaussian noise (t=1000) and reconstructed data (t=0).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTimestep(1000);
              setDirection('reverse');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Start at t=1000 (Noise)
          </button>
          <button
            onClick={() => setTimestep(0)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition-colors"
          >
            Clean Image (t=0)
          </button>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1 text-emerald-600">
            <span>t = 0 (Clean Image x_0)</span>
          </span>
          <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-slate-900 text-white shadow-sm">
            Current Timestep: t = {timestep}
          </span>
          <span className="flex items-center gap-1 text-orange-600">
            <span>t = 1000 (Pure Gaussian Noise x_T)</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={timestep}
          onChange={(e) => setTimestep(Number(e.target.value))}
          className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Signal Retained: {(signalRatio * 100).toFixed(1)}%</span>
          <span>Noise Variance Added: {(noiseRatio * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Visual Canvas Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        
        {/* Step Visualizer */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Generated Image Representation [x_t]
          </span>
          <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
            {/* Base Image Graphic */}
            <div
              className="transition-all duration-100"
              style={{
                filter: `blur(${noiseRatio * 14}px) contrast(${1 + noiseRatio * 0.5})`,
                opacity: Math.max(0.05, 1 - noiseRatio * 0.9),
                transform: `scale(${1 + (Math.random() - 0.5) * noiseRatio * 0.1})`
              }}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-orange-500 via-indigo-500 to-cyan-400 p-1 flex items-center justify-center shadow-glow-orange">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Noise Overlay Layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
                backgroundSize: '4px 4px',
                opacity: noiseRatio * 0.95,
              }}
            />

            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
              {timestep === 0 ? '✓ Reconstructed Target' : timestep === 1000 ? 'Random Noise' : `Sampling step ${1000 - timestep}/1000`}
            </div>
          </div>
        </div>

        {/* U-Net Noise Prediction */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            U-Net Noise Prediction [ε_θ(x_t, t)]
          </span>
          <div className="h-48 rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center text-xs space-y-2 text-slate-300 font-mono">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sliders className="w-6 h-6" />
            </div>
            <span className="text-white font-bold">U-Net Backbone</span>
            <span className="text-slate-400 text-[11px] text-center">
              Predicting noise vector to subtract for step t={timestep}
            </span>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-2">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${(1 - timestep / 1000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Algorithm Intuition */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Mathematical State
          </span>
          <div className="h-48 rounded-xl bg-orange-950/20 border border-orange-900/40 p-4 flex flex-col justify-center text-left text-xs space-y-2 text-orange-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Formulation:</span>
              <code className="text-orange-400 font-mono font-bold block mt-0.5">
                x_{timestep} = √ᾱ_{timestep} x_0 + √(1 - ᾱ_{timestep}) ε
              </code>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              {timestep === 0 && 'Zero noise remaining. Final clean sample generated.'}
              {timestep > 0 && timestep < 1000 && 'Iteratively subtracting predicted noise ε_θ step-by-step.'}
              {timestep === 1000 && 'Standard normal distribution N(0, I). No signal present.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
