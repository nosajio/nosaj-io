const content = require('../content/landing')();
const renderStylesheet = require('../lib/renderStylesheet');
const renderError = require('../lib/renderError');

module.exports = landingHandler;

function landingHandler(req, res) {
  renderStylesheet('views/landing/landing.scss')
    .then((stylesheet) => {
      const template = Object.assign(
        {}, 
        content, 
        { head: { stylesheet } }
      );
      res.render('landing', template);
    })
    .catch(err => renderError(res, '500', err));
}
