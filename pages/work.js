const debug = require('debug')('nosaj:pages:work');

module.exports = () => ({
  view: 'work',
  path: '/work',
  stylesheet: 'views/work/work.scss',
  scripts: ['js/ga.js', 'js/$.js'],
  
  title: '&#128187; Work',
  availability: `Are you making something? Email: hi@nosaj.io`,
  availabilityCTA: 'mailto:hi@nosaj.io?subject=Hello',
  recentProjects: [
    {
      id: 'ripcast',
      product: 'Ripcast',
      color: '#ad1e45',
      textColor: 'white',
      image: [{
        frame: 'mobile',
        url: 'http://a.nosaj.io/work/ripcast-mobile.jpg',
      }],
      webURL: 'http://justalevel.com',
      description: 'Ripcast is an app I made to scratch an itch in response to YouTube\'s bad UX. Its a web application that converts YouTube content into podcasts, so that they can be listened to on the move. I launched Ripcast in July 2017, since then it\'s had a steady increase in users with little marketing effort',
      stack: 'NodeJS, React, Redux, AWS',
      turnaround: 'One month'
    },
    {
      id: 'justalevel',
      product: 'Just A-level',
      color: '#244DA7',
      textColor: 'white',
      webURL: 'http://justalevel.com',
      image: [{
        frame: 'browser',
        url: 'http://a.nosaj.io/work/justalevel-dashboard-browser.jpg',
      }],
      description: 'Just A-level is an education platform funded by the UK government as an initiative to teach computer science to more students. I was involved with the project throughout the entire process, from planning and design to development. We were able to design and build the first version of the product in under two months, and successfully launched the site on time.',
      stack: 'React, GraphQL, NodeJS, Postgres, AWS',
      turnaround: 'Two months'
    },
    {
      id: 'beachfix',
      product: 'BeachFix',
      color: '#1f9671',
      textColor: 'white',
      webURL: 'http://www.beachfix.co/beaches/28',
      image: [{
        frame: 'browser',
        url: 'http://a.nosaj.io/work/beachfix-beach-browser.jpg',
      }],
      description: 'BeachFix is a beach holiday website that came about after the CEO spent a year travelling the world\'s beaches collecting data. I was hired to help the team design and build the first non-beta version of the app, condensing all of the lessons they had learned into a new version. We spent around a month on the design which was tested against user feedback, and another month on development.',
      stack: 'NodeJS, React',
      turnaround: 'Two months'
    },
  ],
  
  opensrc: {
    'nosajio/spin': {
      description: 'Interact with the color wheel in JS',
      url: '',
    },
    'nosajio/nosaj-io': {
      description: 'This website',
      url: '',
    },
    'nosajio/docgen': {
      description: 'A CLI for generating beautiful business docs.',
      url: '',
    },
    'nosajio/myapi': {
      description: 'A JSON API from your markdown files.',
      url: '',
    }
  },
  
  fulltime: [
    {
      name: 'MetaBroadcast',
      where: 'London',
      position: 'Creative Technologist',
      when: '2014',
      image: ''
    },
    {
      name: 'MrSite',
      where: 'London',
      position: 'Lead Design',
      when: '2012',
      image: ''
    },
    {
      name: 'William Hill Online',
      where: 'Gibraltar',
      position: 'Engineer',
      when: '2010',
      image: ''
    },
    {
      name: 'Trinity Design',
      where: 'Midlands, UK',
      position: 'Developer',
      when: '2007',
      image: ''
    }
  ],
  
  archive: [
    // 2017
    {
      year: 2017,
      title: 'Live/Work Search',
      owned: 'Owner, Design, Frontend, Backend',
      url: 'http://liveworksearch.com',
    },
    {
      year: 2017,
      title: 'Ripcast',
      owned: 'Owner, Design, Frontend, Backend',
      url: 'http://ripcast.in',
    },
    {
      year: 2017,
      title: 'Just A-level',
      owned: 'Design, Frontend, Backend',
      url: 'https://justalevel.com',
    },
    
    // 2016
    {
      year: 2016,
      title: 'BeachFix',
      owned: 'Design, Frontend, Backend feed',
      url: 'https://beachfix.co',
    },
    {
      year: 2016,
      title: 'TopHat Films',
      owned: 'Design, Frontend',
      url: 'http://thetophatfilmswebsite.com',
    },
    {
      year: 2016,
      title: 'CityGenda',
      owned: 'Frontend',
      url: 'http://citygenda.com',
    },
    {
      year: 2016,
      title: 'Elixir Productions',
      owned: 'Frontend',
      url: 'http://elixirproductions.org',
    },
    
    // 2015
    {
      year: 2015,
      title: 'BBC Project',
      employer: 'MetaBroadcast',
      owned: 'Frontend',
    },
    {
      year: 2015,
      title: 'MBST Website',
      employer: 'MetaBroadcast',
      owned: 'Frontend updates',
      url: 'https://metabroadcast.com',
    },
    
    // 2014
    {
      year: 2014,
      title: 'BBC Tool',
      employer: 'MetaBroadcast',
      owned: 'Design, Frontend, Backend',
    },
    {
      year: 2014,
      title: 'Atlas Admin Tools',
      employer: 'MetaBroadcast',
      owned: 'Design, Frontend, Backend',
      url: 'https://atlas.metabroadcast.com',
    },
    
    // 2013
    {
      year: 2013,
      title: 'MrSite Website',
      employer: 'MrSite',
      owned: 'Design, Frontend',
    },
    {
      year: 2013,
      title: 'Email Dashboard',
      employer: 'MrSite',
      owned: 'Design, Frontend',
    },
    {
      year: 2013,
      title: 'Website Builder',
      employer: 'MrSite',
      owned: 'Frontend updates',
    },
    
    // 2012
    {
      year: 2012,
      title: '10x Website Builder Themes',
      employer: 'MrSite',
      owned: 'Design, Frontend',
    },
    {
      year: 2012,
      title: 'MatteBox',
      owned: 'iOS App Design',
    },
    
    // 2011
    {
      year: 2011,
      title: 'Focus Multimedia Corporate Website',
      owned: 'Design, Frontend, Wordpress',
    },
    {
      year: 2011,
      title: 'wewillbuyallcars.com',
      owned: 'Frontend, Order system, Backend',
    },
    {
      year: 2011,
      title: 'Cobb Lloyd',
      owned: 'Brand design',
    },
    {
      year: 2011,
      title: 'Westley',
      owned: 'Brand design',
    },
    {
      year: 2011,
      title: 'Wades ltd',
      owned: 'Design, Frontend',
    },
    {
      year: 2011,
      title: 'Printwhizz',
      owned: 'Frontend, Wordpress dev',
    },
    
    // 2010
    {
      year: 2010,
      title: 'Elixir Productions',
      owned: 'Design, Development',
    },
    {
      year: 2010,
      title: 'InStaffs',
      owned: 'Design',
    },
    {
      year: 2010,
      title: 'Lloyds',
      owned: 'Design, Frontend',
    },
    
    // 2009
    {
      year: 2009,
      title: 'William Hill Casino',
      employer: 'William Hill Online',
      owned: 'Frontend, ExpressionEngine dev',
    },
    {
      year: 2009,
      title: 'William Hill Skill',
      employer: 'William Hill Online',
      owned: 'Frontend updates',
    },
    {
      year: 2009,
      title: 'William Hill Vegas',
      employer: 'William Hill Online',
      owned: 'ExpressionEngine dev, Frontend updates',
    },
    {
      year: 2009,
      title: 'Takeover Design ltd',
      owned: 'Owner, Design, Development',
    },
    
    // 2008
    {
      year: 2008,
      title: 'HiTrucks',
      employer: 'Trinity Design',
      owned: 'Frontend, Backend',
    },
    {
      year: 2008,
      title: 'Ashas',
      employer: 'Trinity Design',
      owned: 'Design, Development',
    },
    {
      year: 2008,
      title: 'Switched On',
      employer: 'Trinity Design',
      owned: 'PHP Development',
    },
    {
      year: 2008,
      title: 'Custom CMS',
      employer: 'Trinity Design',
      owned: 'PHP Development',
    },
    
  ].reduce(groupArchiveByDate, []),
});

// Turns the archive array into something like:
//   [
//     { year: 2017, projects: [{...}, {...}, {...}] },
//     { year: 2016, projects: [{...}, {...}, {...}] },
//     { year: 2015, projects: [{...}, {...}, {...}] },
//     ...
//   ]
// 
function groupArchiveByDate(acc, cur, i, archive) {
   if (acc.length > 0) return acc;
  const years = archive
    .reduce((acc, cur) => {
      acc.includes(cur.year) ? acc : acc.push(cur.year);
      return acc;
    }, [])
    .sort((a, b) => parseInt(b) - parseInt(a));
  years.forEach(year => {
    const projects = archive.filter(it => it.year === year);
    acc.push({ year, projects });
  });
  return acc;
}
