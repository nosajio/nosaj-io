const debug = require('debug')('nosaj:pageHandler');
const renderStylesheet = require('../../lib/renderStylesheet');
const injectScripts = require('../../lib/injectScripts');
const renderError = require('../../lib/renderError');

module.exports = pageHandler;

function pageHandler(req, res, page) {
  const { stylesheet, scripts, view, title } = page;
  renderStylesheet(stylesheet)
    .then((styles) => {
      const javascript = scripts && injectScripts(scripts);
      const headerFooter = { 
        head: { stylesheet: styles, title }, 
        footer: { scripts: javascript || '' } 
      };
      const template = Object.assign({}, page, headerFooter);
      res.render(view, template);
    })
    .catch(err => renderError(res, '500', err));
}
