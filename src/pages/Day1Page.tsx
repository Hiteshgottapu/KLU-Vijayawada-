import React, { useState } from 'react';
import { PageId } from '../types';
import { curriculumData } from '../data/curriculumData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TopicAccordion } from '../components/common/TopicAccordion';
import { CodeBlock } from '../components/common/CodeBlock';
import { QuizComponent } from '../components/common/QuizComponent';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Layers, 
  Cpu, 
  Sparkles, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadHelper';

interface Day1PageProps {
  setCurrentPage: (page: PageId, notebookId?: string) => void;
}

export const Day1Page: React.FC<Day1PageProps> = ({ setCurrentPage }) => {
  const day1 = curriculumData[1];
  const [activeSession, setActiveSession] = useState<'all' | 'forenoon' | 'afternoon'>('all');

  const forenoonTopics = day1.forenoonTopics;
  const afternoonTopics = day1.afternoonTopics;

  const topicsToDisplay = activeSession === 'forenoon'
    ? forenoonTopics
    : activeSession === 'afternoon'
    ? afternoonTopics
    : [...forenoonTopics, ...afternoonTopics];

  // Aggregate all Day 1 quiz questions for the End-of-Day Quiz
  const day1QuizQuestions = [...forenoonTopics, ...afternoonTopics].flatMap((t) => t.quiz);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="day1" setCurrentPage={setCurrentPage} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Day 1 Curriculum
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-semibold">5 October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {day1.title}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            {day1.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>6 Hours Hands-on Labs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{forenoonTopics.length + afternoonTopics.length} Core Modules</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scikit-Learn & TensorFlow Keras</span>
            </div>
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
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Forenoon: Classical ML ({forenoonTopics.length})
            </button>
            <button
              onClick={() => setActiveSession('afternoon')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSession === 'afternoon'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Afternoon: Deep Learning ({afternoonTopics.length})
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500">
          Click any topic card to expand detailed formulas, code, and pitfalls
        </span>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {topicsToDisplay.map((topic, idx) => (
          <TopicAccordion
            key={topic.id}
            topic={topic}
            defaultExpanded={idx === 0}
            themeColor="blue"
            onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId || 'nb-d1-linreg')}
          />
        ))}
      </div>

      {/* Practical Lab Highlight Card */}
      {day1.practicalExercise && (
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-blue-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-300 block">
                Day 1 Practical Laboratory
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {day1.practicalExercise.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-4xl">
            {day1.practicalExercise.description || day1.practicalExercise.taskDescription}
          </p>

          {day1.practicalExercise.steps && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Laboratory Steps:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {day1.practicalExercise.steps.map((step, i) => (
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

          {day1.practicalExercise.starterCode && (
            <div className="pt-2">
              <CodeBlock
                code={day1.practicalExercise.starterCode}
                language="python"
                title="Day 1 Hands-on Lab Starter Code"
                onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId)}
              />
            </div>
          )}
        </div>
      )}

      {/* End-of-Day Comprehensive Quiz Card */}
      <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block">
              End-of-Day Evaluation
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Day 1 Comprehensive Knowledge Assessment Quiz
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Test your understanding of Classical Machine Learning algorithms, Loss Functions, Gradient Descent, ANN Multi-Layer Perceptrons, and CNN Convolutions after completing all Day 1 topics.
        </p>

        <QuizComponent
          quiz={day1QuizQuestions}
          topicId="day1-end-quiz"
          topicTitle="Day 1 Final Comprehensive Quiz"
        />
      </div>

      {/* Bottom Navigation to Day 2 */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={() => setCurrentPage('schedule')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          Back to Schedule
        </button>
        <button
          onClick={() => setCurrentPage('day2')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
        >
          <span>Next: Day 2 - NLP, CV & Transformers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};