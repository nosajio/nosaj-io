require('dotenv').config();
const debug = require('debug')('nosaj:boot');
const error = require('debug')('nosaj:error');

const path = require('path');
const readPages = require('../lib/dynamicRoutes');
const pageHandler = require('./pages/handler');
const handleFaviconRoute = require('./favicon');
const express = require('express');
const app = express();

const { PORT, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const viewsDir = 'views';
const publicDir = 'public';

module.exports = {boot};

function boot() {
  middleware();
  initDynamicRoutes();
  initFaviconRoute();
  // Make HTTP requests automatically redirect to HTTPS
  redirectHTTPToHTTPS();
  app.listen(PORT, () => debug('Listening on http://localhost:%s', PORT));
}

function middleware() {
  // Setup public (assets) directory
  app.use( express.static(path.resolve(__dirname, '../', publicDir)) )
  // Setup templating
  app.set('views', path.resolve(__dirname, '../', viewsDir));
  app.set('view engine', 'pug');
  // To tell pug where to look for includes
  app.locals.basedir = path.resolve(__dirname, '../', viewsDir);
}

function initDynamicRoutes() {
  // Configure routes
  readPages()
    .then(handleDynamicRoutes)
    .then(() => {
      // 404 catch all
      app.use(require('./pages/error404'));
    })
    .catch(err => error(err.message));
}

function handleDynamicRoutes(pages) {
  pages.forEach(p => {
    debug('register %s', p.path)
    app.get(p.path, (req, res) => pageHandler(req, res, p));
  });
  return pages;
}

function initFaviconRoute() {
  debug('Register /favicon.png');
  app.get('/favicon.png', handleFaviconRoute);
}

function redirectHTTPToHTTPS() {
  app.get('*', (req, res, next) => {
    const originalHost = req.headers['x-forwarded-host'] || req.hostname || 'nosaj.io';
    const originalProtocol = req.headers['x-forwarded-protocol'] || req.protocol || 'https';
    const originalURL = req.headers['x-forwarded-url'] || req.originalURL || '';
    const isSecure = originalProtocol === 'https';
    if (! isSecure && isProduction) {
      res.redirect(`https://${originalHost}${originalURL}`);
      return;
    } 
    next();
  });
}
