const debug = require('debug')('nosaj:pages:front');
const { dateBefore } = require('../lib/helpers/date');
const { allPosts } = require('nosaj-md-parser');
const injectScripts = require('../lib/injectScripts');
const { monthName } = require('../lib/helpers/date');

module.exports = (args) => ({
  view: 'front',
  path: '/',
  stylesheet: 'views/front/front.scss',
  scripts: injectScripts(['views/front/front.js']),
  title: '👋 Hello',
  introText: 'Hello, I\'m Jason. I help founders and startups build great web products.',
  // Month number for when I'm available from
  available: 1, 
  availableText: ({ available }) => `I'm available from ${monthName(available-1)} ${new Date().getFullYear()}`,
  // Load in the posts and parse with the blog helpers
  posts: new Promise((resolve) => {
    const SUDO = args && args.hasOwnProperty('sudo'); // Add querystring 'sudo' for special access
    allPosts()
      .then(posts => {
        // Use the SUDO querystring to show all unpublished posts
        const visiblePosts = posts.filter(f => SUDO || dateBefore(new Date(), new Date(f.date)))
        resolve(visiblePosts);
      }).catch(err => {
        throw new Error(err)
      });
  }),
  projects: [
    {
      title: 'Live/Work Search',
      url: 'http://liveworksearch.com',
      cover: '/img/projects/lws-front.jpg',
      className: 'g4',
      date: 'OCT 2016',
    },
    {
      title: 'Ripcast',
      url: 'http://ripcast.in',
      cover: '/img/projects/ripcast-front.jpg',
      className: 'g2 mq-shrink-on-small',
      date: 'AUG 2017',
    },
    {
      title: 'Just A-level',
      url: 'https://justalevel.com',
      cover: '/img/projects/jal-front.jpg',
      className: 'g3',
      date: 'JUL 2017',
    },
    {
      title: 'Beachfix',
      url: 'http://www.beachfix.co/beaches?userquery=ab48e34e-b14d-413c-a7c9-eae2b4465991',
      cover: '/img/projects/beachfix-front.jpg',
      className: 'g3',
      date: 'OCT 2016',
    },
    {
      title: 'MetaBroadcast',
      url: 'https://metabroadcast.com',
      cover: '/img/projects/mbst-front.jpg',
      className: 'g6 imgfixed',
      date: 'AUG 2014 — DEC 2015',
    },
  ]
});
