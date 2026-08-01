import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TransformationsGallery } from './components/TransformationsGallery';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceItem } from './types';

// Admin Panel Imports
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminAppointments } from './admin/pages/AdminAppointments';
import { AdminMessages } from './admin/pages/AdminMessages';
import { AdminSettings } from './admin/pages/AdminSettings';

function PublicWebsite() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceId(undefined);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Real Results / Before & After Transformations Gallery */}
        <TransformationsGallery onOpenBooking={handleOpenBooking} />

        {/* Comprehensive Services List */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onSelectServiceDetail={(service) => setSelectedServiceDetail(service)}
        />

        {/* About / Why Choose Us Section */}
        <AboutSection />

        {/* Patient Reviews & Ratings */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Form & Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={bookingServiceId}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={(serviceId) => handleOpenBooking(serviceId)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Dental Clinic Website */}
        <Route path="/" element={<PublicWebsite />} />

        {/* Admin Portal Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard Portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
