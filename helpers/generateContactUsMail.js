const HelpItem = require('../models/helpitem');

module.exports = (contactUsForm) => new Promise(async (resolve, reject) => {
  try {
    const howCanWeHelp = await HelpItem.findById(contactUsForm.howcanwehelpyou);
    const htmlBody = `<table style="width: 100%;"><tbody><tr><td style="text-align: center;"><img src="http://bluegrass.media/images/bluegrassmedialogo.png" alt="Bluegrass.media" width="200"></td></tr><tr><td style="text-align: center;"><h2>Contact Us Form</h2></td></tr></tbody></table><table style="margin: auto; border: 1px solid gainsboro; border-collapse: collapse;"><tbody><colgroup><col width="30%"><col width="70%"></colgroup><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Name:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.name}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Phone:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.phone}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Email:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.email}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Method of Contact:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.methodofcontact}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Date of Contact:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.date}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Time of Contact:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.time}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">How Can We Help:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${howCanWeHelp.text}</td></tr><tr><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">Comments:</td><td style="border: 1px solid gainsboro; padding: 0.2em 1em;">${contactUsForm.comments}</td></tr></tbody></table>`;
    resolve(htmlBody);    
  } catch (error) {
    reject(error);
  };
});