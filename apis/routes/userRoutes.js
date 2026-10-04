const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');

router.get('/profile', protect, ctrl.getProfile);
router.put('/profile', protect, ctrl.updateProfile);
router.put('/change-password', protect, ctrl.changePassword);

router.get('/stats', protect, isAdmin, ctrl.getStats);
router.get('/', protect, isAdmin, ctrl.getAllUsers);
router.get('/:id', protect, isAdmin, ctrl.getUserById);
router.put('/:id/toggle-status', protect, isAdmin, ctrl.toggleUserStatus);
router.put('/:id/role', protect, isAdmin, ctrl.changeUserRole);

module.exports = router;