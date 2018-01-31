const debug = require('debug')('nosaj:pages:books');
const error = require('debug')('nosaj:error:pages:books');
const injectScripts = require('../lib/injectScripts');
const allBooks = require('../data/books');

module.exports = (args) => ({
  view: 'books',
  path: '/books',
  stylesheet: 'views/books/books.scss',
  scripts: injectScripts(['views/books/books.js']),
  title: 'Books',
  
  subtitle: 'We should all do more reading, but it can be hard to find what to read next. Here’s a selection of books that I recommend to people all the time.',
  
  // Books data
  coversUrl: 'http://a.nosaj.io/books',
  bookCategories: {
    "Making": ['hackers-and-painters'],
    "Design": [],
    "Startups": ['8020']
  },

  // Use the categories list to construct the full books object. Its done this way so that books aren't tied in to
  // categories, so they can be moved around and stuff.
  books: ({ bookCategories, coversUrl }) => {
    const books = allBooks();
    const booksWithCovers = books.map(b => Object.assign({}, b, { img: `${coversUrl}/${b.id}.jpg` }));
    debug(booksWithCovers)
    const categoriesWithBooks = Object.keys(bookCategories).map(c => ({
      category: c,
      titles: booksWithCovers.filter(book => bookCategories[c].includes(book.id)),
    }));
    return categoriesWithBooks;
  },

});
