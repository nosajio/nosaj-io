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
  renderStylesheet(`views/errors/${errorType}.scss`)
    .then(stylesheet => {  
      const errorNumber = parseInt(errorType);
      const errorTemplate = {
        head: {
          stylesheet,
          title: 'Error'
        }
      };
      res.status(errorNumber).render(`errors/${errorType}`, errorTemplate);
  })
}
