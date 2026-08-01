import React from 'react';
import { CLINIC_INFO } from '../data/mockData';
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight">Dental Clinic</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-teal-400">
                  Advanced Oral Health & Aesthetics
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Dedicated to delivering gentle, state-of-the-art dental care in a soothing, pain-free environment. Restoring smiles and confidence every day.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-teal-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#results" onClick={(e) => handleNavClick(e, '#results')} className="hover:text-teal-400 transition-colors">
                  Smile Transformations
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-teal-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-teal-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleNavClick(e, '#reviews')} className="hover:text-teal-400 transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-teal-400 transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments list */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>Laser Teeth Whitening</li>
              <li>Clear Invisalign Aligners</li>
              <li>Porcelain Veneers</li>
              <li>Dental Implant Surgery</li>
              <li>Root Canal Therapy</li>
              <li>24/7 Emergency Dental Care</li>
            </ul>
          </div>

          {/* Contact Summary & Emergency */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Desk</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>123 Healthcare Blvd, Suite 400, NY</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white font-semibold">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved. Built with comfort & care.
          </div>

          <div className="flex items-center gap-6">
            <a href="/admin" className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
              Admin Portal
            </a>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#hipaa" className="hover:text-slate-400 transition-colors">
              HIPAA Compliance
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700/60"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
