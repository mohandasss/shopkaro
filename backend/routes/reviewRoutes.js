const express = require('express');
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Product reviews
router.post('/:id', authMiddleware, addReview);
router.get('/:id', getReviews);
router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
