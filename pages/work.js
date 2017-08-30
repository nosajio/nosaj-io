module.exports = () => ({
  view: 'work',
  path: '/work',
  stylesheet: 'views/work/work.scss',
  scripts: ['ga.js', '$.js', 'work.js'],
  
  title: '&#128187; Work',
  subtitle: 'Below are a selection of projects that I have worked on recently',
  availability: `Are you making something? I'm avaiable for hire!`,
  availabilityCTA: 'mailto:hi@nosaj.io?subject=Hello',
  projects: [
    {
      id: 'justalevel',
      product: 'Just A-level',
      color: '#3746CC',
      gradient: `linear-gradient(to bottom, transparent, #3746CC 50px, #3746CC 80%, #439078)`,
      webURL: 'http://justalevel.com',
      images: [
        {
          type: 'desktop',
          url: 'http://a.nosaj.io/work/justalevel-dashboard-desktop.jpg'
        },
        {
          type: 'mobile',
          url: 'http://a.nosaj.io/work/justalevel-video-mobile.jpg'
        },
      ],
      description: 'Just A-level is an education platform funded by the UK government as an initiative to teach computer science to more students. I was involved with the project throughout the entire process, from planning and design to development. We were able to design and build the first version of the product in under two months, and successfully launched the site on time.',
      stack: [
        'React',
        'GraphQL',
        'NodeJS'
      ]
    },
    {
      id: 'beachfix',
      product: 'BeachFix',
      color: '#439078',
      gradient: `linear-gradient(to bottom, #439078, #439078 80%, #545454)`,
      webURL: 'http://www.beachfix.co/beaches/28',
      images: [
        {
          type: 'desktop',
          url: 'http://a.nosaj.io/work/beachfix-beach-desktop.jpg'
        },
        {
          type: 'mobile',
          url: 'http://a.nosaj.io/work/beachfix-beaches-mobile.jpg'
        },
      ],
      description: 'BeachFix is a beach holiday website that came about after the CEO spent a year travelling the world\'s beaches collecting data. I was hired to help the team design and build the first non-beta version of the app, condensing all of the lessons they had learned into a new version. We spent around a month on the design which was tested against user feedback, and another month on development.',
      stack: [
        'NodeJS',
        'React'
      ]
    },
    {
      product: 'TopHat Films',
      color: '#545454',
      gradient: `linear-gradient(to bottom, #545454, #545454)`,
      webURL: 'http://thetophatfilmswebsite.com',
      images: [
        {
          type: 'desktop',
          url: 'http://a.nosaj.io/work/tophat-home-desktop.jpg'
        },
        {
          type: 'mobile',
          url: 'http://a.nosaj.io/work/tophat-home-mobile.jpg'
        },
      ],
      description: 'The TopHat Films website is a fun site for filmmaker Rob Trott. I worked with him to embody the not-taking-ourselves-too-seriously image that TopHat are known for, while still maintaining usability and quality. The site is mostly vanilla HTML, CSS & JS, with some eastereggs thrown in for good measure.',
      stack: [
        'Vanilla'
      ]
    },
    {
      // Not all projects are projects. Some are ads
      id: 'availability',
      ad: true,
      message: `Are you making something? I'm available for hire. Enquiries: <a href="mailto:hi@nosaj.io?subject=Hello">hi@nosaj.io</a>`,
    },
  ],
  
  employers: [
    {
      name: 'MetaBroadcast',
      where: 'London',
      position: 'Creative Technologist',
      image: ''
    },
    {
      name: 'MrSite',
      where: 'London',
      position: 'Lead Design',
      image: ''
    },
    {
      name: 'William Hill Online',
      where: 'Gibraltar',
      position: 'Engineer',
      image: ''
    }
  ]
});
