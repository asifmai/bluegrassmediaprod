const mongoose = require('mongoose');

const StaticcontentSchema = new mongoose.Schema({
  headerline1: String,
  headerline2: String,
  headertext: String,
  portfoliotitle: String,
  portfolioheader: String,
  contactheader: String,
  contacttext: String,
  contactaddress: String,
  contactphone: String,
  contactemail: String,
  contactskype: String,
  footertext: String,
});

module.exports = mongoose.model('Staticcontent', StaticcontentSchema);
