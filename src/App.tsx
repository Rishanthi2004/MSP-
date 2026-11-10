/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Project, Enquiry, GalleryItem, Language, Plot } from './types';
import { initialProjects, initialEnquiries, initialGallery } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { BookSiteVisitModal } from './components/BookSiteVisitModal';
import { BrochureModal } from './components/BrochureModal';
import { PageTransition } from './components/PageTransition';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(initialProjects[0]);

  // Language State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('msp_lang');
    return saved === 'ta' ? 'ta' : 'en';
  });

  // Projects State with LocalStorage Persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('msp_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProjects;
      }
    }
    return initialProjects;
  });

  // Enquiries State with LocalStorage Persistence
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('msp_enquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialEnquiries;
      }
    }
    return initialEnquiries;
  });

  // Gallery Items State with LocalStorage Persistence
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('msp_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialGallery;
      }
    }
    return initialGallery;
  });

  // Modals State
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [preselectedProjectId, setPreselectedProjectId] = useState<string | undefined>();
  const [preselectedPlot, setPreselectedPlot] = useState<Plot | null>(null);

  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochureProject, setBrochureProject] = useState<Project | null>(null);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('msp_lang', lang);
  }, [lang]);

  // Handlers
  const handleOpenBookVisit = (projId?: string) => {
    setPreselectedProjectId(projId);
    setPreselectedPlot(null);
    setIsBookVisitOpen(true);
  };

  const handleSelectPlotForBooking = (plot: Plot, project: Project) => {
    setPreselectedProjectId(project.id);
    setPreselectedPlot(plot);
    setIsBookVisitOpen(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentTab('project-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBrochure = (project: Project) => {
    setBrochureProject(project);
    setIsBrochureOpen(true);
  };

  const handleNewEnquiryAdded = (newEnq: Enquiry) => {
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem('msp_enquiries', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1919]">
      {/* 1. Global Luxury Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        setLang={setLang}
        onOpenBookVisit={() => handleOpenBookVisit()}
      />

      {/* 2. Main Page Render Area with Animated Transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <PageTransition key="home" pageKey="home" variant="cinematic">
              <HomePage
                projects={projects}
                lang={lang}
                onExploreProjects={() => {
                  setCurrentTab('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectProject={handleSelectProject}
                onOpenBookVisit={handleOpenBookVisit}
                onSelectPlotForBooking={handleSelectPlotForBooking}
              />
            </PageTransition>
          )}

          {currentTab === 'projects' && (
            <PageTransition key="projects" pageKey="projects" variant="slide3D">
              <ProjectsPage
                projects={projects}
                lang={lang}
                onSelectProject={handleSelectProject}
                onBookVisit={handleOpenBookVisit}
              />
            </PageTransition>
          )}

          {currentTab === 'project-details' && selectedProject && (
            <PageTransition key={`details-${selectedProject.id}`} pageKey={`details-${selectedProject.id}`} variant="fadeScale">
              <ProjectDetailsPage
                project={selectedProject}
                lang={lang}
                onBack={() => {
                  setCurrentTab('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenBookVisit={handleOpenBookVisit}
                onOpenBrochure={handleOpenBrochure}
                onSelectPlotForBooking={handleSelectPlotForBooking}
              />
            </PageTransition>
          )}

          {currentTab === 'about' && (
            <PageTransition key="about" pageKey="about" variant="curtain">
              <AboutPage
                lang={lang}
                onBookVisit={() => handleOpenBookVisit()}
                onExploreProjects={() => {
                  setCurrentTab('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </PageTransition>
          )}

          {currentTab === 'gallery' && (
            <PageTransition key="gallery" pageKey="gallery" variant="slide3D">
              <GalleryPage
                galleryItems={galleryItems}
                lang={lang}
              />
            </PageTransition>
          )}

          {currentTab === 'contact' && (
            <PageTransition key="contact" pageKey="contact" variant="fadeScale">
              <ContactPage
                projects={projects}
                lang={lang}
                onNewEnquiryAdded={handleNewEnquiryAdded}
              />
            </PageTransition>
          )}

          {currentTab === 'admin' && (
            <PageTransition key="admin" pageKey="admin" variant="cinematic">
              <AdminPage
                projects={projects}
                setProjects={setProjects}
                enquiries={enquiries}
                setEnquiries={setEnquiries}
                galleryItems={galleryItems}
                setGalleryItems={setGalleryItems}
                lang={lang}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Luxury Footer */}
      <Footer
        lang={lang}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBookVisit={() => handleOpenBookVisit()}
      />

      {/* 4. Global Modals */}
      <BookSiteVisitModal
        isOpen={isBookVisitOpen}
        onClose={() => setIsBookVisitOpen(false)}
        projects={projects}
        preselectedProjectId={preselectedProjectId}
        preselectedPlot={preselectedPlot}
        lang={lang}
        onNewEnquiryAdded={handleNewEnquiryAdded}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        project={brochureProject}
        lang={lang}
      />
    </div>
  );
}
