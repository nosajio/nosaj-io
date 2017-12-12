const debug = require('debug')('nosaj:pages:home');
const { dateBefore } = require('../lib/helpers/date');
const { allPosts } = require('../lib/helpers/blog');

module.exports = (args) => ({
  view: 'home',
  path: '/',
  stylesheet: 'views/home/home.scss',
  scripts: ['ga.js', 'two.min.js', 'tweenlite.min.js', 'home.js'],
  title: '&#128075; Hi!',
  introText: [
    'Hi I\'m Jason, nice to meet you.',
  ],
  introSubtext: [
    'I work with startups to test ideas and build ambitious things quickly. I also make <a href="http://ripcast.in" target="_blank">Ripcast.</a> and <a target="_blank" href="http://liveworksearch.com">Live/Work Search</a>. I tweet about making stuff on <a href="https://twitter.com/__nosaj" target="_blank">Twitter</a>.'
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
