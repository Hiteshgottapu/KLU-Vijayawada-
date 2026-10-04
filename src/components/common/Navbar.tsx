import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../../types';
import { 
  BrainCircuit, 
  Calendar, 
  Layers, 
  Cpu, 
  Sparkles, 
  Bot, 
  FolderDown, 
  Terminal, 
  Info, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight,
  Download
} from 'lucide-react';
import { downloadProjectZip } from '../../utils/downloadHelper';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [curriculumDropdownOpen, setCurriculumDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCurriculumDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCurriculumDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setCurriculumDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurriculumActive = ['day1', 'day2', 'day3'].includes(currentPage);

  const curriculumDays = [
    {
      id: 'day1' as PageId,
      label: 'Day 1: ML & Deep Learning',
      sub: 'Regression, SVM, K-Means, ANN, CNN',
      icon: <Layers className="w-4 h-4 text-blue-400 shrink-0" />,
      color: 'hover:bg-blue-950/40 hover:text-blue-200 border-l-2 border-blue-500',
    },
    {
      id: 'day2' as PageId,
      label: 'Day 2: NLP, Vision & Transformers',
      sub: 'Text, Word2Vec, OpenCV, Self-Attention',
      icon: <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />,
      color: 'hover:bg-emerald-950/40 hover:text-emerald-200 border-l-2 border-emerald-500',
    },
    {
      id: 'day3' as PageId,
      label: 'Day 3: Generative AI & RAG',
      sub: 'VAEs, Diffusion, Vector DB & Capstone',
      icon: <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />,
      color: 'hover:bg-orange-950/40 hover:text-orange-200 border-l-2 border-orange-500',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 min-w-0">
          
          {/* 1. Branding: Fixed size, no wrap, no overlap */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-glow-blue flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                <BrainCircuit className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap leading-tight group-hover:text-indigo-200 transition-colors">
                AI/ML Level-2
              </span>
              <span className="text-[11px] text-slate-400 whitespace-nowrap leading-tight">
                3-Day Hands-on Training
              </span>
            </div>
          </div>

          {/* 2. Desktop Navigation: Centered & Simplified */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 min-w-0">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {/* Schedule */}
            <button
              onClick={() => handleNavClick('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'schedule'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Schedule
            </button>

            {/* Curriculum Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCurriculumDropdownOpen(!curriculumDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                  isCurriculumActive || curriculumDropdownOpen
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-expanded={curriculumDropdownOpen}
                aria-haspopup="true"
              >
                <span>Curriculum</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${curriculumDropdownOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {curriculumDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    3-Day Learning Modules
                  </div>
                  {curriculumDays.map((day) => {
                    const isSelected = currentPage === day.id;
                    return (
                      <button
                        key={day.id}
                        onClick={() => handleNavClick(day.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'text-slate-300 ' + day.color
                        }`}
                      >
                        <div className="mt-0.5">{day.icon}</div>
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight truncate">
                            {day.label}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight truncate">
                            {day.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Project */}
            <button
              onClick={() => handleNavClick('project')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'project'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>Project</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">
                RAG
              </span>
            </button>

            {/* Resources */}
            <button
              onClick={() => handleNavClick('resources')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'resources'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Resources
            </button>

            {/* Notebooks */}
            <button
              onClick={() => handleNavClick('notebooks')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'notebooks'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Notebooks
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentPage === 'about'
                  ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About
            </button>
          </nav>

          {/* 3. Action on Right: Download Materials (Single prominent button) */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={() => downloadProjectZip()}
              className="flex items-center gap-2 px-4 py-2 text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-glow-blue hover:shadow-indigo-500/50 transition-all active:scale-95 whitespace-nowrap shrink-0"
              title="Download Complete Starter Kit (.zip)"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Download Materials</span>
            </button>
          </div>

          {/* 4. Mobile & Tablet Navigation Trigger */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => downloadProjectZip()}
              title="Download Starter Kit"
              className="p-2 text-indigo-300 bg-indigo-950/60 border border-indigo-800 rounded-lg hover:bg-indigo-900/60 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => handleNavClick('schedule')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'schedule' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>Schedule</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            {/* Curriculum Sub-items in mobile */}
            <div className="pt-2 pb-1 px-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Curriculum Days
            </div>
            {curriculumDays.map((day) => {
              const isSelected = currentPage === day.id;
              return (
                <button
                  key={day.id}
                  onClick={() => handleNavClick(day.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all pl-6 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {day.icon}
                    <span>{day.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800/80" />

            <button
              onClick={() => handleNavClick('project')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'project' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Capstone Project</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">
                  RAG
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => handleNavClick('resources')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'resources' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>Resources</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => handleNavClick('notebooks')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'notebooks' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>Notebooks</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === 'about' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span>About</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                downloadProjectZip();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-glow-blue flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Materials (.zip)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
