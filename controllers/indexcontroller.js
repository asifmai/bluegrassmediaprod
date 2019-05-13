const mongoose = require('mongoose');
const StaticContent = require('../models/staticcontent');

module.exports.index_get = async (req, res, next) => {
  const static = await StaticContent.find();
  res.render('index', {staticcontent: static[0]});
}