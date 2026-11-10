import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Zap, Trees, Landmark, ArrowRight, Award, CheckCircle } from 'lucide-react';

interface FeaturesStandardProps {
  lang: Language;
  onBookVisit: () => void;
}

export const FeaturesStandard: React.FC<FeaturesStandardProps> = ({
  lang,
  onBookVisit,
}) => {
  const t = translations[lang].features;
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: t.feat1Title,
      shortTitle: lang === 'ta' ? '40 அடி சாலைகள்' : 'Avenues & Roads',
      desc: t.feat1Desc,
      icon: Trees,
      tag: "Civil Craftsmanship",
      highlights: ["40ft & 30ft Blacktop Roads", "Granite Curbs & Stormwater Channels", "Pedestrian Walkways"],
      image: "/src/assets/images/project_royal_palms_enclave_1794290582186.jpg",
    },
    {
      title: t.feat2Title,
      shortTitle: lang === 'ta' ? 'நிலத்தடி வசதிகள்' : 'Underground Grid',
      desc: t.feat2Desc,
      icon: Zap,
      tag: "Future-Proof Grid",
      highlights: ["Zero Overhead Ugly Cables", "Concealed High-Tension Ring Main", "Pre-Installed Fiber Ducts"],
      image: "/src/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    },
    {
      title: t.feat3Title,
      shortTitle: lang === 'ta' ? 'தூய ஆவணங்கள்' : '100% Clear Titles',
      desc: t.feat3Desc,
      icon: ShieldCheck,
      tag: "Zero Legal Risk",
      highlights: ["30-Year Bar Council Scrutiny", "RERA & DTCP Statutory Sanctions", "Immediate Individual Patta Transfer"],
      image: "/src/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
    },
    {
      title: t.feat4Title,
      shortTitle: lang === 'ta' ? 'கிளப்ஹவுஸ் & பூங்கா' : 'Clubhouse & Parks',
      desc: t.feat4Desc,
      icon: Landmark,
      tag: "Lifestyle & Leisure",
      highlights: ["Members Clubhouse & Verandah", "Freshwater Lake Promenade", "Zen Reflexology Gardens"],
      image: "/src/assets/images/project_emerald_waters_lake_1794290583005.jpg",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2] text-[#1E1919] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1.5">
            {t.kicker}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A050A]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 1. MOBILE VIEW (block lg:hidden): Simple, Clean, Single Unified Card */}
        <div className="block lg:hidden space-y-3.5">
          {/* 4 Segmented Tab Selectors (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#2A050A] text-[#DFBE76] border-[#DFBE76] shadow-md'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-[#DFBE76] text-[#2A050A]' : 'bg-[#FAF0E6] text-[#8C6D23]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold truncate">
                    {pillar.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unified Spotlight Card: Photo & Specs together in one glance */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden">
            {/* Photo Header */}
            <div className="relative h-44 sm:h-52 overflow-hidden">
              <img
                src={pillars[activeTab].image}
                alt={pillars[activeTab].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 rounded bg-[#2A050A]/90 text-[#DFBE76] text-[10px] font-bold uppercase tracking-wider border border-[#DFBE76]/30">
                  {pillars[activeTab].tag}
                </span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="font-serif text-lg font-bold leading-tight">
                  {pillars[activeTab].title}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                {pillars[activeTab].desc}
              </p>

              {/* 3 Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                {pillars[activeTab].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Quality Audited
                </span>
                <button
                  onClick={onBookVisit}
                  className="px-3.5 py-1.5 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 shadow"
                >
                  Inspect On Site
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DESKTOP VIEW (hidden lg:grid): 12-Column Side-by-Side Interactive Experience */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Pillar Selectors (5 cols) */}
          <div className="col-span-5 flex flex-col justify-between space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#2A050A] text-white border-[#DFBE76] shadow-xl scale-[1.01]'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-900'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg shrink-0 ${
                        isActive
                          ? 'bg-[#DFBE76] text-[#2A050A]'
                          : 'bg-[#FAF0E6] text-[#8C6D23]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-widest block mb-0.5 ${
                          isActive ? 'text-[#DFBE76]' : 'text-[#8C6D23]'
                        }`}
                      >
                        {pillar.tag}
                      </span>
                      <h3
                        className={`font-serif text-lg font-bold ${
                          isActive ? 'text-white' : 'text-[#2A050A]'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
                          isActive ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Visual Spotlight & Verified Highlights (7 cols) */}
          <div className="col-span-7 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xl flex-1 min-h-[380px] group">
              <img
                src={pillars[activeTab].image}
                alt={pillars[activeTab].title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0508] via-black/40 to-transparent" />

              {/* Floating Information Panel */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#1C0508]/85 backdrop-blur-md border border-[#DFBE76]/40 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-[#DFBE76] uppercase tracking-wider">
                    SPECIFICATION BREAKDOWN
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Strict Quality Audited
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pillars[activeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-200">
                      <CheckCircle className="w-3.5 h-3.5 text-[#DFBE76] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-xs text-stone-300 max-w-md">
                    {pillars[activeTab].desc}
                  </p>
                  <button
                    onClick={onBookVisit}
                    className="px-4 py-2 rounded bg-[#DFBE76] hover:bg-[#C5A059] text-[#1C0508] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ml-3"
                  >
                    Inspect On Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
