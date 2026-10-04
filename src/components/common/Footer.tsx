import React from 'react';
import { PageId } from '../../types';
import { BrainCircuit, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1 & 2: Branding & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">AI/ML Level-2</span>
                <span className="text-xs ml-2 text-indigo-400 font-semibold">KL University</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An intensive 3-day practical training program bridging foundational Machine Learning, Deep Neural Networks, NLP, Computer Vision, Transformers, and Generative AI with real-world RAG applications.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>5-7 October 2026 (3 Days)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>KL University, Vaddeswaram, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Level-2: Advanced Practitioner Track</span>
              </div>
            </div>
          </div>

          {/* Col 3: Curriculum Days */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Curriculum</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigateTo('day1')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Day 1: ML & Deep Learning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('day2')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Day 2: NLP & Vision Transformers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('day3')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Day 3: Generative AI & RAG
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('project')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-medium text-slate-300"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Capstone: RAG Q&A Chatbot
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Course Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('schedule')} className="hover:text-white transition-colors">
                  3-Day Schedule
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('notebooks')} className="hover:text-white transition-colors">
                  Interactive Notebooks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('resources')} className="hover:text-white transition-colors">
                  Downloadable Resources
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About the Program
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: External Links & Colab */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Developer Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://colab.research.google.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Google Colab</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://scikit-learn.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Scikit-Learn Docs</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tensorflow.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <span>TensorFlow / Keras</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://python.langchain.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>LangChain RAG</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 KL University - AI/ML Level-2 Hands-on Training Program. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>KL Deemed to be University, Vijayawada</span>
            <span>•</span>
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300 underline">
              Program Details
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};