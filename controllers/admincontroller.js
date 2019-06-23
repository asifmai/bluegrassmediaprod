const passport = require('passport');
const Staticcontent = require('../models/staticcontent');
const Tag = require('../models/tag');
const Project = require('../models/project');
const Helpitem = require('../models/helpitem');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

// Show Admin Page
module.exports.index_get = async (req, res, next) => {
  const static = await Staticcontent.find();
  const helpitems = await Helpitem.find();
  res.render('admin/index', {staticcontent: static[0], helpitems});
}

// Show Admin Login Page
module.exports.login_get = (req, res, next) => {
  res.render('admin/login');
}

// Authenticate Admin
module.exports.login_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: 'The email address or password is incorrect',
  })(req, res, next);
}

// Logout Admin
module.exports.logout_get = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/admin/login');
};

// Update Hero content
module.exports.headerinfo_post = async (req, res, next) => {
  const static = await Staticcontent.find();
  await Staticcontent.findByIdAndUpdate(static[0]._id, {
    headerline1: req.body.headerline1,
    headerline2: req.body.headerline2,
    headertext: req.body.headertext,
  });
  res.redirect('/admin');
};

// Update Contact content
module.exports.contactinfo_post = async (req, res, next) => {
  console.log(req.body)
  const static = await Staticcontent.find();
  await Staticcontent.findByIdAndUpdate(static[0]._id, {
    contactheader: req.body.contactheader,
    contacttext: req.body.contacttext,
    contactaddress: req.body.contactaddress,
    contactphone: req.body.contactphone,
    contactemail: req.body.contactemail,
    contactskype: req.body.contactskype,
  });
  res.redirect('/admin');
};

// Update Footer content
module.exports.footerinfo_post = async (req, res, next) => {
  const static = await Staticcontent.find();
  await Staticcontent.findByIdAndUpdate(static[0]._id, {
    footertext: req.body.footertext,
  });
  res.redirect('/admin');
};

// Update Video Info
module.exports.videoinfo_post = (req, res, next) => {
  const videoFile = req.files.herovideo;
  const filePath = path.resolve(__dirname, '../public/videos/bluegrassmedia.mp4')
  videoFile.mv(filePath, function(err) {
    if (err) console.log(err);
  });
  res.redirect('/admin');
};

// Update Portfolio content
module.exports.portfolioinfo_post = async (req, res, next) => {
  const static = await Staticcontent.find();
  await Staticcontent.findByIdAndUpdate(static[0]._id, {
    portfoliotitle: req.body.portfoliotitle,
    portfolioheader: req.body.portfolioheader,
  });
  res.redirect('/admin');
};

// Show Tags Manager Page
module.exports.tags_get = (req, res, next) => {
  Tag.find().then(data => {
    res.render('admin/tags', {tags: data});
  })
}

// Add tag
module.exports.addtag_post = async (req, res, next) => {
  const tagName = req.body.name.trim();
  const newTag = new Tag({
    name: tagName
  })
  await newTag.save();
  res.redirect('/admin/tags')
}

// Delete tag
module.exports.deletetag_post = async (req, res, next) => {
  const tagId = req.body.tagid
  await Tag.findByIdAndDelete(tagId);
  res.redirect('/admin/tags')
}

// Delete Help item
module.exports.deletehelpitem_post = async (req, res, next) => {
  const itemid = req.params.itemid;
  console.log(itemid);
  await Helpitem.findByIdAndDelete(itemid);
  res.redirect('/admin')
}

// Show Projects Manager Page
module.exports.projects_get = (req, res, next) => {
  Project.find().then((data) => {
    res.render('admin/projects', {projects: data})
  })
}

// Show Add Project Page
module.exports.addproject_get = (req, res, next) => {
  Tag.find().then((data) => {
    res.render('admin/addproject', {tags: data})
  })
}

// Add Project
module.exports.addproject_post = async (req, res, next) => {
  console.log(req.body);
  const rawTags = req.sanitize(req.body.tags);
  let newProject = {
    name: req.sanitize(req.body.name.trim()),
    tags: rawTags.split(','),
    coverimage: req.files.coverimage ? req.files.coverimage.name : '',
    images: [
      req.files.image1 ? req.files.image1.name : '' ,
      req.files.image2 ? req.files.image2.name : '',
      req.files.image3 ? req.files.image3.name: '',
    ],
    // shortdescription: req.sanitize(req.body.shortdescription.trim()),
    description: req.sanitize(req.body.description.trim()),
    address: req.sanitize(req.body.address.trim()),
    // technologies : req.sanitize(req.body.technologies.trim()),
    prioritize: req.body.prioritize ? true : false,
  }
  // if (req.body.date != '') {
  //   newProject.date = new Date(req.sanitize(req.body.date))
  // }
  const createdProject = new Project(newProject);
  createdProject.save().then((proj) => {
    console.log(proj);
    const dirPath = path.resolve(__dirname, `../public/images/uploads/${proj._id}`);
    fs.mkdirSync(dirPath);
    if (req.files) {
      if (req.files.coverimage) {
        const coverImagePath = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.coverimage.name}`);
        const file_img = req.files.coverimage;
        file_img.mv(coverImagePath, (err => console.log(err)));
      }
      if (req.files.image1) {
        const image1Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image1.name}`);
        const file_img = req.files.image1;
        file_img.mv(image1Path, (err => console.log(err)));
      }
      if (req.files.image2) {
        const image2Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image2.name}`);
        const file_img = req.files.image2;
        file_img.mv(image2Path, (err => console.log(err)));
      }
      if (req.files.image3) {
        const image3Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image3.name}`);
        const file_img = req.files.image3;
        file_img.mv(image3Path, (err => console.log(err)));
      }
    }
    res.redirect('/admin/projects')
  })
}

// Delete tag
module.exports.deleteproject_get = async (req, res, next) => {
  const projectId = req.params.projectid
  const dirPath = path.resolve(__dirname, `../public/images/uploads/${projectId}`)
  rimraf.sync(dirPath);
  await Project.findByIdAndDelete(projectId);
  res.redirect('/admin/projects')
}

// Edit Project
module.exports.editproject_get = async (req, res, next) => {
  const foundProject = await Project.findById(req.params.projectid).populate('tags').exec();
  const foundTags = await Tag.find();
  res.render('admin/editproject', {project: foundProject, tags: foundTags});
}


// Edit Project
module.exports.editproject_post = async (req, res, next) => {
  console.log(req.body);
  const rawTags = req.sanitize(req.body.tags);
  let newProject = {
    name: req.sanitize(req.body.name.trim()),
    tags: rawTags.split(','),
    // shortdescription: req.sanitize(req.body.shortdescription.trim()),
    description: req.sanitize(req.body.description.trim()),
    address: req.sanitize(req.body.address.trim()),
    // technologies : req.sanitize(req.body.technologies.trim()),
    prioritize: req.body.prioritize ? true : false,
  }
  if (req.files) {
    if (req.files.coverimage) newProject.coverimage = req.files.coverimage.name
    if (req.files.image1 || req.files.image2 || req.files.image3) {
      newProject.images =[
        req.files.image1 ? req.files.image1.name : '' ,
        req.files.image2 ? req.files.image2.name : '',
        req.files.image3 ? req.files.image3.name: '',
      ] 
    }
  }
  // if (req.body.date != '') {
  //   newProject.date = new Date(req.sanitize(req.body.date))
  // }
  const createdProject = Project.findByIdAndUpdate(req.body.projectid, newProject).then((proj) => {
    // console.log(proj);
    const dirPath = path.resolve(__dirname, `../public/images/uploads/${proj._id}`);
    if (req.files) {
      if (req.files.coverimage) {
        const coverImagePath = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.coverimage.name}`);
        const file_img = req.files.coverimage;
        file_img.mv(coverImagePath, (err => console.log(err)));
      }
      if (req.files.image1) {
        const image1Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image1.name}`);
        const file_img = req.files.image1;
        file_img.mv(image1Path, (err => console.log(err)));
      }
      if (req.files.image2) {
        const image2Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image2.name}`);
        const file_img = req.files.image2;
        file_img.mv(image2Path, (err => console.log(err)));
      }
      if (req.files.image3) {
        const image3Path = path.resolve(__dirname, `../public/images/uploads/${proj._id}/${req.files.image3.name}`);
        const file_img = req.files.image3;
        file_img.mv(image3Path, (err => console.log(err)));
      }
    }
    res.redirect('/admin/projects')
  })
}

// Add a new Help Item
module.exports.addhelpitem_post = async (req, res, next) => {
  console.log(req.body)
  const newHelpItem = new Helpitem({text: req.body.helpitem});
  await newHelpItem.save();
  res.redirect('/admin');
}