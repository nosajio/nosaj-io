const error = require('debug')('nosaj:error')
const renderStylesheet = require('../lib/renderStylesheet');

module.exports = renderError;

/**
 * Render Error
 * Wrapper for serving up error pages
 *
 * @param {http.ServerResponse} res 
 * @param {String} errorType - Name of the error template
 * @param {Error} err (optional) - The original error object
 */
function renderError(res, errorType, err) {
  if (! res || ! errorType) {
    throw new Error('renderError requires res and errorType arguments');
  }
  if (err) {
    error('[%s]: %s', errorType, err.message);
  }
  renderStylesheet('views/errors/500')
    .then(stylesheet => {  
      const errorTemplate = {
        head: {
          stylesheet,
          title: 'Error'
        }
      };
      res.render(`errors/${errorType}`, errorTemplate);
  })
}
