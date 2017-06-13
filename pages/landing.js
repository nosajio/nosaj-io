const debug = require('debug')('nosaj:pages:landing');

module.exports = () => ({
  view: 'landing',
  path: '/',
  stylesheet: 'views/landing/landing.scss',
  title: '👋 Hi!',
  introText: [
    'I\'m Jason, nice to meet you. I design & make measurable products using modern web technologies.',
    'I\'m currently working to help people build ambitious websites & apps quickly.'
  ],
  available: true,
  quotes: [
    {
      from: 'Nuno Vega',
      quote: 'Jason get\'s my five stars'
    },
    {
      from: 'Alex DeFazio',
      quote: 'I simply cannot speak highly enough of Jason'
    },
  ],
  // Load in the posts and parse with the blog helpers
  posts: (() => new Promise((resolve) => {
    const fileopener = require('../server/blog/file-opener');
    const markdown = require('../server/blog/markdown-parser');
    fileopener
      .openAll()
      .then((files) => {
        const posts = files.map(f => 
          Object.assign(
            {}, 
            markdown.parseFilename(f.name), 
            markdown.parseFile(f.body)
          ) 
        );
        resolve(posts);
      }).catch(err => {
        throw new Error(err.message)
      });
  }))()
});
