const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createTicket,
  getTickets,
  updateStatus,
  assignTicket,
} = require('../controllers/ticketController');

router.route('/').post(protect, createTicket).get(protect, getTickets);
router.put('/:id/status', protect, updateStatus);
router.put('/:id/assign', protect, assignTicket);

module.exports = router;
