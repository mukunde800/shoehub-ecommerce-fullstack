module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: DataTypes.TEXT,
  }, { timestamps: true });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return Review;
};