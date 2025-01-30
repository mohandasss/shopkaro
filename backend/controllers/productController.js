const Product = require('../models/Product');
const Category = require('../models/categoryModel');
const cloudinary = require('../config/cloudinaryConfig');  // If using CommonJS

// Add Product
const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, rating, userId } = req.body;
console.log(category);

  // Ensure image is in the form data
  const imageFile = req.files?.imageURL; // Ensure this matches the key in FormData

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and Price are required fields.' });
  }

  if (!imageFile) {
    return res.status(400).json({ error: 'Image is required.' });
  }

  try {
    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "products", // Optional: Organize files in a folder
    });

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
    // Destructure query parameters with defaults for page, limit, and sort
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default to 6 items per page
    const sortBy = req.query.sortBy || 'name'; // Default to sorting by 'name'
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Default to ascending order

    // Calculate the skip value based on page and limit
    const skip = (page - 1) * limit;

    // Fetch products with pagination and sorting
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }); // Apply sorting based on 'sortBy' and 'sortOrder'

    // Count the total number of products (for pagination UI)
    const totalProducts = await Product.countDocuments();

    // Calculate total pages (use ceiling to get a whole number of pages)
    const totalPages = Math.ceil(totalProducts / limit);

    // Send the response with products, sorting, and pagination info
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

const getAllProductsAtOnce = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send the response with the full list of products
    res.json({
      products,
      totalProducts: products.length, // Count of total products
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
    
    const products = await Product.find({
      name: new RegExp(query, "i")
    });

    
    const categories = await Category.find({
      name: new RegExp(query, "i")
    });

   
    res.json({ products, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// search API

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  search,
  getAllProductsAtOnce // Export the new search function
};
