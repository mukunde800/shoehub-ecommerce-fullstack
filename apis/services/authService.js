const { User, Cart } = require('../models');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { signToken } = require('../utils/jwt');

exports.registerUser = async ({ firstName, lastName, email, password }) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw { status: 400, message: 'Cet email est déjà utilisé' };

  const hashed = await hashPassword(password);
  const user = await User.create({ firstName, lastName, email, password: hashed });
  await Cart.create({ userId: user.id });

  const token = signToken(user.id, user.role);
  return {
    token,
    user: { id: user.id, email: user.email, firstName, lastName, role: user.role },
  };
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.password)))
    throw { status: 401, message: 'Identifiants invalides' };
  if (!user.isActive) throw { status: 403, message: 'Compte désactivé' };

  const token = signToken(user.id, user.role);
  return {
    token,
    user: {
      id: user.id, email: user.email, firstName: user.firstName,
      lastName: user.lastName, role: user.role,
    },
  };
};