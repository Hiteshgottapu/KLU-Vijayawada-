import React, { useState } from 'react';
import { PageId, NotebookItem } from '../types';
import { notebooksData } from '../data/notebooksData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Search,
  X,
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  BookOpen,
  Layers,
  Cpu,
  Sparkles,
  ChevronRight,
  Sliders,
  Info
} from 'lucide-react';
import { downloadTextFile } from '../utils/downloadHelper';

interface NotebooksPageProps {
  setCurrentPage: (page: PageId, notebookId?: string) => void;
  initialNotebookId?: string;
}

export const NotebooksPage: React.FC<NotebooksPageProps> = ({ setCurrentPage, initialNotebookId }) => {
  const [selectedNbId, setSelectedNbId] = useState<string>(initialNotebookId || notebooksData[0].id);
  const [dayFilter, setDayFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editedCode, setEditedCode] = useState<string>(notebooksData[0].code);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialNotebookId) {
      const found = notebooksData.find((nb) => nb.id === initialNotebookId);
      if (found) {
        setSelectedNbId(found.id);
        setEditedCode(found.code);
        setOutput(null);
        setIsRunning(false);
      }
    }
  }, [initialNotebookId]);


  const selectedNb = notebooksData.find((nb) => nb.id === selectedNbId) || notebooksData[0];

  const filteredNotebooks = notebooksData.filter((nb) => {
    const matchesDay = dayFilter === 'all' || nb.day === dayFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      nb.title.toLowerCase().includes(q) ||
      nb.topicTag.toLowerCase().includes(q) ||
      nb.description.toLowerCase().includes(q)
    );
    return matchesDay && matchesSearch;
  });

  const handleSelectNotebook = (nb: NotebookItem) => {
    setSelectedNbId(nb.id);
    setEditedCode(nb.code);
    setOutput(null);
    setIsRunning(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate instant code runner feedback
    setTimeout(() => {
      setOutput(selectedNb.simulatedOutput);
      setIsRunning(false);
    }, 450);
  };

  const handleResetCode = () => {
    setEditedCode(selectedNb.code);
    setOutput(null);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(editedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadNotebook = () => {
    const filename = `${selectedNb.title.replace(/[^a-zA-Z0-9]/g, '_')}.py`;
    downloadTextFile(filename, editedCode, 'text/x-python');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="notebooks" setCurrentPage={setCurrentPage} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Interactive Python Code Runner
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-indigo-200">12 Runnable Lab Snippets</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Interactive Jupyter Notebooks & Labs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Inspect, edit, and run Python algorithms for Linear Regression, CNN Convolution Filters, NLTK Preprocessing, Self-Attention matrices, and RAG vector searches.
          </p>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Code Editor & Terminal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar: Notebook Index (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Notebooks Catalog</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {filteredNotebooks.length} {filteredNotebooks.length === 1 ? 'lab' : 'labs'}
            </span>
          </div>

          {/* Real-time Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search algorithms, models, topics..."
              className="w-full pl-8.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter Day tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setDayFilter('all')}
              className={`py-1.5 rounded-lg transition-all ${
                dayFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDayFilter(1)}
              className={`py-1.5 rounded-lg transition-all ${
                dayFilter === 1 ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => setDayFilter(2)}
              className={`py-1.5 rounded-lg transition-all ${
                dayFilter === 2 ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Day 2
            </button>
            <button
              onClick={() => setDayFilter(3)}
              className={`py-1.5 rounded-lg transition-all ${
                dayFilter === 3 ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Day 3
            </button>
          </div>

          {/* Notebooks List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredNotebooks.length === 0 && (
              <div className="text-center py-8 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                <p className="text-xs text-slate-500 font-medium">No notebooks match "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setDayFilter('all'); }}
                  className="text-xs font-semibold text-indigo-600 hover:text-cyan-700 underline cursor-pointer"
                >
                  Clear search & filters
                </button>
              </div>
            )}
            {filteredNotebooks.map((nb) => {
              const isSelected = nb.id === selectedNb.id;
              return (
                <button
                  key={nb.id}
                  onClick={() => handleSelectNotebook(nb)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        nb.day === 1
                          ? 'bg-indigo-100 text-indigo-800'
                          : nb.day === 2
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      Day {nb.day}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {nb.topicTag}
                    </span>
                  </div>

                  <h4
                    className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                      isSelected ? 'text-indigo-900' : 'text-slate-800'
                    }`}
                  >
                    {nb.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {nb.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Code Editor & Terminal Output (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Editor Container */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            
            {/* Top Toolbar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  {selectedNb.title}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={selectedNb.colabUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800/60 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open in Colab</span>
                </a>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={handleDownloadNotebook}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Download .py"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleResetCode}
                  className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-slate-700 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 shadow-glow-green active:scale-95'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>
            </div>

            {/* Description Banner */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 text-xs text-slate-400">
              {selectedNb.description}
            </div>

            {/* Code Editor Textarea */}
            <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm">
              <textarea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-relaxed outline-hidden resize-y focus:ring-0 border-0"
              />
            </div>

            {/* Terminal Output Panel */}
            <div className="border-t border-slate-800 bg-slate-900/90">
              <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Interactive Execution Terminal</span>
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  Client Sandbox (Simulated)
                </span>
              </div>

              <div className="p-4 font-mono text-xs text-slate-200 min-h-[120px] max-h-[220px] overflow-y-auto whitespace-pre leading-relaxed">
                {isRunning ? (
                  <div className="flex items-center gap-2 text-indigo-400">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span>Executing Python script in sandbox...</span>
                  </div>
                ) : output ? (
                  <div className="space-y-2">
                    <div className="text-emerald-400">{output}</div>
                    <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 flex items-center gap-1">
                      <Info className="w-3 h-3 text-indigo-400" />
                      <span>Simulated output for rapid learning. For hardware acceleration & GPU training, open in Google Colab.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 italic">
                    Press "Run Code" above to execute the Python script and view terminal output.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};