const Wishlist = require('../models/wishlistModel'); // Assuming you have a Wishlist model
const Product = require('../models/Product');
// Add item to wishlist
const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  // Optionally, check if the product exists before adding to wishlist
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  try {
    // Add productId to the wishlist items array, ensuring no duplicates with $addToSet
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { products: productId } }, // Ensures the product is added only once
      { new: true, upsert: true } // `new` returns the updated document; `upsert` creates a new wishlist if not found
    );

    res.json({ message: 'Item added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all wishlist items
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.json(wishlist.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { items: productId } }, // Removes the item
      { new: true }
    );
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.json({ message: 'Item removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
