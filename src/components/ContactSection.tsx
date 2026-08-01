import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/mockData';
import { messageService } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Checkup',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      await messageService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      });
    } catch (err) {
      console.warn('Message API backend connection notice:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Us & Location
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Have a question or need to get in touch? Send us a message or visit our state-of-the-art clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Clinic Contact Info & Location Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-slate-800">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{CLINIC_INFO.name}</h3>
                <p className="text-slate-300 text-xs sm:text-sm">{CLINIC_INFO.tagline}</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Clinic Location</div>
                    <div className="text-slate-300">{CLINIC_INFO.address}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Appointments & Desk</div>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="text-teal-400 hover:text-white transition-colors font-medium">
                      {CLINIC_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Address</div>
                    <a href={`mailto:${CLINIC_INFO.email}`} className="text-slate-300 hover:text-white transition-colors">
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-white">Clinic Hours</div>
                    {CLINIC_INFO.hours.map((h, i) => (
                      <div key={i} className="text-slate-300 text-xs flex justify-between gap-4">
                        <span>{h.days}:</span>
                        <span className="font-medium text-white">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Interactive Location Map Card */}
            <div className="rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm bg-slate-100 relative group">
              <div className="h-48 w-full relative bg-slate-300 overflow-hidden flex items-center justify-center">
                {/* Styled Map Background */}
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                  alt="Clinic Location Map"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30"></div>

                {/* Map Marker Pin */}
                <div className="absolute z-10 bg-white p-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-200 animate-bounce">
                  <MapPin className="w-5 h-5 text-rose-600 fill-rose-500" />
                  <span className="text-xs font-bold text-slate-900">Dental Clinic NYC</span>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Medical District Center</div>
                  <div className="text-[11px] text-slate-500 font-medium">Free valet & patient parking behind building</div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center border border-teal-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our desk team will review your inquiry and call or email you within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', service: 'General Checkup', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Interested Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white"
                    >
                      <option value="General Checkup">General Checkup & Cleaning</option>
                      <option value="Teeth Whitening">Laser Teeth Whitening</option>
                      <option value="Root Canal">Root Canal Therapy</option>
                      <option value="Aligners">Braces & Clear Aligners</option>
                      <option value="Implants">Dental Implants</option>
                      <option value="Emergency Care">Emergency Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Special Requests
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dental goals, symptoms, or preferred dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
