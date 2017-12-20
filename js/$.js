/**
 * Query selector
 * Two ways of using this method:
 *  
 * Search globally:
 *  $('.my-selector');
 *
 * Search scoped:
 *  $(myElement, '.my-selector');
 */
function $(/* ... */) {
  var args = arguments;
  var selected = null;
  if (args.length === 1) {
    selected = document.querySelectorAll(args[0]);
  } else 
  if (args.length === 2) {
    selected = args[0].querySelectorAll(args[1]);
  }
  return selected;
}
