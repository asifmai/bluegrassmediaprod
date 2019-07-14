const mongoose = require('mongoose');
const StaticContent = require('../models/staticcontent');
const Tag = require('../models/tag');
const Metatag = require('../models/metatag');
const Project = require('../models/project');
const Helpitem = require('../models/helpitem');
const mailer = require('../helpers/mailer');
const projectsController = require('../controllers/projectscontroller');
const projectsLimit = 8;

module.exports.index_get = async (req, res, next) => {
  const static = await StaticContent.find();
  const tags = await Tag.find();
  const helpitems = await Helpitem.find();
  // const projects = await Project.find().populate('tags').sort({prioritize: 'desc'}).exec();
  const projectsReturn = await projectsController.getprojects(1, projectsLimit);
  const metatags = await Metatag.find();
  res.render('index', {staticcontent: static[0], tags, projects: projectsReturn.projects, helpitems, metatags, pages: projectsReturn.pages});
}

module.exports.getprojects_get = async (req, res, next) => {
  const pageNo = Number(req.params.pagenumber);
  const projectsReturn = await projectsController.getprojects(pageNo , projectsLimit);
  res.status = 200;
  res.json(projectsReturn);
}

module.exports.project_get = async (req, res, next) => {
  const projectid = req.params.projectid;
  const projectInfo = await Project.findById(projectid);
  res.render('project', {project: projectInfo});
}

module.exports.contactus_post = (req, res, next) => {
  console.log(req.body);
  mailer.sendContactUsMail(req.body);
  req.flash('success_msg', 'Thank you for contacting us. We will get back to you shortly!')
  res.redirect('/');
}