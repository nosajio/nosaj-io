const debug = require('debug')('nosaj:pageHandler');
const renderStylesheet = require('../../lib/renderStylesheet');
const injectScripts = require('../../lib/injectScripts');
const renderError = require('../../lib/renderError');

module.exports = pageHandler;

function pageHandler(req, res, { _page }) {
  // 0. Store request params and querystring in args variable
  const args = Object.assign({}, req.params, req.query);
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
    renderStylesheet(stylesheet, scssVariables, view)
      .then(s => resolvePage(s))
      .catch(err => renderError(res, '500', err));
    
    function resolvePage(styles) {
      const javascript = scripts && injectScripts(scripts);
      const headerFooter = { 
        head: { 
          stylesheet: styles, 
          title,
          ogImage: extractOgImage(resolvedContent),
          ogUrl: requestUrl(req),
          ogDescription: description(resolvedContent),
          iconColor: iconColor(resolvedContent)
        }, 
        footer: { scripts: javascript || false } 
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
          // Pure function need to be ran at runtime
          if (isPureFunction(page[k])) {
            resolvedContent[k] = page[k](page);
          } else {
            resolvedContent[k] = page[k];
          }
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

/**
 * Is this prop a pure function?
 */
function isPureFunction(prop) {
  return null !== prop && typeof prop === 'function' && ! isPromise(prop);
}

function extractOgImage(data) {
  let ogImage = null;
  if (data.post && data.post.coverImg) {
    ogImage = data.post.coverImg;
  }
  return ogImage;
}

function iconColor(data) {
  if (! data.post || ! data.post.coverColor) {
    return null;
  }
  return data.post.coverColor.replace('#', '');
}

function description(data, paragraphs=1) {
  let description = '';
  if (data.post) {
    // Limit post description to n words (max chars alowed in og:spec: 300)
    description = data.post.plain
      .split('\n')
      .slice(0, paragraphs)
      .join('\n');
  }
  return description;
}

function requestUrl(req) {
  const originalHost = req.headers['x-forwarded-host'] || req.hostname || 'nosaj.io';
  const originalProtocol = req.headers['x-forwarded-protocol'] || req.protocol || 'https';
  return originalProtocol + '://' + originalHost + req.originalUrl;
}
