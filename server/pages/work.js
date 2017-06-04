// const debug = require('debug')('nosaj:work');
const content = require('../../content/work')();
const renderStylesheet = require('../../lib/renderStylesheet');
const renderError = require('../../lib/renderError');

module.exports = workHandler;

function workHandler(req, res) {
  renderStylesheet('views/work/work.scss')
    .then((stylesheet) => {
      // Generate styles for each project
      const template = Object.assign(
        {}, 
        content, 
        { head: { stylesheet } }
      );
      res.render('work', template);
    })
    .catch(err => renderError(res, '500', err));
}
