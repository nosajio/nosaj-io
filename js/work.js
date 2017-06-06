showPsstBanner();

function showPsstBanner() {
  var scrollTrigger = 300; // px
  var $psst = $('.psst-bar')[0];
  var psstIsShowing = false;
  
  window.addEventListener('scroll', handleScroll);
  function handleScroll() {
    // When the bar is already showing there's no need to continue
    if (psstIsShowing) return;
    
    var yPos = window.scrollY;
    if (yPos > scrollTrigger) {
      psstIsShowing = true;
      $psst.className += ' psst-bar--showing'; 
    }
  }
}
