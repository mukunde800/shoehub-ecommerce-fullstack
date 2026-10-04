const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Non authentifié' });

    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    if (!user || !user.isActive) return res.status(401).json({ message: 'Utilisateur invalide' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};