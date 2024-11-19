const Product = require('../models/Product');

// Add review
const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;  // Product ID

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      userId: req.user._id, // Assuming the user is authenticated and req.user has the logged-in user info
      rating,
      comment
    };

    product.reviews.push(review);
    await product.save();

    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get reviews for a product
const getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  const { rating, comment, userId } = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    const review = product.reviews.find(review => review._id == req.body.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if the user is the one who added the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only update your own reviews' });
    }

    review.rating = rating;
    review.comment = comment;
    await product.save();
    res.json({ message: 'Review updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const { reviewId, userId } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = product.reviews.find(review => review._id == reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if the user is the one who added the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own reviews' });
    }

    product.reviews = product.reviews.filter(review => review._id != reviewId);
    await product.save();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviews, updateReview, deleteReview };
