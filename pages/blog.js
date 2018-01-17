const debug = require('debug')('nosaj:content:blog');
const { allPosts } = require('nosaj-md-parser');
const injectScripts = require('../lib/injectScripts');

module.exports = (args) => {
  const defaultData = {
    view: 'blog',
    path: '/r/:slug',
    stylesheet: 'views/blog/blog.scss',
    scripts: injectScripts(['views/blog/blog.js']),
    image: null,
    title: '',
    // The message to show after the post
    message: 'To find out about more posts like this one, <a href="https://twitter.com/__nosaj" target="_blank">follow me on Twitter.</a>',
  };
  
  // Return a stripped out version of the template before args are available
  if (! args) {
    return defaultData;
  }
  
  // Async
  return new Promise((resolve, reject) => {
    getPost(args.slug)
      .then(post => {
        const updatedData = { 
          post,
          title: post.title,
        };
        const allContent = Object.assign({}, defaultData, updatedData);
        resolve(allContent);
      })
      .catch(err => reject(err));
  });
}

/**
 * Get Post Helper
 * Grab the post with :slug
 * @param {String} slug
 * @return {Promise<Object>}
 */
function getPost(slug) {
  return new Promise((resolve, reject) => {
    allPosts()
      .then(posts => {
        if (! posts.length) {
          reject({ error: true, status: '404', message: 'No posts...', });
          return;
        }
        
        let currentPostIndex = postIndex(posts, slug);
        
        // Was the post index found? If not, return a '404'
        if (currentPostIndex === undefined) {
          reject({ error: true, status: '404', message: 'Post not found', });
          return;
        }
        
        
        // Find the current post
        const current = posts.find((p, i) => i === currentPostIndex);
        
        // Add next post data to result, if there is a next post...
        const isLastPost = currentPostIndex + 1 === posts.length;
        if (! isLastPost) {
          const next = posts.find((p, i) => i === currentPostIndex + 1);
          const post = Object.assign(
            {}, 
            current, 
            { 
              // Only send the metadata of the next post to the template. We only 
              // need the data for building links
              next: { 
                slug: next.slug, 
                title: next.title, 
                date: next.date, 
                category: next.category, 
                coverImg: next.coverImg, 
                coverColor: next.coverColor, 
                dateString: next.dateString 
              } 
            }
          );
          resolve(post);
        } else {
          // Make the next post false when this is the last post
          const post = Object.assign({}, current, { next: false });
          resolve(post);
        }
      }).catch(err => {
        reject(new Error(err.message));
      });
  });
}

function postIndex(posts, slug) {
  let currentPostIndex;
  posts.some((p, i) => {
    if (p.slug === slug) {
      currentPostIndex = i;
      return true;
    }
  });
  return currentPostIndex;
}
