const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');

/* GET home page. */
router.get('/', indexController.index_get);

/* GET All Projects */
router.get('/getallprojects', indexController.getallprojects_get);

/* GET Single Project Page */
router.get('/project/:projectid', indexController.project_get);

module.exports = router;
