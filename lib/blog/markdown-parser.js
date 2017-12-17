const frontmatter = require('front-matter');
const marked = require('marked');
const striptags = require('striptags');

module.exports = markdownParser();

function markdownParser() {

  // This is the pattern that the parser uses to validate and parse a filename
  // ✔︎ "how-to-debug-javascript-2015-10-12.md"
  // ✘ "a_random-post-filename"
  const filenameRegex = /(.*)-(\d{4}-\d{1,2}-\d{1,2})(.*)?/g;

  return {
    parseFile,
    parseFilename,
    filenameValid,
  };

  function parseFile(fileContents) {
    const parsed = frontmatter(fileContents);
    const bodyHtml = marked(parsed.body);
    return Object.assign({}, parsed.attributes, {body: bodyHtml, plain: striptags(bodyHtml)});
  }

  function filenameValid(filename) {
    filename = filename.replace('.md');
    return filename.match(filenameRegex);
  }

  function parseFilename(filename) {
    if (typeof filename !== 'string') {
      throw new TypeError(`filename param is not string: '${typeof filename}'`);
    }
    if (! filenameValid(filename)) {
      throw new TypeError(`filename ${filename} is not in the right format`);
    }

    const parsed = filenameRegex.exec(filename);
    const slug = parsed[1];
    const title = parsed[1].replace(/-/gi, ' ');
    const date = new Date(parsed[2]);

    return {slug, title, date};
  }
}
