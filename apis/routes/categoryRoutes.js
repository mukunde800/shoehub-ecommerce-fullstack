const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uplaodMiddleware');

router.get('/', ctrl.getCategories);
router.get('/:slug', ctrl.getCategoryBySlug);
router.post('/', protect, isAdmin, upload.single('image'), ctrl.createCategory);
router.put('/:id', protect, isAdmin, upload.single('image'), ctrl.updateCategory);
router.delete('/:id', protect, isAdmin, ctrl.deleteCategory);

module.exports = router;