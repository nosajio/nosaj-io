const debug = require('debug')('nosaj:hireMeForm');
const { sendEmailWith } = require('../lib/email');

module.exports = args => ({
  path: '/forms/hire-me',
  method: 'POST',
  handler: (req, res) => {
    const { body } = req;
    body.replyTo = body.replyTo = body.email;
    sendEmailWith(body)
      .then(info => debug(info));
    res.json({
      success: true,
    });
  }
});
