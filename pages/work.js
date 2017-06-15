module.exports = () => ({
  view: 'work',
  path: '/work',
  stylesheet: 'views/work/work.scss',
  scripts: ['ga.js', '$.js', 'work.js'],
  
  title: '💻 Work',
  subtitle: 'Below are a selection of projects that I have worked on recently',
  projects: [
    {
      id: 'justalevel',
      product: 'Just A-level',
      webURL: 'http://justalevel.com',
      images: [
        {
          type: 'desktop',
          url: 'http://a.nosaj.io/work/justalevel-dashboard-desktop.jpg'
        },
        {
          type: 'mobile',
          url: 'http://a.nosaj.io/work/justalevel-course-mobile.jpg'
        },
      ],
      description: 'Just A-level is an education platform funded by the UK government as an initiative to teach computer science to more students. I was involved with the project from a very early stage, and was involved in the full process from planning and design to development. We were able to design and build the first version of the product in under two months, and successfully launched the site on time.',
      stack: [
        'React',
        'GraphQL',
        'NodeJS'
      ]
    },
    {
      id: 'beachfix',
      product: 'BeachFix',
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
    }
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
