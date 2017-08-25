// Add .first-child link to first <p> tag, as CSS will see multiple :first-child's
// (text must be two or more lines long)
var firstP = $('.blog-post__body > p')[0];
if (firstP.innerText.length > 80) {
  firstP.className = 'first-child';
}
