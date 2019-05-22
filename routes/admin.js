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

/* POST - Private - Update Hero Video. */
router.post('/videoinfo', auth.ensureAuthenticatedAdminLogin, adminController.videoinfo_post)

/* GET - Private - Show Tags Manager Page. */
router.get('/tags', auth.ensureAuthenticatedAdmin, adminController.tags_get)

// POST - Private - Add Tag
router.post('/addtag', auth.ensureAuthenticatedAdmin, adminController.addtag_post);

// POST - Private - Delete Tag
router.post('/deletetag', auth.ensureAuthenticatedAdmin, adminController.deletetag_post);

/* GET - Private - Show Projects Manager Page. */
router.get('/projects', auth.ensureAuthenticatedAdmin, adminController.projects_get)

/* GET - Private - Show Add Project Page. */
router.get('/addproject', auth.ensureAuthenticatedAdmin, adminController.addproject_get)

/* POST - Private - Add Project*/
router.post('/addproject',  adminController.addproject_post)

/* POST - Private - Delete Project*/
router.post('/deleteproject', auth.ensureAuthenticatedAdmin, adminController.deleteproject_post)

/* GET - Private - Edit Project*/
router.get('/editproject/:projectid', auth.ensureAuthenticatedAdmin, adminController.editproject_get)

/* POST - Private - Edit Project*/
router.post('/editproject',  adminController.editproject_post)

module.exports = router;
