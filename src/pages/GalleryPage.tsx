import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem, Language } from '../types';
import { translations } from '../data/translations';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  lang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  galleryItems,
  lang,
}) => {
  const t = translations[lang].gallery;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'ALL', label: t.all },
    { id: 'Aerials', label: t.drone },
    { id: 'Grand Entrances', label: t.entrances },
    { id: 'Landscapes', label: t.landscapes },
    { id: 'Avenues & Roads', label: t.roads },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1919] min-h-screen pt-24 pb-20">
      {/* Editorial Header with Motion */}
      <div className="bg-[#2A050A] text-[#FAF7F2] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#DFBE76]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D0B12] via-[#2A050A] to-[#1C0508]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#DFBE76] uppercase block mb-1">
              {t.kicker}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mt-2">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all cursor-pointer relative ${
                  selectedCategory === cat.id
                    ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                    : 'bg-white/10 text-stone-300 hover:text-white hover:bg-white/15'
                }`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="activeGalleryIndicator"
                    className="absolute inset-0 rounded border border-[#DFBE76] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Masonry Photographic Grid with Staggered 3D Motion */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isTall = idx % 3 === 0;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={isTall ? 'md:row-span-2' : ''}
                >
                  <Tilt3DCard
                    maxTilt={6}
                    scale={1.01}
                    className="h-full"
                    onClick={() => setActiveLightboxIndex(idx)}
                  >
                    <div className="h-full bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-end">
                      <div className={`relative w-full ${isTall ? 'h-96 md:h-full' : 'h-72'} overflow-hidden`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />

                        {/* Scrim Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0508]/90 via-[#1C0508]/30 to-transparent flex flex-col justify-end p-6 text-white transition-opacity duration-300">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFBE76] mb-1">
                            {item.category}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                            {lang === 'ta' ? item.titleTa : item.title}
                          </h3>
                          <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                            {lang === 'ta' ? item.captionTa : item.caption}
                          </p>

                          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#DFBE76] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t.viewFullscreen}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinema Fullscreen Lightbox with 3D Slide Effects */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10 relative z-10">
              <div>
                <span className="text-xs font-mono text-[#DFBE76] uppercase tracking-widest">
                  {filteredItems[activeLightboxIndex].category} · {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-semibold mt-0.5">
                  {lang === 'ta'
                    ? filteredItems[activeLightboxIndex].titleTa
                    : filteredItems[activeLightboxIndex].title}
                </h3>
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image Container with Prev/Next Controls and 3D Scale Motion */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={activeLightboxIndex}
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45 }}
                src={filteredItems[activeLightboxIndex].image}
                alt="Fullscreen View"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center text-xs text-stone-300 max-w-2xl mx-auto pt-2 border-t border-white/10">
              {lang === 'ta'
                ? filteredItems[activeLightboxIndex].captionTa
                : filteredItems[activeLightboxIndex].caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
