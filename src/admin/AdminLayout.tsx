import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { authService } from '../services/api';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  Globe,
  User,
  Bell,
  CheckCircle2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans antialiased">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-300 shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">Dental Admin</div>
            <div className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">Management Portal</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors ${
                  active
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* External Website & User Info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-300 transition-colors border border-slate-700/50"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] bg-teal-950 text-teal-300 font-bold px-1.5 py-0.5 rounded">Live</span>
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
                {currentUser?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{currentUser?.username || 'Admin'}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser?.email || 'admin@dentalclinic.com'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Top Navbar for Mobile */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">Dental Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 text-slate-300 p-4 space-y-2 sticky top-16 z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs ${
                  active ? 'bg-teal-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-teal-400 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Globe className="w-4 h-4" /> View Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Dental Clinic Admin Panel</h1>
            <p className="text-xs text-slate-500 font-medium">Real-time appointment & message management system</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Backend Connected</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Preview Site</span>
            </Link>
          </div>
        </header>

        {/* Main Outlet Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
