const mongoose = require('mongoose');

const StaticcontentSchema = new mongoose.Schema({
  headerline1: String,
  headerline2: String,
  headertext: String,
  contactheader: String,
  contacttext: String,
  contactaddress: String,
  contactphone: String,
  contactemail: String,
  footertext: String,
});

module.exports = mongoose.model('Staticcontent', StaticcontentSchema);
