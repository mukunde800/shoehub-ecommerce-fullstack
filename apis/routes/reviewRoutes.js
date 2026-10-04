const router = require('express').Router();
const ctrl = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/product/:productId', ctrl.getProductReviews);
router.post('/', protect, ctrl.createReview);
router.delete('/:id', protect, ctrl.deleteReview);

module.exports = router;