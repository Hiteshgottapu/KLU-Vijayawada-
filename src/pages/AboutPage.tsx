import React from 'react';
import { PageId } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Info, 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Target, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Laptop, 
  ArrowRight,
  Sparkles,
  Layers,
  Bot
} from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadHelper';

interface AboutPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="about" setCurrentPage={setCurrentPage} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Program Overview
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300">Level-2 Practitioner Track</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            About the AI/ML Level-2 Training Program
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            An intensive, 3-day hands-on educational initiative hosted at KL University designed to equip students, researchers, and professionals with practical artificial intelligence, deep learning, computer vision, and generative RAG skills.
          </p>
        </div>
      </div>

      {/* Key Training Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Training Dates</span>
          <p className="text-base font-bold text-slate-900">5-7 October 2026</p>
          <span className="text-xs text-slate-500">3 Consecutive Days</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Venue & Location</span>
          <p className="text-base font-bold text-slate-900">KL University</p>
          <span className="text-xs text-slate-500">Vaddeswaram, Andhra Pradesh</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Program Duration</span>
          <p className="text-base font-bold text-slate-900">3 Full Days</p>
          <span className="text-xs text-slate-500">Theory + Daily Hands-on Labs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Certification Level</span>
          <p className="text-base font-bold text-slate-900">Level-2: Advanced</p>
          <span className="text-xs text-slate-500">Hands-on Capstone Included</span>
        </div>
      </div>

      {/* Program Objectives & Expected Learning Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Objectives */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <Target className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Training Objectives</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The primary goals of the AI/ML Level-2 training program are:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Demystify the mathematical mechanics and loss functions behind classical and deep neural architectures.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Provide practical fluency in Python, NumPy, scikit-learn, TensorFlow/Keras, and NLTK/OpenCV.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Bridge legacy sequence models to state-of-the-art multi-head attention and transformer foundation models.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Build and deploy a complete Retrieval-Augmented Generation (RAG) document Q&A chatbot using ChromaDB.</span>
            </li>
          </ul>
        </div>

        {/* Expected Outcomes */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Award className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Expected Learning Outcomes</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Upon successful completion of the 3-day program, participants will be able to:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Train, evaluate, and regularize custom Multi-Layer Perceptrons and Convolutional Vision Networks.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Construct end-to-end NLP tokenization, Word2Vec embedding spaces, and sequence classifiers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Implement Canny edge detection algorithms and interpret transformer self-attention heatmaps.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Architect vector retrieval pipelines and connect proprietary documents to LLMs without hallucination.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Intended Audience & Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Audience */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <Users className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Intended Audience</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Undergraduate & Postgraduate Engineering Students (CSE, ECE, IT, AI&DS).</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>BCA / BSc / MCA Computer Science Candidates.</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>University Faculty Members and Academic Researchers.</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Industry Developers and Practitioners aspiring to master GenAI & RAG.</span>
            </li>
          </ul>
        </div>

        {/* Prerequisites */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Laptop className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Prerequisites & Technical Requirements</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Laptop with Python 3.9+ pre-installed (or Google Colab account).</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Basic programming knowledge in Python (functions, lists, dictionaries).</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Familiarity with high school mathematics (matrices, vectors, derivatives).</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Stable internet connectivity for lab packages and model downloads.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* CTA Footer */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to Start Learning?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore the 3-day curriculum schedule or start running Python code in the interactive notebook.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentPage('schedule')}
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-blue transition-all"
          >
            Explore Training Schedule
          </button>
          <button
            onClick={() => downloadProjectZip()}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            Download Project Files (.zip)
          </button>
        </div>
      </div>

    </div>
  );
};
