var postParagraphs = $('.blog-post__body > p');

// Add .first-child link to first <p> tag, as CSS will see multiple :first-child's
// (text must be two or more lines long)
var markFirstParagraph = function () {
  var firstP = postParagraphs[0];
  if (firstP.innerText.length > 80) {
    firstP.className = 'first-child';
  }
}

// Just some custom stuff to measure readership
var sendEvent = function (action, label) {
  if (! window.ga) {
    return console.warn('No GA present. Not measuring this session.');
  }
  window.ga('send', 'event', 'Blog', action, label);
}

var eventReadArticle = function () {
  var reachedBottom = false;
  var lastP = postParagraphs[ postParagraphs.length - 1 ];
  window.addEventListener('scroll', function () {
    var lastPPos = lastP.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    if (! reachedBottom) {
      reachedBottom = lastPPos < windowHeight;
      if (reachedBottom) {
        sendEvent('finished', document.location.href);
      }
    }
  });
}

var configureAnalyticsEvents = function () {
  eventReadArticle();
}

configureAnalyticsEvents();
markFirstParagraph();
