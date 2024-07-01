const express = require('express');
const { getProducts, getProductById } = require('./controllers/productController');
const router = express.Router();

router.get('/categories/:categoryname/products', getProducts);
router.get('/categories/:categoryname/products/:productid', getProductById);

module.exports = router;
