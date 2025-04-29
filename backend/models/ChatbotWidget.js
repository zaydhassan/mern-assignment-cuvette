const mongoose = require('mongoose');

const chatbotWidgetSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      enum: ['left', 'right'],
      default: 'right',
    },
    color: {
      type: String,
      default: '#0084ff',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatbotWidget', chatbotWidgetSchema);
