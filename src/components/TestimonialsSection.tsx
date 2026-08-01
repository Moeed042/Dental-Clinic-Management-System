import React from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white relative border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Patient Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Over 1,200+ Patients
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Read authentic stories from patients who restored their smiles and oral health at Dental Clinic.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-300/40 pointer-events-none" />

              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200/60">
                    {item.treatment}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-6 mt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-teal-200"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      {item.name}
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 inline" title="Verified Patient" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">{item.date}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-teal-200/60">
                    ✓ Verified Patient
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
