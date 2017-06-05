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
      const pageFiles = files.map(f => 
        require(path.resolve(pagesDir, f))()
      );
      resolve(pageFiles)
    });
  });
}
