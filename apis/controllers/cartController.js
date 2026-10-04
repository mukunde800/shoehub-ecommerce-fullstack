const { Cart, CartItem, Product } = require('../models');

const getFullCart = (userId) =>
  Cart.findOne({
    where: { userId },
    include: [{ model: CartItem, include: [Product] }],
  });

exports.getCart = async (req, res, next) => {
  try { res.json(await getFullCart(req.user.id)); }
  catch (e) { next(e); }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Stock insuffisant' });

    const [cart] = await Cart.findOrCreate({ where: { userId: req.user.id } });
    const existing = await CartItem.findOne({
      where: { cartId: cart.id, productId, size, color },
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await CartItem.create({ cartId: cart.id, productId, quantity, size, color });
    }

    res.json(await getFullCart(req.user.id));
  } catch (e) { next(e); }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.findOne({
      where: { id: req.params.itemId },
      include: [{ model: Cart, where: { userId: req.user.id } }],
    });
    if (!item) return res.status(404).json({ message: 'Item introuvable' });
    await item.update({ quantity: req.body.quantity });
    res.json(await getFullCart(req.user.id));
  } catch (e) { next(e); }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: { id: req.params.itemId },
    });
    res.json(await getFullCart(req.user.id));
  } catch (e) { next(e); }
};

exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (cart) await CartItem.destroy({ where: { cartId: cart.id } });
    res.json({ message: 'Panier vidé' });
  } catch (e) { next(e); }
};