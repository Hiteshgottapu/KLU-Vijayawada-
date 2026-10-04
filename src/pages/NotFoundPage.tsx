import React from 'react';
import { PageId } from '../types';
import { BrainCircuit, Home, Calendar, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-8">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 animate-pulse-slow">
        <BrainCircuit className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          404 - Page Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Neural Pathway Lost
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The requested page or training module does not exist in the curriculum routing table.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-glow-blue transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
        <button
          onClick={() => setCurrentPage('schedule')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all"
        >
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>View 3-Day Schedule</span>
        </button>
      </div>
    </div>
  );
};