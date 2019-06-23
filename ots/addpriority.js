const mongoose = require('mongoose');
const Project = require('../models/project');

// DB Config
const db = require('../config/keys.js').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    Project.updateMany({}, {prioritize: false}).then(() => {
      console.log('Priorities set to false');
      mongoose.disconnect();
    })
  })
  .catch(err => console.log('MongoDB Connect Error:', err));
