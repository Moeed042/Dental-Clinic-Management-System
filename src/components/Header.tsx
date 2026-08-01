import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'results', 'services', 'about', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Results', href: '#results', id: 'results' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Why Us', href: '#about', id: 'about' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Emergency & Info Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block"></span>
              Emergency Care Available 24/7
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Mon-Fri: 8am - 7pm | Sat: 9am - 3pm
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:5552345678"
              className="flex items-center gap-1.5 font-semibold text-teal-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>(555) 234-5678</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Insurances Accepted
            </span>
            <a
              href="/admin"
              className="text-teal-400 hover:text-teal-300 font-bold text-[11px] underline underline-offset-2 transition-colors ml-2"
            >
              Staff Portal
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Dental Clinic
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-teal-600">
                Advanced Oral Health & Aesthetics
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                    isActive
                      ? 'bg-white text-teal-700 shadow-xs'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-white/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-teal-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="tel:5552345678"
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call (555) 234-5678</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
