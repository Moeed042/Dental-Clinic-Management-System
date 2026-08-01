import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appointmentService, messageService } from '../../services/api';
import { Appointment, DashboardStats, ContactMessage } from '../../types';
import { AppointmentViewModal } from '../components/AppointmentViewModal';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  CheckCheck,
  MessageSquare,
  ArrowRight,
  User,
  RefreshCw,
  PlusCircle,
  Eye,
  TrendingUp
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
    totalMessages: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingAppt, setViewingAppt] = useState<Appointment | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apptRes = await appointmentService.getAll({ page: 1, limit: 5 });
      setRecentAppointments(apptRes.data || []);
      if (apptRes.stats) {
        setStats(apptRes.stats);
      } else {
        const statsData = await appointmentService.getStats();
        setStats(statsData);
      }

      const msgRes = await messageService.getAll({ page: 1, limit: 5 });
      setRecentMessages(msgRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: Appointment['status']) => {
    try {
      await appointmentService.updateStatus(id, newStatus);
      fetchData();
      if (viewingAppt && viewingAppt.id === id) {
        setViewingAppt({ ...viewingAppt, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

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
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Summary metrics and recent patient activities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/appointments"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Manage Appointments</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid (6 Metric Cards as required) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Appointments */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{stats.totalAppointments}</div>
          <div className="text-[11px] text-slate-400">Total Bookings</div>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600">Pending</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{stats.pending}</div>
          <div className="text-[11px] text-slate-400">Requires Action</div>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600">Confirmed</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{stats.confirmed}</div>
          <div className="text-[11px] text-slate-400">Scheduled Slots</div>
        </div>

        {/* Cancelled */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600">Cancelled</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600">{stats.cancelled}</div>
          <div className="text-[11px] text-slate-400">Voided Bookings</div>
        </div>

        {/* Completed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600">Completed</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <CheckCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-blue-600">{stats.completed}</div>
          <div className="text-[11px] text-slate-400">Served Patients</div>
        </div>

        {/* Total Messages */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600">Messages</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-600">{stats.totalMessages}</div>
          <div className="text-[11px] text-slate-400">Contact Inquiries</div>
        </div>
      </div>

      {/* Main Grid: Recent Appointments + Messages Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Appointments</h3>
              <p className="text-xs text-slate-500">Latest patient bookings logged</p>
            </div>
            <Link
              to="/admin/appointments"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>View All ({stats.totalAppointments})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-y border-slate-200/80 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Ref</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  recentAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{appt.booking_reference}</td>
                      <td className="p-3 font-semibold text-slate-900">{appt.patient_name}</td>
                      <td className="p-3">{appt.service}</td>
                      <td className="p-3 font-medium text-slate-700">
                        {appt.appointment_date} <span className="text-slate-400">@</span> {appt.appointment_time}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold border text-[10px] ${getStatusBadge(appt.status)}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setViewingAppt(appt)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-teal-600" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages Card (1 Col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Contact Inquiries</h3>
              <p className="text-xs text-slate-500">Messages sent via public website</p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px]">
            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">No contact messages.</div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{msg.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-teal-700 font-semibold">{msg.service || 'General Inquiry'}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 italic">"{msg.message}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Viewing Modal */}
      <AppointmentViewModal
        appointment={viewingAppt}
        onClose={() => setViewingAppt(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
