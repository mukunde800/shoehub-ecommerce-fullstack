exports.validateRegister = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = [];
  if (!firstName) errors.push('Prénom requis');
  if (!lastName) errors.push('Nom requis');
  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('Email invalide');
  if (!password || password.length < 6) errors.push('Mot de passe min. 6 caractères');
  if (errors.length) return res.status(400).json({ message: errors[0], errors });
  next();
};