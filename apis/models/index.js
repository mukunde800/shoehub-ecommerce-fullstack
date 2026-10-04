const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const models = {
  User: require('./User')(sequelize, DataTypes),
  Product: require('./Product')(sequelize, DataTypes),
  Category: require('./Category')(sequelize, DataTypes),
  Cart: require('./Cart')(sequelize, DataTypes),
  CartItem: require('./CartItem')(sequelize, DataTypes),
  Order: require('./Order')(sequelize, DataTypes),
  OrderItem: require('./OrderItem')(sequelize, DataTypes),
  Review: require('./Review')(sequelize, DataTypes),
};

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };