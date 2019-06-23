const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  coverimage: String,
  images: [{
    type: String
  }],
  shortdescription: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  address: String,
  technologies: String,
  prioritize: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
