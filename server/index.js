require('dotenv').config();
const debug = require('debug')('nosaj:boot');
const error = require('debug')('nosaj:error');

const path = require('path');
const readPages = require('../lib/dynamicRoutes');
const pageHandler = require('./pages/handler');
const express = require('express');
const app = express();

const { PORT } = process.env;
const viewsDir = 'views';
const publicDir = 'public';

module.exports = {boot};

function boot() {
  middleware();
  routes();
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

function routes() {
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
