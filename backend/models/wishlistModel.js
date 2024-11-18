const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product model
    },
  ],
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
