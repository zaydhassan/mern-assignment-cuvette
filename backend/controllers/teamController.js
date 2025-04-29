const Invitation = require('../models/Invitation');
const User = require('../models/User');

exports.inviteTeamMember = async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Invitation.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already invited' });

    await Invitation.create({ email, invitedBy: req.user._id });

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const team = await User.find({ adminId: req.user._id });

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeTeamMember = async (req, res) => {
  try {
    const member = await User.findOne({
      _id: req.params.id,
      adminId: req.user._id,
    });

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
