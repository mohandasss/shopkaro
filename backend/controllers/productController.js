const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, imageURL, rating } = req.body;


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


const searchProducts = async (req, res) => {
  const { query } = req.query; 

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(products);
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
  searchProducts
};
