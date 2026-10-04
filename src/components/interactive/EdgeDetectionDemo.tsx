import React, { useState } from 'react';
import { Sliders, Eye, RefreshCw, Layers } from 'lucide-react';

export const EdgeDetectionDemo: React.FC = () => {
  const [thresholdLow, setThresholdLow] = useState<number>(50);
  const [thresholdHigh, setThresholdHigh] = useState<number>(150);
  const [kernelSize, setKernelSize] = useState<number>(3);
  const [imageShape, setImageShape] = useState<'shapes' | 'letter' | 'gradient'>('shapes');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Interactive Canny Edge Detection & Hysteresis Simulator
            </h4>
            <p className="text-xs text-slate-500">
              Adjust lower and upper hysteresis gradient thresholds to observe edge sensitivity and thinning.
            </p>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(['shapes', 'letter', 'gradient'] as const).map((pattern) => (
            <button
              key={pattern}
              onClick={() => setImageShape(pattern)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                imageShape === pattern ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Lower Threshold (T_low):</span>
            <span className="text-teal-600 font-mono">{thresholdLow}</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            value={thresholdLow}
            onChange={(e) => {
              const val = Number(e.target.value);
              setThresholdLow(val);
              if (val > thresholdHigh) setThresholdHigh(val + 10);
            }}
            className="w-full accent-teal-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">Accepts weak edges connected to strong edges</p>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Upper Threshold (T_high):</span>
            <span className="text-indigo-600 font-mono">{thresholdHigh}</span>
          </div>
          <input
            type="range"
            min="80"
            max="240"
            value={thresholdHigh}
            onChange={(e) => {
              const val = Number(e.target.value);
              setThresholdHigh(val);
              if (val < thresholdLow) setThresholdLow(val - 10);
            }}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">Defines sure-edge strong gradient pixels</p>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Gaussian Kernel Size:</span>
            <span className="text-slate-900 font-mono">{kernelSize}x{kernelSize}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {[3, 5, 7].map((k) => (
              <button
                key={k}
                onClick={() => setKernelSize(k)}
                className={`flex-1 py-1 rounded text-xs font-mono font-semibold border ${
                  kernelSize === k ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {k}x{k}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Pre-smoothing filter before gradient calculation</p>
        </div>
      </div>

      {/* Visual Canvas Simulation Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Input Image */}
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            1. Grayscale Input Matrix
          </span>
          <div className="h-44 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
            {imageShape === 'shapes' && (
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle cx="35" cy="50" r="22" fill="#e2e8f0" />
                <rect x="55" y="30" width="35" height="40" rx="4" fill="#94a3b8" />
              </svg>
            )}
            {imageShape === 'letter' && (
              <div className="text-7xl font-extrabold text-slate-100 font-serif select-none">
                AI
              </div>
            )}
            {imageShape === 'gradient' && (
              <div className="w-32 h-32 rounded-lg bg-gradient-to-tr from-slate-900 via-slate-500 to-slate-100" />
            )}
          </div>
        </div>

        {/* Sobel Gradient Magnitude */}
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            2. Sobel Gradient Magnitude
          </span>
          <div className="h-44 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
            {imageShape === 'shapes' && (
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle cx="35" cy="50" r="22" fill="none" stroke="#60a5fa" strokeWidth="6" opacity="0.6" />
                <rect x="55" y="30" width="35" height="40" rx="4" fill="none" stroke="#60a5fa" strokeWidth="6" opacity="0.6" />
              </svg>
            )}
            {imageShape === 'letter' && (
              <div className="text-7xl font-extrabold text-blue-400/70 font-serif select-none blur-[1px]">
                AI
              </div>
            )}
            {imageShape === 'gradient' && (
              <div className="w-32 h-32 rounded-lg border-4 border-blue-400/60" />
            )}
          </div>
        </div>

        {/* Canny Edge Detected Map */}
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            3. Canny Output (Hysteresis & NMS)
          </span>
          <div className="h-44 bg-black rounded-xl border border-emerald-500/30 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
            {imageShape === 'shapes' && (
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle 
                  cx="35" 
                  cy="50" 
                  r="22" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="1.5" 
                  opacity={thresholdHigh < 200 ? 1 : 0.4} 
                />
                <rect 
                  x="55" 
                  y="30" 
                  width="35" 
                  height="40" 
                  rx="4" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="1.5" 
                  opacity={thresholdHigh < 220 ? 1 : 0.3} 
                />
              </svg>
            )}
            {imageShape === 'letter' && (
              <div 
                className="text-7xl font-extrabold font-serif select-none"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px #10b981',
                  opacity: thresholdHigh < 210 ? 1 : 0.5
                }}
              >
                AI
              </div>
            )}
            {imageShape === 'gradient' && (
              <div 
                className="w-32 h-32 rounded-lg border border-emerald-400"
                style={{ opacity: thresholdLow < 70 ? 1 : 0.2 }}
              />
            )}
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              1-pixel thin edges
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
