const debug = require('debug')('nosaj:pageHandler');
const renderStylesheet = require('../../lib/renderStylesheet');
const injectScripts = require('../../lib/injectScripts');
const renderError = require('../../lib/renderError');

module.exports = pageHandler;

function pageHandler(req, res, { _page }) {
  // 0. Store request params in args variable
  const args = req.params;
  // Call the original page factory, this time with args
  const pageWithArgs = _page(args);
  if (isPromise(pageWithArgs)) {
    pageWithArgs.then(renderPage);
  } else {
    renderPage(pageWithArgs);
  }
  
  function renderPage(page) {
    // 1. Resolve any dynamic content in the page object
    resolveDynamicContent(page)
      // 2. Once resolved, finish processing request
      .then(handleResolveContent)
      // 3. Handle errors
      .catch(err => renderError(res, '500', err));
  }
  
  /**
   * Handle Resolve Content
   * Promise handler that runs after all unresolved content has been resolved
   * @param {Object} resolvedContent 
   */
  function handleResolveContent(resolvedContent) {
    const { stylesheet, scripts, view, title, scssVariables } = resolvedContent;
    renderStylesheet(stylesheet, scssVariables)
      .then(s => resolvePage(s))
      .catch(err => renderError(res, '500', err));
    
    function resolvePage(styles) {
      const javascript = scripts && injectScripts(scripts);
      const headerFooter = { 
        head: { 
          stylesheet: styles, 
          title,
          ogImage: extractOgImage(resolvedContent),
          ogUrl: requestUrl(req)
        }, 
        footer: { scripts: javascript || '' } 
      };
      const template = Object.assign({}, resolvedContent, headerFooter);
      res.render(view, template);
    }
  }
  
  
  /**
  * Resolve Dynamic Content
  * This enables the use of properties that return promises in the page config files
  * 
  * @param {Object} page - the page object loaded from pages dir
  * @returns {Object} page - same object with resolved content
  */
  function resolveDynamicContent(page) {
    const props = Object.keys(page);
    const resolvedContent = {};
    let resolvedCount = 0;
    const promisesCount = props.filter(k => isPromise(page[k])).length;
    return new Promise(resolve => {
      // First deal with ordinary content, then deal with promises to avoid race conditions
      props.forEach(k => {
        if (! isPromise(page[k])) {
          resolvedContent[k] = page[k];
        }
      });
      // If there are no unresolved promises, resolve here
      if (! promisesCount) {
        return resolve(resolvedContent);
      }
      // Finally handle dynamic content, and don't resolve until everything has been handled
      props.forEach(k => {
        if (isPromise(page[k])) {
          // Pass route params to the page on instantiation
          page[k].then(content => {
            resolvedContent[k] = content;
            resolvedCount ++;
            // Only resolve once all dynamic content has been resolved
            if (resolvedCount === promisesCount) {
              resolve(resolvedContent);
            }
          })
          // Catch errors & return 500
          .catch(err => renderError(res, '500', err));
        }
      });
    });
  }
}

/**
 * Is the prop a promise?
 */
function isPromise(prop) {
  return null !== prop && typeof prop === 'object' && 'then' in prop;
}

function extractOgImage(data) {
  let ogImage = null;
  if (data.post && data.post.coverImg) {
    ogImage = data.post.coverImg;
  }
  return ogImage;
}

function requestUrl(req) {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}
