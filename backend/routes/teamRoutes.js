const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware'); 
const {
  inviteTeamMember,
  getTeamMembers,
  removeTeamMember,
} = require('../controllers/teamController'); 

router.post('/invite', protect, isAdmin, inviteTeamMember); 
router.get('/', protect, isAdmin, getTeamMembers);           
router.delete('/:id', protect, isAdmin, removeTeamMember);  

module.exports = router;
