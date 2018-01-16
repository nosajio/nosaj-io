const debug = require('debug')('nosaj:pages:front');
const { dateBefore } = require('../lib/helpers/date');
const { allPosts } = require('../lib/helpers/blog');
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
  available: 2, 
  availableText: ({ available }) => `I'm available from ${monthName(available-1)} ${new Date().getFullYear()}`,
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
  }))(),
  projects: [
    {
      title: 'Live/Work Search',
      url: 'http://liveworksearch.com',
      date: 'OCT 2016',
    },
    {
      title: 'Just A-level',
      url: 'https://justalevel.com',
      date: 'JUL 2017',
    },
    {
      title: 'Beachfix',
      url: 'http://beachfix.co',
      date: 'OCT 2016',
    },
  ]
});
