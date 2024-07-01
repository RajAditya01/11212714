const axios = require('axios');
const cache = require('../utils/cache');

// Define company API base URLs
const ecomApis = {
  'AMZ': 'http://20.244.56.144/test/companies/AMZ/categories',
  'FLP': 'http://20.244.56.144/test/companies/FLP/categories',
  'SNP': 'http://20.244.56.144/test/companies/SNP/categories',
  'MYN': 'http://20.244.56.144/test/companies/MYN/categories',
  'AZO': 'http://20.244.56.144/test/companies/AZO/categories'
};

const fetchProducts = async (category, minPrice = 0, maxPrice = Infinity) => {
  const cacheKey = `${category}-${minPrice}-${maxPrice}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Create requests for all company APIs
    const requests = Object.keys(ecomApis).map(company =>
      axios.get(`${ecomApis[company]}/${category}/products/top-10`, {
        params: {
          minPrice,
          maxPrice
        }
      })
    );

    // Await all requests
    const responses = await Promise.all(requests);

    // Extract products from responses
    const products = responses.flatMap(response => response.data.products);

    // Cache the result
    cache.set(cacheKey, products);

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

module.exports = { fetchProducts };
