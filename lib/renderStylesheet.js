const debug = require('debug')('nosaj:css');
const error = require('debug')('nosaj:css:error');
const path = require('path');
const sass = require('node-sass');
const fs = require('fs');

/**
 * Render Stylesheet
 * A easy way to package up a scss file and return it as a big string of CSS.
 * @param {String} !file - location of the .scss file
 * @param {Object} variables - key value list of variables
 */
module.exports = (file, variables) => {
  const includePaths = [ 
    path.resolve(__dirname, '../scss'),
    path.resolve(__dirname, '../') 
  ];
  
  return new Promise((resolve) => {
    const scssVars = variablesToString(variables);
    const scssFile = fs.readFileSync(file, 'utf8');
    sass.render({
      data: `${scssVars}\n${scssFile}`,
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

/**
 * Convert Variables
 * Convert a object of variables into a SCSS compatible string 
 * @param {Object} !variables
 * @returns {String} 
 */
function variablesToString(variables) {
  if (variables === null || typeof variables !== 'object') {
    return '';
  }
  const names = Object.keys(variables);
  if (! names.length) {
    return '';
  }
  const scssVars = names.map(n => `$${n}: ${variables[n]};`).join('\n');
  return scssVars;
}
