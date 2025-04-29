const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/overview', protect, isAdmin, (req, res) => {
  
  const analyticsData = {
    totalUsers: 1000,
    totalTickets: 250,
    totalTeams: 10,
  };

  res.status(200).json({
    message: 'Analytics Overview',
    data: analyticsData,
  });
});

router.get('/tickets', protect, isAdmin, (req, res) => {
 
  const ticketData = {
    openTickets: 120,
    resolvedTickets: 130,
  };

  res.status(200).json({
    message: 'Ticket Analytics',
    data: ticketData,
  });
});


router.get('/teams', protect, isAdmin, (req, res) => {
  const teamData = {
    activeTeams: 8,
    inactiveTeams: 2,
  };

  res.status(200).json({
    message: 'Team Analytics',
    data: teamData,
  });
});

module.exports = router;
