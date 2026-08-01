import { MessageModel } from '../models/messageModel.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message content are required.',
      });
    }

    const result = await MessageModel.create({
      name,
      phone: phone || '',
      email,
      service: service || '',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Contact message received successfully.',
      data: {
        id: result.insertId || Date.now(),
        name,
        phone,
        email,
        service,
        message,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const messages = await MessageModel.findAll({
      search,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    const total = await MessageModel.countAll({ search });

    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await MessageModel.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Message not found to delete',
      });
    }

    await MessageModel.delete(id);

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
