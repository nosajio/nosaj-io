const debug = require('debug')('nosaj:email');
const error = require('debug')('nosaj:error:email');
const path = require('path');
const nodemailer = require('nodemailer');
const pug = require('pug');

const defaultEmailView = path.resolve(__dirname, '../views/emails/key-value.pug');

const SMTPTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jasonhowmans@gmail.com',
    pass: process.env.GMAIL_PASS || '',
  }
});


/**
 * Send an email to hi@nosaj.io with the body
 * @param {string} html
 * @param {string} replyTo
 */
const sendEmailToJason = (html, replyTo) => {
  const sendTo = 'hi@nosaj.io';
  const options = {
      from: replyTo,
      to: sendTo,
      subject: 'Message from nosaj.io/hire-me',
      html
  }
  return new Promise(resolve => {
    SMTPTransport.sendMail(options, (err, info) => {
      if (err) {
        throw err;
      }
      resolve(info);
    });
  });
}


/**
 * Send the passed object as a email.
 * Email email look like: 
 *  Key
 *  Value
 *  ...
 * @param {object}   data         The data to use in the email.
 * @param {string}   data.replyTo the reply-to address, so the email can be
 *                                responded to.
 * @param {string}   view         The path (relative) to the view.
 * @return {Promise} <string,>    Resolve with info from nodemailer callback.
 */
const sendEmailWith = (data, view=defaultEmailView) => {
  if (typeof data !== 'object') {
    error('sendEmailWith needs a data object')
    return;
  }
  // Make the data usable for sectioned emails
  const sections = Object.entries(data).map(s => ({ key: s[0], val: s[1] }));
  const { replyTo } = data;
  // Compile the view
  const compileView = pug.compileFile(view);
  const emailHTML = compileView({ sections });
  return sendEmailToJason(emailHTML, replyTo);
}

module.exports = {sendEmailWith};
