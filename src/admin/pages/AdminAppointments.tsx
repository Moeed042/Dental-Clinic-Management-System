import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/api';
import { Appointment, AppointmentStatus } from '../../types';
import { AppointmentViewModal } from '../components/AppointmentViewModal';
import { AppointmentEditModal } from '../components/AppointmentEditModal';
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  PlusCircle
} from 'lucide-react';

export const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals State
  const [viewingAppt, setViewingAppt] = useState<Appointment | null>(null);
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await appointmentService.getAll({
        search: searchTerm,
        status: statusFilter,
        date: dateFilter,
        page,
        limit,
      });

      setAppointments(res.data || []);
      setTotalCount(res.pagination.total || 0);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [searchTerm, statusFilter, dateFilter, page, limit]);

  const handleStatusChange = async (id: number, newStatus: AppointmentStatus) => {
    try {
      await appointmentService.updateStatus(id, newStatus);
      fetchAppointments();
      if (viewingAppt && viewingAppt.id === id) {
        setViewingAppt({ ...viewingAppt, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this appointment booking?')) return;
    try {
      await appointmentService.delete(id);
      fetchAppointments();
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  const handleSaveEdit = async (id: number, data: Partial<Appointment>) => {
    await appointmentService.update(id, data);
    fetchAppointments();
  };

  const getStatusBadge = (status: AppointmentStatus) => {
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
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Appointments Directory</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Search, filter, update status, and manage patient bookings
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
          <span>Reload</span>
        </button>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Patient Name, Phone, Email, or Booking Reference..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Date Picker Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Clear Filters Button */}
          {(searchTerm || statusFilter || dateFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setDateFilter('');
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Appointments Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Service & Specialist</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
                    Loading appointments data...
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Booking Reference */}
                    <td className="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {appt.booking_reference}
                    </td>

                    {/* Patient Name */}
                    <td className="p-4 font-bold text-slate-900">
                      {appt.patient_name}
                    </td>

                    {/* Contact Info */}
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{appt.email}</div>
                      <div className="text-slate-500 text-xs">{appt.phone}</div>
                    </td>

                    {/* Service & Specialist */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{appt.service}</div>
                      <div className="text-slate-500 text-xs">{appt.specialist}</div>
                    </td>

                    {/* Date & Time */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{appt.appointment_date}</div>
                      <div className="text-teal-700 font-bold text-xs">{appt.appointment_time}</div>
                    </td>

                    {/* Status Dropdown / Badge */}
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={appt.status}
                        onChange={(e) => handleStatusChange(appt.id, e.target.value as AppointmentStatus)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer focus:outline-none ${getStatusBadge(
                          appt.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => setViewingAppt(appt)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4 text-teal-600" />
                      </button>

                      <button
                        onClick={() => setEditingAppt(appt)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="Edit Appointment"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        title="Delete Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setPage(1);
              }}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold"
            >
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
              <option value={50}>50 rows</option>
            </select>
            <span>of {totalCount} appointments</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-50 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span>Page {page} of {totalPages}</span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-50 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AppointmentViewModal
        appointment={viewingAppt}
        onClose={() => setViewingAppt(null)}
        onUpdateStatus={handleStatusChange}
      />

      <AppointmentEditModal
        appointment={editingAppt}
        onClose={() => setEditingAppt(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
