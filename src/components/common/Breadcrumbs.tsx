import React from 'react';
import { PageId } from '../../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  customTrail?: { label: string; pageId?: PageId }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage, setCurrentPage, customTrail }) => {
  const pageTitles: Record<PageId, string> = {
    home: 'Home',
    schedule: '3-Day Schedule',
    day1: 'Day 1: ML & Deep Learning',
    day2: 'Day 2: NLP, CV & Transformers',
    day3: 'Day 3: Generative AI & RAG',
    project: 'Capstone RAG Project',
    resources: 'Learning Resources',
    notebooks: 'Interactive Notebooks',
    about: 'About Program',
    '404': 'Page Not Found',
  };

  const trail = customTrail || [
    { label: 'Home', pageId: 'home' as PageId },
    ...(currentPage !== 'home' ? [{ label: pageTitles[currentPage] || 'Page' }] : []),
  ];

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 py-3 mb-6 select-none overflow-x-auto">
      {trail.map((item, idx) => {
        const isLast = idx === trail.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            {item.pageId && !isLast ? (
              <button
                onClick={() => setCurrentPage(item.pageId!)}
                className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium whitespace-nowrap"
              >
                {idx === 0 && <Home className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            ) : (
              <span className="font-semibold text-slate-800 whitespace-nowrap">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};