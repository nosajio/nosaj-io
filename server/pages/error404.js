/**
 * Error 404 handler
 */

const renderError = require('../../lib/renderError');

module.exports = (req, res) => {
  renderError(res, '404', new Error(`[404] ${req.url}`));
}
