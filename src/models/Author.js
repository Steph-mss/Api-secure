const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  birthYear: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Author', AuthorSchema);
