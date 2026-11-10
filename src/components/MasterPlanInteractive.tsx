import React, { useState } from 'react';
import { Plot, Language } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, Lock, Sparkles, Compass, Eye } from 'lucide-react';

interface MasterPlanInteractiveProps {
  plots: Plot[];
  projectName: string;
  lang: Language;
  onSelectPlotForBooking: (plot: Plot) => void;
}

export const MasterPlanInteractive: React.FC<MasterPlanInteractiveProps> = ({
  plots,
  projectName,
  lang,
  onSelectPlotForBooking,
}) => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(plots[0] || null);
  const [filterFacing, setFilterFacing] = useState<string>('ALL');
  const t = translations[lang].projects;

  const filteredPlots = plots.filter((p) => {
    if (filterFacing === 'ALL') return true;
    return p.facing === filterFacing;
  });

  const getStatusColor = (status: Plot['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-white border-emerald-400 text-emerald-950 hover:border-emerald-600 hover:bg-emerald-50 shadow-sm';
      case 'Reserved':
        return 'bg-amber-50 border-amber-300 text-amber-950 hover:border-amber-500 hover:bg-amber-100/70 shadow-sm';
      case 'Sold':
        return 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed';
      default:
        return 'bg-stone-50 border-stone-200 text-stone-400';
    }
  };

  const getStatusBadge = (status: Plot['status']) => {
    switch (status) {
      case 'Available':
        return <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold text-[11px] tracking-wider uppercase">● Available</span>;
      case 'Reserved':
        return <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-semibold text-[11px] tracking-wider uppercase">◐ Reserved</span>;
      case 'Sold':
        return <span className="text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded font-medium text-[11px] tracking-wider uppercase">✕ Registered</span>;
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-6 md:p-8 text-[#1E1919] shadow-xl relative overflow-hidden">
      {/* Subtle luxury background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFBE76]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-stone-200 relative z-10">
        <div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C6D23] uppercase block">
            {t.masterLayout}
          </span>
          <h3 className="text-lg sm:text-2xl font-serif text-[#2A050A] mt-0.5 font-bold">
            {projectName} — Master Demarcation Grid
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.selectPlot}
          </p>
        </div>

        {/* Facing orientation filters */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 overflow-x-auto no-scrollbar self-start sm:self-auto shrink-0">
          <span className="text-[11px] sm:text-xs text-stone-600 px-1.5 flex items-center gap-1 font-medium whitespace-nowrap">
            <Compass className="w-3 h-3 text-[#8C6D23]" />
            {t.facing}:
          </span>
          {['ALL', 'East', 'North', 'West'].map((facing) => (
            <button
              key={facing}
              onClick={() => setFilterFacing(facing)}
              className={`px-2.5 py-1 text-[11px] sm:text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                filterFacing === facing
                  ? 'bg-[#2A050A] text-[#DFBE76] font-bold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {facing}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 pt-4 sm:pt-6 relative z-10">
        {/* Layout Visualizer */}
        <div className="lg:col-span-2 bg-[#FAF7F2] p-3 sm:p-5 rounded-xl border border-stone-200">
          {/* Avenue Indicators */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8C6D23] mb-2.5 px-1 uppercase tracking-wider border-b border-stone-200 pb-1.5">
            <span>← North Boulevard (40ft)</span>
            <span>Grand Entrance Arch →</span>
          </div>

          {/* Interactive Plot Cells - 3 columns on mobile for perfect compact fit */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2.5">
            {filteredPlots.map((plot) => {
              const isSelected = selectedPlot?.id === plot.id;
              return (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`p-2 sm:p-2.5 rounded border text-left transition-all duration-200 relative group cursor-pointer ${getStatusColor(
                    plot.status
                  )} ${
                    isSelected
                      ? 'ring-2 ring-[#DFBE76] shadow-md shadow-[#DFBE76]/20 scale-102 z-20'
                      : 'hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono text-xs font-bold tracking-tight">
                      {plot.plotNo}
                    </span>
                    <span className="text-[9px] uppercase font-semibold opacity-75">
                      {plot.facing.charAt(0)}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">
                    {plot.cents} Cts
                  </div>
                  <div className="text-[9px] opacity-70 tabular-nums truncate hidden sm:block">
                    {plot.sizeSqft.toLocaleString()} sq.ft
                  </div>

                  {/* Status indicator dot/text */}
                  <div className="mt-1 pt-1 border-t border-black/5 flex items-center justify-between text-[9px] sm:text-[10px]">
                    <span className={`font-semibold truncate ${
                      plot.status === 'Available'
                        ? 'text-emerald-700'
                        : plot.status === 'Reserved'
                        ? 'text-amber-700'
                        : 'text-stone-400'
                    }`}>
                      {plot.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Avenue Legend & Roadway Representation */}
          <div className="mt-3 pt-2.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Available ({plots.filter((p) => p.status === 'Available').length})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Reserved ({plots.filter((p) => p.status === 'Reserved').length})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                Sold ({plots.filter((p) => p.status === 'Sold').length})
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#8C6D23] font-medium hidden sm:inline">
              All Plots 100% Vaastu Verified
            </span>
          </div>
        </div>

        {/* Selected Plot Detail Card - Simple & Clear for Mobile */}
        {selectedPlot ? (
          <div className="bg-[#FAF7F2] border border-[#DFBE76]/60 rounded-xl p-3.5 sm:p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8C6D23] font-bold">
                  {t.plotDetails}
                </span>
                {getStatusBadge(selectedPlot.status)}
              </div>

              <div className="mt-3">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#2A050A]">
                  Plot {selectedPlot.plotNo}
                </div>
                <div className="text-xs font-semibold text-[#8C6D23] mt-0.5">
                  {selectedPlot.cents} Cents ({selectedPlot.sizeSqft.toLocaleString()} Sq.Ft) • {selectedPlot.facing} Facing
                </div>
              </div>

              {/* Specs Summary */}
              <div className="mt-3 space-y-1.5 sm:space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Land Extent</span>
                  <span className="font-semibold text-stone-900">{selectedPlot.cents} Cents ({selectedPlot.sizeSqft.toLocaleString()} Sq.Ft)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Vaastu Facing</span>
                  <span className="font-semibold text-[#8C6D23]">{selectedPlot.facing} Facing</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Patta Status</span>
                  <span className="text-emerald-700 font-semibold">Ready for Transfer</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Pricing</span>
                  <span className="font-semibold text-[#8C6D23]">
                    {lang === 'ta' ? 'விலை கோரிக்கையின் பேரில்' : 'Price on Request'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col gap-2">
              {selectedPlot.status === 'Available' ? (
                <button
                  onClick={() => onSelectPlotForBooking(selectedPlot)}
                  className="w-full py-2.5 sm:py-3 px-4 rounded bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#1E0407] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Plot {selectedPlot.plotNo}</span>
                </button>
              ) : selectedPlot.status === 'Reserved' ? (
                <button
                  onClick={() => onSelectPlotForBooking(selectedPlot)}
                  className="w-full py-2.5 sm:py-3 px-4 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs uppercase tracking-wider hover:bg-amber-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Waitlist for {selectedPlot.plotNo}</span>
                </button>
              ) : (
                <div className="text-center py-2 text-xs text-stone-500 bg-stone-100 rounded border border-stone-200">
                  This plot is registered and deeds handed over.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-xs text-stone-500 border border-dashed border-stone-300 rounded-lg p-6">
            Tap any plot number from the layout grid to inspect availability.
          </div>
        )}
      </div>
    </div>
  );
};
