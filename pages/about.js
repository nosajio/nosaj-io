module.exports = () => ({
  view: 'about',
  path: '/bio',
  stylesheet: 'views/about/about.scss',
  scripts: ['ga.js', '$.js'],
  
  title: 'About Jason',
  
  bio: {
    intro: 'Hi I\'m Jason, nice to meet you. I\'ve been designing and making things for the internet since age fourteen. Now—almost fourteen years later—I continue to get a kick from making interesting products that can improve people\'s lives.',
    body: [
      'I\'m a big proponent of self-education, and have embodied the philosophy in my life and career. I\'m entirely self taught as a programmer, systems admin, and designer, and I continue to immerse myself in projects and situations that I find very challenging. I think this is by far the best way to learn.',
      'I\'ve involved myself in all sorts of full time positions, including \'designer\', \'front end developer\', \'creative technologist\', \'developer\', and \'engineer\', for a bunch of companies big and small. I enjoyed all of them, and learned a hell of a lot in the process.',
      'At this moment I\'m using my time to help startups and small businesses to make measurable products quickly. It\'s imperative that a product can be measured in order to improve it. Otherwise it can be difficult to know for sure which parts of the product are or aren\'t performing to expectations.',
      'I live in the exciting city of London where I spend my free time inventing businesses, working out, reading, playing chess, and annoying my girlfriend.'
    ],
  },
  
  repos: [
    {
      name: 'spin',
      description: '🎨 Interact with the color wheel using Javascript',
      link: 'https://github.com/nosajio/spin'
    },
    {
      name: 'nosaj.io',
      description: 'This website',
      link: 'https://github.com/nosajio/nosaj-io'
    },
    {
      name: 'doc-gen',
      description: '✨ For generating various business documents like invoices and estimates from JSON ✨',
      link: 'https://github.com/nosajio/doc-gen'
    },
    {
      name: 'myapi',
      description: 'Generate a JSON API out of plain old Markdown files',
      link: 'https://github.com/nosajio/myapi'
    },
  ]
});
