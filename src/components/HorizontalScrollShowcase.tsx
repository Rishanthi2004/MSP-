import React, { useRef, useState, useEffect } from 'react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { Tilt3DCard } from './Tilt3DCard';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, ShieldCheck, Play, Pause, Zap } from 'lucide-react';

interface HorizontalScrollShowcaseProps {
  projects: Project[];
  lang: Language;
  onSelectProject: (project: Project) => void;
  onBookVisit: (projectId: string) => void;
}

export const HorizontalScrollShowcase: React.FC<HorizontalScrollShowcaseProps> = ({
  projects,
  lang,
  onSelectProject,
  onBookVisit,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].projects;
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(2.2); // Faster responsive speed (was 0.85)

  // Repeat items for seamless endless loop
  const displayProjects = [...projects, ...projects, ...projects];

  // Silky smooth continuous auto-scroll
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId: number;
    const step = () => {
      if (container) {
        if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
          // Seamless reset to 1/3 mark without jump
          container.scrollLeft = container.scrollWidth / 3 - container.clientWidth;
        } else {
          container.scrollLeft += speed; // brisk smooth luxury glide speed
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isPaused, speed, displayProjects.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] text-[#1E1919] relative overflow-hidden">
      {/* Background Subtle Monogram Watermark Accent */}
      <div className="absolute right-[-80px] top-[10%] text-[#3D0B12]/[0.03] font-display text-[200px] sm:text-[260px] font-bold select-none pointer-events-none">
        MSP
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase">
                {t.kicker}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DFBE76]/20 text-[#8C6D23] text-[10px] font-semibold border border-[#DFBE76]/40">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isPlaying && !isPaused ? 'animate-pulse' : ''}`} />
                {isPlaying && !isPaused ? 'Auto-Moving' : 'Paused on Hover'}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A050A]">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Controls: Play/Pause, Speed Toggle and Left/Right Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 sm:p-3 rounded-full border border-stone-300 hover:border-[#8C6D23] hover:bg-[#8C6D23]/10 text-stone-700 hover:text-[#2A050A] transition-all cursor-pointer shadow-sm active:scale-95"
              title={isPlaying ? 'Pause Auto-Move' : 'Start Auto-Move'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#8C6D23]" /> : <Play className="w-4 h-4 text-[#8C6D23]" />}
            </button>

            <button
              onClick={() => setSpeed((prev) => (prev >= 3.2 ? 1.6 : prev === 1.6 ? 2.2 : 3.2))}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-stone-300 hover:border-[#8C6D23] hover:bg-[#8C6D23]/10 text-stone-700 hover:text-[#2A050A] transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1 text-[11px] font-semibold"
              title="Toggle speed: Normal (1.6x) / Fast (2.2x) / Ultra (3.2x)"
            >
              <Zap className="w-3.5 h-3.5 text-[#8C6D23]" />
              <span>{speed === 1.6 ? '1.5x' : speed === 2.2 ? 'Fast' : 'Ultra'}</span>
            </button>

            <button
              onClick={() => scroll('left')}
              className="p-2.5 sm:p-3 rounded-full border border-stone-300 hover:border-[#8C6D23] hover:bg-[#8C6D23]/10 text-stone-700 hover:text-[#2A050A] transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 sm:p-3 rounded-full border border-stone-300 hover:border-[#8C6D23] hover:bg-[#8C6D23]/10 text-stone-700 hover:text-[#2A050A] transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track (Automatically Moves, Pauses on Hover) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 pt-2 scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProjects.map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="w-[260px] sm:w-[320px] md:w-[360px] shrink-0">
              <Tilt3DCard
                maxTilt={6}
                scale={1.01}
                className="h-full"
                onClick={() => onSelectProject(project)}
              >
                <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer hover:border-[#DFBE76]">
                  {/* Property Image Container with Zoom & Badge */}
                  <div className="relative h-44 sm:h-54 md:h-60 overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top Status & Category Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded bg-[#2A050A]/90 backdrop-blur-md text-[#DFBE76] font-semibold tracking-wider uppercase border border-[#DFBE76]/30 text-[9px] sm:text-[10px]">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/90 backdrop-blur-md text-emerald-300 font-medium text-[9px] sm:text-[10px] border border-emerald-500/30">
                        {lang === 'ta' ? project.statusTa : project.status}
                      </span>
                    </div>

                    {/* Bottom Image Data: Title & Location */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#DFBE76] transition-colors truncate">
                        {lang === 'ta' ? project.nameTa : project.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-200 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#DFBE76] shrink-0" />
                        {lang === 'ta' ? project.locationTa : project.location}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-3.5">
                    {/* Plot Sizes and Availability Strip */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-xs">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-wider block">
                          {t.plotSizes}
                        </span>
                        <span className="font-semibold text-stone-900 block truncate mt-0.5 text-xs sm:text-sm">
                          {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-wider block">
                          {t.availablePlots}
                        </span>
                        <span className="font-serif text-xs sm:text-sm md:text-base font-bold text-emerald-800">
                          {project.availablePlots} / {project.totalPlots} Left
                        </span>
                      </div>
                    </div>

                    {/* Key Approvals */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-600 truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">{project.approvals[0]}</span>
                    </div>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1">
                      {project.amenities.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium truncate max-w-[140px]"
                        >
                          {lang === 'ta' ? a.nameTa : a.name}
                        </span>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#8C6D23] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{t.viewProject}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookVisit(project.id);
                        }}
                        className="px-2.5 sm:px-3.5 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] transition-colors cursor-pointer active:scale-95 shadow"
                      >
                        {t.requestVisit}
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
