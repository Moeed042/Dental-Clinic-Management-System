import React, { useState, useEffect } from 'react';
import { messageService } from '../../services/api';
import { ContactMessage } from '../../types';
import { MessageViewModal } from '../components/MessageViewModal';
import {
  Search,
  MessageSquare,
  RefreshCw,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Viewing Modal
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await messageService.getAll({
        search: searchTerm,
        page,
        limit,
      });

      setMessages(res.data || []);
      setTotalCount(res.pagination.total || 0);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [searchTerm, page, limit]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await messageService.delete(id);
      fetchMessages();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Contact Messages</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Review inquiries submitted by website visitors
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
          <span>Reload</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search messages by name, email, phone, or keyword..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Messages Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Sender Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Service</th>
                <th className="p-4">Message Snippet</th>
                <th className="p-4">Received Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
                    Loading messages...
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name */}
                    <td className="p-4 font-bold text-slate-900">{msg.name}</td>

                    {/* Email & Phone */}
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{msg.email}</div>
                      <div className="text-slate-500 text-xs">{msg.phone || 'N/A'}</div>
                    </td>

                    {/* Service */}
                    <td className="p-4 font-semibold text-teal-700">
                      {msg.service || 'General Inquiry'}
                    </td>

                    {/* Message Snippet */}
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-slate-600 text-xs">"{msg.message}"</p>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => setViewingMessage(msg)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="View Message"
                      >
                        <Eye className="w-4 h-4 text-teal-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        title="Delete Message"
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
            <span>of {totalCount} messages</span>
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

      {/* Message Detail Modal */}
      <MessageViewModal
        message={viewingMessage}
        onClose={() => setViewingMessage(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};
