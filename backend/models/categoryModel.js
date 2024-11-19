const mongoose = require('mongoose');
const Product = require("../models/Product");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Ensure the category name is unique
    trim: true,    // Automatically trim extra spaces
  },
  description: {
    type: String,
    trim: true,    // Trim extra spaces from the description
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,  // Array of ObjectIds referencing the Product model
      ref: 'Product'  // Link to the Product model
    }
  ],
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
