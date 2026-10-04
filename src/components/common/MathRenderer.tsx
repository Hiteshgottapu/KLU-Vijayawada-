import React, { useState } from 'react';
import katex from 'katex';
import { Copy, Check, Code, Eye } from 'lucide-react';

interface MathRendererProps {
  math: string;
  title?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ 
  math, 
  title = "Mathematical Formulation" 
}) => {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  // Split by double newline or single newline to render individual equation blocks
  const blocks = math
    .split(/\n\n+/)
    .map(b => b.trim())
    .filter(Boolean);

  const renderKatex = (latex: string) => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml'
      });
    } catch (e) {
      return null;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(math);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs text-indigo-300 font-semibold tracking-wide uppercase">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
            title={showRaw ? "View Rendered TeX" : "View Raw LaTeX"}
          >
            {showRaw ? (
              <>
                <Eye className="w-3 h-3 text-indigo-400" />
                <span>Rendered</span>
              </>
            ) : (
              <>
                <Code className="w-3 h-3 text-slate-400" />
                <span>Raw LaTeX</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Copy LaTeX source"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Equations Container */}
      <div className="p-5 overflow-x-auto">
        {showRaw ? (
          <pre className="font-mono text-xs text-indigo-200 leading-relaxed whitespace-pre-wrap selection:bg-indigo-700">
            {math}
          </pre>
        ) : (
          <div className="space-y-4 text-center">
            {blocks.map((block, idx) => {
              const html = renderKatex(block);
              if (html) {
                return (
                  <div
                    key={idx}
                    className="py-2 overflow-x-auto text-sm sm:text-base leading-relaxed katex-container"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              }
              return (
                <div key={idx} className="font-mono text-xs text-slate-300 py-1">
                  {block}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
