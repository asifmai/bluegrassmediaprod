const mongoose = require('mongoose');
const StaticContent = require('../models/staticcontent');
const Tag = require('../models/tag');
const Project = require('../models/project');
const Helpitem = require('../models/helpitem');

module.exports.index_get = async (req, res, next) => {
  const static = await StaticContent.find();
  const tags = await Tag.find();
  const helpitems = await Helpitem.find();
  const projects = await Project.find().populate('tags').sort({prioritize: 'desc'}).limit(6).exec();
  res.render('index', {staticcontent: static[0], tags, projects, helpitems});
}

module.exports.getallprojects_get = async (req, res, next) => {
  const static = await StaticContent.find();
  const tags = await Tag.find();
  const projects = await Project.find().populate('tags').sort({prioritize: 'desc'}).skip(6).exec();
  res.status = 200;
  res.json(projects);
}