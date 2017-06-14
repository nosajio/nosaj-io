module.exports = dynamicRoutes;

const debug = require('debug')('nosaj:dynamicRoutes');
const path = require('path');
const fs = require('fs');
const pagesDir = path.resolve(__dirname, '../pages');

/**
 * Dynamic Routes
 * Configure routes based on the page files in `pagesDir`. This enables routes 
 * to be made from config files.
 * @return {Promise.<pageFiles>}
 */
function dynamicRoutes() {
  return new Promise(resolve => {
    fs.readdir(pagesDir, 'utf8', (err, files) => {
      if (err) throw err;
      const pageFiles = files.map(f => {
        const pageContent = require(path.resolve(pagesDir, f));
        // Run the page function without args to get access to the header content
        const basicPageContent = pageContent();
        // Nest the uncalled content factory within the passed page object
        basicPageContent._page = pageContent;
        return basicPageContent;
      });
      resolve(pageFiles)
    });
  });
}
