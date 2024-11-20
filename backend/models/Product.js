const mongoose = require('mongoose');
const User = require("../models/User");
const Category = require("../models/categoryModel"); // Import Category model

const productSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Optional, as _id is automatically unique
    unique: true, 
    default: function () { return this._id; } 
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId,  // Reference to Category model
    ref: 'Category',  // Link to Category model
    required: true // Ensure each product has a category
  },
  quantity: { type: Number, default: 0 },
  imageURL: { type: String },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true }
    }
  ],
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
