const { Order, OrderItem, Cart, CartItem, Product, sequelize } = require('../models');

exports.createOrderFromCart = async (userId, orderData) => {
  const t = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }],
      transaction: t,
    });

    if (!cart || cart.CartItems.length === 0)
      throw { status: 400, message: 'Panier vide' };

    let total = 0;
    const items = cart.CartItems.map((i) => {
      const price = parseFloat(i.Product.discountPrice || i.Product.price);
      total += price * i.quantity;
      return {
        productId: i.productId,
        productName: i.Product.name,
        productImage: i.Product.images?.[0],
        price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
      };
    });

    const order = await Order.create({
      userId,
      totalAmount: total,
      ...orderData,
    }, { transaction: t });

    await OrderItem.bulkCreate(
      items.map((i) => ({ ...i, orderId: order.id })),
      { transaction: t }
    );

    // Décrémenter stock
    for (const item of cart.CartItems) {
      await Product.decrement('stock', {
        by: item.quantity,
        where: { id: item.productId },
        transaction: t,
      });
    }

    await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });
    await t.commit();

    return Order.findByPk(order.id, { include: [OrderItem] });
  } catch (e) {
    await t.rollback();
    throw e;
  }
};