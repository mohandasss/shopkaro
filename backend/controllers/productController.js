const Product = require('../models/Product');
const Category = require('../models/categoryModel');
const cloudinary = require('../config/cloudinaryConfig');  // If using CommonJS

// Add Product
const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, rating, userId } = req.body;

  // Ensure image is in the form data (it should be part of the request)
  const imageFile = req.files?.imageURL; // If using `express-fileupload` or `multer` for file uploads

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and Price are required fields.' });
  }

  if (!imageFile) {
    return res.status(400).json({ error: 'Image is required.' });
  }

  try {
    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);

    // Create new Product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      rating,
      userId,
      imageURL: uploadResponse.secure_url,  // Store the image URL from Cloudinary
    });

    // Save product to DB
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    // Destructure query parameters with defaults for page and limit
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default to 6 items per page

    // Calculate the skip value based on page and limit
    const skip = (page - 1) * limit;

    // Fetch products with pagination (using limit and skip)
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    // Count the total number of products (for pagination UI)
    const totalProducts = await Product.countDocuments();

    // Calculate total pages (use ceiling to get a whole number of pages)
    const totalPages = Math.ceil(totalProducts / limit);

    // Send the response with products and pagination info
    res.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
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
      name: new RegExp(query, "i")
    });

    // Search Categories
    const categories = await Category.find({
      name: new RegExp(query, "i")
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
