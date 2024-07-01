const { fetchProducts } = require('../services/productService');

const getProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { n = 10, page = 1, sort, order } = req.query;

  try {
    let products = await fetchProducts(categoryname);

    // Sort products
    if (sort) {
      products.sort((a, b) => {
        if (order === 'desc') {
          return b[sort] - a[sort];
        }
        return a[sort] - b[sort];
      });
    }

    // Pagination
    const startIndex = (page - 1) * n;
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(n));

    // Add custom unique identifier
    const result = paginatedProducts.map((product, index) => ({
      ...product,
      id: `${categoryname}-${startIndex + index}`
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  const { categoryname, productid } = req.params;
  try {
    const products = await fetchProducts(categoryname);
    const product = products.find(p => `${categoryname}-${p.id}` === productid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = { getProducts, getProductById };
