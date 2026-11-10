import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutPageProps {
  lang: Language;
  onBookVisit: () => void;
  onExploreProjects: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onBookVisit,
  onExploreProjects,
}) => {
  const t = translations[lang].about;
  const metrics = translations[lang].metrics;

  const milestones = [
    { year: "2015", title: "Genesis in Coimbatore", desc: "Founded with the clear mandate that no plot is marketed without completed underground cabling and verified 30-year parent deeds." },
    { year: "2018", title: "Avinashi Corridor Expansion", desc: "Delivered 'The Grove' spanning 35 acres with 100% patta transfer to over 240 NRI and local business families." },
    { year: "2021", title: "Nilgiris Hill Sanctuaries", desc: "Secured HACA and environmental clearances to introduce luxury tea garden villa plots in Kotagiri." },
    { year: "2024", title: "The Reserve Launch", desc: "Unveiled our 42-acre flagship lakefront enclave with Olympic-grade infrastructure and automated RFID entrance gates." },
    { year: "2026", title: "Generational Leadership", desc: "Surpassed 280+ acres of master-planned developments and 1,850+ satisfied patta holders across South India." },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1E1919] min-h-screen pt-24 pb-20">
      {/* 1. Brand Story Hero Banner */}
      <div className="bg-[#2A050A] text-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#DFBE76]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D0B12] via-[#2A050A] to-[#1C0508]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#DFBE76] uppercase block mb-2">
              {t.kicker}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7F2] max-w-4xl mx-auto leading-tight">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              Crafting enduring family legacies through meticulously planned residential sanctuaries and unassailable legal integrity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Brand Narrative & Visual Split (Scroll-revealed) */}
      <ScrollReveal direction="up" amount={0.12}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Narrative Col */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block">
                OUR FOUNDATIONAL PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A050A] leading-snug">
                Land is Not Merely Real Estate—It is the Bedrock of Family Dynasty.
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {t.p1}
              </p>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {t.p2}
              </p>

              {/* Signature Quote */}
              <div className="p-5 rounded-xl bg-[#FAF0E6] border-l-4 border-[#8C6D23] text-stone-800 text-xs italic shadow-sm">
                "We believe true luxury is certainty. A plot where you never have to worry about encumbrance, where roads never flood, and where your children can build their dream home thirty years from today."
                <div className="not-italic font-semibold text-stone-900 mt-2 font-serif text-sm">
                  — Managing Directorate, MSP Properties
                </div>
              </div>
            </div>

            {/* Large Photographic Showcase with 3D Tilt */}
            <div className="lg:col-span-6 space-y-4">
              <Tilt3DCard maxTilt={5}>
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xl group">
                  <img
                    src="/src/assets/images/hero_luxury_residential_estate_1794290580559.jpg"
                    alt="MSP Properties Plotted Community"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#DFBE76] font-semibold">
                      Aerial Drone Inspection · Coimbatore West
                    </span>
                    <span className="text-xs text-stone-300 mt-0.5">
                      Over 40 acres of completed infrastructure before resident handover
                    </span>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Verified Statistics Strip with Dynamic Replay on Scroll */}
      <ScrollReveal direction="zoom" amount={0.12}>
        <div className="bg-[#1C0508] text-[#FAF7F2] py-16 border-y border-[#DFBE76]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-white/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#DFBE76] block tabular-nums">
                  {metrics.acresValue}
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-300 font-medium block mt-2">
                  {metrics.acresDeveloped}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#DFBE76] block tabular-nums">
                  {metrics.plotsValue}
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-300 font-medium block mt-2">
                  {metrics.plotsDelivered}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="font-serif text-4xl sm:text-5xl font-bold text-emerald-400 block tabular-nums">
                  {metrics.legalValue}
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-300 font-medium block mt-2">
                  {metrics.legalClearance}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#DFBE76] block tabular-nums">
                  {metrics.familiesValue}
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-300 font-medium block mt-2">
                  {metrics.happyFamilies}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Vision & Mission Cards with Floating Hover */}
      <ScrollReveal direction="up" amount={0.12}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              whileHover={{ y: -6, borderColor: '#DFBE76' }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-stone-200 shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C6D23] mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2A050A]">
                {t.visionTitle}
              </h3>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {t.visionDesc}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              whileHover={{ y: -6, borderColor: '#DFBE76' }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-stone-200 shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C6D23] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2A050A]">
                {t.missionTitle}
              </h3>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {t.missionDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Why Choose MSP Real Estate */}
      <ScrollReveal direction="up" amount={0.12}>
        <div className="bg-[#FAF0E6] py-20 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                THE CONNOISSEUR'S ADVANTAGE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A050A]">
                {t.whyTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.whyPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 6. Milestone Timeline with Alternating Left/Right Motion */}
      <ScrollReveal direction="up" amount={0.12}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
              OUR JOURNEY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A050A]">
              A Decade of Precision Development
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-stone-300">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center md:justify-between gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Year Badge at Center */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#2A050A] text-[#DFBE76] font-mono font-bold text-xs flex items-center justify-center border-2 border-[#DFBE76] z-10 shadow-lg">
                    {m.year.slice(2)}'
                  </div>

                  {/* Content Box */}
                  <div className="ml-14 md:ml-0 md:w-[44%] p-6 rounded-xl bg-white border border-stone-200 shadow-md hover:border-[#DFBE76] transition-colors">
                    <span className="text-xs font-bold font-mono text-[#8C6D23] block">{m.year}</span>
                    <h4 className="font-serif text-lg font-bold text-[#2A050A] mt-0.5">{m.title}</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookVisit}
              className="px-8 py-3.5 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] font-bold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer"
            >
              Meet Our Senior Advisory Team
            </motion.button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
