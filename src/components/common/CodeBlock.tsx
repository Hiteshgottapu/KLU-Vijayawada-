import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  onOpenNotebook?: (notebookId?: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  title,
  onOpenNotebook,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-xl my-4">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-300 font-medium ml-2">
            {title || `${language.toUpperCase()} Snippet`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenNotebook && (
            <button
              onClick={() => onOpenNotebook()}
              className="flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-950/40 border border-indigo-800/60 hover:bg-indigo-900/50 transition-colors"
            >
              <Terminal className="w-3 h-3" />
              <span>Run in Notebook</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed max-h-[500px]">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="pr-4 text-right text-slate-500 select-none text-[11px] align-top w-8">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre">
                  {highlightSyntax(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Python & JS syntax token highlighter
function highlightSyntax(line: string) {
  // If entire line is comment
  if (line.trim().startsWith('#')) {
    return <span className="text-slate-400 italic">{line}</span>;
  }

  // Token regex matching comments, strings, numbers, keywords, and identifiers
  const tokenRegex = /(#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b(?:def|class|import|from|as|return|if|else|elif|for|while|in|try|except|with|and|or|not|is|lambda|async|await|yield|pass|break|continue|None|True|False)\b)|(@\w+)|([a-zA-Z_]\w*(?=\())/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(line.substring(lastIndex, match.index));
    }

    const [fullMatch, comment, str, num, keyword, decorator, fnCall] = match;

    if (comment) {
      elements.push(<span key={match.index} className="text-slate-400 italic">{comment}</span>);
    } else if (str) {
      elements.push(<span key={match.index} className="text-emerald-300">{str}</span>);
    } else if (num) {
      elements.push(<span key={match.index} className="text-amber-300">{num}</span>);
    } else if (keyword) {
      elements.push(<span key={match.index} className="text-purple-400 font-semibold">{keyword}</span>);
    } else if (decorator) {
      elements.push(<span key={match.index} className="text-yellow-400">{decorator}</span>);
    } else if (fnCall) {
      elements.push(<span key={match.index} className="text-cyan-300">{fnCall}</span>);
    } else {
      elements.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < line.length) {
    elements.push(line.substring(lastIndex));
  }

  return <>{elements}</>;
}