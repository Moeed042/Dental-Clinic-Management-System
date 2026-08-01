import { query } from '../config/db.js';

export const AppointmentModel = {
  /**
   * Create a new appointment
   */
  async create(data) {
    const {
      booking_reference,
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message = '',
      status = 'Pending',
    } = data;

    const sql = `
      INSERT INTO appointments 
      (booking_reference, patient_name, email, phone, service, specialist, appointment_date, appointment_time, message, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      booking_reference,
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message,
      status,
    ]);

    return result;
  },

  /**
   * Fetch appointments with search, filters & pagination
   */
  async findAll({ search = '', status = '', date = '', page = 1, limit = 10 }) {
    let sql = 'SELECT * FROM appointments WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (patient_name LIKE ? OR email LIKE ? OR phone LIKE ? OR booking_reference LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (date) {
      sql += ' AND appointment_date = ?';
      params.push(date);
    }

    sql += ' ORDER BY created_at DESC';

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const limitVal = parseInt(limit, 10);

    sql += ' LIMIT ? OFFSET ?';
    params.push(limitVal, offset);

    const rows = await query(sql, params);
    return rows;
  },

  /**
   * Get total count for pagination
   */
  async countAll({ search = '', status = '', date = '' }) {
    let sql = 'SELECT COUNT(*) as total FROM appointments WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (patient_name LIKE ? OR email LIKE ? OR phone LIKE ? OR booking_reference LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (date) {
      sql += ' AND appointment_date = ?';
      params.push(date);
    }

    const rows = await query(sql, params);
    return rows[0] ? rows[0].total : rows.length || 0;
  },

  /**
   * Find single appointment by ID
   */
  async findById(id) {
    const sql = 'SELECT * FROM appointments WHERE id = ? LIMIT 1';
    const rows = await query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Find appointment by booking reference
   */
  async findByReference(ref) {
    const sql = 'SELECT * FROM appointments WHERE booking_reference = ? LIMIT 1';
    const rows = await query(sql, [ref]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Update full appointment record
   */
  async update(id, data) {
    const {
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message,
      status,
    } = data;

    const sql = `
      UPDATE appointments 
      SET patient_name = ?, email = ?, phone = ?, service = ?, specialist = ?, appointment_date = ?, appointment_time = ?, message = ?, status = ?
      WHERE id = ?
    `;

    return await query(sql, [
      patient_name,
      email,
      phone,
      service,
      specialist,
      appointment_date,
      appointment_time,
      message,
      status,
      id,
    ]);
  },

  /**
   * Update appointment status ONLY
   */
  async updateStatus(id, status) {
    const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
    return await query(sql, [status, id]);
  },

  /**
   * Delete appointment
   */
  async delete(id) {
    const sql = 'DELETE FROM appointments WHERE id = ?';
    return await query(sql, [id]);
  },

  /**
   * Get appointment dashboard metrics summary
   */
  async getDashboardStats() {
    const totalSql = 'SELECT COUNT(*) as total FROM appointments';
    const pendingSql = "SELECT COUNT(*) as pending FROM appointments WHERE status = 'Pending'";
    const confirmedSql = "SELECT COUNT(*) as confirmed FROM appointments WHERE status = 'Confirmed'";
    const cancelledSql = "SELECT COUNT(*) as cancelled FROM appointments WHERE status = 'Cancelled'";
    const completedSql = "SELECT COUNT(*) as completed FROM appointments WHERE status = 'Completed'";
    const messagesSql = 'SELECT COUNT(*) as totalMessages FROM contact_messages';

    const [totalRows, pendingRows, confirmedRows, cancelledRows, completedRows, msgRows] = await Promise.all([
      query(totalSql),
      query(pendingSql),
      query(confirmedSql),
      query(cancelledSql),
      query(completedSql),
      query(messagesSql),
    ]);

    return {
      totalAppointments: totalRows[0] ? totalRows[0].total : 0,
      pending: pendingRows[0] ? pendingRows[0].pending : 0,
      confirmed: confirmedRows[0] ? confirmedRows[0].confirmed : 0,
      cancelled: cancelledRows[0] ? cancelledRows[0].cancelled : 0,
      completed: completedRows[0] ? completedRows[0].completed : 0,
      totalMessages: msgRows[0] ? msgRows[0].totalMessages : 0,
    };
  },
};
