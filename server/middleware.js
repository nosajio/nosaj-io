const path = require('path');
const express = require('express');
const publicDir = 'public';

module.exports = function middleware(app, viewsDir) {
  // Setup public (assets) directory
  app.use( express.static(path.resolve(__dirname, '../', publicDir)) )
  // Setup templating
  app.set('views', path.resolve(__dirname, '../', viewsDir));
  app.set('view engine', 'pug');
  // To tell pug where to look for includes
  app.locals.basedir = path.resolve(__dirname, '../', viewsDir);
}
