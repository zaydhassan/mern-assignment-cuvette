const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  sendMessage,
  getChatHistory,
  markAsMissed,
  assignChat,
} = require('../controllers/chatController');

router.route('/:ticketId').post(protect, sendMessage).get(protect, getChatHistory);
router.put('/:ticketId/missed', protect, markAsMissed);
router.put('/:ticketId/assign', protect, isAdmin, assignChat);

module.exports = router;
