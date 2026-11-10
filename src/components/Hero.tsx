import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { ArrowUpRight, Compass, MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onExploreProjects: () => void;
  onOpenBookVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreProjects,
  onOpenBookVisit,
}) => {
  const t = translations[lang].hero;
  const metrics = translations[lang].metrics;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacityFactor = Math.max(0, 1 - scrollY * 0.0018);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#1E0407]">
      {/* Background Cinematic Aerial Image with Parallax & Slow Ambient Zoom */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        animate={{
          scale: [1.02, 1.07, 1.02],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6 + scrollY * 0.18}px, 0)`,
        }}
      >
        <img
          src="/assets/images/hero_luxury_residential_estate_1794290580559.jpg"
          alt="MSP Luxury Residential Plotted Estate"
          className="w-full h-full object-cover object-center brightness-[1.08] contrast-[1.02] saturate-[1.12]"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Full-Screen Gradient Overlay to Maintain Pure Readability Without Card Enclosures */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* Main Hero Content - Sitting Directly Over Landscape Without Cards or Boxes */}
      <div
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 text-center my-auto flex flex-col items-center"
        style={{ opacity: opacityFactor }}
      >
        {/* Editorial Subtitle Kicker - Pure Typography, No Pill Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[#DFBE76] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          <Compass className="w-4 h-4 text-[#DFBE76]" />
          <span>{t.tag}</span>
        </motion.div>

        {/* Headline Revealed Smoothly Directly On Background */}
        <h1
          className={`font-serif font-bold tracking-tight text-[#FAF7F2] text-balance max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] ${
            lang === 'ta'
              ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.3]'
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15]'
          }`}
        >
          <motion.span
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[#DFBE76] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            {t.headlinePrimary}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block mt-2 bg-gradient-to-r from-[#FFFFFF] via-[#FAF7F2] to-[#E5D7BE] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            {t.headlineSecondary}
          </motion.span>
        </h1>

        {/* Narrative Prose Directly on Canvas */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-sm sm:text-base md:text-lg text-[#FAF7F2] max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        >
          {t.subtext}
        </motion.p>

        {/* Minimal, Elegant CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreProjects}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#1E0407] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-black/40 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{t.explore}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenBookVisit}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-[#DFBE76]/80 bg-black/20 hover:bg-[#DFBE76] text-[#FAF7F2] hover:text-[#1E0407] font-semibold text-xs uppercase tracking-widest backdrop-blur-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.scheduleVisit}</span>
          </button>
        </motion.div>

        {/* Subtle Location Sub-line Directly On Landscape */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-[#FAF7F2]/90 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
        >
          <MapPin className="w-4 h-4 text-[#DFBE76]" />
          <span>{t.exclusiveCorridors}</span>
        </motion.div>
      </div>

      {/* Verified Metrics Ribbon & Scroll Down Prompt - Seamless Frosted Dock */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 border-t border-white/10 bg-gradient-to-t from-black/85 via-black/60 to-transparent backdrop-blur-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x divide-white/10">
            <div className="px-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFBE76] block tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {metrics.acresValue}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/80 font-medium block mt-0.5 drop-shadow">
                {metrics.acresDeveloped}
              </span>
            </div>

            <div className="px-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFBE76] block tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {metrics.plotsValue}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/80 font-medium block mt-0.5 drop-shadow">
                {metrics.plotsDelivered}
              </span>
            </div>

            <div className="px-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFBE76] block tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {metrics.legalValue}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/80 font-medium block mt-0.5 drop-shadow">
                {metrics.legalClearance}
              </span>
            </div>

            <div className="px-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFBE76] block tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {metrics.familiesValue}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/80 font-medium block mt-0.5 drop-shadow">
                {metrics.happyFamilies}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-2">
          <button
            onClick={onExploreProjects}
            className="text-[10px] text-[#DFBE76]/80 hover:text-[#DFBE76] uppercase tracking-widest inline-flex items-center gap-1 transition-colors cursor-pointer drop-shadow"
          >
            <span>{t.scrollDown}</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

