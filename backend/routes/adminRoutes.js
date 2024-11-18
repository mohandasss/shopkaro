// routes/adminRoutes.js
const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');
const adminDashboard = require('../controllers/adminController'); // Now importing as a function

const router = express.Router();

router.get('/dashboard', authMiddleware, authorizeRoles('admin'), adminDashboard);

module.exports = router;
