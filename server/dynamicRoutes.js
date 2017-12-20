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
  pages.forEach(p => {
    if (! p.method || p.method === 'GET') {
      app.get(p.path, (req, res) => pageHandler(req, res, p));
    } else 
    if (p.method === 'POST') {
      app.post(p.path, (req, res) => p.handler(req, res, p));
    }
    debug('register [%s] %s', p.method || 'GET', p.path)
  });
  return pages;
}
