import { query } from '../config/db.js';

export const AdminModel = {
  /**
   * Find admin by email address
   */
  async findByEmail(email) {
    const sql = 'SELECT * FROM admins WHERE email = ? LIMIT 1';
    const rows = await query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Find admin by username or email
   */
  async findByUsernameOrEmail(identifier) {
    const sql = 'SELECT * FROM admins WHERE username = ? OR email = ? LIMIT 1';
    const rows = await query(sql, [identifier, identifier]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Find admin by ID
   */
  async findById(id) {
    const sql = 'SELECT id, username, email, created_at FROM admins WHERE id = ? LIMIT 1';
    const rows = await query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Update admin password
   */
  async updatePassword(id, hashedPassword) {
    const sql = 'UPDATE admins SET password = ? WHERE id = ?';
    return await query(sql, [hashedPassword, id]);
  },
};
