import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA } from '../data/mockData';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Sparkles, Calendar, Clock, UserCheck, Filter, ArrowUpRight } from 'lucide-react';
import { TransformationItem } from '../types';

interface TransformationsGalleryProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const TransformationsGallery: React.FC<TransformationsGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<TransformationItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Transformations' },
    { id: 'whitening', label: 'Teeth Whitening' },
    { id: 'aligners', label: 'Aligners & Braces' },
    { id: 'veneers', label: 'Veneers' },
    { id: 'implants', label: 'Implants' },
  ];

  const filteredItems = TRANSFORMATIONS_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="results" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Smile Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Results, Life-Changing Smiles
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore our real patient before-and-after gallery. Slide or drag on any card to see how our customized cosmetic & restorative treatments deliver natural, confident smiles.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Slider Component */}
              <BeforeAfterSlider
                beforeImage={item.beforeImg}
                afterImage={item.afterImg}
                title={item.title}
                aspectRatio="aspect-[4/3]"
                className="rounded-b-none border-none shadow-none"
              />

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md font-semibold border border-teal-100">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {item.sessions} ({item.timeframe})
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                      Patient Age: {item.patientAge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {detail}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(item.category === 'whitening' ? 'teeth-whitening' : item.category === 'aligners' ? 'aligners-braces' : item.category === 'implants' ? 'dental-implants' : 'general-checkup')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Book Similar Treatment</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA Box */}
        <div className="mt-12 text-center bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready for Your Own Smile Transformation?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Schedule your 3D Digital Smile Consultation today. See your previewed results before starting any treatment.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/30 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-5 h-5 text-teal-200" />
                <span>Book Your Transformation</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
