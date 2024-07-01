const productService = require('../services/productService');

exports.getProducts = async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n, page, ...filters } = req.query;
    const response = await productService.getProducts(categoryname, n, page, filters);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { categoryname, productid } = req.params;
    const response = await productService.getProductById(categoryname, productid);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
