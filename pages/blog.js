const debug = require('debug')('nosaj:content:blog');
const { allPosts } = require('../lib/helpers/blog');

module.exports = (args) => {
  const defaultData = {
    view: 'blog',
    path: '/r/:slug',
    stylesheet: 'views/blog/blog.scss',
    scripts: ['ga.js', '$.js', 'debounce.js', 'blog.js'],
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
        const updatedData = { 
          post,
          title: post.title,
          // This will be injected into the scss file prior to compilation
          scssVariables: {
            postColor: post.coverColor,
            nextPostColor: post.next ? post.next.coverColor : '#000',
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
  return new Promise((resolve, reject) => {
    allPosts()
      .then(posts => {
        let currentPostIndex = postIndex(posts, slug);
        // Find the current post
        const current = posts.filter((p, i) => i === currentPostIndex)[0];
        
        // Only add next post when there is one available
        const isLastPost = currentPostIndex + 1 === posts.length;
        if (! isLastPost) {
          const next = posts.filter((p, i) => i === currentPostIndex + 1)[0];
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
