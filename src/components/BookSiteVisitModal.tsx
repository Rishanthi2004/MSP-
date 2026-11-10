import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Project, Enquiry, Language, Plot } from '../types';
import { translations } from '../data/translations';
import { X, Calendar, Clock, Car, CheckCircle, Phone, Send, Sparkles } from 'lucide-react';

interface BookSiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  preselectedProjectId?: string;
  preselectedPlot?: Plot | null;
  lang: Language;
  onNewEnquiryAdded: (enquiry: Enquiry) => void;
}

export const BookSiteVisitModal: React.FC<BookSiteVisitModalProps> = ({
  isOpen,
  onClose,
  projects,
  preselectedProjectId,
  preselectedPlot,
  lang,
  onNewEnquiryAdded,
}) => {
  const t = translations[lang].contact;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState(preselectedProjectId || projects[0]?.id || '');
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (09:30 AM - 12:30 PM)');
  const [pickUpNeeded, setPickUpNeeded] = useState(true);
  const [message, setMessage] = useState(
    preselectedPlot ? `Inquiry for Plot ${preselectedPlot.plotNo} (${preselectedPlot.cents} Cents - ${preselectedPlot.facing} Facing)` : ''
  );
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

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
      message: message.trim() || (preselectedPlot ? `Interest in Plot ${preselectedPlot.plotNo}` : 'General Site Inspection'),
      status: 'Scheduled',
    };

    onNewEnquiryAdded(newEnquiry);
    setSubmittedEnquiry(newEnquiry);
    setError('');

    // Trigger celebratory gold confetti
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

  const handleClose = () => {
    setSubmittedEnquiry(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1C0508] border border-[#DFBE76]/40 rounded-xl shadow-2xl overflow-hidden my-8 text-[#FAF7F2]">
        {/* Top Gold Foil Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#8C6D23] via-[#DFBE76] to-[#8C6D23]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedEnquiry ? (
          /* Confirmation Pass Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#DFBE76]/20 border border-[#DFBE76] flex items-center justify-center mx-auto text-[#DFBE76]">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#DFBE76] font-semibold">
                VIP Reservation Confirmed
              </span>
              <h2 className="text-3xl font-serif text-[#FAF7F2] mt-1">
                {t.successTitle}
              </h2>
              <p className="text-xs text-[#FAF7F2]/80 max-w-md mx-auto mt-2">
                {t.successMessage}
              </p>
            </div>

            {/* Boarding / Visit Pass */}
            <div className="bg-[#2B080D] border border-[#DFBE76]/30 rounded-lg p-5 text-left space-y-3 font-sans max-w-md mx-auto shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <span className="text-[#DFBE76] font-mono font-bold tracking-wider">
                  VISIT PASS #{submittedEnquiry.id}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                  CONFIRMED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Client Name</span>
                  <span className="font-semibold text-white">{submittedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Enclave</span>
                  <span className="font-semibold text-[#DFBE76]">{submittedEnquiry.projectName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Date & Time</span>
                  <span className="font-semibold text-white">
                    {submittedEnquiry.visitDate} ({submittedEnquiry.timeSlot.includes('Morning') ? 'Morning' : 'Afternoon'})
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Luxury Chauffeur</span>
                  <span className="font-semibold text-emerald-400">
                    {submittedEnquiry.pickUpNeeded ? 'Included (Free Dispatch)' : 'Self-Drive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919842200000?text=Hello%20MSP%20Properties,%20I%20have%20booked%20site%20visit%20pass%20${submittedEnquiry.id}%20for%20${encodeURIComponent(submittedEnquiry.projectName)}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Connect via WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded border border-white/20 hover:border-white/40 text-stone-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="pr-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#DFBE76] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2] mt-1">
                {t.title}
              </h2>
              <p className="text-xs text-[#FAF7F2]/70 mt-1">
                {t.subtitle}
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-950/80 border border-red-500/50 text-red-200 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. K. Sundaram"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm placeholder:text-stone-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.phoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98422 12345"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm placeholder:text-stone-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm placeholder:text-stone-600"
                />
              </div>

              {/* Preferred Project */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.projectLabel} *
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-black/80 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#1C0508] text-white">
                      {lang === 'ta' ? p.nameTa : p.name} ({p.district})
                    </option>
                  ))}
                </select>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.dateLabel} *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {t.timeLabel}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-black/80 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm"
                >
                  <option value="Morning (09:30 AM - 12:30 PM)">{t.timeMorning}</option>
                  <option value="Afternoon (02:00 PM - 05:30 PM)">{t.timeAfternoon}</option>
                </select>
              </div>
            </div>

            {/* Chauffeur Service Toggle */}
            <div className="p-3 rounded-lg bg-black/30 border border-[#DFBE76]/25 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DFBE76]/10 flex items-center justify-center text-[#DFBE76] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {t.pickUpLabel}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Complimentary sanitized luxury SUV pick-up from Coimbatore Airport, Railway Junction, or Residence.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pickUpNeeded}
                onChange={(e) => setPickUpNeeded(e.target.checked)}
                className="w-5 h-5 accent-[#DFBE76] rounded cursor-pointer shrink-0"
              />
            </div>

            {/* Message / Plot preferences */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {t.messageLabel}
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention desired plot facing (East/North) or plot size..."
                className="w-full px-3.5 py-2 rounded bg-black/40 border border-white/15 focus:border-[#DFBE76] focus:outline-none text-white text-sm placeholder:text-stone-600 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="text-[11px] text-stone-400 hidden sm:block">
                * Zero site visit charges. 100% free consultation.
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded bg-gradient-to-r from-[#DFBE76] via-[#C5A059] to-[#DFBE76] text-[#1E0407] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#DFBE76]/20 flex items-center justify-center gap-2 cursor-pointer ml-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
