const debug = require('debug')('nosaj:pages:books');
const injectScripts = require('../lib/injectScripts');
const { monthName } = require('../lib/helpers/date');
const allBooks = require('../data/books');

module.exports = (args) => ({
  view: 'books',
  path: '/books',
  stylesheet: 'views/books/books.scss',
  scripts: injectScripts(['views/books/books.js']),
  title: 'Books',
  
  subtitle: 'We should all do more reading, but it can be hard to find what to read next. Here’s a selection of books that I recommend to people all the time.',
  
  // Books information
  coversUrl: 'http://a.nosaj.io/books',
  bookCategories: {
    startups: ['hackers-and-painters', '8020']
  },

  // Use the categories list to construct the full books object. Its done this way so that books aren't tied in to
  // categories, so they can be moved around and stuff.
  books: ({ bookCategories, coversUrl }) => {
    const list = allBooks(coversUrl);
    return Object.keys(bookCategories).map(c => ({
      title: c,
      list: list.filter(book => bookCategories[c].includes(book.id)),
    }));
  },

});
