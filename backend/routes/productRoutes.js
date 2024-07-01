const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:categoryname/products', productController.getProducts);
router.get('/:categoryname/products/:productid', productController.getProductById);

module.exports = router;
