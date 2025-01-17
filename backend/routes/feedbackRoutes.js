const express = require('express');
const { sendFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// POST route to submit feedback
router.post('/feedback/submit', sendFeedback);

module.exports = router;
