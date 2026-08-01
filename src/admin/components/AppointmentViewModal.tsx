import React from 'react';
import { Appointment } from '../../types';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Tag, CheckCircle2 } from 'lucide-react';

interface Props {
  appointment: Appointment | null;
  onClose: () => void;
  onUpdateStatus: (id: number, status: Appointment['status']) => void;
}

export const AppointmentViewModal: React.FC<Props> = ({ appointment, onClose, onUpdateStatus }) => {
  if (!appointment) return null;

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
              {appointment.booking_reference}
            </span>
            <h3 className="text-lg font-bold">Appointment Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Status Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 font-medium">Current Status:</span>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full font-bold border ${getStatusBadge(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          </div>

          {/* Quick status change buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Quick Change Status:</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(appointment.id, st)}
                  className={`py-1.5 rounded-lg font-bold text-[11px] border transition-all cursor-pointer ${
                    appointment.status === st
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-500 text-xs">Patient Name</div>
                <div className="font-bold text-slate-900">{appointment.patient_name}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Email</div>
                  <div className="font-semibold text-slate-800 break-all">{appointment.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Phone</div>
                  <div className="font-semibold text-slate-800">{appointment.phone}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Service</div>
                  <div className="font-bold text-slate-900">{appointment.service}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Specialist</div>
                  <div className="font-semibold text-slate-800">{appointment.specialist}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Date</div>
                  <div className="font-semibold text-slate-800">{appointment.appointment_date}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Time</div>
                  <div className="font-semibold text-slate-800">{appointment.appointment_time}</div>
                </div>
              </div>
            </div>

            {appointment.message && (
              <div className="flex items-start gap-3 pt-2">
                <FileText className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-xs">Patient Notes</div>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 italic border border-slate-200/60 mt-1">
                    "{appointment.message}"
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
