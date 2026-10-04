module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    role: { type: DataTypes.ENUM('customer', 'admin'), defaultValue: 'customer' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, { timestamps: true });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasOne(models.Cart, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
  };
  return User;
};