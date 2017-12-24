const debug = require('debug')('nosaj:pages:hire-me');

const monthName = monthsAhead => {
  const currentMonth = new Date().getMonth();
  const nMonthsTimestamp = new Date().setMonth(currentMonth + monthsAhead);
  const monthNumber = new Date(nMonthsTimestamp).getMonth();
  const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[ monthNumber ];
}

module.exports = (args) => ({
  view: 'hire-me',
  path: '/work-together',
  stylesheet: 'views/hire-me/hire-me.scss',
  scripts: ['js/ga.js', 'js/$.js', 'js/api-service.js', 'js/dynamic-form.js', 'js/grow-textareas.js', 'views/hire-me/hire-me.js'],
  title: 'Hire me',
  
  // Opening section...
  introText: 'In a nutshell, I help startups and founders design and develop products for the web. I believe in testing ideas and shipping quickly, and also in making great software that is efficient and maintainable.',
  
  // Availability...
  // Each key represents a month from now to 6 months from now
  // 0 = unavailable
  // 1 = available
  availability: [0,1,1,1,1,1],
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
  
  formText: 'Tell me a little bit about your project.'
});
