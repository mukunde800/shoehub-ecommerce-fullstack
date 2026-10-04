module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, unique: true },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    timestamps: true,
    hooks: {
      beforeValidate: (cat) => {
        if (cat.name && !cat.slug) {
          cat.slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
      },
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
  };
  return Category;
};