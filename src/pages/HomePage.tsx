import React from 'react';
import { Project, Language, Plot } from '../types';
import { Hero } from '../components/Hero';
import { HorizontalScrollShowcase } from '../components/HorizontalScrollShowcase';
import { MasterPlanInteractive } from '../components/MasterPlanInteractive';
import { FeaturesStandard } from '../components/FeaturesStandard';
import { MovingRibbonGallery } from '../components/MovingRibbonGallery';
import { VipConciergeBanner } from '../components/VipConciergeBanner';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomePageProps {
  projects: Project[];
  lang: Language;
  onExploreProjects: () => void;
  onSelectProject: (project: Project) => void;
  onOpenBookVisit: (preselectedProjectId?: string) => void;
  onSelectPlotForBooking: (plot: Plot, project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  lang,
  onExploreProjects,
  onSelectProject,
  onOpenBookVisit,
  onSelectPlotForBooking,
}) => {
  const flagshipProject = projects[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Cinematic Parallax Hero */}
      <Hero
        lang={lang}
        onExploreProjects={onExploreProjects}
        onOpenBookVisit={() => onOpenBookVisit()}
      />

      {/* 2. Horizontal Scrolling 3D Projects Showcase (Reveals on Scroll) */}
      <ScrollReveal direction="up" amount={0.12}>
        <HorizontalScrollShowcase
          projects={projects}
          lang={lang}
          onSelectProject={onSelectProject}
          onBookVisit={(id) => onOpenBookVisit(id)}
        />
      </ScrollReveal>

      {/* 3. Interactive Master Layout Highlight (Zooms into View on Scroll) */}
      {flagshipProject && (
        <ScrollReveal direction="zoom" amount={0.12}>
          <section className="py-16 bg-[#FAF7F2] text-[#1E1919] relative border-y border-[#DFBE76]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                  INTERACTIVE DEMARCATION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A050A]">
                  Explore Available Villa Plots
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2">
                  Click any plot cell on our flagship enclave to view exact square footage, facing, Vaastu alignment, and indicative valuation.
                </p>
              </div>

              <MasterPlanInteractive
                plots={flagshipProject.plots}
                projectName={lang === 'ta' ? flagshipProject.nameTa : flagshipProject.name}
                lang={lang}
                onSelectPlotForBooking={(plot) => onSelectPlotForBooking(plot, flagshipProject)}
              />
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* 4. The MSP Signature Standard (Slides into View on Scroll) */}
      <ScrollReveal direction="up" amount={0.12}>
        <FeaturesStandard
          lang={lang}
          onBookVisit={() => onOpenBookVisit()}
        />
      </ScrollReveal>

      {/* 5. Continuous Moving Dual Image Ribbons */}
      <ScrollReveal direction="up" amount={0.12}>
        <MovingRibbonGallery lang={lang} />
      </ScrollReveal>

      {/* 6. VIP Concierge Site Visit Invitation Banner */}
      <ScrollReveal direction="zoom" amount={0.15}>
        <VipConciergeBanner
          lang={lang}
          onBookVisit={() => onOpenBookVisit()}
        />
      </ScrollReveal>
    </div>
  );
};
