const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');

/* GET home page. */
router.get('/', indexController.index_get);

/* GET Projects */
router.get('/getprojects/:pagenumber', indexController.getprojects_get);

/* GET Single Project Page */
router.get('/project/:projectid', indexController.project_get);

// POST Send Contact Us Mail
router.post('/contactus', indexController.contactus_post)
module.exports = router;
