const mongoose = require('mongoose');

const MetatagSchema = new mongoose.Schema({
  name: String,
  content: String,
});

module.exports = mongoose.model('Metatag', MetatagSchema);
