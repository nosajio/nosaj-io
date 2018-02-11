const debug = require('debug')('nosaj:pages:books');
const error = require('debug')('nosaj:error:pages:books');
const injectScripts = require('../lib/injectScripts');
const allBooks = require('../data/books');

module.exports = {
  assets: {},
  meta: {
    view: 'books',
    path: '/books',
    stylesheet: 'views/books/books.scss',
  },
  render: args => ({
    title: 'Books',
    subtitle: ['This page is part reading diary and part recommended reading list. I only add a book to this page if I\'d read it again.', 'Take a browse, you might find something you like :)'],
    
    // Books data
    coversUrl: 'http://a.nosaj.io/books',

    // Use the categories list to construct the full books object. Its done this way so that books aren't tied in to
    // categories, so they can be moved around and stuff.
    books: ({ bookCategories, coversUrl }) => {
      const books = allBooks();
      const booksWithCovers = books.map(b => Object.assign({}, b, { img: `${coversUrl}/${b.id}.jpg` }));
      return booksWithCovers;
    },
  })
};
