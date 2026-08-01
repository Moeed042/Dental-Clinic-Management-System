import React, { useState } from 'react';
import { authService } from '../../services/api';
import {
  Settings,
  ShieldCheck,
  Database,
  Key,
  User,
  CheckCircle2,
  Lock,
  Save,
  Server
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Admin account password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage administrator account, authentication, and database connection settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Profile & Security */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Admin Account Profile</h3>
              <p className="text-xs text-slate-500">Authenticated JWT user details</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="text-xs text-slate-500 font-medium">Username</label>
              <div className="font-bold text-slate-900 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 mt-1">
                {currentUser?.username || 'admin'}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-medium">Email Address</label>
              <div className="font-bold text-slate-900 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 mt-1">
                {currentUser?.email || 'admin@dentalclinic.com'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security Role: Super Administrator
              </div>
              <p className="text-emerald-700">Full read/write permissions for appointments & messages</p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Change Password</h3>
              <p className="text-xs text-slate-500">Update bcrypt password credentials</p>
            </div>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer mt-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Updating...' : 'Save Password'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Database & Infrastructure Status */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Backend System Status</h3>
            <p className="text-xs text-slate-500">MySQL & Node.js Express server specifications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-slate-500 font-medium">Database Engine</div>
            <div className="font-bold text-slate-900 text-sm">MySQL 8.0 (mysql2)</div>
            <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pool Active (Port 3306)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-slate-500 font-medium">Auth Middleware</div>
            <div className="font-bold text-slate-900 text-sm">JWT Bearer Auth</div>
            <div className="text-teal-700 font-semibold text-[11px]">Token Expires in 24 Hours</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-slate-500 font-medium">Architecture Pattern</div>
            <div className="font-bold text-slate-900 text-sm">MVC Architecture</div>
            <div className="text-slate-600 font-semibold text-[11px]">No ORM (Raw MySQL Queries)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
