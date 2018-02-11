module.exports = dynamicRoutes;

const debug = require('debug')('nosaj:dynamicRoutes');
const path = require('path');
const fs = require('fs');
const pagesDir = path.resolve(__dirname, '../pages');

function preparePages(pages) {
  const pageTasks = pages.map(page => preparePageObject(page));
  return Promise.all(pageTasks);
}

function preparePageObject(page) {
  const preparedPage = Object.assign({
    assets: {},
    meta: {},
    render: null,
  }, page);
  
  return new Promise((resolve, reject) => {
    // Anything in the assets object will be processed here on boot
    if (! page.assets) {
      return resolve(preparedPage);
    }

    const assetsEntries = Object.entries(page.assets);
    const assetProcessors = assetsEntries.map(([key, processor]) =>
      processor.then(asset => ({ [key]: asset }))
    );
    Promise.all(assetProcessors).then(assets => {
      Object.assign(preparedPage.assets, ...assets);
      resolve(preparedPage);
    });
  });
}

/**
 * Dynamic Routes
 * Configure routes based on the page files in `pagesDir`. This enables routes 
 * to be made from config files.
 * @return {Promise.<pageFiles>}
 */
function dynamicRoutes() {
  return new Promise(resolve => {
    fs.readdir(pagesDir, 'utf8', (err, files) => {
      if (err) throw err;
      const pageFiles = files.map(f => {
        const pageObject = require(path.resolve(pagesDir, f));
        return pageObject;
        // First, check for the presence of the assets object so it can be prefilled
        // if (typeof pageObject === 'object' && pageObject.assets) {
        //   const renderedAssets = {};
        //   const assetRenderers = Object.entries(pageObject.assets).map(([key, func]) => {
        //     func.then(val => renderedAssets[key] = val);
        //   });
        //   Promise.all(assetRenderers)
        //     .then(() => {
        //       const pageWithAssets = Object.assign({}, pageObject, { assets: renderedAssets });
        //       debug(pageWithAssets)
        //       resolve(pageWithAssets);
        //     });
        // } else {

        // }

        // // Run the page function without args to get access to the header content
        // const softRender = pageObject.render ? pageObject.render() : pageObject();
        // // Nest the uncalled content factory within the passed page object so 
        // // that it can be called again with arguments. This is useful for when 
        // // dynamic content is needed for the page. ie. a blog post.
        // softRender._page = pageObject;
        // return softRender;
      });
      preparePages(pageFiles).then(pages => resolve(pages));
    });
  });
}
