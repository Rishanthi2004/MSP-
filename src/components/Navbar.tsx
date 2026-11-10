import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Shield, Menu, X, Phone, Calendar, Globe, Lock } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenBookVisit: (preselectedProject?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenBookVisit,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setScrolled(true);
        // Scrolling down -> hide navbar (unless mobile menu is open)
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          if (!mobileMenuOpen) {
            setVisible(false);
          }
        }
        // Scrolling up -> show navbar
        else if (lastScrollY - currentScrollY > 6) {
          setVisible(true);
        }
      } else {
        setScrolled(false);
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'projects', label: t.projects },
    { id: 'about', label: t.about },
    { id: 'gallery', label: t.gallery },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    setVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? 'bg-[#2A050A]/95 backdrop-blur-md shadow-xl border-b border-[#D4AF37]/20 py-3'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Left group (Mobile hamburger menu + Brand wordmark) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Menu Hamburger - Positioned on the left for mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-1 text-[#FAF7F2] hover:text-[#DFBE76] transition-colors focus:outline-none cursor-pointer rounded"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#DFBE76]" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Wordmark */}
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#DFBE76] via-[#C5A059] to-[#8C6D23] flex items-center justify-center shadow-lg shadow-black/40 border border-[#FAF7F2]/30 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-display font-extrabold text-[#2A050A] text-lg sm:text-xl tracking-tighter">
                    M
                  </span>
                </div>
                <div>
                  <span className="font-display text-lg sm:text-2xl font-bold tracking-wider text-[#FAF7F2] block leading-none">
                    MSP
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#DFBE76] uppercase font-sans font-medium block mt-0.5">
                    PROPERTIES
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Clean 5-link Nav (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm tracking-wider uppercase font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 relative py-1 ${
                      isActive
                        ? 'text-[#DFBE76] font-semibold'
                        : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DFBE76] to-transparent" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Language Toggle, Primary Action & Admin */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded border border-[#DFBE76]/40 bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/15 text-[#DFBE76] transition-colors cursor-pointer"
                title="Switch Language / மொழியை மாற்றுக"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
              </button>

              {/* Primary Action Button: Book a Site Visit */}
              <button
                onClick={() => onOpenBookVisit()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-sm bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#2A050A] shadow-lg shadow-[#DFBE76]/20 hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.bookVisit}</span>
              </button>

              {/* Admin Portal Quick Icon */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`p-2 rounded border transition-colors cursor-pointer ${
                  currentTab === 'admin'
                    ? 'border-[#DFBE76] text-[#DFBE76] bg-[#DFBE76]/10'
                    : 'border-white/10 text-[#FAF7F2]/60 hover:text-[#DFBE76] hover:border-[#DFBE76]/30'
                }`}
                title={t.admin}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Left Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dimmed backdrop - click to dismiss */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Left-hand sliding drawer menu bar */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#1E0407] border-r border-[#DFBE76]/30 shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header with Close & Brand */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#DFBE76] to-[#8C6D23] flex items-center justify-center shadow">
                    <span className="font-display font-extrabold text-[#2A050A] text-sm">M</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-lg text-[#FAF7F2] block leading-none">
                      MSP
                    </span>
                    <span className="text-[8px] tracking-[0.2em] text-[#DFBE76] uppercase font-sans block mt-0.5">
                      PROPERTIES
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#FAF7F2]/70 hover:text-[#DFBE76] rounded cursor-pointer transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (Left aligned list) */}
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between text-left px-3.5 py-3 rounded transition-all cursor-pointer font-serif text-lg tracking-wide ${
                        isActive
                          ? 'text-[#DFBE76] bg-[#DFBE76]/15 font-bold border-l-3 border-[#DFBE76]'
                          : 'text-[#FAF7F2]/85 hover:text-[#DFBE76] hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE76]" />}
                    </button>
                  );
                })}

                <button
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-2.5 text-left px-3.5 py-3 rounded transition-all cursor-pointer font-serif text-base mt-2 ${
                    currentTab === 'admin'
                      ? 'text-[#DFBE76] bg-[#DFBE76]/15 font-bold border-l-3 border-[#DFBE76]'
                      : 'text-[#FAF7F2]/65 hover:text-[#DFBE76] hover:bg-white/5'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{t.admin}</span>
                </button>
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookVisit();
                }}
                className="w-full py-3.5 text-center text-xs font-bold tracking-wider uppercase rounded-sm bg-gradient-to-r from-[#DFBE76] to-[#C5A059] text-[#2A050A] shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookVisit}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#FAF7F2]/70 pt-2 px-1">
                <span>MSP VIP Concierge</span>
                <a href="tel:+919842200000" className="text-[#DFBE76] font-medium flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  +91 98422 00000
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
