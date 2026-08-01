import { AppointmentModel } from '../models/appointmentModel.js';
import { generateBookingRef } from '../utils/generateRef.js';

export const createAppointment = async (req, res, next) => {
  try {
    const {
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message,
    } = req.body;

    // Validation
    if (!patient_name || !email || !phone || !service || !specialist || !appointment_date || !appointment_time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please complete patient name, email, phone, service, specialist, date, and time.',
      });
    }

    // Generate unique booking reference (e.g., DEN-891042)
    const booking_reference = generateBookingRef();
    const status = 'Pending'; // Default status = Pending

    const result = await AppointmentModel.create({
      booking_reference,
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message: message || '',
      status,
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        id: result.insertId || Date.now(),
        booking_reference,
        patient_name,
        email,
        phone,
        service,
        specialist,
        appointment_date,
        appointment_time,
        message: message || '',
        status,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { search = '', status = '', date = '', page = 1, limit = 10 } = req.query;

    const appointments = await AppointmentModel.findAll({
      search,
      status,
      date,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    const total = await AppointmentModel.countAll({ search, status, date });
    const stats = await AppointmentModel.getDashboardStats();

    res.json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)) || 1,
      },
      stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await AppointmentModel.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found to update',
      });
    }

    const updatedData = {
      patient_name: req.body.patient_name || existing.patient_name,
      email: req.body.email || existing.email,
      phone: req.body.phone || existing.phone,
      service: req.body.service || existing.service,
      specialist: req.body.specialist || existing.specialist,
      appointment_date: req.body.appointment_date || existing.appointment_date,
      appointment_time: req.body.appointment_time || existing.appointment_time,
      message: req.body.message !== undefined ? req.body.message : existing.message,
      status: req.body.status || existing.status,
    };

    await AppointmentModel.update(id, updatedData);

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: { id: parseInt(id, 10), ...existing, ...updatedData },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const existing = await AppointmentModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    await AppointmentModel.updateStatus(id, status);

    res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: { id: parseInt(id, 10), status },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await AppointmentModel.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found to delete',
      });
    }

    await AppointmentModel.delete(id);

    res.json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await AppointmentModel.getDashboardStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
