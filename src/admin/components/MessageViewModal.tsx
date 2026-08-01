import React from 'react';
import { ContactMessage } from '../../types';
import { X, Mail, Phone, Calendar, User, Tag, Trash2 } from 'lucide-react';

interface Props {
  message: ContactMessage | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const MessageViewModal: React.FC<Props> = ({ message, onClose, onDelete }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white border-b border-slate-800">
          <div>
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Contact Inquiry</span>
            <h3 className="text-lg font-bold">Message Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-base">
              {message.name[0]?.toUpperCase() || 'M'}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base">{message.name}</div>
              <div className="text-slate-500 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Submitted: {new Date(message.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-500 text-[11px] flex items-center gap-1 mb-1">
                <Mail className="w-3.5 h-3.5 text-teal-600" /> Email
              </div>
              <a href={`mailto:${message.email}`} className="font-semibold text-teal-700 hover:underline break-all">
                {message.email}
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-500 text-[11px] flex items-center gap-1 mb-1">
                <Phone className="w-3.5 h-3.5 text-teal-600" /> Phone
              </div>
              <a href={`tel:${message.phone}`} className="font-semibold text-slate-900 hover:underline">
                {message.phone || 'N/A'}
              </a>
            </div>
          </div>

          {message.service && (
            <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Requested Service:</span>
              <span className="font-bold text-teal-900">{message.service}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Message Content:</label>
            <div className="p-4 bg-slate-50 rounded-2xl text-slate-800 border border-slate-200/80 leading-relaxed whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this contact message?')) {
                onDelete(message.id);
                onClose();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Message</span>
          </button>

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
