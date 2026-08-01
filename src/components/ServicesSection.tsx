import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import {
  Stethoscope,
  Sparkles,
  ShieldAlert,
  Smile,
  Crown,
  Zap,
  Clock,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-600" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-teal-600" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-teal-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-rose-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-widest">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Dental Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Dental Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From routine oral hygiene maintenance to advanced reconstructive surgery, our specialized team provides gentle, high-precision treatments.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative group ${
                service.popular
                  ? 'border-teal-400 shadow-md ring-1 ring-teal-200'
                  : 'border-slate-200/80 shadow-sm hover:border-teal-200'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 right-6 bg-teal-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                {/* Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {service.shortDesc}
                </p>

                {/* Key Features list */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectServiceDetail(service)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(service.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-100" />
                  <span>Book Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
