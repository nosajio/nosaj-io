const debug = require('debug')('nosaj:content:blog');
const { dateToString } = require('../lib/helpers/date');
const fileopener = require('../server/blog/file-opener');
const markdown = require('../server/blog/markdown-parser');

module.exports = (args) => {
  const defaultData = {
    view: 'blog',
    path: '/r/:slug',
    stylesheet: 'views/blog/blog.scss',
    scripts: ['ga.js', '$.js', 'blog.js'],
    image: null,
    title: '',
    // The message to show after the post
    message: 'Are you making something? I\'m available for hire. <br> Enquiries: <a href="mailto:hi@nosaj.io">hi@nosaj.io</a>',
  };
  
  // Return a stripped out version of the template before args are available
  if (! args) {
    return defaultData;
  }
  
  // Async
  return new Promise(resolve => {
    getPost(args.slug)
      .then(post => {
        post.dateString = dateToString(post.date);
        const updatedData = { 
          post,
          title: post.title,
          // This will be injected into the scss file prior to compilation
          scssVariables: {
            postColor: post.coverColor,
          }
        };
        const allContent = Object.assign({}, defaultData, updatedData);
        resolve(allContent);
      });
  });
}

/**
 * Get Post Helper
 * Grab the post with :slug
 * @param {String} slug
 * @return {Promise<Object>}
 */
function getPost(slug) {
  return new Promise(resolve => {
    fileopener
      .openAll()
      .then((files) => {
        const file = files.filter(f => markdown.parseFilename(f.name).slug === slug)[0];
        const postParsed = markdown.parseFile(file.body);
        const filenameParsed = markdown.parseFilename(file.name);
        const post = Object.assign({}, filenameParsed, postParsed);
        resolve(post);
      }).catch(err => {
        throw new Error(err.message)
      });
  });
}
