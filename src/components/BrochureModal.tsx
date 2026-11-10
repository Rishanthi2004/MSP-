import React from 'react';
import { Project, Language } from '../types';
import { X, Download, Printer, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  lang: Language;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  project,
  lang,
}) => {
  if (!isOpen || !project) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#1E1919] rounded-xl shadow-2xl overflow-hidden my-6 border border-[#DFBE76]/40">
        {/* Top Controls Header */}
        <div className="bg-[#2A050A] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#DFBE76]/30">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm tracking-widest text-[#DFBE76]">
              MSP PROPERTIES
            </span>
            <span className="text-white/40 text-xs">/</span>
            <span className="text-xs text-white/80 uppercase tracking-wider">
              Official Executive Brochure
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[#DFBE76] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Content Container (Printable) */}
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Cover Hero Banner */}
          <div className="relative rounded-lg overflow-hidden border border-[#DFBE76]/30 shadow-md">
            <img
              src={project.heroImage}
              alt={project.name}
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A050A] via-[#2A050A]/40 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#DFBE76] font-semibold">
                {project.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
                {lang === 'ta' ? project.nameTa : project.name}
              </h1>
              <p className="text-sm text-stone-200 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#DFBE76]" />
                {lang === 'ta' ? project.locationTa : project.location}, {project.district}
              </p>
            </div>
          </div>

          {/* Key Facts Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[#FAF0E6] border border-[#DFBE76]/40">
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Commercials</span>
              <span className="font-serif text-lg font-bold text-[#50111A]">
                {lang === 'ta' ? 'விலை கோரிக்கையின் பேரில்' : 'Price on Request'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Plot Dimensions</span>
              <span className="font-semibold text-sm text-stone-900 block mt-0.5">
                {lang === 'ta' ? project.plotSizesTa : project.plotSizes}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Total Plots</span>
              <span className="font-semibold text-sm text-stone-900 block mt-0.5">
                {project.totalPlots} Parcels
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Current Status</span>
              <span className="font-semibold text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-0.5">
                {lang === 'ta' ? project.statusTa : project.status}
              </span>
            </div>
          </div>

          {/* Editorial Overview */}
          <div>
            <h3 className="font-serif text-2xl text-[#2A050A] mb-2">Project Philosophy</h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {lang === 'ta' ? project.descriptionTa : project.description}
            </p>
          </div>

          {/* Statutory Approvals & Legal Clearance */}
          <div>
            <h3 className="font-serif text-xl text-[#2A050A] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Statutory Clearances & Clear Title Documentation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.approvals.map((appr, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded bg-white border border-stone-200 text-xs font-medium text-stone-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{appr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Amenities */}
          <div>
            <h3 className="font-serif text-xl text-[#2A050A] mb-3">Community Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.amenities.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded bg-white border border-stone-200">
                  <div className="font-semibold text-sm text-[#50111A]">
                    {lang === 'ta' ? item.nameTa : item.name}
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    {lang === 'ta' ? item.descTa : item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connectivity Matrix */}
          <div>
            <h3 className="font-serif text-xl text-[#2A050A] mb-3">Connectivity Matrix</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.landmarks.map((lm, idx) => (
                <div key={idx} className="p-3 rounded bg-white border border-stone-200 text-center">
                  <div className="text-xs text-stone-500">{lang === 'ta' ? lm.nameTa : lm.name}</div>
                  <div className="font-serif text-lg font-bold text-[#50111A] mt-1">{lm.distance}</div>
                  <div className="text-[11px] text-stone-600 font-medium">{lm.time} drive</div>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Seal & Signoff */}
          <div className="border-t border-stone-300 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <div>
              <span className="font-display font-bold text-[#2A050A]">MSP PROPERTIES PRIVATE LIMITED</span>
              <p className="text-[11px] mt-0.5">Corporate Reg. No: U70102TZ2016PTC027891</p>
            </div>
            <div className="text-right">
              <span className="text-[#50111A] font-medium">Direct Inquiries: +91 98422 00000</span>
              <p className="text-[11px]">inquiries@mspproperties.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
