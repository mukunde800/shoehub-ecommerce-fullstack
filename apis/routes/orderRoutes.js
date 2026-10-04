const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');

router.post('/', protect, ctrl.createOrder);
router.get('/my-orders', protect, ctrl.getMyOrders);
router.get('/:id', protect, ctrl.getOrderById);
router.get('/', protect, isAdmin, ctrl.getAllOrders);
router.put('/:id/status', protect, isAdmin, ctrl.updateOrderStatus);
router.put('/:id/payment', protect, isAdmin, ctrl.updatePaymentStatus);

module.exports = router;