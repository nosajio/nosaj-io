const content = require('../../content/work')();
const renderStylesheet = require('../../lib/renderStylesheet');
const renderError = require('../../lib/renderError');

module.exports = landingHandler;

function landingHandler(req, res) {
  renderStylesheet('views/work/work.scss')
    .then((stylesheet) => {
      const template = Object.assign(
        {}, 
        content, 
        { head: { stylesheet } }
      );
      res.render('work', template);
    })
    .catch(err => renderError(res, '500', err));
}
