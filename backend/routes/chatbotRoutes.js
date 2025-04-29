const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  getCustomization,
  updateCustomization,
} = require('../controllers/chatbotController');

router
  .route('/customization')
  .get(protect, getCustomization)
  .put(protect, isAdmin, updateCustomization);

module.exports = router;
