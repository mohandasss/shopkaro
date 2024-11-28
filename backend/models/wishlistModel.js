
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of Product IDs
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
