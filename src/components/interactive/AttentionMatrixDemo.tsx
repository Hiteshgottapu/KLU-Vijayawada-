import React, { useState } from 'react';
import { Grid, Sparkles, HelpCircle } from 'lucide-react';

export const AttentionMatrixDemo: React.FC = () => {
  const words = ['The', 'neural', 'network', 'learns', 'spatial', 'patterns'];
  const [selectedWordIdx, setSelectedWordIdx] = useState<number>(3); // "learns"

  // Pre-calculated representative self-attention matrix
  const attentionMatrix = [
    [0.55, 0.15, 0.12, 0.08, 0.05, 0.05], // The
    [0.10, 0.48, 0.28, 0.06, 0.04, 0.04], // neural
    [0.08, 0.32, 0.45, 0.09, 0.03, 0.03], // network
    [0.04, 0.18, 0.26, 0.35, 0.07, 0.10], // learns
    [0.03, 0.04, 0.05, 0.08, 0.52, 0.28], // spatial
    [0.02, 0.05, 0.07, 0.12, 0.32, 0.42], // patterns
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 my-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Grid className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Transformer Self-Attention Heatmap Matrix
            </h4>
            <p className="text-xs text-slate-500">
              Click any word below to inspect which context tokens it attends to across Query-Key similarity weights.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Token Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Select Query Word (Q):
        </label>
        <div className="flex flex-wrap gap-2">
          {words.map((w, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWordIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedWordIdx === idx
                  ? 'bg-indigo-600 text-white shadow-glow-blue scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Attention Distribution Bar Chart for Selected Word */}
      <div className="bg-slate-900 rounded-xl p-4 text-white space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
          <span className="font-bold text-indigo-300">
            Attention Weights allocated by <span className="text-white underline">"{words[selectedWordIdx]}"</span>:
          </span>
          <span className="text-slate-400 font-mono text-[11px]">Softmax Row Sum = 1.0</span>
        </div>

        <div className="space-y-2">
          {words.map((targetWord, tIdx) => {
            const weight = attentionMatrix[selectedWordIdx][tIdx];
            const pct = Math.round(weight * 100);

            return (
              <div key={tIdx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className={tIdx === selectedWordIdx ? 'text-indigo-400 font-bold' : 'text-slate-300'}>
                    {targetWord} {tIdx === selectedWordIdx && '(Self)'}
                  </span>
                  <span className="text-slate-400">{weight.toFixed(2)} ({pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full 6x6 Softmax Attention Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Full Sequence Attention Heatmap Matrix [Softmax(Q K^T / √d_k)]
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-slate-400 text-left">Q \ K</th>
                {words.map((w, i) => (
                  <th key={i} className="p-2 text-slate-700 font-bold">{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {words.map((qw, rowIdx) => (
                <tr 
                  key={rowIdx}
                  onClick={() => setSelectedWordIdx(rowIdx)}
                  className={`cursor-pointer transition-colors ${
                    selectedWordIdx === rowIdx ? 'bg-indigo-50 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="p-2 text-left text-slate-700 font-semibold">{qw}</td>
                  {attentionMatrix[rowIdx].map((score, colIdx) => {
                    const alpha = Math.max(0.1, score * 1.5);
                    return (
                      <td 
                        key={colIdx} 
                        className="p-2 border border-slate-200"
                        style={{
                          backgroundColor: `rgba(99, 102, 241, ${alpha})`,
                          color: score > 0.35 ? '#ffffff' : '#1e1b4b',
                        }}
                      >
                        {score.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
