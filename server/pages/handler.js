const debug = require('debug')('nosaj:pageHandler');
const renderStylesheet = require('../../lib/renderStylesheet');
const injectScripts = require('../../lib/injectScripts');
const renderError = require('../../lib/renderError');

module.exports = pageHandler;

function pageHandler(req, res, page) {
  debug('Register route: %s', page.path);
  const { stylesheet, scripts, view } = page;
  renderStylesheet(stylesheet)
    .then((styles) => {
      const javascript = scripts && injectScripts(scripts);
      const template = Object.assign(
        {}, 
        page,
        { head: { stylesheet: styles, scripts: javascript || '' } }
      );
      res.render(view, template);
    })
    .catch(err => renderError(res, '500', err));
}
