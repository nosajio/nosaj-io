const debug = require('debug')('nosaj:content:blog');

module.exports = (args) => {
  debug(args);
  const headerData = {
    view: 'blog',
    path: '/r/:slug',
    stylesheet: 'views/blog/blog.scss',
    scripts: [],
    title: '',
    subtitle: '',
  };
  return Object.assign(
    {}, 
    { post: null }, 
    headerData
  );
}
