const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Book', BookSchema);
