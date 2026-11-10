import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calendar, Phone, Sparkles, Car, ShieldCheck } from 'lucide-react';

interface VipConciergeBannerProps {
  lang: Language;
  onBookVisit: () => void;
}

export const VipConciergeBanner: React.FC<VipConciergeBannerProps> = ({
  lang,
  onBookVisit,
}) => {
  const t = translations[lang].contact;

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#1E1919] relative overflow-hidden border-t border-[#DFBE76]/30">
      {/* Subtle luxury glow circles */}
      <div className="absolute top-1/2 left-[-100px] w-80 h-80 bg-[#DFBE76]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-[-100px] w-80 h-80 bg-[#DFBE76]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#3D0B12] via-[#2A050A] to-[#4A0E17] text-[#FAF7F2] rounded-2xl p-8 sm:p-12 border border-[#DFBE76]/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFBE76]/15 border border-[#DFBE76]/40 text-[#DFBE76] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Site Visit Experience</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF7F2] leading-tight">
              Walk Your Future Legacy in Person.
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Nothing matches feeling the clean mountain breeze, walking on wide blacktop boulevards, and witnessing the fertile terrain firsthand. We dispatch a private luxury chauffeur to pick you up from Coimbatore Airport, Railway Junction, or your residence.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#DFBE76] pt-1">
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-400" />
                Sanitized Luxury SUV Chauffeur
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero Sales Pressure · Dedicated Legal Advisor
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onBookVisit}
              className="px-8 py-4 rounded-sm bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#1E0407] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#DFBE76]/25 flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.submitBtn}</span>
            </button>

            <a
              href="tel:+919842200000"
              className="px-8 py-3.5 rounded-sm border border-white/20 hover:border-[#DFBE76] hover:bg-white/5 text-stone-200 hover:text-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-[#DFBE76]" />
              <span>+91 98422 00000</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
