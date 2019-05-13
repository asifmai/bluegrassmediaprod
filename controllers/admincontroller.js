const passport = require('passport');
const Staticcontent = require('../models/staticcontent');

// Show Admin Page
module.exports.index_get = (req, res, next) => {
  Staticcontent.find().then(data => {
    res.render('admin/index', {staticcontent: data[0]});
  })
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