const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const StaticContent = require('../models/staticcontent');

// DB Config
mongoose.connect(db, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('mongodb connected...')
    const newStaticContent = new StaticContent({
      headerline1: 'Welcome Travellers',
      headerline2: 'We are Tides',
      headertext: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar.',
      contactheader: "We're ready for your call.",
      contacttext: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar.',
      contactaddress: 'York, England',
      contactphone: '+00 (123) 456 78 90',
      contactemail: ' first.last@email.com',
      footertext: '© 2019 Bluegrass Media. All rights reserved.',
    });

    newStaticContent.save();
    console.log('Template static content saved')
  })