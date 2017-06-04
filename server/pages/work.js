// const debug = require('debug')('nosaj:work');
const content = require('../../content/work')();
const renderStylesheet = require('../../lib/renderStylesheet');
const injectScripts = require('../../lib/injectScripts');
const renderError = require('../../lib/renderError');

module.exports = workHandler;

function workHandler(req, res) {
  renderStylesheet('views/work/work.scss')
    .then((stylesheet) => {
      const scripts = injectScripts(['work.js']);
      const template = Object.assign(
        {}, 
        content, 
        { head: { stylesheet, scripts } }
      );
      res.render('work', template);
    })
    .catch(err => renderError(res, '500', err));
}
