const debug = require('debug')('nosaj:pages:landing');
const { dateBefore } = require('../lib/helpers/date');
const { allPosts } = require('../lib/helpers/blog');

module.exports = (args) => ({
  view: 'landing',
  path: '/',
  stylesheet: 'views/landing/landing.scss',
  scripts: ['ga.js'],
  title: '&#128075; Hi!',
  introText: [
    'Hi I\'m Jason, nice to meet you. I design & make measurable products with modern web technologies.',
  ],
  introSubtext: [
    'I work with startups and individuals to test ideas and build ambitious things. I also make a tool for podcast listeners called <a href="http://ripcast.in" target="_blank">Ripcast.</a>'
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
    const SUDO = args && args.hasOwnProperty('sudo'); // Add querystring 'sudo' for special access
    allPosts()
      .then(posts => {
        // Use the SUDO querystring to show all unpublished posts
        const visiblePosts = posts.filter(f => SUDO || dateBefore(new Date(), new Date(f.date)))
        resolve(visiblePosts);
      }).catch(err => {
        throw new Error(err)
      });
  }))()
});
