// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  imageURL: { type: String },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
