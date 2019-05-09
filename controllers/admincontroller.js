const passport = require('passport');

// Show Admin Page
module.exports.index_get = (req, res, next) => {
  res.render('admin/index');
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