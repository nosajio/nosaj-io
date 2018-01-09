const debug = require('debug')('nosaj:injectScripts');
const error = require('debug')('nosaj:error:injectScripts');
const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs')

module.exports = injectScripts;


const projectRoot = path.resolve(__dirname, '../');

/**
 * Inject Scripts
 * Will return defined scripts as a String, for use in the <head> of a page
 * @return {Promise.<string>}
 */
function injectScripts(scripts) {
  if (typeof scripts !== 'object') {
    throw new TypeError('scripts argument should be Array');
  }
  // JS to use when there is a compile error
  const errorJs = '// Error loading scripts';
  
  // Configure the webpack instance
  const entry = scripts[0];
  const configFile = `webpack.${process.env.NODE_ENV}.config.js`
  const webpackConfig = require(path.resolve(__dirname, '../config', configFile));
  const compiler = webpack( webpackConfig(entry) );
  
  // Configure compiler to write to memory so the output can be returned
  const memFS = new MemoryFS();
  compiler.outputFileSystem = memFS;
  
  return new Promise(resolve => {
    // Run the compiler
    compiler.run((err) => {
      if (err) {
        resolve(errorJs)
        error(err);
        return;
      }
      // Get the js file from memory & turn it to a string
      const jsFile = path.resolve(projectRoot, 'main.js');
      const src = memFS.readFileSync(jsFile);
      if (! src) {
        resolve(errorJs);
        error('There was a problem loading the script(s) %s', scripts);
        return;
      }
      // Send the js string to the client
      resolve(src.toString('utf8'));
    });
  });
}
