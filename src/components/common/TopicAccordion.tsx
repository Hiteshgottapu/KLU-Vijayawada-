import React, { useState } from 'react';
import { TopicItem } from '../../types';
import { CodeBlock } from './CodeBlock';
import { MathRenderer } from './MathRenderer';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Calculator, 
  Code2, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Eye,
  Target,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TopicAccordionProps {
  topic: TopicItem;
  defaultExpanded?: boolean;
  themeColor?: 'blue' | 'emerald' | 'orange';
  onOpenNotebook?: (topicId: string) => void;
}

export const TopicAccordion: React.FC<TopicAccordionProps> = ({
  topic,
  defaultExpanded = false,
  themeColor = 'blue',
  onOpenNotebook,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'overview' | 'math' | 'code' | 'pitfalls' | 'exercise'>('overview');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

    // Theme color maps - unified cohesive brand palette
  const colorMap = {
    blue: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeTab: 'bg-indigo-600 text-white shadow-sm',
      borderAccent: 'border-l-indigo-600',
      hoverBorder: 'hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    emerald: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeTab: 'bg-indigo-600 text-white shadow-sm',
      borderAccent: 'border-l-indigo-600',
      hoverBorder: 'hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    orange: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeTab: 'bg-indigo-600 text-white shadow-sm',
      borderAccent: 'border-l-indigo-600',
      hoverBorder: 'hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
  };

  const colorStyles = colorMap[themeColor];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-200 overflow-hidden ${colorStyles.hoverBorder}`}>
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 cursor-pointer select-none flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${colorStyles.iconBg}`}>
            <Layers className="w-5 h-5" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${colorStyles.badge}`}>
                {topic.tag}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {topic.subtitle}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              {topic.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-slate-400">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expanded Content Drawer */}
      {isExpanded && (
        <div className="border-t border-slate-100 p-5 sm:p-6 space-y-6 bg-slate-50/50">
          
          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'overview' ? colorStyles.activeTab : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Overview & Intuition</span>
            </button>

            {topic.formula && (
              <button
                onClick={() => setActiveTab('math')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'math' ? colorStyles.activeTab : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Math & Formulas</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'code' ? colorStyles.activeTab : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Code</span>
            </button>

            <button
              onClick={() => setActiveTab('pitfalls')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'pitfalls' ? colorStyles.activeTab : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Common Pitfalls</span>
            </button>

            <button
              onClick={() => setActiveTab('exercise')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'exercise' ? colorStyles.activeTab : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hands-on Exercise</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & INTUITION */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Formal Definition */}
              <div className={`bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs border-l-4 ${colorStyles.borderAccent} space-y-1.5`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Technical Definition
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {topic.definition}
                </p>
              </div>

              {/* Intuition & Why Used Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Intuitive Explanation</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {topic.intuition}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Why & When It Is Used</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {topic.whyUsed}
                  </p>
                </div>
              </div>

              {/* Applications List */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Real-World Applications</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {topic.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diagram description visual note */}
              {topic.diagramDesc && (
                <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-slate-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-700">Conceptual Diagram Workflow: </span>
                    {topic.diagramDesc}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MATH & FORMULAS */}
          {activeTab === 'math' && topic.formula && (
            <div className="space-y-4 animate-fadeIn">
              <MathRenderer math={topic.formula.math} />

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Mathematical Explanation:</span>
                {topic.formula.explanation || topic.formula.description}
              </div>

              {topic.formula.variables && topic.formula.variables.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Variable Definitions
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {topic.formula.variables.map((v, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <code className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">{v.symbol || v.name}</code>
                        <span className="text-slate-600">{v.meaning || v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CODE & OUTPUT */}
          {activeTab === 'code' && (
            <div className="space-y-4 animate-fadeIn">
              <CodeBlock 
                code={topic.codeSnippet}
                language={topic.codeLanguage || 'python'}
                title={`${topic.title} - Python Implementation`}
                onOpenNotebook={() => onOpenNotebook?.(topic.id)}
              />

              {/* Expected Output */}
              {topic.expectedOutput && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Expected Terminal Output
                    </span>
                    {topic.isIllustrativeOutput && (
                      <span className="text-[10px] text-slate-400 italic">
                        [Illustrative Output]
                      </span>
                    )}
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                    {topic.expectedOutput}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMMON PITFALLS */}
          {activeTab === 'pitfalls' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-xs text-slate-500 font-medium">
                Review these common misconceptions and implementation traps before deploying models in production:
              </div>
              {(topic.commonMistakes || topic.commonPitfalls || []).map((m: any, idx: number) => {
                const mistakeText = typeof m === 'string' ? m : m.mistake;
                const solutionText = typeof m === 'string' ? 'Follow standard cross-validation and hyperparameter tuning best practices.' : m.solution;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-rose-700">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Mistake: {mistakeText}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 pl-6 border-l-2 border-emerald-500 ml-2">
                      <span><strong>Solution / Best Practice:</strong> {solutionText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: PRACTICE EXERCISE */}
          {activeTab === 'exercise' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Hands-on Exercise Task
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                {topic.practiceExercise?.task || topic.handsOnExercise?.task}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {(topic.practiceExercise?.hint) && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                )}
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  {showSolution ? 'Hide Solution' : 'Show Reference Solution'}
                </button>
              </div>

              {showHint && topic.practiceExercise?.hint && (
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                  <strong>Hint:</strong> {topic.practiceExercise.hint}
                </div>
              )}

              {showSolution && (
                <div className="mt-3">
                  <CodeBlock
                    code={topic.practiceExercise?.solution || topic.practiceExercise?.solutionCode || topic.handsOnExercise?.solutionCode || '# Solution snippet'}
                    language="python"
                    title="Exercise Reference Solution"
                  />
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};