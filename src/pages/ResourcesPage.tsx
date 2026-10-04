import React, { useState } from 'react';
import { PageId, ResourceItem } from '../types';
import { resourcesData } from '../data/resourcesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { downloadTextFile, downloadProjectZip } from '../utils/downloadHelper';
import { 
  Loader2,
  FolderDown, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Terminal, 
  Database, 
  BookOpen, 
  Code2, 
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ResourcesPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<'all' | 'day1' | 'day2' | 'day3' | 'project'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'slides' | 'notebook' | 'dataset' | 'cheatsheet' | 'project' | 'reading'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedItem, setDownloadedItem] = useState<ResourceItem | null>(null);

  const handleDownload = async (item: ResourceItem) => {
    setDownloadingId(item.id);
    try {
      if (item.id === 'res-proj-starter') {
        await downloadProjectZip();
      } else if (item.contentGenerator) {
        const content = await item.contentGenerator();
        const mime = item.filename.endsWith('.ipynb') ? 'application/json' : item.filename.endsWith('.csv') ? 'text/csv' : 'text/markdown';
        downloadTextFile(item.filename, content, mime);
      }
      setDownloadedItem(item);
      setTimeout(() => {
        setDownloadedItem(null);
      }, 3500);
    } catch (err) {
      console.error('Download error', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredResources = resourcesData.filter((item) => {
    const matchesDay = selectedDay === 'all' || item.day === 'all' || item.day === selectedDay;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fileType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDay && matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'slides':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'notebook':
        return <Terminal className="w-5 h-5 text-cyan-500" />;
      case 'dataset':
        return <Database className="w-5 h-5 text-emerald-500" />;
      case 'cheatsheet':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'project':
        return <FolderDown className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="resources" setCurrentPage={setCurrentPage} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Verified Training Materials
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300">Direct Browser Downloads</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Learning Resources Library
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Download verified course materials including lecture slides, interactive Jupyter Notebooks, training CSV datasets, mathematical cheat sheets, and the complete RAG project starter repository.
          </p>

          <div className="pt-2">
            <button
              onClick={() => downloadProjectZip()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-blue transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download All Materials Bundle (.zip)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title, concept, or file format..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xs sm:text-sm text-slate-800 transition-all outline-hidden"
            />
          </div>

          {/* Day Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
            >
              <option value="all">Filter by Day: All Days</option>
              <option value="day1">Day 1: ML & Deep Learning</option>
              <option value="day2">Day 2: NLP, CV & Transformers</option>
              <option value="day3">Day 3: Generative AI & RAG</option>
              <option value="project">Capstone Project Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden"
            >
              <option value="all">Category: All Types</option>
              <option value="slides">Lecture Slides</option>
              <option value="notebook">Jupyter Notebooks</option>
              <option value="dataset">Datasets (CSV)</option>
              <option value="cheatsheet">Formula Cheat Sheets</option>
              <option value="project">Project Source Code</option>
              <option value="reading">Research Papers</option>
            </select>
          </div>

        </div>

        {/* Active Filters Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong>{filteredResources.length}</strong> of {resourcesData.length} course resources
          </div>
          {(searchQuery || selectedDay !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDay('all');
                setSelectedCategory('all');
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.day.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.fileSize}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-indigo-600 block mt-0.5">
                  {item.fileType}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* Action Download / Open Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDownload(item)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white transition-all active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {item.filename}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Download Success Toast */}
      {downloadedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideUp">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Download Complete</div>
            <div className="text-[11px] text-slate-400 font-mono">{downloadedItem.filename}</div>
          </div>
        </div>
      )}
    </div>
  );
};
