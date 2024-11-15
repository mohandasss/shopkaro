// controllers/productController.js
const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, imageURL, rating } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      imageURL,
      rating,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};
