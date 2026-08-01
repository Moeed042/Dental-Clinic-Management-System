import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '../../types';
import { X, Save } from 'lucide-react';

interface Props {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (id: number, updatedData: Partial<Appointment>) => Promise<void>;
}

export const AppointmentEditModal: React.FC<Props> = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Appointment>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient_name: appointment.patient_name,
        email: appointment.email,
        phone: appointment.phone,
        service: appointment.service,
        specialist: appointment.specialist,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        status: appointment.status,
        message: appointment.message,
      });
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(appointment.id, formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
              Edit {appointment.booking_reference}
            </span>
            <h3 className="text-lg font-bold">Edit Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={formData.patient_name || ''}
              onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Service</label>
              <input
                type="text"
                required
                value={formData.service || ''}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Specialist</label>
              <input
                type="text"
                required
                value={formData.specialist || ''}
                onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.appointment_date || ''}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time</label>
              <input
                type="text"
                required
                value={formData.appointment_time || ''}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status || 'Pending'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as AppointmentStatus })}
                className="w-full px-2 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs font-bold bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Message</label>
            <textarea
              rows={2}
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 text-xs"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
