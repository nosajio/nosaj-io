const content = require('../content/landing')();
const renderStylesheet = require('../lib/renderStylesheet');

module.exports = landingHandler;

function landingHandler(req, res) {
  renderStylesheet('views/landing/landing.scss')
    .then((stylesheet) => {
      const template = Object.assign(
        {}, 
        content, 
        { stylesheet }
      );
      res.render('landing', template);
    });
}
