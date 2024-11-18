const express = require('express');
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Product reviews
router.post('/:id/review', authMiddleware, addReview);
router.get('/:id/reviews', getReviews);
router.put('/:id/review', authMiddleware, updateReview);
router.delete('/:id/review', authMiddleware, deleteReview);

module.exports = router;
