import React, { useState } from 'react';
import { PageId } from '../types';
import { curriculumData } from '../data/curriculumData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TopicAccordion } from '../components/common/TopicAccordion';
import { CodeBlock } from '../components/common/CodeBlock';
import { QuizComponent } from '../components/common/QuizComponent';
import { TokenizationDemo } from '../components/interactive/TokenizationDemo';
import { EdgeDetectionDemo } from '../components/interactive/EdgeDetectionDemo';
import { AttentionMatrixDemo } from '../components/interactive/AttentionMatrixDemo';
import { 
  Cpu, 
  Calendar, 
  MapPin, 
  FlaskConical, 
  FileText, 
  Terminal, 
  ArrowRight,
  Sparkles,
  Type,
  Eye,
  Grid,
  Award
} from 'lucide-react';

interface Day2PageProps {
  setCurrentPage: (page: PageId, notebookId?: string) => void;
}

export const Day2Page: React.FC<Day2PageProps> = ({ setCurrentPage }) => {
  const day2 = curriculumData[2];
  const [activeSession, setActiveSession] = useState<'all' | 'forenoon' | 'afternoon'>('all');
  const [interactiveTab, setInteractiveTab] = useState<'tokens' | 'edges' | 'attention'>('tokens');

  const forenoonTopics = day2.forenoonTopics;
  const afternoonTopics = day2.afternoonTopics;

  const topicsToDisplay = [
    ...(activeSession === 'all' || activeSession === 'forenoon' ? forenoonTopics : []),
    ...(activeSession === 'all' || activeSession === 'afternoon' ? afternoonTopics : []),
  ];

  // Aggregate all Day 2 quiz questions for the End-of-Day Quiz
  const day2QuizQuestions = [...forenoonTopics, ...afternoonTopics].flatMap((t) => t.quiz);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="day2" setCurrentPage={setCurrentPage} />

      {/* Day 2 Hero Banner (Green Theme) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Day 2 Curriculum
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-semibold">6 October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {day2.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {day2.subtitle}
          </p>
        </div>
      </div>

      {/* Interactive Visual Demos Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Interactive Day 2 Feature Simulators</span>
            </h3>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setInteractiveTab('tokens')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                interactiveTab === 'tokens' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>NLTK Tokenizer</span>
            </button>
            <button
              onClick={() => setInteractiveTab('edges')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                interactiveTab === 'edges' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Canny Edge Visualizer</span>
            </button>
            <button
              onClick={() => setInteractiveTab('attention')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                interactiveTab === 'attention' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Self-Attention Matrix</span>
            </button>
          </div>
        </div>

        {/* Demo Body */}
        {interactiveTab === 'tokens' && <TokenizationDemo />}
        {interactiveTab === 'edges' && <EdgeDetectionDemo />}
        {interactiveTab === 'attention' && <AttentionMatrixDemo />}
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
              Forenoon: NLP & CV ({forenoonTopics.length})
            </button>
            <button
              onClick={() => setActiveSession('afternoon')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSession === 'afternoon'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Afternoon: Vision & Transformers ({afternoonTopics.length})
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
            themeColor="emerald"
            onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId || 'nb-d2-nlp')}
          />
        ))}
      </div>

      {/* Practical Lab Card */}
      {day2.practicalExercise && (
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-indigo-500/40 flex items-center justify-center text-emerald-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 block">
                Day 2 Practical Laboratory
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {day2.practicalExercise.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-4xl">
            {day2.practicalExercise.description || day2.practicalExercise.taskDescription}
          </p>

          {day2.practicalExercise.steps && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Laboratory Steps:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {day2.practicalExercise.steps.map((step, i) => (
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

          {day2.practicalExercise.starterCode && (
            <div className="pt-2">
              <CodeBlock
                code={day2.practicalExercise.starterCode}
                language="python"
                title="Day 2 Lab Starter Code"
                onOpenNotebook={(topicId) => setCurrentPage('notebooks', topicId)}
              />
            </div>
          )}
        </div>
      )}

      {/* End-of-Day Comprehensive Quiz Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 block">
              End-of-Day Evaluation
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Day 2 Comprehensive Knowledge Assessment Quiz
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Test your understanding of NLP Tokenization, Word2Vec dense vectors, OpenCV edge detection, and Transformer Self-Attention matrices after completing all Day 2 topics.
        </p>

        <QuizComponent
          quiz={day2QuizQuestions}
          topicId="day2-end-quiz"
          topicTitle="Day 2 Final Comprehensive Quiz"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={() => setCurrentPage('day1')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          Previous: Day 1 (ML & Deep Learning)
        </button>
        <button
          onClick={() => setCurrentPage('day3')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-500 shadow-sm transition-all"
        >
          <span>Next: Day 3 - Generative AI & RAG</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};