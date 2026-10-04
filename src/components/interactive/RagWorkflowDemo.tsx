import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Scissors, 
  Binary, 
  Database, 
  HelpCircle, 
  Search, 
  Layers, 
  Bot, 
  CheckCircle2, 
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react';

export const RagWorkflowDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      step: 1,
      title: 'Document Ingestion',
      desc: 'Load PDF, Word, or plain text curriculum documents into memory.',
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      color: 'border-blue-500 bg-blue-50/60 text-blue-900',
    },
    {
      step: 2,
      title: 'Text Extraction & Cleaning',
      desc: 'Strip HTML tags, noisy formatting, control characters, and normalize whitespace.',
      icon: <Sparkles className="w-5 h-5 text-cyan-500" />,
      color: 'border-cyan-500 bg-cyan-50/60 text-cyan-900',
    },
    {
      step: 3,
      title: 'Semantic Text Chunking',
      desc: 'Split continuous document into 300-500 token chunks with 50-token overlap.',
      icon: <Scissors className="w-5 h-5 text-indigo-500" />,
      color: 'border-indigo-500 bg-indigo-50/60 text-indigo-900',
    },
    {
      step: 4,
      title: 'Embedding Generation',
      desc: 'Pass chunks through an embedding model to compute high-dimensional dense vectors.',
      icon: <Binary className="w-5 h-5 text-purple-500" />,
      color: 'border-purple-500 bg-purple-50/60 text-purple-900',
    },
    {
      step: 5,
      title: 'Vector Store Indexing',
      desc: 'Store embedding vectors and document text chunks in ChromaDB / FAISS index.',
      icon: <Database className="w-5 h-5 text-pink-500" />,
      color: 'border-pink-500 bg-pink-50/60 text-pink-900',
    },
    {
      step: 6,
      title: 'User Query Input',
      desc: 'Student inputs a natural language question in the chatbot interface.',
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-500 bg-amber-50/60 text-amber-900',
    },
    {
      step: 7,
      title: 'Semantic Vector Retrieval',
      desc: 'Convert query into embedding and compute Cosine Similarity to fetch Top-K chunks.',
      icon: <Search className="w-5 h-5 text-emerald-500" />,
      color: 'border-emerald-500 bg-emerald-50/60 text-emerald-900',
    },
    {
      step: 8,
      title: 'Prompt Augmentation',
      desc: 'Synthesize LLM prompt combining System Instructions + Retrieved Context + Query.',
      icon: <Layers className="w-5 h-5 text-orange-500" />,
      color: 'border-orange-500 bg-orange-50/60 text-orange-900',
    },
    {
      step: 9,
      title: 'Grounded Answer Generation',
      desc: 'LLM generates an accurate response with exact source document citations.',
      icon: <Bot className="w-5 h-5 text-teal-500" />,
      color: 'border-teal-500 bg-teal-50/60 text-teal-900',
    },
  ];

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    let s = 1;
    const interval = setInterval(() => {
      s++;
      if (s > 9) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setActiveStep(s);
      }
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping inline-block" />
            <span>Visual 9-Step RAG Architectural Workflow</span>
          </h4>
          <p className="text-xs text-slate-500">
            Click any step to inspect the data transformation or press "Play Step-by-Step Flow".
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAnimation}
            disabled={isPlaying}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-blue active:scale-95'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>{isPlaying ? 'Stepping...' : 'Play Flow'}</span>
          </button>
          <button
            onClick={() => {
              setActiveStep(1);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive 9-Step Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {steps.map((s) => {
          const isSelected = activeStep === s.step;
          const isPast = activeStep > s.step;

          return (
            <button
              key={s.step}
              onClick={() => {
                setActiveStep(s.step);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[90px] ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-900 text-white shadow-md scale-105 z-10'
                  : isPast
                  ? 'border-emerald-200 bg-emerald-50/50 text-slate-800'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  0{s.step}
                </span>
                <div className={isSelected ? 'text-white' : 'text-slate-500'}>
                  {s.icon}
                </div>
              </div>

              <div className="mt-2">
                <span className={`text-[11px] font-bold block leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Inspection Panel for Selected Step */}
      {steps.find((s) => s.step === activeStep) && (
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-xs font-bold flex items-center justify-center">
                {activeStep}
              </span>
              <h5 className="font-bold text-sm text-indigo-300">
                Step {activeStep}: {steps[activeStep - 1].title}
              </h5>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Pipeline State: Active
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {steps[activeStep - 1].desc}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>
              {activeStep <= 5 ? 'Data Preparation & Ingestion Phase' : 'Query & Grounded Generation Phase'}
            </span>
            <div className="flex items-center gap-1 text-indigo-400">
              <span>Next: {activeStep < 9 ? steps[activeStep].title : 'Complete Grounded Response'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
