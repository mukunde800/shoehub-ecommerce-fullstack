const { Review, User, Product } = require('../models');

exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(reviews);
  } catch (e) { next(e); }
};

exports.createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    const exists = await Review.findOne({
      where: { userId: req.user.id, productId },
    });
    if (exists) return res.status(400).json({ message: 'Vous avez déjà noté ce produit' });

    const review = await Review.create({
      userId: req.user.id, productId, rating, comment,
    });

    // Recalcul rating
    const reviews = await Review.findAll({ where: { productId } });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.update(
      { rating: avg, numReviews: reviews.length },
      { where: { id: productId } }
    );

    res.status(201).json(review);
  } catch (e) { next(e); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Avis introuvable' });
    if (review.userId !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Non autorisé' });
    await review.destroy();
    res.json({ message: 'Avis supprimé' });
  } catch (e) { next(e); }
};