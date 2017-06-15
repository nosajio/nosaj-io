const debug = require('debug')('nosaj:content:blog');
const fileopener = require('../server/blog/file-opener');
const markdown = require('../server/blog/markdown-parser');

module.exports = (args) => {
  const headerData = {
    view: 'blog',
    path: '/r/:slug',
    stylesheet: 'views/blog/blog.scss',
    scripts: [],
    title: '',
  };
  
  // Return a stripped out version of the template before args are available
  if (! args) {
    return headerData;
  }
  
  // Async
  return new Promise(resolve => {
    getPost(args.slug)
      .then(post => {
        const updatedData = { 
          post,
          title: post.title,
          // This will be injected into the scss file prior to compilation
          scssVariables: {
            postColor: post.coverColor,
          }
        };
        const allContent = Object.assign({}, headerData, updatedData);
        resolve(allContent);
      });
  });
}

function getPost(slug) {
  return new Promise(resolve => {
    fileopener
      .openAll()
      .then((files) => {
        const file = files.filter(f => markdown.parseFilename(f.name).slug === slug)[0];
        const postParsed = markdown.parseFile(file.body);
        const filenameParsed = markdown.parseFilename(file.name);
        const post = Object.assign({}, filenameParsed, postParsed);
        debug('%S', post);
        resolve(post);
      }).catch(err => {
        throw new Error(err.message)
      });
  });
}
