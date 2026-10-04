const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uplaodMiddleware');

router.get('/', ctrl.getProducts);
router.get('/featured', ctrl.getFeatured);
router.get('/:slug', ctrl.getProductBySlug);

router.post('/', protect, isAdmin, upload.array('images', 5), ctrl.createProduct);
router.put('/:id', protect, isAdmin, upload.array('images', 5), ctrl.updateProduct);
router.delete('/:id', protect, isAdmin, ctrl.deleteProduct);

module.exports = router;