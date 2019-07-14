const Project = require('../models/project');

module.exports.getprojects = (pageNumber, itemsLimit) => new Promise(async (resolve, reject) => {
  try {
    const pageNo = Number(pageNumber);
    const itemsLim = Number(itemsLimit);
    const query = Project.find().populate('tags').sort({prioritize: 'desc'});
    Project.paginate(query, {page: pageNo, limit: itemsLimit}).then((resp) => {
      const returnObj = {
        projects: resp.docs,
        pages: resp.pages,
      }
      resolve(returnObj);
    })
  } catch (error) {
    console.log(`getprojects Error: ${error}`);
    reject(error);
  }
});