const error = require('debug')('app:error');
module.exports = { dateBefore, dateToString };

function dateToString(rawDate) {
  const date = new Date(rawDate);
  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Checks to see if predicate is before or equal to the base
function dateBefore(base, predicate) {
  if (! (base instanceof Date) || ! (predicate instanceof Date)) {
    throw new TypeError('Both args should be dates');
  }
  return base >= predicate;
}
