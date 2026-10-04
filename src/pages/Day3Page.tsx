import React, { useState } from 'react';
import { PageId } from '../types';
import { curriculumData } from '../data/curriculumData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TopicAccordion } from '../components/common/TopicAccordion';
import { CodeBlock } from '../components/common/CodeBlock';
import { QuizComponent } from '../components/common/QuizComponent';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Layers, 
  Bot, 
  FlaskConical, 
  ArrowRight,
  Database,
  CheckCircle2,
  Award
} from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadHelper';

interface Day3PageProps {
  setCurrentPage: (page: PageId, notebookId?: string) => void;
}

export const Day3Page: React.FC<Day3PageProps> = ({ setCurrentPage }) => {
  const day3 = curriculumData[3];
  const [activeSession, setActiveSession] = useState<'all' | 'forenoon' | 'afternoon'>('all');

  const forenoonTopics = day3.forenoonTopics;
  const afternoonTopics = day3.afternoonTopics;

  const topicsToDisplay = [
    ...(activeSession === 'all' || activeSession === 'forenoon' ? forenoonTopics : []),
    ...(activeSession === 'all' || activeSession === 'afternoon' ? afternoonTopics : []),
  ];

  // Aggregate all Day 3 quiz questions for the End-of-Day Quiz
  const day3QuizQuestions = [...forenoonTopics, ...afternoonTopics].flatMap((t) => t.quiz);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="day3" setCurrentPage={setCurrentPage} />

      {/* Day 3 Hero Banner (Orange Theme) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Day 3 Curriculum & Capstone
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-semibold">7 October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {day3.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {day3.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <button
              onClick={() => setCurrentPage('project')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow-blue active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Capstone RAG Project Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Session Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter Session:
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveSession('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSession === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Topics ({forenoonTopics.length + afternoonTopics.length})
            </button>
            <button
              onClick={() => setActiveSession('forenoon')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSession === 'forenoon'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Forenoon: Generative AI ({forenoonTopics.length})
            </button>
            <button
              onClick={() => setActiveSession('afternoon')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSession === 'afternoon'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Afternoon: Capstone RAG ({afternoonTopics.length})
            </button>
          </div>
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {topicsToDisplay.map((topic, idx) => (
          <TopicAccordion
            key={topic.id}
            topic={topic}
            defaultExpanded={idx === 0}
            themeColor="orange"
            onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId || 'nb-d3-rag')}
          />
        ))}
      </div>

      {/* Practical Lab Card */}
      {day3.practicalExercise && (
        <div className="bg-gradient-to-br from-orange-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-orange-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-indigo-500/40 flex items-center justify-center text-orange-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-orange-300 block">
                Day 3 Capstone Laboratory
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {day3.practicalExercise.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-orange-100 leading-relaxed max-w-4xl">
            {day3.practicalExercise.description || day3.practicalExercise.taskDescription}
          </p>

          {day3.practicalExercise.steps && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-orange-300">
                Capstone Execution Steps:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {day3.practicalExercise.steps.map((step, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {day3.practicalExercise.starterCode && (
            <div className="pt-2">
              <CodeBlock
                code={day3.practicalExercise.starterCode}
                language="python"
                title="Day 3 RAG Capstone Code"
                onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId)}
              />
            </div>
          )}
        </div>
      )}

      {/* End-of-Day Comprehensive Quiz Card */}
      <div className="bg-white rounded-3xl border border-orange-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 block">
              End-of-Day Evaluation
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Day 3 Comprehensive Knowledge Assessment Quiz
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Test your understanding of Generative AI, Variational Autoencoders, Diffusion Models, and Retrieval-Augmented Generation (RAG) architecture after completing all Day 3 topics.
        </p>

        <QuizComponent
          quiz={day3QuizQuestions}
          topicId="day3-end-quiz"
          topicTitle="Day 3 Final Comprehensive Quiz"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={() => setCurrentPage('day2')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          Previous: Day 2 (NLP, CV & Transformers)
        </button>
        <button
          onClick={() => setCurrentPage('project')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
        >
          <span>Open Capstone RAG Project Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};