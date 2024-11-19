const Product = require('../models/Product');
const Category = require('../models/categoryModel');

// Add Product
// Add Product (with optional userId)
const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, imageURL, rating, userId } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and Price are required fields.' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      imageURL,
      rating,
      userId, // Optional field if you want to associate the product with a user
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product By Id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, quantity, imageURL, rating } = req.body;
  
  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category, quantity, imageURL, rating }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search API for Products and Categories
const search = async (req, res) => {
  const { query } = req.query; // Search query parameter

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Search Products
    const products = await Product.find({
      $text: { $search: query }, // Text search for product fields (name, description, etc.)
    });

    // Search Categories
    const categories = await Category.find({
      $text: { $search: query }, // Text search for category name and description
    });

    // Return combined results
    res.json({ products, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  search, // Export the new search function
};
