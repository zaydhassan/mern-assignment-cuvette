const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;

  try {
    
    let assignedTo = req.user._id;
    if (req.user.role === 'team') {
      assignedTo = req.user.adminId;
    }

    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id,
      assignedTo,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  const { status, search, page = 1, limit = 5 } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (req.user.role === 'team') {
    query.$or = [{ createdBy: req.user._id }, { assignedTo: req.user._id }];
  }

  try {
    const tickets = await Ticket.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Ticket.countDocuments(query);

    res.json({
      tickets,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignTicket = async (req, res) => {
  const { assignedTo } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.assignedTo = assignedTo;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
