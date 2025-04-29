const Chat = require('../models/Chat');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  const { ticketId } = req.params;

  try {
    
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

   
    const chatMessage = await Chat.create({
      ticketId,
      senderId: req.user._id,
      message,
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const chats = await Chat.find({ ticketId })
      .populate('senderId', 'name email')
      .sort({ timestamp: 1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsMissed = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const chats = await Chat.find({ ticketId, isRead: false });

    // Mark chats as missed if no response within timeout period
    if (chats.length > 0) {
      await Chat.updateMany({ ticketId }, { missed: true });

      res.status(200).json({ message: 'Marked as missed' });
    } else {
      res.status(404).json({ message: 'No unread chats found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignChat = async (req, res) => {
  const { ticketId } = req.params;
  const { assignedTo } = req.body;

  try {
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const chats = await Chat.find({ ticketId });
    if (!chats) {
      return res.status(404).json({ message: 'Chat history not found' });
    }

    await Chat.updateMany({ ticketId }, { $set: { assignedTo } });

    res.status(200).json({ message: 'Chat assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
