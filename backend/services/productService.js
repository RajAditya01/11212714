const axios = require('axios');
const { testServerBaseUrl } = require('../config');
const { getCache, setCache } = require('../utils/cache');

const getProducts = async (categoryname, n, page, filters) => {
  const cacheKey = `products-${categoryname}-${n}-${page}-${JSON.stringify(filters)}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const { minPrice, maxPrice, sortBy, sortOrder } = filters;

  const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  let allProducts = [];

  for (const company of companyNames) {
    const response = await axios.get(`${testServerBaseUrl}/companies/${company}/categories/${categoryname}/products`, {
      params: { top: n, minPrice, maxPrice }
    });
    allProducts = allProducts.concat(response.data);
  }

  if (sortBy) {
    allProducts.sort((a, b) => {
      if (sortOrder === 'desc') {
        return b[sortBy] - a[sortBy];
      }
      return a[sortBy] - b[sortBy];
    });
  }

  const totalProducts = allProducts.length;
  const productsPerPage = Math.min(n, 10);
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentPage = page ? parseInt(page) : 1;

  const paginatedProducts = allProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const response = {
    products: paginatedProducts,
    pagination: {
      totalProducts,
      totalPages,
      currentPage,
      productsPerPage,
    },
  };

  setCache(cacheKey, response);

  return response;
};

const getProductById = async (categoryname, productid) => {
  const cacheKey = `product-${categoryname}-${productid}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  for (const company of companyNames) {
    try {
      const response = await axios.get(`${testServerBaseUrl}/companies/${company}/categories/${categoryname}/products/${productid}`);
      if (response.data) {
        setCache(cacheKey, response.data);
        return response.data;
      }
    } catch (error) {
      continue;
    }
  }
  throw new Error('Product not found');
};

module.exports = {
  getProducts,
  getProductById,
};
