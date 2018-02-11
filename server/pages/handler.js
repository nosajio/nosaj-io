const debug = require('debug')('nosaj:pageHandler');
const error = require('debug')('nosaj:error:pageHandler');
const renderStylesheet = require('../../lib/renderStylesheet');
const renderError = require('../../lib/renderError');
const packageJSON = require('../../package.json');

module.exports = pageHandler;

function pageHandler(req, res, { assets, meta, render }) {
  const args = Object.assign({}, req.params, req.query);
  const rendered = render(args);
  
  if (isPromise(rendered)) {
    rendered
      .then(rp => renderPage(rp, meta, assets))
      .catch(err => renderError(res, err.status, err));
  } else {
    renderPage(rendered, meta, assets);
  }
  
  function renderPage(rendered, meta, assets) {
    // 1. Resolve any dynamic content in the page object
    resolveDynamicContent(rendered)
      // 2. Once resolved, finish processing request
      .then(renderedFinal => handleResolveContent(renderedFinal, meta, assets))
      // 3. Handle errors
      .catch(err => renderError(res, '500', err));
  }
  
  /**
   * Handle Resolve Content
   * Promise handler that runs after all unresolved content has been resolved
   * @param {Object} renderedFinal 
   */
  function handleResolveContent(renderedFinal, meta, assets) {
    const { scripts } = assets;
    const { stylesheet, view } = meta;
    const { title } = renderedFinal;
    renderStylesheet(stylesheet, view)
      .then(s => resolvePage(s))
      .catch(err => renderError(res, '500', err));
    
    function resolvePage(styles) {
      const headerFooter = { 
        head: { 
          stylesheet: styles, 
          title,
          ogImage: extractOgImage(renderedFinal),
          ogUrl: requestUrl(req),
          ogDescription: description(renderedFinal),
        }, 
        footer: { version: packageJSON.version, scripts } 
      };
      const template = Object.assign({}, renderedFinal, headerFooter);
      res.render(view, template);
    }
  }
  
  
  /**
  * Resolve Dynamic Content
  * This enables the use of properties that return promises in the page config files
  * 
  * @param {Object} render - the render object loaded from renders dir
  * @returns {Object} render - same object with resolved content
  */
  function resolveDynamicContent(render) {
    const props = Object.keys(render);
    const resolvedContent = {};
    const asyncProps = [];
    return new Promise(resolve => {
      // First deal with ordinary content, then deal with promises to avoid race conditions
      props.forEach(k => {
        if (! isPromise(render[k])) {
          // Pure function need to be ran at runtime
          if (isPureFunction(render[k])) {
            resolvedContent[k] = render[k](render);
          } else {
            resolvedContent[k] = render[k];
          }
        } else
        if (isPromise(render[k])) {
          asyncProps.push(new Promise(r => {
            render[k].then(ap => r({ [k]: ap }));
          }));
        }
      });
      if (! asyncProps.length) {
        return resolve(resolvedContent);
      }
      Promise
        .all(asyncProps)
        .catch(err => renderError(res, '500', err))
        .then(aps => resolve( Object.assign(resolvedContent, ...aps)) )
        .catch (err => renderError(res, '500', err));
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

// Passed from nginx proxy_pass
function requestUrl(req) {
  const originalHost = req.headers['x-forwarded-host'] || req.hostname || 'nosaj.io';
  const originalProtocol = req.headers['x-forwarded-protocol'] || req.protocol || 'https';
  return originalProtocol + '://' + originalHost + req.originalUrl;
}
