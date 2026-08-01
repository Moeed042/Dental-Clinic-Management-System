import React from 'react';
import { Calendar, Star, Shield, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { TRANSFORMATIONS_DATA } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  // Use the primary whitening transformation item for the hero before/after slider
  const heroTransformation = TRANSFORMATIONS_DATA[0];

  const handleScrollToResults = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('results');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-slate-50/60 py-12 lg:py-20 overflow-hidden border-b border-slate-200/70">
      {/* Soft background decor blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Headline & Action Calls */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs sm:text-sm font-semibold w-fit">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-slate-800">4.9/5 Rating</span>
              <span className="text-slate-300">•</span>
              <span className="text-teal-700 font-bold">1,200+ Verified Patient Reviews</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Your Smile, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
                Our Priority.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Experience gentle, state-of-the-art dental care tailored for your comfort. From routine checkups to breathtaking smile makeovers, our expert team ensures pain-free treatments with lasting results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-7 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Calendar className="w-5 h-5 text-teal-100" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#results"
                onClick={handleScrollToResults}
                className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-semibold text-base shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Real Transformations</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </a>
            </div>

            {/* Trust Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 text-xs sm:text-sm text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Pain-Free Dentistry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Same-Day Appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Most Insurances Accepted</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Before/After Image Comparison */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame Decor */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Badge Overlay */}
              <div className="absolute -top-4 -left-4 z-30 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Proven Results</div>
                  <div className="text-[11px] text-slate-500 font-medium">Drag to compare before & after</div>
                </div>
              </div>

              {/* Main Before / After Slider */}
              <BeforeAfterSlider
                beforeImage={heroTransformation.beforeImg}
                afterImage={heroTransformation.afterImg}
                title={heroTransformation.title}
                caption="Actual patient laser whitening result after 1 session (8 shades whiter)"
                aspectRatio="aspect-[4/3]"
                className="shadow-2xl ring-1 ring-slate-900/5"
              />

              {/* Patient Trust Box beneath Hero Slider */}
              <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>Verified 100% Authentic Patient Results</span>
                </div>
                <button
                  onClick={handleScrollToResults}
                  className="text-teal-600 font-bold hover:underline"
                >
                  See 4 More Gallery Cases →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
