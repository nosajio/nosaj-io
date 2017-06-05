const Uglify = require('uglify-js');

module.exports = injectScripts;

/**
 * Inject Scripts
 * Will return defined scripts as a String, for use in the <head> of a page
 * @return {Promise.<string>}
 */

const path = require('path');
const fs = require('fs');
const prod = process.env.NODE_ENV === 'production';

const scriptsRoot = path.resolve('js');

function injectScripts(scripts) {
  if (typeof scripts !== 'object') {
    throw new TypeError('scripts argument should be Array');
  }
  
  // Read passed script files in to an array
  const strings = scripts.map(s => 
    fs.readFileSync(path.resolve(scriptsRoot, s), 'utf8')
  );
  
  // Concat all scripts from array into one string, and wrap in IIFE expression
  const concatenated = withIIFE( strings.join('\n') );
  
  // Only minify code on production
  if (prod) {
    const minified = Uglify.minify(concatenated);
    return minified.code;
  }
  
  return concatenated;
}

function withIIFE(code) {
  return '(function() {'+ code +'}());';
}
