module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderNumber: { type: DataTypes.STRING, unique: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },
    paymentMethod: DataTypes.STRING,
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
      defaultValue: 'unpaid',
    },
    shippingAddress: DataTypes.TEXT,
    shippingCity: DataTypes.STRING,
    shippingPostalCode: DataTypes.STRING,
    shippingCountry: DataTypes.STRING,
    notes: DataTypes.TEXT,
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (order) => {
        if (!order.orderNumber) {
          order.orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        }
      },
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
  };
  return Order;
};