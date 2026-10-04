import React from 'react';
import { DayCurriculum, PageId } from '../../types';
import { 
  Calendar, 
  Clock, 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  FlaskConical, 
  FileText, 
  Terminal, 
  Database, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface DayCardProps {
  curriculum: DayCurriculum;
  onNavigate: (pageId: PageId) => void;
  onOpenResource?: (category: string, day: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ curriculum, onNavigate }) => {
  const dayPageId: PageId = `day${curriculum.dayNumber}` as PageId;

    const styleConfig = {
    badge: 'bg-indigo-600 text-white',
    badgeLight: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    headerBg: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900',
    cardBorder: 'border-slate-200 hover:border-indigo-400',
    accentColor: 'text-indigo-600',
    buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    exerciseBg: 'bg-indigo-50/70 border-indigo-200 text-indigo-900',
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <div className={`bg-white rounded-2xl border ${styleConfig.cardBorder} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group`}>
      {/* Card Header */}
      <div>
        <div className={`p-6 text-white ${styleConfig.headerBg} relative overflow-hidden`}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${styleConfig.badge}`}>
                Day {curriculum.dayNumber}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 opacity-80" />
                <span>{curriculum.date}</span>
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              {styleConfig.icon}
            </div>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            {curriculum.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {curriculum.subtitle}
          </p>
        </div>

        {/* Card Body with Forenoon & Afternoon columns */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Forenoon column */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Forenoon Session</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {curriculum.forenoonTopics.map((topic) => (
                  <li key={topic.id} className="flex items-start gap-2">
                    <span className={`font-bold ${styleConfig.accentColor} mt-0.5`}>•</span>
                    <div>
                      <span className="font-semibold text-slate-900 block">{topic.title}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{topic.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Afternoon column */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Afternoon Session</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {curriculum.afternoonTopics.map((topic) => (
                  <li key={topic.id} className="flex items-start gap-2">
                    <span className={`font-bold ${styleConfig.accentColor} mt-0.5`}>•</span>
                    <div>
                      <span className="font-semibold text-slate-900 block">{topic.title}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{topic.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Lab Highlight Box */}
          <div className={`p-4 rounded-xl border ${styleConfig.exerciseBg} flex items-start gap-3`}>
            <FlaskConical className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
            <div className="space-y-1 text-xs">
              <span className="font-bold block uppercase tracking-wider text-[10px]">
                Hands-on Lab Exercise
              </span>
              <p className="font-semibold text-slate-900">
                {curriculum.practicalExercise.title}
              </p>
              <p className="text-slate-600 line-clamp-2 leading-relaxed">
                {curriculum.practicalExercise.description}
              </p>
            </div>
          </div>

          {/* Quick links to day resources */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => onNavigate('resources')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <FileText className="w-3 h-3 text-slate-500" />
              <span>Slides</span>
            </button>
            <button
              onClick={() => onNavigate('notebooks')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Terminal className="w-3 h-3 text-slate-500" />
              <span>Notebook</span>
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Database className="w-3 h-3 text-slate-500" />
              <span>Dataset</span>
            </button>
            <button
              onClick={() => onNavigate(dayPageId)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <HelpCircle className="w-3 h-3 text-slate-500" />
              <span>Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onNavigate(dayPageId)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] ${styleConfig.buttonBg}`}
        >
          <span>View Day {curriculum.dayNumber} Details & Interactive Labs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
