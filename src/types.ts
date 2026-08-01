export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  priceRange: string;
  features: string[];
  popular?: boolean;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: 'whitening' | 'aligners' | 'veneers' | 'implants' | 'bonding';
  sessions: string;
  timeframe: string;
  patientAge: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  details: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  treatment: string;
  date: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatments' | 'insurance' | 'aftercare';
}

export interface AppointmentFormData {
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  isNewPatient: boolean;
  notes: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Appointment {
  id: number;
  booking_reference: string;
  patient_name: string;
  email: string;
  phone: string;
  service: string;
  specialist: string;
  appointment_date: string;
  appointment_time: string;
  message: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export interface DashboardStats {
  totalAppointments: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  totalMessages: number;
}

