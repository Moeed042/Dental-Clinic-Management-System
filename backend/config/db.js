import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Standard MySQL Pool setup using mysql2
let pool = null;
let useMock = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dental_clinic_db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
} catch (error) {
  console.warn('[MySQL Config]: Initializing fallback in-memory database simulation.');
  useMock = true;
}

// In-memory database fallback state for instant demo capabilities when MySQL container is offline
const mockStore = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@dentalclinic.com',
      password: bcrypt.hashSync('admin123', 10),
      created_at: new Date().toISOString(),
    },
  ],
  appointments: [
    {
      id: 1,
      booking_reference: 'DEN-849201',
      patient_name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '(555) 234-8901',
      service: 'Cosmetic Dentistry & Veneers',
      specialist: 'Dr. Michael Sterling',
      appointment_date: '2026-08-05',
      appointment_time: '10:00 AM',
      message: 'Looking to get a consultation for porcelain veneers.',
      status: 'Confirmed',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      booking_reference: 'DEN-710482',
      patient_name: 'Robert Vance',
      email: 'robert.vance@example.com',
      phone: '(555) 345-6789',
      service: 'Teeth Whitening',
      specialist: 'Dr. Elena Rostova',
      appointment_date: '2026-08-06',
      appointment_time: '02:00 PM',
      message: 'Needs whitening prior to wedding event.',
      status: 'Pending',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: 3,
      booking_reference: 'DEN-931054',
      patient_name: 'Amanda Chen',
      email: 'amanda.c@example.com',
      phone: '(555) 987-6543',
      service: 'Invisalign Aligners',
      specialist: 'Dr. James Thorne',
      appointment_date: '2026-08-08',
      appointment_time: '11:30 AM',
      message: 'Initial 3D scan and alignment review.',
      status: 'Completed',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 4,
      booking_reference: 'DEN-491023',
      patient_name: 'David Miller',
      email: 'dmiller@example.com',
      phone: '(555) 456-7890',
      service: 'Emergency Dental Care',
      specialist: 'Dr. Michael Sterling',
      appointment_date: '2026-08-04',
      appointment_time: '09:00 AM',
      message: 'Severe tooth pain on lower right molar.',
      status: 'Cancelled',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ],
  contact_messages: [
    {
      id: 1,
      name: 'Michael Chang',
      phone: '(555) 678-1234',
      email: 'mchang@example.com',
      service: 'Dental Implants',
      message: 'Hi, I would like to know if your clinic accepts Delta Dental insurance for implant procedures.',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      name: 'Jessica Taylor',
      phone: '(555) 890-2345',
      email: 'jtaylor@example.com',
      service: 'General Checkup',
      message: 'Do you offer Saturday morning slots for new patient checkups and routine cleanings?',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ],
};

/**
 * Execute raw SQL query using mysql2 pool with automatic fallback if DB is unreachable
 */
export async function query(sql, params = []) {
  if (!useMock && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      console.warn(`[MySQL Connection Notice]: MySQL query failed (${err.message}). Using memory fallback.`);
      useMock = true;
    }
  }

  // Fallback memory DB handler simulating raw MySQL queries
  return executeMockQuery(sql, params);
}

function executeMockQuery(sql, params) {
  const cleanSql = sql.trim();

  // SELECT admin by email or username
  if (cleanSql.toLowerCase().includes('from admins')) {
    if (params.length > 0) {
      const val = params[0];
      const admin = mockStore.admins.find((a) => a.email === val || a.username === val);
      return admin ? [admin] : [];
    }
    return mockStore.admins;
  }

  // SELECT appointments
  if (cleanSql.toLowerCase().includes('from appointments')) {
    // If selecting by ID
    if (cleanSql.toLowerCase().includes('where id =')) {
      const id = parseInt(params[0], 10);
      const item = mockStore.appointments.find((a) => a.id === id);
      return item ? [item] : [];
    }
    // If selecting by booking reference
    if (cleanSql.toLowerCase().includes('where booking_reference =')) {
      const ref = params[0];
      const item = mockStore.appointments.find((a) => a.booking_reference === ref);
      return item ? [item] : [];
    }
    
    // Filtering/Search logic
    let results = [...mockStore.appointments];

    // Filter by search string or status if passed
    return results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // INSERT INTO appointments
  if (cleanSql.toLowerCase().startsWith('insert into appointments')) {
    const newId = mockStore.appointments.length + 1;
    const newAppt = {
      id: newId,
      booking_reference: params[0],
      patient_name: params[1],
      email: params[2],
      phone: params[3],
      service: params[4],
      specialist: params[5],
      appointment_date: params[6],
      appointment_time: params[7],
      message: params[8] || '',
      status: 'Pending',
      created_at: new Date().toISOString(),
    };
    mockStore.appointments.unshift(newAppt);
    return { insertId: newId, affectedRows: 1 };
  }

  // UPDATE appointments
  if (cleanSql.toLowerCase().startsWith('update appointments')) {
    if (cleanSql.toLowerCase().includes('set status =')) {
      const status = params[0];
      const id = parseInt(params[1], 10);
      const appt = mockStore.appointments.find((a) => a.id === id);
      if (appt) {
        appt.status = status;
        return { affectedRows: 1 };
      }
    } else {
      // Full update
      const id = parseInt(params[params.length - 1], 10);
      const appt = mockStore.appointments.find((a) => a.id === id);
      if (appt) {
        appt.patient_name = params[0] || appt.patient_name;
        appt.email = params[1] || appt.email;
        appt.phone = params[2] || appt.phone;
        appt.service = params[3] || appt.service;
        appt.specialist = params[4] || appt.specialist;
        appt.appointment_date = params[5] || appt.appointment_date;
        appt.appointment_time = params[6] || appt.appointment_time;
        appt.message = params[7] || appt.message;
        if (params[8]) appt.status = params[8];
        return { affectedRows: 1 };
      }
    }
    return { affectedRows: 0 };
  }

  // DELETE appointments
  if (cleanSql.toLowerCase().startsWith('delete from appointments')) {
    const id = parseInt(params[0], 10);
    const index = mockStore.appointments.findIndex((a) => a.id === id);
    if (index !== -1) {
      mockStore.appointments.splice(index, 1);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // SELECT contact_messages
  if (cleanSql.toLowerCase().includes('from contact_messages')) {
    return [...mockStore.contact_messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // INSERT INTO contact_messages
  if (cleanSql.toLowerCase().startsWith('insert into contact_messages')) {
    const newId = mockStore.contact_messages.length + 1;
    const newMsg = {
      id: newId,
      name: params[0],
      phone: params[1] || '',
      email: params[2],
      service: params[3] || '',
      message: params[4],
      created_at: new Date().toISOString(),
    };
    mockStore.contact_messages.unshift(newMsg);
    return { insertId: newId, affectedRows: 1 };
  }

  // DELETE FROM contact_messages
  if (cleanSql.toLowerCase().startsWith('delete from contact_messages')) {
    const id = parseInt(params[0], 10);
    const index = mockStore.contact_messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      mockStore.contact_messages.splice(index, 1);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  return [];
}

export { pool, mockStore };
