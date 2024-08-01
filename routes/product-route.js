const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller.js');
const validateProduct = require('../middlewares/validateProduct.js');
const authenticate = require('../middlewares/auth.js');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authenticate, validateProduct, productController.createProduct);
router.put('/:id', authenticate, validateProduct, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;