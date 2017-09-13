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
    '👋 Hi, nice to meet you. I\'m Jason, I design & make measurable software with modern web technologies.',
  ],
  introSubtext: [
    'I work with startups to test ideas and build ambitious things. I also <a href="https://nosaj.io/r/ripcast-writeup">made a tool</a> called <a href="http://ripcast.in" target="_blank">Ripcast.</a>. You should follow me on <a href="https://twitter.com/__nosaj" target="_blank">Twitter</a>.'
  ],
  available: true,
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
