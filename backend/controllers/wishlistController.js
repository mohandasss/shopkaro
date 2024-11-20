const Wishlist = require("../models/wishlistModel");
const Product = require("../models/Product");

// Add item to wishlist
const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Ensure the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create the wishlist for the user
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId }, // Match wishlist by user ID
      { $addToSet: { products: productId } }, // Add product to the list, avoiding duplicates
      { new: true, upsert: true } // Create a new wishlist if none exists
    );

    res.status(200).json({ message: 'Item added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Get all wishlist items for a user
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json({ message: 'Wishlist retrieved', products: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Remove the product from the user's wishlist
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } }, // Removes the product from the array
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
