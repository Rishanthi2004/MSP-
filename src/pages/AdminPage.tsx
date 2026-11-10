import React, { useState } from 'react';
import { Project, Enquiry, GalleryItem, Language } from '../types';
import { translations } from '../data/translations';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  Download,
  Search,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Car,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Save,
  X,
} from 'lucide-react';

interface AdminPageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  lang: Language;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  projects,
  setProjects,
  enquiries,
  setEnquiries,
  galleryItems,
  setGalleryItems,
  lang,
}) => {
  const t = translations[lang].admin;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default unlocked for instant testing, with pin reset option
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'enquiries' | 'gallery'>('projects');

  // Edit / Add Project state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNewProject, setIsAddingNewProject] = useState<boolean>(false);

  // Filter state for enquiries
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('ALL');
  const [enquirySearchQuery, setEnquirySearchQuery] = useState<string>('');

  // Add Gallery photo state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('Aerials');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  // Authentication check
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // CSV Export for Enquiries
  const handleExportCsv = () => {
    const headers = ['Enquiry ID', 'Date Created', 'Name', 'Phone', 'Email', 'Project', 'Visit Date', 'Time Slot', 'Chauffeur Needed', 'Status', 'Message'];
    const rows = enquiries.map((e) => [
      e.id,
      e.createdAt,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.projectName.replace(/"/g, '""')}"`,
      e.visitDate,
      `"${e.timeSlot}"`,
      e.pickUpNeeded ? 'Yes' : 'No',
      e.status,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MSP_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = (id: string, newStatus: Enquiry['status']) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    localStorage.setItem('msp_enquiries', JSON.stringify(updated));
  };

  // Delete Enquiry
  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Delete this inquiry record?')) {
      const updated = enquiries.filter((item) => item.id !== id);
      setEnquiries(updated);
      localStorage.setItem('msp_enquiries', JSON.stringify(updated));
    }
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem('msp_projects', JSON.stringify(updated));
    }
  };

  // Save edited or new project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updated: Project[];
    if (isAddingNewProject) {
      updated = [editingProject, ...projects];
    } else {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    setProjects(updated);
    localStorage.setItem('msp_projects', JSON.stringify(updated));
    setEditingProject(null);
    setIsAddingNewProject(false);
  };

  // Add Gallery photo
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImage) return;

    const newItem: GalleryItem = {
      id: `g_${Date.now()}`,
      title: newGalleryTitle,
      titleTa: newGalleryTitle,
      category: newGalleryCategory,
      image: newGalleryImage,
      caption: newGalleryCaption || 'Exclusive perspective of MSP master enclave.',
      captionTa: newGalleryCaption || 'MSP பிரீமியம் வீட்டு மனைத் திட்டத்தின் பிரத்யேகக் காட்சி.',
    };

    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    localStorage.setItem('msp_gallery', JSON.stringify(updated));

    setNewGalleryTitle('');
    setNewGalleryImage('');
    setNewGalleryCaption('');
    setIsAddingPhoto(false);
  };

  // Delete Gallery photo
  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm('Delete this gallery photo?')) {
      const updated = galleryItems.filter((g) => g.id !== id);
      setGalleryItems(updated);
      localStorage.setItem('msp_gallery', JSON.stringify(updated));
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchStatus = enquiryStatusFilter === 'ALL' || enq.status === enquiryStatusFilter;
    const matchSearch =
      enquirySearchQuery === '' ||
      enq.name.toLowerCase().includes(enquirySearchQuery.toLowerCase()) ||
      enq.phone.includes(enquirySearchQuery) ||
      enq.projectName.toLowerCase().includes(enquirySearchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1C0508] text-white flex items-center justify-center p-4 pt-24">
        <div className="max-w-md w-full bg-[#29080E] p-8 rounded-2xl border border-[#DFBE76]/40 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#DFBE76]/10 text-[#DFBE76] flex items-center justify-center mx-auto border border-[#DFBE76]/30">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">
              {t.title}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {t.pinPrompt}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (1234)"
              className="w-full text-center text-2xl tracking-[0.5em] px-4 py-3 rounded-lg bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#DFBE76]"
            />

            {pinError && (
              <p className="text-xs text-red-400">
                Invalid PIN. Enter 1234 for authorized access.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded bg-gradient-to-r from-[#DFBE76] to-[#C5A059] text-[#1E0407] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg"
            >
              {t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1919] pt-24 pb-20">
      {/* Admin Top Banner */}
      <div className="bg-[#2A050A] text-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#DFBE76]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#DFBE76] uppercase">
                Authorized Executive Portal
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#FAF7F2] mt-0.5">
              {t.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-1.5 rounded border border-white/20 text-stone-300 hover:text-white hover:border-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {t.logout}
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto mt-6 flex gap-2 border-t border-white/10 pt-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                : 'bg-white/10 text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.projectsTab} ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                : 'bg-white/10 text-stone-300 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{t.enquiriesTab} ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'bg-[#DFBE76] text-[#2A050A] font-bold shadow-md'
                : 'bg-white/10 text-stone-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t.galleryTab} ({galleryItems.length})</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2A050A]">
                  Enclave Master Portfolio
                </h2>
                <p className="text-xs text-stone-500">
                  Update enclave details, availability counts, titles, and statutory documentation.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: `enclave-${Date.now()}`,
                    slug: `enclave-${Date.now()}`,
                    name: 'New Luxury Sanctuary',
                    nameTa: 'புதிய சொகுசு திட்டம்',
                    tagline: 'Prime Plotted Development',
                    taglineTa: 'பிரீமியம் வீட்டு மனை சமஸ்தானம்',
                    location: 'Coimbatore Airport Corridor',
                    locationTa: 'கோவை விமான நிலைய சாலை',
                    district: 'Coimbatore',
                    districtTa: 'கோயம்புத்தூர்',
                    category: 'Gated Villa Plots',
                    priceStarting: 45.0,
                    pricePerSqft: 2200,
                    plotSizes: '1,500 – 4,000 sq.ft',
                    plotSizesTa: '1,500 முதல் 4,000 சதுர அடி',
                    totalPlots: 36,
                    availablePlots: 36,
                    status: 'Ready for Registration',
                    statusTa: 'பதிவுக்கு தயார்',
                    approvals: ['DTCP Approval Sanctioned 2026', 'TN RERA Registered'],
                    heroImage: '/src/assets/images/hero_luxury_residential_estate_1794290580559.jpg',
                    gallery: [
                      '/src/assets/images/hero_luxury_residential_estate_1794290580559.jpg',
                      '/src/assets/images/gallery_grand_arch_entrance_1794290582969.jpg',
                    ],
                    description: 'A prestigious new master-planned plotted community with 40ft avenues and underground electrical infrastructure.',
                    descriptionTa: '40 அடி தார்ச்சாலைகள் மற்றும் நிலத்தடி மின்சார வசதிகள் கொண்ட புதிய சொகுசு குடியிருப்பு மனைகள்.',
                    amenities: [
                      { icon: 'ShieldCheck', name: '24/7 Security', nameTa: 'பாதுகாப்பு', desc: 'Gated with CCTV', descTa: 'சிசிடிவி கண்காணிப்பு' },
                      { icon: 'Trees', name: 'Landscaped Avenues', nameTa: 'பூங்கா', desc: 'Lush avenue trees', descTa: 'பசுமை மரங்கள்' },
                    ],
                    landmarks: [
                      { name: 'Airport', nameTa: 'விமான நிலையம்', distance: '12 km', time: '15 mins' },
                    ],
                    plots: [
                      { id: 101, plotNo: 'P-01', sizeSqft: 2000, cents: 4.59, facing: 'East', status: 'Available', price: '₹44.0 L' },
                      { id: 102, plotNo: 'P-02', sizeSqft: 2400, cents: 5.51, facing: 'North', status: 'Available', price: '₹52.8 L' },
                    ],
                  });
                  setIsAddingNewProject(true);
                }}
                className="px-4 py-2.5 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addProject}</span>
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-md p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={proj.heroImage}
                      alt={proj.name}
                      className="w-24 h-24 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#8C6D23] tracking-wider block">
                        {proj.category} · {proj.district}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#2A050A] truncate">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-stone-500 truncate">{proj.location}</p>

                      <div className="mt-2 flex items-center gap-3 text-xs">
                        <span className="font-semibold text-stone-600">
                          {proj.plotSizes}
                        </span>
                        <span className="text-stone-300">|</span>
                        <span className="text-emerald-700 font-medium">
                          {proj.availablePlots} of {proj.totalPlots} Left
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Edit Stats & Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-medium">
                      Status: {proj.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsAddingNewProject(false);
                        }}
                        className="p-2 rounded hover:bg-stone-100 text-stone-700 hover:text-black transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES & LEADS MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2A050A]">
                  Customer Enquiries & VIP Site Visits
                </h2>
                <p className="text-xs text-stone-500">
                  Total {enquiries.length} site visits requested by prospective buyers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={enquirySearchQuery}
                    onChange={(e) => setEnquirySearchQuery(e.target.value)}
                    placeholder="Search client or phone..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:border-[#8C6D23]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>

                {/* CSV Export */}
                <button
                  onClick={handleExportCsv}
                  className="px-3.5 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-x-auto shadow-md">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Pass ID / Date</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Phone / Email</th>
                    <th className="py-3 px-4">Preferred Enclave</th>
                    <th className="py-3 px-4">Visit Date & Slot</th>
                    <th className="py-3 px-4">Chauffeur</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#50111A]">
                        {enq.id}
                        <span className="block text-[10px] text-stone-400 font-sans font-normal">
                          {enq.createdAt}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        {enq.name}
                        {enq.message && (
                          <span className="block text-[11px] text-stone-500 font-normal italic max-w-xs truncate">
                            "{enq.message}"
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                          className="font-mono text-stone-900 hover:text-[#8C6D23] font-medium block"
                        >
                          {enq.phone}
                        </a>
                        <span className="text-[10px] text-stone-400">{enq.email}</span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[#2A050A]">
                        {enq.projectName}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold block">{enq.visitDate}</span>
                        <span className="text-[10px] text-stone-500">
                          {enq.timeSlot.includes('Morning') ? 'Morning Slot' : 'Afternoon Slot'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {enq.pickUpNeeded ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                            Required (SUV)
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px]">Self Drive</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(enq.id, e.target.value as any)
                          }
                          className="px-2 py-1 rounded text-xs font-semibold border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEDIA GALLERY ARCHIVE */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2A050A]">
                  Visual Media Archive
                </h2>
                <p className="text-xs text-stone-500">
                  Manage high-resolution property photography, entrance aerials, and video links.
                </p>
              </div>

              <button
                onClick={() => setIsAddingPhoto(true)}
                className="px-4 py-2.5 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            {/* Gallery Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/70 text-[#DFBE76] text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#2A050A] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex justify-end">
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT / ADD PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FAF7F2] text-[#1E1919] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#DFBE76]/40 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-2xl font-bold text-[#2A050A]">
                {isAddingNewProject ? 'Add New Enclave' : `Edit: ${editingProject.name}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-full hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Enclave Name (EN)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Enclave Name (தமிழ்)</label>
                  <input
                    type="text"
                    value={editingProject.nameTa}
                    onChange={(e) => setEditingProject({ ...editingProject, nameTa: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  >
                    <option value="Gated Villa Plots">Gated Villa Plots</option>
                    <option value="Hill Sanctuary">Hill Sanctuary</option>
                    <option value="Lakefront Retreat">Lakefront Retreat</option>
                    <option value="Farm Estates">Farm Estates</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={editingProject.district}
                    onChange={(e) => setEditingProject({ ...editingProject, district: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Starting Price (Lakhs ₹)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingProject.priceStarting}
                    onChange={(e) => setEditingProject({ ...editingProject, priceStarting: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Rate per Sq.Ft (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProject.pricePerSqft}
                    onChange={(e) => setEditingProject({ ...editingProject, pricePerSqft: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Total Plots Count</label>
                  <input
                    type="number"
                    required
                    value={editingProject.totalPlots}
                    onChange={(e) => setEditingProject({ ...editingProject, totalPlots: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Available Plots Left</label>
                  <input
                    type="number"
                    required
                    value={editingProject.availablePlots}
                    onChange={(e) => setEditingProject({ ...editingProject, availablePlots: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Hero Image Path / URL</label>
                <input
                  type="text"
                  value={editingProject.heroImage}
                  onChange={(e) => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded border border-stone-300 text-stone-600 hover:text-black font-semibold uppercase tracking-wider text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD GALLERY PHOTO MODAL */}
      {isAddingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] text-[#1E1919] rounded-2xl max-w-md w-full p-6 border border-[#DFBE76]/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-[#2A050A]">
                Add Photo to Media Archive
              </h3>
              <button
                onClick={() => setIsAddingPhoto(false)}
                className="p-1 rounded-full hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4 text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleAddGalleryItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  placeholder="e.g. 40ft Royal Palm Boulevard"
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                >
                  <option value="Aerials">Aerials</option>
                  <option value="Grand Entrances">Grand Entrances</option>
                  <option value="Landscapes">Landscapes</option>
                  <option value="Avenues & Roads">Avenues & Roads</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  placeholder="/src/assets/images/..."
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={newGalleryCaption}
                  onChange={(e) => setNewGalleryCaption(e.target.value)}
                  placeholder="Short description..."
                  className="w-full px-3 py-2 rounded border border-stone-300 text-sm focus:outline-none focus:border-[#8C6D23]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddingPhoto(false)}
                  className="px-3 py-1.5 rounded border border-stone-300 text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#2A050A] text-[#DFBE76] font-bold text-xs uppercase"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
