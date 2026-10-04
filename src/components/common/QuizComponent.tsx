import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizComponentProps {
  quiz: QuizQuestion[];
  topicId: string;
  topicTitle: string;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, topicId, topicTitle }) => {
  const storageKey = `klu_quiz_${topicId}`;
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    return Object.keys(selectedAnswers).length === quiz.length && quiz.length > 0;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(selectedAnswers));
    } catch (e) {
      console.warn('Unable to persist quiz to local storage', e);
    }
  }, [selectedAnswers, storageKey]);

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === quiz.length) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    localStorage.removeItem(storageKey);
  };

  const score = calculateScore();
  const allAnswered = quiz.length > 0 && Object.keys(selectedAnswers).length === quiz.length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 my-6 shadow-xl">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">
              Knowledge Check: {topicTitle}
            </h4>
            <p className="text-xs text-slate-400">
              {quiz.length} Multiple Choice {quiz.length === 1 ? 'Question' : 'Questions'}
            </p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              score === quiz.length 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Score: {score} / {quiz.length}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.map((q, qIdx) => {
          const userAnswer = selectedAnswers[qIdx];
          const isCorrect = submitted && userAnswer === q.correctIndex;
          const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

          return (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-2 py-0.5 rounded">
                  Q{qIdx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-200 leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let optionStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-300';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-medium shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold border shrink-0 ${
                          isSelected 
                            ? 'bg-indigo-600 border-indigo-400 text-white' 
                            : 'border-slate-600 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submit */}
              {submitted && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed mt-2 ${
                  isCorrect 
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
                    : 'bg-indigo-950/40 border-indigo-800/60 text-indigo-200'
                }`}>
                  <span className="font-bold block mb-1">
                    {isCorrect ? '✓ Correct Explanation:' : 'ℹ Explanation:'}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      {!submitted && (
        <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {Object.keys(selectedAnswers).length} of {quiz.length} answered
          </span>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              allAnswered
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-blue active:scale-95'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check Answers</span>
          </button>
        </div>
      )}
    </div>
  );
};
