import React from 'react';
import { PageId } from '../types';
import { curriculumData } from '../data/curriculumData';
import { DayCard } from '../components/common/DayCard';
import { NeuralHeroCanvas } from '../components/interactive/NeuralHeroCanvas';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  ArrowRight, 
  Download, 
  BookOpen, 
  Code2, 
  FlaskConical, 
  Bot, 
  CheckCircle2, 
  Terminal, 
  FolderDown, 
  Sparkles,
  Layers,
  Cpu,
  Eye,
  MessageSquare,
  Binary
} from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadHelper';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const learningHighlights = [
    {
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      title: 'Classical ML & Optimization',
      desc: 'Linear & Logistic Regression, SVM max-margin classification, and K-Means clustering with gradient descent and regularization.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      title: 'Deep Learning & Convolutions',
      desc: 'Artificial Neural Networks (ANN), Multi-layer perceptrons, 2D Convolutional Neural Networks (CNN), Dropout, and BatchNorm.',
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      title: 'NLP & Sequence Modeling',
      desc: 'Text preprocessing, NLTK tokenization & lemmatization, Word2Vec dense representations, LSTMs, and Bahdanau attention.',
    },
    {
      icon: <Eye className="w-5 h-5 text-teal-500" />,
      title: 'Computer Vision & Features',
      desc: 'OpenCV Canny edge detection, HOG, SIFT descriptors, hierarchical convolutional feature maps, and receptive fields.',
    },
    {
      icon: <Binary className="w-5 h-5 text-purple-500" />,
      title: 'Transformers & Self-Attention',
      desc: 'Multi-Head Attention mechanisms, sinusoidal positional encodings, and foundation transformer encoder/decoder blocks.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      title: 'Generative AI & Diffusion',
      desc: 'Variational Autoencoders (VAEs), continuous latent space sampling, reparameterization trick, and DDPM forward/reverse diffusion.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. HERO SECTION (Dark Navy with Neural Canvas) */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 pt-8 pb-16 lg:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Meta Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Hands-on Training
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Level-2: Advanced
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              3-Day Intensive
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Artificial Intelligence and Machine Learning <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">(Level-2)</span>
              </h1>

              <h2 className="text-lg sm:text-xl font-semibold text-indigo-200">
                3-Day Hands-on Training Program
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A rigorous, practical learning experience covering Machine Learning algorithms, Deep Neural Networks, Natural Language Processing, Computer Vision, Transformers, and Generative AI, culminating in a real-world project on <strong>RAG-based Document Q&A Chatbots</strong>.
              </p>

              {/* Key Program Facts Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Dates</span>
                    <span className="text-xs font-bold text-white">5-7 Oct 2026</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Venue</span>
                    <span className="text-xs font-bold text-white">KL University</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Duration</span>
                    <span className="text-xs font-bold text-white">3 Days Full</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Level</span>
                    <span className="text-xs font-bold text-white">Level-2 (Adv)</span>
                  </div>
                </div>
              </div>

              {/* Hero CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('schedule')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-glow-blue hover:shadow-indigo-500/50 flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Explore Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('resources')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Learning Resources</span>
                </button>

                <button
                  onClick={() => downloadProjectZip()}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-indigo-300 hover:text-white bg-indigo-950/40 border border-indigo-800/60 hover:bg-indigo-900/50 flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Starter Kit</span>
                </button>
              </div>

            </div>

            {/* Hero Right Visual: Interactive Neural Hero Canvas */}
            <div className="lg:col-span-6">
              <NeuralHeroCanvas onSelectTopic={(page) => setCurrentPage(page)} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHAT YOU WILL LEARN & HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 inline-block">
            Curriculum Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What You Will Master in 3 Days
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A comprehensive progression from foundational optimization and statistical learning to bleeding-edge generative AI and vector search architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 w-fit group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THREE-DAY COURSE OVERVIEW CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
              3-Day Intensive Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Program Schedule & Daily Breakdown
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Each day includes morning theoretical foundations followed by afternoon hands-on laboratory implementation.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('schedule')}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 shrink-0"
          >
            <span>View Detailed Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Day Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DayCard 
            curriculum={curriculumData[1]} 
            onNavigate={(p) => setCurrentPage(p)} 
          />
          <DayCard 
            curriculum={curriculumData[2]} 
            onNavigate={(p) => setCurrentPage(p)} 
          />
          <DayCard 
            curriculum={curriculumData[3]} 
            onNavigate={(p) => setCurrentPage(p)} 
          />
        </div>
      </section>

      {/* 4. FEATURED RAG PROJECT SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border border-indigo-800/60 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background particle glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  Capstone Project
                </span>
                <span className="text-xs text-slate-400">Day 3 Main Practical Deliverable</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Build a Document Q&A Chatbot Using RAG
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect documents to Large Language Models without hallucination. You will build an end-to-end Retrieval-Augmented Generation application that ingests custom PDFs, splits semantic chunks, generates vector embeddings, stores them in ChromaDB, and performs similarity-retrieved grounded question answering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real vector retrieval & cosine search</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Exact source document citations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>LangChain + Streamlit architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Downloadable project starter ZIP</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setCurrentPage('project')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-blue flex items-center gap-2 transition-all active:scale-95"
                >
                  <Bot className="w-4 h-4" />
                  <span>Open Interactive RAG Project & Demo</span>
                </button>

                <button
                  onClick={() => downloadProjectZip()}
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Starter Code</span>
                </button>
              </div>
            </div>

            {/* Visual Chatbot Interface Preview Mockup */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white font-mono">RAG Assistant Online</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">ChromaDB Indexed</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* User msg */}
                <div className="bg-slate-800 p-3 rounded-xl text-slate-200 ml-6 border border-slate-700">
                  <span className="font-bold text-indigo-400 block mb-1 text-[11px]">Student Query:</span>
                  "What are the main topics in Day 2 NLP session?"
                </div>

                {/* AI response */}
                <div className="bg-indigo-950/60 border border-indigo-800/80 p-3.5 rounded-xl text-indigo-100 mr-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Grounded Answer:</span>
                  </div>
                  <p className="leading-relaxed">
                    Based on the retrieved curriculum context: Day 2 covers text preprocessing (tokenization, stemming, lemmatization), Word2Vec, sequence modeling (LSTMs), and self-attention mechanisms.
                  </p>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-indigo-900/60 flex items-center justify-between">
                    <span>Source: KLU_AIML_Syllabus.txt</span>
                    <span className="text-emerald-400 font-bold">Similarity: 98.4%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. QUICK LINKS TO NOTEBOOKS & RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Notebooks Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 w-fit">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Interactive Jupyter Notebooks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Run, inspect, and modify Python code directly in your browser. Includes linear regression solvers, CNN feature filters, text cleaning, attention matrices, and RAG pipelines.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('notebooks')}
              className="w-fit px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 flex items-center gap-2 transition-all"
            >
              <span>Launch Notebook Environment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Resources Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
                <FolderDown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Downloadable Course Materials
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Access lecture slide decks, sample datasets, mathematical formula reference sheets, research paper guides, and the complete RAG project starter repository.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('resources')}
              className="w-fit px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Browse Resource Library</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
