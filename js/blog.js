// Add .first-child link to first <p> tag, as CSS will see multiple :first-child's
var firstP = $('.blog-post__body > p')[0];
firstP.className = 'first-child';
