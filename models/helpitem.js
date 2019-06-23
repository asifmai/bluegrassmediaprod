const mongoose = require('mongoose');

const HelpitemSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model('Helpitem', HelpitemSchema);
