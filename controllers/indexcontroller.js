const mongoose = require('mongoose');
const StaticContent = require('../models/staticcontent');
const Tag = require('../models/tag');
const Project = require('../models/project');

module.exports.index_get = async (req, res, next) => {
  const static = await StaticContent.find();
  const tags = await Tag.find();
  const projects = await Project.find().populate('tags').exec();
  res.render('index', {staticcontent: static[0], tags, projects});
}