const content = require('../content/landing')();

module.exports = landingHandler;

function landingHandler(req, res) {
  const template = Object.assign({}, content, { stylesheet: '.main-frame { color: red; }' });
  res.render('landing', template);
}
