const express = require('express');
const { submitFeedback } = require('../controllers/feedbackController');
const validateEmail = require('../middlewares/validateEmail');

const router = express.Router();

router.post('/submit', validateEmail, submitFeedback);

module.exports = router;
