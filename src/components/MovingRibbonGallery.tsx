import React from 'react';
import { Language } from '../types';
import { initialGallery } from '../data/projectsData';

interface MovingRibbonGalleryProps {
  lang: Language;
  onSelectImage?: (imgUrl: string) => void;
}

export const MovingRibbonGallery: React.FC<MovingRibbonGalleryProps> = ({
  lang,
  onSelectImage,
}) => {
  // Repeating list for seamless marquee scroll
  const items = [...initialGallery, ...initialGallery];

  return (
    <section className="py-16 bg-[#FAF7F2] text-[#1E1919] overflow-hidden relative border-t border-[#DFBE76]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block">
          ARCHITECTURAL VISION
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A050A] mt-1">
          Crafted Landscapes & Living Vistas
        </h2>
      </div>

      {/* Row 1: Leftwards Marquee */}
      <div className="flex overflow-hidden py-3">
        <div className="animate-marquee flex gap-6">
          {items.map((item, idx) => (
            <div
              key={`r1-${idx}`}
              onClick={() => onSelectImage?.(item.image)}
              className="w-72 sm:w-96 h-56 rounded-xl overflow-hidden relative border border-[#DFBE76]/30 shrink-0 group cursor-pointer shadow-lg hover:border-[#DFBE76] transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold text-[#DFBE76] tracking-widest">
                  {item.category}
                </span>
                <span className="font-serif text-base text-white font-medium truncate">
                  {lang === 'ta' ? item.titleTa : item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightwards Reverse Marquee */}
      <div className="flex overflow-hidden py-3">
        <div
          className="animate-marquee flex gap-6"
          style={{ animationDirection: 'reverse', animationDuration: '20s' }}
        >
          {items.reverse().map((item, idx) => (
            <div
              key={`r2-${idx}`}
              onClick={() => onSelectImage?.(item.image)}
              className="w-72 sm:w-96 h-56 rounded-xl overflow-hidden relative border border-[#DFBE76]/30 shrink-0 group cursor-pointer shadow-lg hover:border-[#DFBE76] transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold text-[#DFBE76] tracking-widest">
                  {item.category}
                </span>
                <span className="font-serif text-base text-white font-medium truncate">
                  {lang === 'ta' ? item.titleTa : item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
