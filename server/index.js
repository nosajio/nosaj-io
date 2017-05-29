require('dotenv').config();
const path = require('path');
const debug = require('debug')('nosaj:boot');
const express = require('express');
const app = express();

const { PORT } = process.env;
const viewsDir = 'views';

module.exports = {boot};

function boot() {
  middleware();
  routes();
  app.listen(PORT, () => debug('Listening on http://localhost:%s', PORT));
}


function middleware() {
  app.set('views', path.resolve(__dirname, '../', viewsDir));
  app.set('view engine', 'pug');
  // To tell pug where to look for includes
  app.locals.basedir = path.resolve(__dirname, '../', viewsDir);
}

function routes() {
  app.use('/', require('./landing'));
}
