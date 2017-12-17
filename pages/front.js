const debug = require('debug')('nosaj:pages:front');
const { dateBefore } = require('../lib/helpers/date');
const { allPosts } = require('../lib/helpers/blog');

module.exports = (args) => ({
  view: 'front',
  path: '/',
  stylesheet: 'views/front/front.scss',
  scripts: ['ga.js'],
  title: 'Noasj',
  introText: 'Hi I\'m Jason. I design and make software for the web.',
  introSubtext: [
    'At the moment I’m working with startups to build ambitious products. I also write, <a href="http://codeatuni.com" target="_blank">teach</a>, <a href="https://twitter.com/__nosaj" target="_blank">tweet</a> and <a href="http://liveworksearch.com" target="_blank">make</a> <a href="http://rapcast.in" target="_blank">stuff</a>.'
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
