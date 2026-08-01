import React from 'react';
import { DOCTORS_DATA, CLINIC_INFO } from '../data/mockData';
import { Award, ShieldCheck, HeartHandshake, Sparkles, CheckCircle, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: <Award className="w-7 h-7 text-teal-600" />,
      title: 'Experienced Specialists',
      desc: 'Our board-certified dentists & oral surgeons possess over 15+ years of clinical expertise across cosmetic, implant, and restorative dentistry.',
    },
    {
      icon: <Sparkles className="w-7 h-7 text-teal-600" />,
      title: 'Modern & Painless Tech',
      desc: 'Equipped with 3D CBCT digital scanners, low-radiation X-rays, and cold laser technology for gentle, pinpoint accurate treatments.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-rose-500" />,
      title: 'Friendly & Soothing Environment',
      desc: 'We treat dental anxiety with warm empathy, noise-canceling headphones, soothing blankets, and painless micro-anesthesia protocols.',
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Why Choose Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Higher Standard of Dental Care Designed Around Your Comfort
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At Dental Clinic, we believe a visit to the dentist should be reassuring, transparent, and completely comfortable. We combine warm hospital-grade care with state-of-the-art dental innovations to give you the healthy, radiant smile you deserve.
            </p>

            {/* Highlights Grid */}
            <div className="space-y-4 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctors Highlight Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Meet Our Specialists</h3>
                  <p className="text-xs text-slate-500 font-medium">Board-certified dental professionals</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Doctors Stack */}
              <div className="space-y-4">
                {DOCTORS_DATA.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/80"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h4>
                        <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-md border border-teal-200/60">
                          {doc.experience}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-teal-700 truncate">{doc.role}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold">
                  ✓ Over 50+ combined years of specialized clinical excellence
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Statistical Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          {CLINIC_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
