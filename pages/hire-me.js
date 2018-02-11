const debug = require('debug')('nosaj:pages:hire-me');
const injectScripts = require('../lib/injectScripts');
const { monthName } = require('../lib/helpers/date');

module.exports = {
  assets: {
    scripts: injectScripts(['views/hire-me/hire-me.js']),
  },
  meta: {
    view: 'hire-me',
    path: '/work-together',
    stylesheet: 'views/hire-me/hire-me.scss',
    title: 'Hire me',
  },
  render: (args) => ({
    // Opening section...
    introText: 'In a nutshell, I help startups and founders design and develop products for the web. I believe in testing ideas and shipping quickly, and also in making great software that is efficient and maintainable.',
    
    // Availability...
    // Each key represents a month from now to 6 months from now
    // 0 = unavailable
    // 1 = available
    availability: [1,1,1,1,1,1],
    // Compute month numbers and combine with availability status
    availabilityMonths: ({ availability }) => 
      availability.map((a, i) => ({
        name: monthName(i),
        availability: a === 1,
        status: a === 1 ? 'Available' : 'Booked',
      }))
    ,
    
    // Who I've worked with...
    workedWith: 'Working with everybody from individual founders and small teams to startups and blue chips, I\'ve learned a thing or two about how to make a successful web product.',
    logos: [
      { name: 'Utility Warehouse', src: '/img/hire-me/uw-logo.png'},
      { name: 'MrSite', src: '/img/hire-me/mrsite-logo.png'},
      { name: 'CodeAtUni', src: '/img/hire-me/cau-logo.png'},
      { name: 'FIrstminute Capital', src: '/img/hire-me/fm-logo.png'},
      { name: 'William Hill Online', src: '/img/hire-me/wh-logo.png'},
      { name: 'Metabroadcast', src: '/img/hire-me/mbst-logo.png'},
    ],
    
    // Form...
    formText: 'Don\'t forget to leave your email address so I can reply to you.',
    formSuccess: 'Thanks for getting in touch. I do my best to reply to new messages within 24h.'
  })
}
