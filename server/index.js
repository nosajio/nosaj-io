require('dotenv').config();
const debug = require('debug')('nosaj:boot');
const error = require('debug')('nosaj:error');

const express = require('express');
const app = express();

const middleware = require('./middleware');
const dynamicRoutes = require('./dynamicRoutes');

const { PORT } = process.env;
const viewsDir = 'views';

module.exports = {boot};

function boot() {
  
  // Configure middleware
  middleware(app, viewsDir);
  
  // Setup dynamic routes in the /pages directory.
  // This method will configure all the routes, associate the routes and views,
  // and then inject all data inside the page file into the template.
  dynamicRoutes(app)
    .then(() => {
      // 404 Catch all
      app.use(require('./pages/error404'));
    });
  
  
  // Finally, listen to $PORT for requests...
  app.listen(PORT, () => debug('Listening on http://localhost:%s', PORT));
}
