const debug = require('debug')('nosaj:helpers:books');
const error = require('debug')('nosaj:error:helpers:books');
const request = require('request');
const { GOOGLE_BOOKS_API_KEY } = process.env;


const booksEndpoints = {
  volume: 'https://www.googleapis.com/books/v1/volumes',
}


/**
 *  Resolve individual book from the google books api.
 *  @param {String} ISBN - The ISBN-10 value of the book in question
 *  @returns {Promise<Object, String>}
 */
const resolveBookFromISBN = ISBN => {
  if (! ISBN) {
    return Promise.reject('No ISBN present')
  }
  // Add querystring to the url
  const searchUrl = `${booksEndpoints.volume}?key=${GOOGLE_BOOKS_API_KEY}&q=${ISBN}`;
  return new Promise((resolve, reject) => {
    request(searchUrl, (err, result, body) => {
      if (err) {
        throw err; 
      }
      const bodyJson = JSON.parse(body);
      if (! bodyJson || ! bodyJson.items || ! bodyJson.items.length) {
        reject(`No book found for ISBN: ${ISBN}`)
      }
      resolve(bodyJson);
    });
  });
}


/**
 *  Resolve book data from Google's books API. Takes partial data (ISBN) and 
 *  hydrates the object with remaining book data.
 *  @param {Array<Object>} books 
 *  @returns {Promise<Array,*>}
 */
const resolveBooksFromGoogle = books => {
  // Resolve books from the google api, then merge api and local data
  const bookResolvers = books.map(b => 
    resolveBookFromISBN(b.isbn)
      .then(apiBook => Object.assign({}, { local: b }, apiBook.items[0].volumeInfo))
      .catch(err => error(err))
  );
  return Promise.all( bookResolvers )
    // Remove unresolvable items from the list
    .then(books => books.filter(b => !! b))
    // On error, skip all other then handlers and reject immediately 
    .catch(err => Promise.reject(err));
}

module.exports = resolveBooksFromGoogle;