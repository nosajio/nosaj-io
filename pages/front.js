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
  }))(),
  projects: [
    {
      title: 'Live/Work Search',
      description: 'I made liveworksearch.com to help a growing neiche of entrepreneurs to find live/work style properties in London. The tool consists of a simple web crawler that collects data from around the internet before showing it on a map, ready to be explored. The whole system and website is fully autonomous.',
      url: 'http://liveworksearch.com',
      date: 'OCT 2016',
      tags: ['design', 'dev'],
      images: [
        { device: 'desktop', src: 'http://placehold.it/604x466/fff/bbbbbb&text=screen' },
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' },
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' }
      ]
    },
    {
      title: 'Just A-level',
      description: 'Just A-level is an education platform funded by the UK government as an initiative to teach computer science to more students. I was involved with the project throughout the entire process, from planning and design to development. We were able to design and build the first version of the product in under two months, and successfully launched the site on time.',
      url: 'https://justalevel.com',
      date: 'JUL 2017',
      tags: ['design', 'dev'],
      images: [
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' },
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' },
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' },
        { device: 'mobile', src: 'http://placehold.it/322x466/fff/bbbbbb&text=screen' }
      ]
    },
  ]
});
