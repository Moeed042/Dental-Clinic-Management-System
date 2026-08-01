-- Dental Clinic Database Schema (MySQL)
CREATE DATABASE IF NOT EXISTS dental_clinic_db;
USE dental_clinic_db;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  specialist VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(50) NOT NULL,
  message TEXT,
  status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  service VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin User (Default Email: admin@dentalclinic.com, Password: admin123)
INSERT INTO admins (username, email, password) 
VALUES ('admin', 'admin@dentalclinic.com', '$2a$10$X1gMvVd0O06Cg4Xz2E3dE.4M1Fv9L5m1p3k6w9r2t4y6u8i0o2a4e')
ON DUPLICATE KEY UPDATE id=id;
