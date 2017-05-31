const error = require('debug')('nosaj:css:error');
const path = require('path');
const sass = require('node-sass');

/**
 * Render Stylesheet
 * A easy way to package up a scss file and return it as a big string of CSS.
 * @param {String} file - location of the .scss file
 */
module.exports = (file) => {
  const includePaths = [ 
    path.resolve(__dirname, '../scss'),
    path.resolve(__dirname, '../') 
  ];
  
  return new Promise((resolve) => {
    sass.render({
      file: file,
      outputStyle: 'compressed',
      includePaths,
    }, (err, result) => {
      if (err) {
        error(err.message);
        error('%s:%s:%s', err.file, err.line, err.column);
        return;
      }
      // Return the stylesheet
      resolve(result.css);
    });
  });
}
