const { Product, Category } = require('../models');
const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  try { res.json(await productService.listProducts(req.query)); }
  catch (e) { next(e); }
};

exports.getProductBySlug = async (req, res, next) => {
  try {
    const p = await Product.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Category }],
    });
    if (!p) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(p);
  } catch (e) { next(e); }
};

exports.getFeatured = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { isFeatured: true, isActive: true },
      limit: 8,
      include: [Category],
    });
    res.json(products);
  } catch (e) { next(e); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    ['sizes', 'colors', 'images'].forEach((k) => {
      if (typeof data[k] === 'string') {
        try { data[k] = JSON.parse(data[k]); } catch { data[k] = []; }
      }
    });
    if (req.files?.length) {
      data.images = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (e) { next(e); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Introuvable' });

    const data = { ...req.body };
    ['sizes', 'colors', 'images'].forEach((k) => {
      if (typeof data[k] === 'string') {
        try { data[k] = JSON.parse(data[k]); } catch {}
      }
    });
    if (req.files?.length) {
      data.images = [...(product.images || []), ...req.files.map((f) => `/uploads/${f.filename}`)];
    }
    await product.update(data);
    res.json(product);
  } catch (e) { next(e); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Introuvable' });
    await p.update({ isActive: false });
    res.json({ message: 'Produit désactivé' });
  } catch (e) { next(e); }
};