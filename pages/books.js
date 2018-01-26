const debug = require('debug')('nosaj:pages:books');
const injectScripts = require('../lib/injectScripts');
const { monthName } = require('../lib/helpers/date');

module.exports = (args) => ({
  view: 'books',
  path: '/books',
  stylesheet: 'views/books/books.scss',
  scripts: injectScripts(['views/books/books.js']),
  title: 'Recommended Books',
  
  subtitle: 'A hand picked selection of books that I recommend',
  
  // Books data
  coversUrl: 'http://a.nosaj.io/books',
  books: ({ coversUrl }) => [
    {
      img: `${coversUrl}/8020.jpg`,
      title: 'The 80/20 Principle',
      author: 'Richard Koch',
      url: 'https://www.amazon.co.uk/80-20-Principle-Achieving-ANNIVERSARY/dp/1857886844/ref=pd_lpo_sbs_14_img_0?_encoding=UTF8&psc=1&refRID=6YZYERSST9KPXWH871E5',
      readDate: new Date('2017/8'),
      tags: [''],
      comments: '',
    },
    {
      img: `${coversUrl}/extreme-ownership.jpg`,
      title: 'Extreme Ownership',
      author: 'Jocko Willink and Leif Babin',
      url: 'https://www.amazon.co.uk/Extreme-Ownership-Jocko-Willink/dp/1250183863/ref=sr_1_1?ie=UTF8&qid=1516966465&sr=8-1&keywords=extreme+ownership',
      readDate: new Date('2017/6'),
      tags: [''],
      comments: '',
    },
    {
      img: `${coversUrl}/power-of-habit.jpg`,
      title: 'Power of Habit',
      author: 'Charles Duhigg',
      url: 'https://www.amazon.co.uk/Power-Habit-Why-What-Change/dp/1847946240/ref=sr_1_1?s=books&ie=UTF8&qid=1516966763&sr=1-1&keywords=power+of+habit',
      readDate: new Date('2016/12'),
      tags: [''],
      comments: '',
    },
    {
      img: `${coversUrl}/mastering-bitcoin.jpg`,
      title: 'Mastering Bitcoin',
      author: 'Andreas Antonopoulos',
      url: 'https://www.amazon.co.uk/Mastering-Bitcoin-2e-Andreas-Antonopoulos/dp/1491954388/ref=sr_1_1?s=books&ie=UTF8&qid=1516967599&sr=1-1&keywords=mastering+bitcoin',
      readDate: new Date('2017/10'),
      tags: [''],
      comments: '',
    },
  ]
});
