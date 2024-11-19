const mongoose = require('mongoose');
const User = require("../models/User");

const productSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Reference to Product model (this is optional, as each document already has an _id) 
    unique: true, 
    default: function () { return this._id; } // Set productId to be the same as _id by default
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
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
  timestamps: true // Add timestamps for creation and update time
});

module.exports = mongoose.model('Product', productSchema);
