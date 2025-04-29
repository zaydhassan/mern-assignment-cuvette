const ChatbotWidget = require('../models/ChatbotWidget');

exports.getCustomization = async (req, res) => {
  try {
    const customization = await ChatbotWidget.findOne();
    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    res.status(200).json(customization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomization = async (req, res) => {
  const { position, color } = req.body;

  try {
    let customization = await ChatbotWidget.findOne();
    if (!customization) {
      customization = await ChatbotWidget.create({ position, color });
    } else {
      customization.position = position;
      customization.color = color;
      await customization.save();
    }

    res.status(200).json(customization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
