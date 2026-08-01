import React from 'react';
import { ServiceItem } from '../types';
import { X, Clock, DollarSign, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 text-white border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">Service Deep-Dive</span>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm leading-relaxed">
          
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-teal-900">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Duration: {service.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span>Estimate: {service.priceRange}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-base">About this Procedure</h4>
            <p>{service.fullDesc}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Key Patient Benefits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/60 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0" />
            <span>All dental procedures are performed in compliance with strict hospital-grade sterilization standards.</span>
          </div>

        </div>

        {/* Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookService(service.id);
            }}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book for {service.title}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
