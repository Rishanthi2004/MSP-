import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Project, Enquiry, Language } from '../types';
import { translations } from '../data/translations';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Car,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

interface ContactPageProps {
  projects: Project[];
  lang: Language;
  onNewEnquiryAdded: (enquiry: Enquiry) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  projects,
  lang,
  onNewEnquiryAdded,
}) => {
  const t = translations[lang].contact;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (09:30 AM - 12:30 PM)');
  const [pickUpNeeded, setPickUpNeeded] = useState(true);
  const [message, setMessage] = useState('');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number (+91)');
      return;
    }
    if (!visitDate) {
      setError('Please choose your preferred site visit date');
      return;
    }

    const selectedProj = projects.find((p) => p.id === projectId);
    const newEnquiry: Enquiry = {
      id: `MSP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not specified',
      projectId: projectId,
      projectName: selectedProj ? (lang === 'ta' ? selectedProj.nameTa : selectedProj.name) : 'The Reserve by MSP',
      visitDate: visitDate,
      timeSlot: timeSlot,
      pickUpNeeded: pickUpNeeded,
      message: message.trim() || 'Direct Inquiry from Contact Page',
      status: 'Scheduled',
    };

    onNewEnquiryAdded(newEnquiry);
    setSubmittedEnquiry(newEnquiry);
    setError('');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#DFBE76', '#50111A', '#FAF7F2'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1919] min-h-screen pt-24 pb-20">
      {/* Editorial Header */}
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
        </div>
      </div>

      {/* Main Content Grid */}
      <ScrollReveal direction="up" amount={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form or Confirmation Pass (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-xl"
            >
              <AnimatePresence mode="wait">
                {submittedEnquiry ? (
                  /* Success Confirmation Pass with 3D Flip */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, rotateY: 45, scale: 0.9 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-6 space-y-6 perspective-1000"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-9 h-9" />
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#8C6D23] font-semibold">
                        VIP Registration Confirmed
                      </span>
                      <h2 className="font-serif text-3xl font-bold text-[#2A050A] mt-1">
                        {t.successTitle}
                      </h2>
                      <p className="text-xs text-stone-600 max-w-md mx-auto mt-2">
                        {t.successMessage}
                      </p>
                    </div>

                    {/* Pass Ticket with Gold Foil Edge */}
                    <div className="p-6 rounded-xl bg-[#FAF0E6] border border-[#DFBE76]/40 text-left max-w-md mx-auto space-y-3 font-sans shadow-md relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBE76] via-[#8C6D23] to-[#DFBE76]" />

                      <div className="flex justify-between items-center pb-2 border-b border-stone-300 text-xs">
                        <span className="font-mono font-bold text-[#50111A]">
                          PASS CODE: {submittedEnquiry.id}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          CONFIRMED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Client Name</span>
                          <span className="font-semibold text-stone-900">{submittedEnquiry.name}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Selected Enclave</span>
                          <span className="font-semibold text-[#50111A]">{submittedEnquiry.projectName}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Inspection Date</span>
                          <span className="font-semibold text-stone-900">{submittedEnquiry.visitDate}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Chauffeur Service</span>
                          <span className="font-semibold text-emerald-700">
                            {submittedEnquiry.pickUpNeeded ? 'Sanitized SUV Dispatched' : 'Self-Drive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={`https://wa.me/919842200000?text=Hello%20MSP%20Properties,%20I%20have%20registered%20pass%20${submittedEnquiry.id}%20for%20a%20site%20visit.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                      >
                        Instant WhatsApp Confirmation
                      </a>
                      <button
                        onClick={() => setSubmittedEnquiry(null)}
                        className="px-6 py-2.5 rounded border border-stone-300 text-stone-700 hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Enquiry Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block mb-1">
                        DIRECT REGISTRATION
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A050A]">
                        Schedule Your Private Inspection
                      </h2>
                    </div>

                    {error && (
                      <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.nameLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Mr. K. Ravindran"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none transition-shadow"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.phoneLabel} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98422 12345"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none transition-shadow"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none transition-shadow"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.projectLabel} *
                        </label>
                        <select
                          value={projectId}
                          onChange={(e) => setProjectId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none cursor-pointer"
                        >
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {lang === 'ta' ? p.nameTa : p.name} ({p.district})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.dateLabel} *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          {t.timeLabel}
                        </label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none cursor-pointer"
                        >
                          <option value="Morning (09:30 AM - 12:30 PM)">{t.timeMorning}</option>
                          <option value="Afternoon (02:00 PM - 05:30 PM)">{t.timeAfternoon}</option>
                        </select>
                      </div>
                    </div>

                    {/* Chauffeur Toggle */}
                    <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#DFBE76]/40 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#8C6D23]/20 flex items-center justify-center text-[#8C6D23] shrink-0">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            {t.pickUpLabel}
                          </div>
                          <div className="text-[11px] text-stone-600">
                            Free luxury chauffeur pick-up from Coimbatore Airport, Railway Station, or Residence.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={pickUpNeeded}
                        onChange={(e) => setPickUpNeeded(e.target.checked)}
                        className="w-5 h-5 accent-[#8C6D23] rounded cursor-pointer shrink-0"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        {t.messageLabel}
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Specify preferred plot facing (East/North) or budget preferences..."
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:border-[#8C6D23] focus:ring-1 focus:ring-[#8C6D23] text-stone-900 text-sm focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        * 100% Free Consultation. No Obligation.
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-8 py-3.5 rounded bg-[#2A050A] hover:bg-[#50111A] text-[#DFBE76] font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t.submitBtn}</span>
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Direct Connect & Office Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Instant Contact Actions with Hover Lift */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#2A050A] text-white rounded-2xl p-8 border border-[#DFBE76]/30 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFBE76] font-semibold">
                  IMMEDIATE CONNECT
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mt-1">
                  Connect Directly with Our Concierge
                </h3>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/919842200000?text=Hello%20MSP%20Properties,%20I%20would%20like%20to%20inquire%20about%20available%20luxury%20plots."
                target="_blank"
                rel="noreferrer"
                className="w-full p-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <div>
                    <span className="block font-bold">{t.whatsappChat}</span>
                    <span className="text-[10px] opacity-80 normal-case">Direct chat with senior advisory desk</span>
                  </div>
                </div>
                <span className="text-xs font-mono">Online</span>
              </motion.a>

              {/* Direct Phone Call Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+919842200000"
                className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#DFBE76]" />
                  <div>
                    <span className="block font-bold">{t.directCall}</span>
                    <span className="text-sm font-mono text-[#DFBE76]">+91 98422 00000</span>
                  </div>
                </div>
                <span className="text-xs text-stone-300">Toll Free</span>
              </motion.a>
            </motion.div>

            {/* Corporate Headquarters */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl space-y-4"
            >
              <span className="text-xs font-bold tracking-[0.25em] text-[#8C6D23] uppercase block">
                HEAD OFFICE & REGISTERED ADDRESS
              </span>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8C6D23] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block text-sm">MSP Towers</span>
                    <span>Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu - 641004</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8C6D23] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Working Hours</span>
                    <span>{t.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#8C6D23] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Electronic Inquiries</span>
                    <span>concierge@mspproperties.com</span>
                  </div>
                </div>
              </div>

              {/* Aesthetic Styled Map Card Preview */}
              <div className="pt-4 border-t border-stone-100">
                <div className="relative h-44 rounded-xl overflow-hidden border border-stone-200 bg-[#FAF0E6] flex flex-col justify-end p-4">
                  <img
                    src="/assets/images/gallery_grand_arch_entrance_1794290582969.jpg"
                    alt="MSP Headquarters Entrance"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10 text-white">
                    <span className="text-[10px] uppercase font-bold text-[#DFBE76] tracking-wider block">
                      VIP Reception Suite
                    </span>
                    <span className="text-xs font-serif font-bold text-white">
                      Coimbatore - Avinashi Express Highway
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
  );
};
