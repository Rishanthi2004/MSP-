import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Language, Plot } from '../types';
import { translations } from '../data/translations';
import { MasterPlanInteractive } from '../components/MasterPlanInteractive';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Download,
  Calendar,
  Sparkles,
  Compass,
  CheckCircle2,
  Car,
  Trees,
  Zap,
  Waves,
  Mountain,
  Lightbulb,
  Droplet,
  Activity,
  Coffee,
  ShieldAlert,
  Anchor,
  Sun,
  Eye,
  Radio,
} from 'lucide-react';

interface ProjectDetailsPageProps {
  project: Project;
  lang: Language;
  onBack: () => void;
  onOpenBookVisit: (preselectedProjectId?: string) => void;
  onOpenBrochure: (project: Project) => void;
  onSelectPlotForBooking: (plot: Plot, project: Project) => void;
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  project,
  lang,
  onBack,
  onOpenBookVisit,
  onOpenBrochure,
  onSelectPlotForBooking,
}) => {
  const t = translations[lang].projects;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Helper to render amenity icons dynamically
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#8C6D23]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#8C6D23]" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#8C6D23]" />;
      case 'Waves': return <Waves className="w-5 h-5 text-[#8C6D23]" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-[#8C6D23]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#8C6D23]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#8C6D23]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#8C6D23]" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-[#8C6D23]" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-[#8C6D23]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#8C6D23]" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-[#8C6D23]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#8C6D23]" />;
      default: return <Sparkles className="w-5 h-5 text-[#8C6D23]" />;
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1919] min-h-screen">
      {/* 1. Full-Screen Cinematic Project Hero with Floating Panel */}
      <div className="relative min-h-[75vh] flex flex-col justify-between overflow-hidden bg-[#1E0407]">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.8 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={project.heroImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0508] via-black/40 to-black/70" />

        {/* Top Back Navigation Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28">
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-stone-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Enclaves</span>
          </motion.button>
        </div>

        {/* Bottom Hero Text & Floating Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-white"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#DFBE76] font-semibold block mb-2">
                {project.category}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7F2]">
                {lang === 'ta' ? project.nameTa : project.name}
              </h1>
              <p className="text-sm sm:text-base text-stone-200 mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DFBE76]" />
                {lang === 'ta' ? project.locationTa : project.location}, {project.district}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 shrink-0"
            >
              <button
                onClick={() => onOpenBrochure(project)}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4 text-[#DFBE76]" />
                <span>{t.downloadBrochure}</span>
              </button>

              <button
                onClick={() => onOpenBookVisit(project.id)}
                className="px-6 py-3 rounded bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#1E0407] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-[#DFBE76]/25"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.requestVisit}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Floating Ribbon with Smooth Dock */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="bg-[#2A050A] text-white border-y border-[#DFBE76]/30 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Plot Dimensions</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#DFBE76]">
                {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Commercials</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#DFBE76]">
                {lang === 'ta' ? 'விலை கோரிக்கையின் பேரில்' : 'Price on Request'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Available Inventory</span>
              <span className="font-serif text-2xl font-bold text-emerald-400">
                {project.availablePlots} of {project.totalPlots} Plots
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Statutory Status</span>
              <span className="font-serif text-2xl font-bold text-white">
                {lang === 'ta' ? project.statusTa : project.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Main Project Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Architectural Overview & Philosophy with Staggered Entrance */}
        <ScrollReveal direction="up" amount={0.12}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block">
                MASTER ARCHITECTURAL CONCEPT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A050A]">
                Curated for Privacy, Prestige, and Natural Harmony
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {lang === 'ta' ? project.descriptionTa : project.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-stone-800">
                <span className="px-3 py-1.5 rounded-full bg-[#FAF0E6] border border-[#DFBE76]/40 text-[#8C6D23]">
                  Super Built: {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#FAF0E6] border border-[#DFBE76]/40 text-[#8C6D23]">
                  100% Vaastu Demarcated
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl group"
              >
                <img
                  src={project.gallery[1] || project.heroImage}
                  alt={project.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 text-white">
                  <span className="text-xs font-medium tracking-wide">
                    Architectural Entrance Gateway & Water Cascade
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4. Interactive Master Layout Plan */}
        <ScrollReveal direction="zoom" amount={0.12}>
          <div>
            <MasterPlanInteractive
              plots={project.plots}
              projectName={lang === 'ta' ? project.nameTa : project.name}
              lang={lang}
              onSelectPlotForBooking={(plot) => onSelectPlotForBooking(plot, project)}
            />
          </div>
        </ScrollReveal>

        {/* 5. Statutory Approvals & Clear Titles */}
        <ScrollReveal direction="up" amount={0.12}>
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                STATUTORY SANCTIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A050A]">
                100% Title Transparency & Verified Parent Deeds
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Every square inch is sanctioned by governmental authorities, guaranteeing instant bank loan approvals and individual e-patta transfer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.approvals.map((appr, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, borderColor: '#DFBE76' }}
                  className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-start gap-3 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Verified Clearance</span>
                    <span className="text-xs font-semibold text-stone-900 mt-0.5 block leading-tight">
                      {appr}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Signature Amenities Grid */}
        <ScrollReveal direction="up" amount={0.12}>
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                {t.amenities}
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#2A050A]">
                World-Class Enclave Infrastructure
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.amenities.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#DFBE76] group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#FAF0E6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getAmenityIcon(item.icon)}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#2A050A]">
                    {lang === 'ta' ? item.nameTa : item.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {lang === 'ta' ? item.descTa : item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 7. Connectivity & Nearby Landmarks with Radar Animation */}
        <ScrollReveal direction="up" amount={0.12}>
          <div className="bg-[#1C0508] rounded-2xl p-8 sm:p-10 text-white border border-[#DFBE76]/30 shadow-2xl relative overflow-hidden">
            {/* Subtle Radar Ripple in corner */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[#DFBE76]/40 animate-radar pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#DFBE76] uppercase block mb-1 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#DFBE76]" />
                  PROXIMITY RADAR INTELLIGENCE
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#FAF7F2]">
                  Strategic Proximity & Connectivity
                </h3>
              </div>
              <p className="text-xs text-stone-300 max-w-md">
                Positioned right along rapid arterial highways with seamless reach to airports, tech corridors, and international institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {project.landmarks.map((lm, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, borderColor: '#DFBE76' }}
                  className="p-5 rounded-xl bg-[#29080E] border border-white/10 hover:border-[#DFBE76] transition-all relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-[#DFBE76]" />
                      Driving Duration
                    </span>
                    <span className="font-semibold text-emerald-400">{lm.time}</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#DFBE76] tabular-nums">
                    {lm.distance}
                  </div>
                  <div className="text-xs text-stone-200 font-medium mt-1">
                    {lang === 'ta' ? lm.nameTa : lm.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 8. Curated Project Image Gallery */}
        <ScrollReveal direction="up" amount={0.12}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                  PHOTOGRAPHIC ARCHIVE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A050A]">
                  Site Perspectives
                </h3>
              </div>
              <span className="text-xs text-stone-500 hidden sm:block">
                Click any image to view full-resolution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setFullscreenImage(img)}
                  className="rounded-xl overflow-hidden border border-stone-200 h-64 group relative cursor-pointer shadow-md hover:shadow-2xl transition-all"
                >
                  <img
                    src={img}
                    alt={`Perspective ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-[#DFBE76]" />
                      Expand View
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 9. Bottom Book Site Visit Call to Action */}
        <ScrollReveal direction="zoom" amount={0.15}>
          <motion.div
            whileHover={{ borderColor: '#DFBE76' }}
            className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#2A050A] via-[#1C0508] to-[#2A050A] text-white border border-[#DFBE76]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
          >
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#FAF7F2]">
                Ready to Inspect {lang === 'ta' ? project.nameTa : project.name}?
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-lg">
                Book your private chauffeur-driven site visit today. Our senior property manager will personally accompany your family across the layout.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenBrochure(project)}
                className="px-5 py-3 rounded border border-white/20 hover:border-white/40 text-stone-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
              >
                Brochure
              </button>
              <button
                onClick={() => onOpenBookVisit(project.id)}
                className="px-6 py-3 rounded bg-gradient-to-r from-[#DFBE76] to-[#C5A059] text-[#1E0407] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#DFBE76]/20 cursor-pointer"
              >
                Book Site Visit
              </button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9, rotateY: 10 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage}
              alt="Fullscreen View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
