module.exports = injectScripts;

/**
* Inject Scripts
* Will return defined scripts as a String, for use in the <head> of a page
*/

const path = require('path');
const fs = require('fs');

const scriptsRoot = path.resolve('js');

function injectScripts(scripts) {
  if (typeof scripts !== 'object') {
    throw new TypeError('scripts argument should be Array');
  }
  const strings = scripts.map(s => 
    fs.readFileSync(path.resolve(scriptsRoot, s), 'utf8')
  );
  return strings.join('\n');
}
