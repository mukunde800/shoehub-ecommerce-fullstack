exports.validateProduct = (req, res, next) => {
  const { name, price, categoryId } = req.body;
  const errors = [];
  if (!name) errors.push('Nom requis');
  if (!price || isNaN(price)) errors.push('Prix invalide');
  if (!categoryId) errors.push('Catégorie requise');
  if (errors.length) return res.status(400).json({ message: errors[0], errors });
  next();
};