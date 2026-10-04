import React, { useState } from 'react';
import { Type, Sparkles, Filter, RefreshCw, Scissors, BookOpen } from 'lucide-react';

export const TokenizationDemo: React.FC = () => {
  const [inputText, setInputText] = useState(
    'The artificial intelligence researchers are studying deep learning models and better algorithms.'
  );

  const stopwords = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'are', 'as', 'be', 'by', 'for', 'from',
    'in', 'into', 'it', 'of', 'that', 'to', 'was', 'were', 'with'
  ]);

  // Simplified morphological mappings for demonstration
  const stemRules: Record<string, string> = {
    studying: 'studi',
    researchers: 'research',
    learning: 'learn',
    algorithms: 'algorithm',
    models: 'model',
    better: 'better',
    artificial: 'artific',
    intelligence: 'intellig',
    running: 'run',
    leaves: 'leav',
    automating: 'autom',
  };

  const lemmaRules: Record<string, string> = {
    studying: 'study',
    researchers: 'researcher',
    learning: 'learn',
    algorithms: 'algorithm',
    models: 'model',
    better: 'good (adj)',
    artificial: 'artificial',
    intelligence: 'intelligence',
    running: 'run',
    leaves: 'leaf (noun)',
    automating: 'automate',
  };

  // 1. Raw tokens
  const rawTokens = inputText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);

  // 2. Filtered without stopwords
  const filteredTokens = rawTokens.filter((w) => !stopwords.has(w));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 my-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Interactive Text Preprocessing Workbench
            </h4>
            <p className="text-xs text-slate-500">
              Type or modify any sentence below to watch Tokenization, Stopword Filtering, Stemming, and Lemmatization in real-time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setInputText('The leaves are falling from the tallest trees.')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Preset Sentence</span>
        </button>
      </div>

      {/* Input Field */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Input Text String:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-medium text-slate-800 transition-all"
          placeholder="Type English text here..."
        />
      </div>

      {/* Pipeline Visual Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Stage 1: Tokenization */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-blue-500" />
              <span>1. Word Tokenization ({rawTokens.length} tokens)</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {rawTokens.map((t, idx) => {
              const isStopword = stopwords.has(t);
              return (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-md text-xs font-mono font-medium border ${
                    isStopword
                      ? 'bg-rose-50 border-rose-200 text-rose-600 line-through opacity-70'
                      : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                  }`}
                  title={isStopword ? 'Stopword (Filtered)' : 'Significant Token'}
                >
                  {t}
                </span>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400">
            <span className="text-rose-500 font-bold">Strikethrough: </span> Stopwords identified for removal.
          </p>
        </div>

        {/* Stage 2: Stopword Filtering */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Cleaned Non-Stopword Vocabulary ({filteredTokens.length})</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {filteredTokens.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 border border-emerald-200 text-emerald-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison: Stemming vs Lemmatization */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Morphology: Porter Stemmer vs. WordNet Lemmatizer</span>
          </span>
          <span className="text-slate-400 text-[11px]">Notice how Lemmatizer returns dictionary roots</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="pb-2">Token</th>
                <th className="pb-2 text-amber-400">Porter Stemming (Rule-based)</th>
                <th className="pb-2 text-emerald-400">WordNet Lemmatization (Lexical)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTokens.map((t, i) => {
                const stem = stemRules[t] || (t.endsWith('ing') ? t.slice(0, -3) : t.endsWith('s') ? t.slice(0, -1) : t);
                const lemma = lemmaRules[t] || (t.endsWith('ing') ? t.slice(0, -3) : t.endsWith('s') ? t.slice(0, -1) : t);

                return (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-2 text-slate-300 font-semibold">{t}</td>
                    <td className="py-2 text-amber-300">{stem}</td>
                    <td className="py-2 text-emerald-300">{lemma}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
