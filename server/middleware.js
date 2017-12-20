const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const publicDir = 'public';

module.exports = function middleware(app, viewsDir) {
  // Tell express how to handle JSON requests
  app.use( bodyParser.json() );
  // Setup public (assets) directory
  app.use( express.static(path.resolve(__dirname, '../', publicDir)) )
  // Setup templating
  app.set('views', path.resolve(__dirname, '../', viewsDir));
  app.set('view engine', 'pug');
  // To tell pug where to look for includes
  app.locals.basedir = path.resolve(__dirname, '../', viewsDir);
}
