const router = require('express').Router();
const ctrl = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);
router.get('/', ctrl.getCart);
router.post('/', ctrl.addToCart);
router.put('/items/:itemId', ctrl.updateCartItem);
router.delete('/items/:itemId', ctrl.removeCartItem);
router.delete('/', ctrl.clearCart);

module.exports = router;