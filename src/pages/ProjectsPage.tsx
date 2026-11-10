import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { Tilt3DCard } from '../components/Tilt3DCard';
import {
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Calendar,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Film,
  Grid,
  Zap,
} from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  lang: Language;
  onSelectProject: (project: Project) => void;
  onBookVisit: (projectId: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  lang,
  onSelectProject,
  onBookVisit,
}) => {
  const t = translations[lang].projects;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'plotsDesc' | 'plotsAsc'>('featured');
  const [viewMode, setViewMode] = useState<'moving' | 'grid'>('moving'); // Auto-moving reel by default!

  // Auto-scrolling state for moving cards
  const movingContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(2.2); // Faster responsive speed (was 0.85)

  const categories = [
    { id: 'ALL', label: t.filterAll },
    { id: 'Gated Villa Plots', label: t.filterGated },
    { id: 'Hill Sanctuary', label: t.filterHill },
    { id: 'Lakefront Retreat', label: t.filterLake },
  ];

  const districts = ['ALL', 'Coimbatore', 'Erode / Tirupur', 'The Nilgiris'];

  const filteredProjects = projects
    .filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchDist = selectedDistrict === 'ALL' || p.district.includes(selectedDistrict);
      return matchCat && matchDist;
    })
    .sort((a, b) => {
      if (sortBy === 'plotsDesc') return b.availablePlots - a.availablePlots;
      if (sortBy === 'plotsAsc') return a.availablePlots - b.availablePlots;
      return 0;
    });

  // Tripled list for endless seamless automatic loop
  const autoMovingList = [...filteredProjects, ...filteredProjects, ...filteredProjects];

  // Silky smooth continuous auto-scroll effect
  useEffect(() => {
    if (viewMode !== 'moving' || !isPlaying || isPaused) return;
    const container = movingContainerRef.current;
    if (!container) return;

    let animId: number;
    const step = () => {
      if (container) {
        if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
          // Seamless reset without jump
          container.scrollLeft = container.scrollWidth / 3 - container.clientWidth;
        } else {
          container.scrollLeft += speed; // brisk smooth luxury glide
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [viewMode, isPlaying, isPaused, speed, autoMovingList.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (movingContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      movingContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header Banner with Animated Gradient */}
      <div className="bg-[#2A050A] text-[#FAF7F2] py-8 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#DFBE76]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D0B12] via-[#2A050A] to-[#1C0508] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#DFBE76]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#DFBE76] uppercase">
                  {t.kicker}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#DFBE76]/20 text-[#DFBE76] text-[10px] font-semibold border border-[#DFBE76]/40">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isPlaying && !isPaused ? 'animate-pulse' : ''}`} />
                  {viewMode === 'moving' ? (isPlaying && !isPaused ? 'Auto-Moving Reel' : 'Paused') : 'Grid View'}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAF7F2]">
                {t.title}
              </h1>
              <p className="text-xs sm:text-base text-stone-300 max-w-2xl mt-1 sm:mt-2 leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>

            {/* View Mode Toggle: Auto-Moving Reel vs Grid View */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/15 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setViewMode('moving')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'moving'
                    ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Auto-Reel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* Interactive Filters Bar: Horizontal Swipable on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4"
          >
            {/* Category Filter Horizontal Scrollable Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 -mx-1 px-1 sm:mx-0 sm:px-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded transition-all cursor-pointer whitespace-nowrap shrink-0 relative ${
                    selectedCategory === cat.id
                      ? 'bg-[#DFBE76] text-[#2A050A] shadow-md font-bold'
                      : 'bg-white/10 text-stone-300 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {cat.label}
                  {selectedCategory === cat.id && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 rounded border border-[#DFBE76] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sorting, District Dropdowns and Controls */}
            <div className="flex items-center justify-between gap-2 w-full md:w-auto">
              <div className="grid grid-cols-2 gap-2 flex-1 md:flex md:gap-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-white/20 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#DFBE76] cursor-pointer"
                >
                  <option value="ALL">All Locations</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Erode">Erode / Tirupur</option>
                  <option value="The Nilgiris">The Nilgiris</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-white/20 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#DFBE76] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="plotsDesc">Most Plots</option>
                  <option value="plotsAsc">High Demand</option>
                </select>
              </div>

              {/* In Moving Mode, show Play/Pause and Speed */}
              {viewMode === 'moving' && (
                <div className="flex items-center gap-1 pl-2 border-l border-white/20 shrink-0">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 sm:p-2 rounded border border-white/20 hover:border-[#DFBE76] bg-black/50 text-[#DFBE76] transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause Auto-Move' : 'Start Auto-Move'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setSpeed((prev) => (prev >= 3.2 ? 1.6 : prev === 1.6 ? 2.2 : 3.2))}
                    className="px-2 py-1 rounded border border-white/20 hover:border-[#DFBE76] bg-black/50 text-[#DFBE76] transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                    title="Toggle speed: 1.5x / Fast / Ultra"
                  >
                    <Zap className="w-3 h-3 text-[#DFBE76]" />
                    <span>{speed === 1.6 ? '1.5x' : speed === 2.2 ? 'Fast' : 'Ultra'}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <p className="text-stone-500 text-sm">No enclaves matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedDistrict('ALL');
              }}
              className="mt-3 text-xs font-semibold text-[#8C6D23] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'moving' ? (
          /* AUTO-MOVING CONTINUOUS HORIZONTAL REEL MODE */
          <div className="relative">
            {/* Simple mobile guide */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-3 px-1">
              <span className="flex items-center gap-1 font-medium text-[#8C6D23] text-[11px] sm:text-xs">
                <Film className="w-3.5 h-3.5 text-[#8C6D23]" />
                Auto-Gliding • Tap any plot card to view details
              </span>
              <span className="text-stone-400 text-[11px]">
                {filteredProjects.length} Enclaves
              </span>
            </div>

            <div
              ref={movingContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-3 sm:gap-6 overflow-x-auto pb-4 sm:pb-8 pt-1 scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {autoMovingList.map((project, idx) => {
                const availabilityPercent = Math.round(
                  (project.availablePlots / project.totalPlots) * 100
                );
                return (
                  <div key={`${project.id}-${idx}`} className="w-[240px] sm:w-[320px] md:w-[390px] shrink-0">
                    <Tilt3DCard
                      maxTilt={5}
                      scale={1.01}
                      className="h-full"
                      onClick={() => onSelectProject(project)}
                    >
                      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer hover:border-[#DFBE76]">
                        {/* Hero Image Container */}
                        <div className="relative h-36 sm:h-48 md:h-56 overflow-hidden">
                          <img
                            src={project.heroImage}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />

                          {/* Scrim Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-xs">
                            <span className="px-2 py-0.5 rounded bg-[#2A050A]/90 backdrop-blur-md text-[#DFBE76] font-semibold tracking-wider uppercase border border-[#DFBE76]/30 text-[9px] sm:text-[10px]">
                              {project.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/90 backdrop-blur-md text-emerald-300 font-medium text-[9px] sm:text-[10px] border border-emerald-500/30">
                              {lang === 'ta' ? project.statusTa : project.status}
                            </span>
                          </div>

                          {/* Bottom Title & Location */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                            <h3 className="font-serif text-base sm:text-xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#DFBE76] transition-colors truncate">
                              {lang === 'ta' ? project.nameTa : project.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-stone-200 flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 text-[#DFBE76] shrink-0" />
                              {lang === 'ta' ? project.locationTa : project.location}
                            </p>
                          </div>
                        </div>

                        {/* Card Body - Streamlined & Clear */}
                        <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                          {/* Dimensions & Availability Box */}
                          <div className="grid grid-cols-2 gap-2 p-2 sm:p-2.5 rounded-lg bg-[#FAF0E6] border border-[#DFBE76]/30">
                            <div>
                              <span className="text-[9px] text-stone-600 uppercase tracking-wider block">
                                {t.plotSizes}
                              </span>
                              <span className="font-serif text-xs sm:text-base font-bold text-[#50111A] block mt-0.5 truncate">
                                {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-stone-500 block truncate">
                                Clear Patta Deeds
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[9px] text-stone-600 uppercase tracking-wider block">
                                {t.availablePlots}
                              </span>
                              <span className="font-serif text-xs sm:text-base font-bold text-emerald-800 block mt-0.5">
                                {project.availablePlots} / {project.totalPlots} Left
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-[#8C6D23] font-semibold block truncate">
                                {lang === 'ta' ? 'விலை கோரிக்கையின் பேரில்' : 'Price on Request'}
                              </span>
                            </div>
                          </div>

                          {/* Approvals in a clean line */}
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-stone-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-medium truncate">{project.approvals[0]}</span>
                          </div>

                          {/* Card Actions */}
                          <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                            <span className="text-[11px] sm:text-xs font-bold text-[#8C6D23] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>{t.viewProject}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookVisit(project.id);
                              }}
                              className="px-2.5 sm:px-3.5 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{t.requestVisit}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tilt3DCard>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* STATIC 2-COLUMN GRID VIEW MODE */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 perspective-1000">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const availabilityPercent = Math.round(
                  (project.availablePlots / project.totalPlots) * 100
                );
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full"
                  >
                    <Tilt3DCard
                      maxTilt={5}
                      scale={1.01}
                      className="h-full"
                      onClick={() => onSelectProject(project)}
                    >
                      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer hover:border-[#DFBE76]/60">
                        {/* Hero Image Container */}
                        <div className="relative h-36 sm:h-52 md:h-64 overflow-hidden">
                          <img
                            src={project.heroImage}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />

                          {/* Scrim Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-xs">
                            <span className="px-2 py-0.5 rounded bg-[#2A050A]/90 backdrop-blur-md text-[#DFBE76] font-semibold tracking-wider uppercase border border-[#DFBE76]/30 text-[9px] sm:text-[10px]">
                              {project.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/90 backdrop-blur-md text-emerald-300 font-medium text-[9px] sm:text-[10px] border border-emerald-500/30">
                              {lang === 'ta' ? project.statusTa : project.status}
                            </span>
                          </div>

                          {/* Bottom Title & Location */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                            <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#DFBE76] transition-colors truncate">
                              {lang === 'ta' ? project.nameTa : project.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-stone-200 flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 text-[#DFBE76] shrink-0" />
                              {lang === 'ta' ? project.locationTa : project.location}, {project.district}
                            </p>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3.5">
                          {/* Dimensions & Availability Card */}
                          <div className="grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg bg-[#FAF0E6] border border-[#DFBE76]/30">
                            <div>
                              <span className="text-[9px] sm:text-[10px] text-stone-600 uppercase tracking-wider block">
                                {t.plotSizes}
                              </span>
                              <span className="font-serif text-xs sm:text-base md:text-lg font-bold text-[#50111A] block mt-0.5 truncate">
                                {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-stone-500 block truncate">
                                Clear Patta Deeds
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[9px] sm:text-[10px] text-stone-600 uppercase tracking-wider block">
                                {t.availablePlots}
                              </span>
                              <span className="font-serif text-xs sm:text-base md:text-lg font-bold text-emerald-800 block mt-0.5">
                                {project.availablePlots} / {project.totalPlots} Left
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-[#8C6D23] font-semibold block truncate">
                                {lang === 'ta' ? 'விலை கோரிக்கையின் பேரில்' : 'Price on Request'}
                              </span>
                            </div>
                          </div>

                          {/* Approvals */}
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-stone-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-medium truncate">{project.approvals[0]}</span>
                          </div>

                          {/* Amenities Row */}
                          <div className="flex flex-wrap gap-1">
                            {project.amenities.slice(0, 3).map((amenity, i) => (
                              <span
                                key={i}
                                className="text-[9px] sm:text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium truncate max-w-[120px]"
                              >
                                {lang === 'ta' ? amenity.nameTa : amenity.name}
                              </span>
                            ))}
                          </div>

                          {/* Card Actions */}
                          <div className="pt-2 sm:pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                            <span className="text-[11px] sm:text-xs font-bold text-[#8C6D23] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>{t.viewProject}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookVisit(project.id);
                              }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{t.requestVisit}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tilt3DCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
