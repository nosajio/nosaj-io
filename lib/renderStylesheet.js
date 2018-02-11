const debug = require('debug')('nosaj:css');
const error = require('debug')('nosaj:css:error');
const path = require('path');
const sass = require('node-sass');
const fs = require('fs');

/**
 * Render Stylesheet
 * A easy way to package up a scss file and return it as a big string of CSS.
 * @param {String} !file - location of the .scss file
 * @param {String} viewName - the name of the current view, for imports
 */
module.exports = (file, viewName='') => {
  const includePaths = [ 
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../scss'),
    path.resolve(__dirname, '../'),
    path.resolve(__dirname, '../views', viewName)
  ];
  
  return new Promise((resolve) => {
    const scssFile = fs.readFileSync(file, 'utf8');
    sass.render({
      data: scssFile,
      outputStyle: 'compressed',
      includePaths,
    }, (err, result) => {
      if (err) {
        // Soft error - return to the log & timeout the request
        error(err.message);
        error('%s:%s:%s', err.file, err.line, err.column);
        return;
      }
      // Return the stylesheet
      resolve(result.css);
    });
  });
}