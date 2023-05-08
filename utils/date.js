const moment = require('moment');

// Formats a date string using Moment.js
function dateFormat(date) {
  return moment(date).format('MM/DD/YYYY');
}

// Adds a specified number of days to a date using Moment.js
function addDaysToDate(date, days) {
  return moment(date).add(days, 'days').toDate();
}

// Subtracts a specified number of days from a date using Moment.js
function subtractDaysFromDate(date, days) {
  return moment(date).subtract(days, 'days').toDate();
}

module.exports = { dateFormat, addDaysToDate, subtractDaysFromDate };
