const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
});

module.exports = mongoose.model('Tag', TagSchema);
