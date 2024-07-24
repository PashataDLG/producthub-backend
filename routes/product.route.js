const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
const productController = require('../controllers/product.controller.js')

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/api/products', productController.createProduct);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProduct);