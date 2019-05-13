const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const auth = require('../config/auth');

/* GET - Private - Admin home page. */
router.get('/', auth.ensureAuthenticatedAdmin, adminController.index_get)

/* GET - Public - Admin login page. */
router.get('/login', auth.ensureAuthenticatedAdminLogin, adminController.login_get)

/* POST - Private - Authenticate Admin. */
router.post('/login', adminController.login_post)

/* GET - Private - Logout Admin. */
router.get('/logout', auth.ensureAuthenticatedAdminLogin, adminController.logout_get)

/* POST - Private - Update Hero Section Content. */
router.post('/headerinfo', auth.ensureAuthenticatedAdminLogin, adminController.headerinfo_post)

/* POST - Private - Update Contact Us Content. */
router.post('/contactinfo', auth.ensureAuthenticatedAdminLogin, adminController.contactinfo_post)

/* POST - Private - Update Footer Content. */
router.post('/footerinfo', auth.ensureAuthenticatedAdminLogin, adminController.footerinfo_post)

module.exports = router;
