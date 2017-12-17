const path = require('path');
const fs = require('fs');
const {filenameValid} = require('./markdown-parser');


module.exports = fileOpener();

function fileOpener() {

  const rootDir = path.join('writing'); // Relative to app root

  return {
    openOne,
    openAll,
  };

  function openAll() {
    return new Promise(handler);
    function handler(resolve) {
      fs.readdir(rootDir, (err, files) => {
        const validFiles = files.filter(file => filenameValid(file) ? file : null);
        const readFiles = validFiles.map(fname => openOne(fname));
        resolve(readFiles);
      });
    }
  }

  function openOne(filename) {
    const filepath = path.join(rootDir, filename);
    const fileBody = fs.readFileSync(filepath, {encoding: 'utf8'});
    return {
      name: filename,
      body: fileBody,
    };
  }
}
