module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    description: DataTypes.TEXT,
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discountPrice: DataTypes.DECIMAL(10, 2),
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    brand: DataTypes.STRING,
    sizes: { type: DataTypes.JSON, defaultValue: [] },
    colors: { type: DataTypes.JSON, defaultValue: [] },
    images: { type: DataTypes.JSON, defaultValue: [] },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    timestamps: true,
    hooks: {
      beforeValidate: (product) => {
        if (product.name && !product.slug) {
          product.slug = product.name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();
        }
      },
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.hasMany(models.Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
  };
  return Product;
};