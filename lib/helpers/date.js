const error = require('debug')('nosaj:error');
module.exports = { dateBefore, dateToString, monthName };

function dateToString(rawDate) {
  const date = new Date(rawDate);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  // Only return the year when it isn't the current year
  return date.getFullYear() !== new Date().getFullYear() ?
    `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` : 
    `${date.getDate()} ${months[date.getMonth()]}`;
}

// Checks to see if predicate is before or equal to the base
function dateBefore(base, predicate) {
  if (! (base instanceof Date) || ! (predicate instanceof Date)) {
    throw new TypeError('Both args should be dates');
  }
  return base >= predicate;
}

function monthName(monthsAhead) {
  const currentMonth = new Date().getMonth();
  const nMonthsTimestamp = new Date().setMonth(currentMonth + monthsAhead);
  const monthNumber = new Date(nMonthsTimestamp).getMonth();
  const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[ monthNumber ];
}
