const { User, Order, Product } = require('../models');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { Op } = require('sequelize');

exports.getProfile = async (req, res, next) => {
  try { res.json(req.user); } catch (e) { next(e); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address, city, postalCode, country } = req.body;
    await req.user.update({ firstName, lastName, phone, address, city, postalCode, country });
    res.json(req.user);
  } catch (e) { next(e); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!(await comparePassword(currentPassword, user.password)))
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
    await user.update({ password: await hashPassword(newPassword) });
    res.json({ message: 'Mot de passe modifié' });
  } catch (e) { next(e); }
};

// ==== ADMIN ====
exports.getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }
    if (role) where.role = role;

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: +limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
    });
    res.json({ data: rows, total: count, page: +page, pages: Math.ceil(count / limit) });
  } catch (e) { next(e); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [Order],
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (e) { next(e); }
};

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Introuvable' });
    await user.update({ isActive: !user.isActive });
    res.json(user);
  } catch (e) { next(e); }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Introuvable' });
    await user.update({ role: req.body.role });
    res.json(user);
  } catch (e) { next(e); }
};

exports.getStats = async (req, res, next) => {
  try {
    const [users, products, orders] = await Promise.all([
      User.count(),
      Product.count({ where: { isActive: true } }),
      Order.count(),
    ]);
    const revenue = await Order.sum('totalAmount', { where: { paymentStatus: 'paid' } });
    res.json({ users, products, orders, revenue: revenue || 0 });
  } catch (e) { next(e); }
};