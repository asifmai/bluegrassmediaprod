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

module.exports = router;
