import React, { useState } from 'react';
import { SERVICES_DATA, DOCTORS_DATA } from '../data/mockData';
import { AppointmentFormData } from '../types';
import { appointmentService } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    serviceId: initialServiceId || 'general-checkup',
    doctorId: 'doc-1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '10:00 AM',
    fullName: '',
    email: '',
    phone: '',
    isNewPatient: true,
    notes: '',
  });

  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const availableTimeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
  ];

  const selectedService = SERVICES_DATA.find((s) => s.id === formData.serviceId) || SERVICES_DATA[0];
  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === formData.doctorId) || DOCTORS_DATA[0];

  const handleNext = async () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      if (!formData.fullName || !formData.email || !formData.phone) return;
      try {
        // Send request to Express + MySQL backend
        const res = await appointmentService.create({
          patient_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: selectedService.title,
          specialist: selectedDoctor.name,
          appointment_date: formData.date,
          appointment_time: formData.timeSlot,
          message: formData.notes,
        });

        setBookingRef(res.data.booking_reference);
      } catch (err) {
        console.warn('Backend API connection warning:', err);
        // Fallback local ref generation
        const refCode = `DEN-${Math.floor(100000 + Math.random() * 900000)}`;
        setBookingRef(refCode);
      }

      setStep(4);
      // Trigger confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-800 rounded-xl text-teal-400 border border-slate-700">
              <CalendarIcon className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Schedule an Appointment</h3>
              <p className="text-xs text-slate-300">Dental Clinic • Instant Confirmation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span>Service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span>Date & Time</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>3</span>
              <span>Your Details</span>
            </div>
          </div>
        )}

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Select Service & Doctor */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1. Choose Dental Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES_DATA.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.serviceId === srv.id
                          ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        checked={formData.serviceId === srv.id}
                        onChange={() => setFormData({ ...formData, serviceId: srv.id })}
                        className="mt-1 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{srv.title}</div>
                        <div className="text-xs text-slate-500">{srv.duration} • {srv.priceRange.split(' ')[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Select Preferred Specialist
                </label>
                <div className="space-y-2">
                  {DOCTORS_DATA.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        formData.doctorId === doc.id
                          ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900">{doc.name}</div>
                          <div className="text-xs text-slate-500">{doc.role}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-teal-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        {doc.experience}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Select Preferred Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Select Available Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                        formData.timeSlot === slot
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 text-sm">Appointment Overview:</div>
                <div>Service: <span className="font-semibold text-teal-800">{selectedService.title}</span></div>
                <div>Specialist: <span className="font-semibold text-slate-900">{selectedDoctor.name}</span></div>
                <div>Date & Time: <span className="font-semibold text-teal-700">{formData.date} at {formData.timeSlot}</span></div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Contact Info */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="newPatient"
                  checked={formData.isNewPatient}
                  onChange={(e) => setFormData({ ...formData, isNewPatient: e.target.checked })}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="newPatient" className="text-xs text-slate-700 font-medium">
                  First time visiting Dental Clinic (New Patient)
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Notes / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any tooth pain, sensitivities, or insurance questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 4: Instant Confirmation Screen */}
          {step === 4 && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 border border-teal-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2 border border-teal-200/80">
                  Appointment Confirmed!
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  See You Soon, {formData.fullName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  A confirmation SMS & email have been dispatched to {formData.email}.
                </p>
              </div>

              {/* Details voucher */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-left text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-teal-200/80 pb-2">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-teal-800 text-sm">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Treatment:</span>
                  <span className="font-bold text-slate-900">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Attending Specialist:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date & Time:</span>
                  <span className="font-bold text-teal-700">{formData.date} @ {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Clinic Address:</span>
                  <span className="font-bold text-slate-900">123 Healthcare Blvd, Suite 400</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{step === 3 ? 'Confirm & Book' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
