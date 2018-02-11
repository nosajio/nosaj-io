const debug = require('debug')('nosaj:dynamicRoutes');
const error = require('debug')('nosaj:error:dynamicRoutes');
const readPages = require('../lib/dynamicRoutes');
const pageHandler = require('./pages/handler');

module.exports = function dynamicRoutes(app) {
  // Configure routes
  return readPages()
    .then(pages => handleDynamicRoutes(pages, app))
    .catch(err => error(err.message));
}


function handleDynamicRoutes(pages, app) {
  pages.forEach(page => {
    if (! page.meta.method || page.meta.method === 'GET') {
      app.get(page.meta.path, (req, res) => pageHandler(req, res, page));
    } else 
    if (page.method === 'POST') {
      app.post(page.meta.path, (req, res) => page.handler(req, res, page));
    }
    debug('register [%s] %s', page.meta.method || 'GET', page.meta.path)
  });
  return pages;
}
