import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onOpenBookVisit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenBookVisit,
}) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer className="bg-[#140205] text-[#FAF7F2] border-t border-[#DFBE76]/25 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Lockup & Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#DFBE76] via-[#C5A059] to-[#8C6D23] flex items-center justify-center text-[#2A050A] font-display font-extrabold text-xl shadow-lg border border-white/20">
                M
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-wider text-[#FAF7F2] block leading-none">
                  MSP
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#DFBE76] uppercase font-sans font-medium block mt-0.5">
                  PROPERTIES
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Curators of ultra-luxury plotted developments and generational sanctuaries across Coimbatore, Nilgiris, and Western Tamil Nadu. Built on 100% legal title integrity and sublime natural environments.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-[#DFBE76]" />
              <span>100% DTCP & TN RERA Certified Enclaves</span>
            </div>
          </div>

          {/* Col 3: Enclave Portfolio */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#DFBE76] tracking-wider uppercase mb-4 text-xs">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer text-left"
                >
                  The Reserve — Coimbatore Foothills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer text-left"
                >
                  The Grove — Avinashi Highway
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer text-left"
                >
                  Serene Valley — Nilgiri Hills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer text-left"
                >
                  Serenity Shores — Lakefront Promenade
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#DFBE76] tracking-wider uppercase mb-4 text-xs">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer"
                >
                  {nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer"
                >
                  {nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#DFBE76] transition-colors cursor-pointer"
                >
                  {nav.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookVisit}
                  className="text-[#DFBE76] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{nav.bookVisit}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Desk */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#DFBE76] tracking-wider uppercase mb-4 text-xs">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFBE76] shrink-0 mt-0.5" />
                <span className="leading-snug">MSP Towers, Avinashi Road, Peelamedu, Coimbatore 641004</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFBE76] shrink-0" />
                <a href="tel:+919842200000" className="hover:text-[#DFBE76] transition-colors font-medium">
                  +91 98422 00000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFBE76] shrink-0" />
                <span className="text-stone-300">concierge@mspproperties.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-[11px] leading-relaxed">
          <p className="max-w-2xl text-justify md:text-left">
            {t.disclaimer}
          </p>
          <div className="text-center md:text-right shrink-0">
            <p>© {new Date().getFullYear()} {t.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
