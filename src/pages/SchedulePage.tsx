import React, { useState } from 'react';
import { PageId } from '../types';
import { curriculumData } from '../data/curriculumData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DayCard } from '../components/common/DayCard';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Layers, 
  Cpu, 
  Sparkles, 
  Bot, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  BookOpen
} from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadHelper';

interface SchedulePageProps {
  setCurrentPage: (page: PageId) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ setCurrentPage }) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'all' | 1 | 2 | 3>('all');

  const daysToRender = selectedDayFilter === 'all' 
    ? [1, 2, 3] 
    : [selectedDayFilter];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="schedule" setCurrentPage={setCurrentPage} />

      {/* Schedule Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Official Curriculum Schedule
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>5-7 October 2026</span>
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1 ml-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>KL University</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            3-Day AI/ML Level-2 Training Schedule
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Detailed syllabus structure, theoretical foundations, hands-on lab exercises, and capstone project roadmap across all three training days.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>18 Hours Hands-on Labs & Lectures</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>14 Comprehensive Syllabus Topics</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>1 Capstone RAG Chatbot Project</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Day Focus Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-900 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          <span>Workshop Sessions: 5-7 October 2026 • 09:00 AM - 05:00 PM Daily</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage('day1')}
            className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors cursor-pointer"
          >
            Day 1 Hub →
          </button>
          <button 
            onClick={() => setCurrentPage('day2')}
            className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors cursor-pointer"
          >
            Day 2 Hub →
          </button>
          <button 
            onClick={() => setCurrentPage('day3')}
            className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors cursor-pointer"
          >
            Day 3 Hub →
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter View:
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedDayFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 3 Days
            </button>
            <button
              onClick={() => setSelectedDayFilter(1)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedDayFilter === 1
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Day 1 (ML & DL)
            </button>
            <button
              onClick={() => setSelectedDayFilter(2)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedDayFilter === 2
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Day 2 (NLP, CV & Transformers)
            </button>
            <button
              onClick={() => setSelectedDayFilter(3)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedDayFilter === 3
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Day 3 (GenAI & RAG)
            </button>
          </div>
        </div>

        <button
          onClick={() => downloadProjectZip()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download All Project Files (.zip)</span>
        </button>
      </div>

      {/* Day Cards Grid */}
      <div className="grid grid-cols-1 gap-8">
        {daysToRender.map((dayNum) => (
          <DayCard
            key={dayNum}
            curriculum={curriculumData[dayNum]}
            onNavigate={(pageId) => setCurrentPage(pageId)}
          />
        ))}
      </div>

      {/* Capstone Project Callout Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-800/50 shadow-lg">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Day 3 Afternoon Capstone
            </span>
          </div>
          <h3 className="text-xl font-bold">
            Document Q&A Chatbot Using Retrieval-Augmented Generation (RAG)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Students will develop and deploy a real working chatbot that ingests custom PDFs, splits semantic chunks, generates vector embeddings, stores them in ChromaDB, and performs retrieved-grounded question answering.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('project')}
          className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-blue flex items-center gap-2 shrink-0 transition-all active:scale-95"
        >
          <span>Open RAG Project Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
