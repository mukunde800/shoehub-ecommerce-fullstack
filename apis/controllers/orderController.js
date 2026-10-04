const { Order, OrderItem, User } = require('../models');
const orderService = require('../services/orderService');

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrderFromCart(req.user.id, req.body);
    res.status(201).json(order);
  } catch (e) { next(e); }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [OrderItem],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (e) { next(e); }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [OrderItem],
    });
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(order);
  } catch (e) { next(e); }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        OrderItem,
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (e) { next(e); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (e) { next(e); }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Introuvable' });
    await order.update({ paymentStatus: req.body.paymentStatus });
    res.json(order);
  } catch (e) { next(e); }
};