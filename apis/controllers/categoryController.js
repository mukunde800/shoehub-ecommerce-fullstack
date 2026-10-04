const { Category, Product } = require('../models');

exports.getCategories = async (req, res, next) => {
  try {
    const cats = await Category.findAll({
      where: { isActive: true },
      include: [{ model: Product, attributes: ['id'] }],
    });
    res.json(cats);
  } catch (e) { next(e); }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const cat = await Category.findOne({ where: { slug: req.params.slug } });
    if (!cat) return res.status(404).json({ message: 'Catégorie introuvable' });
    res.json(cat);
  } catch (e) { next(e); }
};

exports.createCategory = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    const cat = await Category.create(data);
    res.status(201).json(cat);
  } catch (e) { next(e); }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Introuvable' });
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    await cat.update(data);
    res.json(cat);
  } catch (e) { next(e); }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Introuvable' });
    await cat.update({ isActive: false });
    res.json({ message: 'Catégorie désactivée' });
  } catch (e) { next(e); }
};