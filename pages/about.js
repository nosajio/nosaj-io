module.exports = () => ({
  view: 'about',
  path: '/bio',
  stylesheet: 'views/about/about.scss',
  scripts: ['ga.js', '$.js'],
  
  title: 'About Jason',
  
  bio: {
    opener: [
      'I\'m a multi-disciplinary designer and maker of software with > 14 years of experience.',
      'Right now I\'m helping startups make measurable software, fast.'
    ],
    body: [
      'I was brought up in a small town in the centre of England called Rugeley. When I was 16, after finishing high school, I was bored over the summer so I decided to teach myself PHP. I wanted to make a forum for my friends and I to chat on. Afterwards, I realised that the product I\'d been inspired by (PHPBB) was open source, so I didn\'t have to make my own version. But I learned a lot from it.',
      'I\'m a big proponent of self-education – or learning how to learn – and have embodied the philosophy throughout my life and career. I\'m self taught in design, programming, infrastructure and business, and I continue to immerse myself in challenging projects and situations to improve. I learn as I make. I believe this is the best way to get better.',
      'Over the years I\'ve developed a "T" shaped skillset that brings all that\'s needed to make web software. Being able to make software solo comes with a bonus: speed. One person can work more efficiently than a team of two or three.',
      'Right now I\'m helping startups and small teams with short deadlines to deliver measurable products on time. I also help them iterate and improve the product based on metrics.'
    ],
  },
  
  
});
