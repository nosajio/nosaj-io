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
        const post = Object.assign(
          {}, 
          markdown.parseFilename(file.name), 
          markdown.parseFile(file.body)
        );
        resolve(post);
      }).catch(err => {
        throw new Error(err.message)
      });
  });
}
