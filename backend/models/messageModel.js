import { query } from '../config/db.js';

export const MessageModel = {
  /**
   * Create new contact message
   */
  async create(data) {
    const { name, phone = '', email, service = '', message } = data;
    const sql = `
      INSERT INTO contact_messages (name, phone, email, service, message) 
      VALUES (?, ?, ?, ?, ?)
    `;
    return await query(sql, [name, phone, email, service, message]);
  },

  /**
   * Fetch all messages with search & pagination
   */
  async findAll({ search = '', page = 1, limit = 10 }) {
    let sql = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    sql += ' ORDER BY created_at DESC';

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const limitVal = parseInt(limit, 10);

    sql += ' LIMIT ? OFFSET ?';
    params.push(limitVal, offset);

    return await query(sql, params);
  },

  /**
   * Count messages for pagination
   */
  async countAll({ search = '' }) {
    let sql = 'SELECT COUNT(*) as total FROM contact_messages WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    const rows = await query(sql, params);
    return rows[0] ? rows[0].total : rows.length || 0;
  },

  /**
   * Find message by ID
   */
  async findById(id) {
    const sql = 'SELECT * FROM contact_messages WHERE id = ? LIMIT 1';
    const rows = await query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Delete message by ID
   */
  async delete(id) {
    const sql = 'DELETE FROM contact_messages WHERE id = ?';
    return await query(sql, [id]);
  },
};
