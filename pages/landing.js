const debug = require('debug')('nosaj:pages:landing');

module.exports = () => ({
  view: 'landing',
  path: '/',
  stylesheet: 'views/landing/landing.scss',
  scripts: ['ga.js'],
  title: '&#128075; Hi!',
  introText: [
    'I\'m Jason, nice to meet you. I design & make measurable products with modern web technologies.',
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
        const sortedPosts = sortPostsByDate(posts);
        const augmentedPosts = augmentPosts(sortedPosts);
        resolve(augmentedPosts);
      }).catch(err => {
        throw new Error(err.message)
      });
  }))()
});

function sortPostsByDate(posts) {
  return posts.sort((a, b) => {
    if (new Date(b.date) === new Date(a.date)) {
      return 0;
    }
    if (new Date(b.date) > new Date(a.date)) {
      return 1;
    }
    return -1;
  });
}

function augmentPosts(posts) {
  return posts.map(post => 
    Object.assign(
      {},
      post,
      {
        dateString: dateToString(post.date),
      }
    )
  );
}

function dateToString(rawDate) {
  const date = new Date(rawDate);
  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}
