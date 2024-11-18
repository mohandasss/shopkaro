const { authMiddleware } = require('../middlewares/authMiddleware');
const { updateUserProfile } = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.put('/:id', authMiddleware, updateUserProfile);
module.exports = router;
