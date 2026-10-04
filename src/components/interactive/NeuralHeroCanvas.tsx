import React, { useEffect, useRef } from 'react';
import { PageId } from '../../types';
import { Brain, Cpu, Database, Eye, MessageSquare, Sparkles } from 'lucide-react';

interface NeuralHeroCanvasProps {
  onSelectTopic?: (pageId: PageId) => void;
}

export const NeuralHeroCanvas: React.FC<NeuralHeroCanvasProps> = ({ onSelectTopic }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for neural connections
    const nodeCount = 35;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }[] = [];

    const colors = ['#6366f1', '#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#38bdf8'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background neural grid
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulse += 0.03;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw Node
        ctx.beginPath();
        const currentRadius = n1.radius + Math.sin(n1.pulse) * 0.8;
        ctx.arc(n1.x, n1.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.shadowColor = n1.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const topicHubs: {
    title: string;
    sub: string;
    icon: React.ReactNode;
    color: string;
    page: PageId;
    pos: string;
  }[] = [
    {
      title: 'Machine Learning',
      sub: 'Regression, SVM, K-Means',
      icon: <Database className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/40 bg-blue-950/40 text-blue-200',
      page: 'day1',
      pos: 'top-2 left-2 sm:top-4 sm:left-4',
    },
    {
      title: 'Deep Learning',
      sub: 'ANN, CNN, Regularization',
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
      color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-200',
      page: 'day1',
      pos: 'top-2 right-2 sm:top-4 sm:right-4',
    },
    {
      title: 'Natural Language Processing',
      sub: 'Text, Word2Vec, Attention',
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200',
      page: 'day2',
      pos: 'bottom-20 left-2 sm:bottom-16 sm:left-4',
    },
    {
      title: 'Computer Vision',
      sub: 'Edge, HOG, Transformers',
      icon: <Eye className="w-4 h-4 text-teal-400" />,
      color: 'border-teal-500/40 bg-teal-950/40 text-teal-200',
      page: 'day2',
      pos: 'bottom-20 right-2 sm:bottom-16 sm:right-4',
    },
    {
      title: 'Generative AI',
      sub: 'VAEs, Diffusion Models',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-200',
      page: 'day3',
      pos: 'bottom-2 left-1/4 -translate-x-1/2',
    },
    {
      title: 'RAG Chatbot Project',
      sub: 'Vector DB & Grounded Q&A',
      icon: <Brain className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-200',
      page: 'project',
      pos: 'bottom-2 right-1/4 translate-x-1/2',
    },
  ];

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center p-4">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Center glowing neural brain node */}
      <div className="relative z-10 flex flex-col items-center justify-center group cursor-pointer" onClick={() => onSelectTopic?.('schedule')}>
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-1 shadow-glow-blue animate-pulse-slow">
          <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-3">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400 group-hover:scale-110 transition-transform mb-1" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white">
              AI/ML Core
            </span>
            <span className="text-[9px] text-indigo-300">Level-2 Program</span>
          </div>
        </div>
      </div>

      {/* Orbiting interactive topic hubs */}
      {topicHubs.map((hub, idx) => (
        <button
          key={idx}
          onClick={() => onSelectTopic?.(hub.page)}
          className={`absolute ${hub.pos} z-20 p-2.5 sm:p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-glow-purple text-left flex items-center gap-2.5 max-w-[150px] sm:max-w-[190px] group ${hub.color}`}
        >
          <div className="p-2 rounded-xl bg-slate-900/80 shrink-0 group-hover:scale-110 transition-transform">
            {hub.icon}
          </div>
          <div>
            <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight leading-tight">
              {hub.title}
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight truncate">
              {hub.sub}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
