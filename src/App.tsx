import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { Day1Page } from './pages/Day1Page';
import { Day2Page } from './pages/Day2Page';
import { Day3Page } from './pages/Day3Page';
import { ProjectPage } from './pages/ProjectPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { NotebooksPage } from './pages/NotebooksPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const VALID_PAGES: PageId[] = [
  'home',
  'schedule',
  'day1',
  'day2',
  'day3',
  'project',
  'resources',
  'notebooks',
  'about',
];

export function App() {
  // Read initial page from hash if present
  
const topicToNotebookMap: Record<string, string> = {
  'linear-regression': 'nb-d1-linreg',
  'logistic-regression': 'nb-d1-logreg',
  'svm': 'nb-d1-svm',
  'kmeans-clustering': 'nb-d1-kmeans',
  'ann': 'nb-d1-ann',
  'cnn': 'nb-d1-cnn',
  'text-preprocessing': 'nb-d2-nlp',
  'word-representation': 'nb-d2-nlp',
  'feature-extraction-vision': 'nb-d2-cv',
  'attention-mechanism': 'nb-d2-attn',
  'transformer-architecture': 'nb-d2-attn',
  'vaes': 'nb-d3-vae',
  'diffusion-models': 'nb-d3-diff',
  'rag-architecture': 'nb-d3-rag',
  'nb-d1-linreg': 'nb-d1-linreg',
  'nb-d1-logreg': 'nb-d1-logreg',
  'nb-d1-svm': 'nb-d1-svm',
  'nb-d1-kmeans': 'nb-d1-kmeans',
  'nb-d1-ann': 'nb-d1-ann',
  'nb-d1-cnn': 'nb-d1-cnn',
  'nb-d2-nlp': 'nb-d2-nlp',
  'nb-d2-cv': 'nb-d2-cv',
  'nb-d2-attn': 'nb-d2-attn',
  'nb-d3-vae': 'nb-d3-vae',
  'nb-d3-diff': 'nb-d3-diff',
  'nb-d3-rag': 'nb-d3-rag'
};

  const [selectedNotebookId, setSelectedNotebookId] = useState<string>('nb-d1-linreg');
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const rawHash = window.location.hash.replace('#', '') as PageId;
    return VALID_PAGES.includes(rawHash) ? rawHash : 'home';
  });

  // Sync state with URL hash
  useEffect(() => {
    if (currentPage !== '404') {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(rawHash)) {
        setCurrentPage(rawHash);
      } else if (rawHash) {
        setCurrentPage('404');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: PageId, notebookIdOrTopicId?: string) => {
    if (notebookIdOrTopicId) {
      const resolvedId = topicToNotebookMap[notebookIdOrTopicId] || notebookIdOrTopicId;
      setSelectedNotebookId(resolvedId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white relative">
      {/* Global Navigation Bar */}
      <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />

      {/* Main Page Dynamic Router */}
      <main className="flex-1 animate-fadeIn">
        {currentPage === 'home' && <HomePage setCurrentPage={handlePageChange} />}
        {currentPage === 'schedule' && <SchedulePage setCurrentPage={handlePageChange} />}
        {currentPage === 'day1' && <Day1Page setCurrentPage={handlePageChange} />}
        {currentPage === 'day2' && <Day2Page setCurrentPage={handlePageChange} />}
        {currentPage === 'day3' && <Day3Page setCurrentPage={handlePageChange} />}
        {currentPage === 'project' && <ProjectPage setCurrentPage={handlePageChange} />}
        {currentPage === 'resources' && <ResourcesPage setCurrentPage={handlePageChange} />}
        {currentPage === 'notebooks' && <NotebooksPage setCurrentPage={handlePageChange} initialNotebookId={selectedNotebookId} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={handlePageChange} />}
        {currentPage === '404' && <NotFoundPage setCurrentPage={handlePageChange} />}
      </main>

      {/* Floating Scroll to Top button */}
      <ScrollToTop />

      {/* Global Footer */}
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
}

export default App;