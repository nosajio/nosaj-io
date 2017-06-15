psstMessageTrigger();

function psstMessageTrigger() {
  var scrollTrigger = 300; // px
  var $psst = $('.psst-bar')[0];
  var psstIsShowing = false;
  
  window.addEventListener('scroll', handleScroll);
  function handleScroll() {
    // When the bar is already showing there's no need to continue
    if (psstIsShowing) return;
    showPsst();    
  }
  
  function showPsst() {
    // Set the show class to trigger css transitions
    var yPos = window.scrollY;
    if (yPos > scrollTrigger) {
      psstIsShowing = true;
      $psst.className += ' psst-bar--showing'; 
    }
    
    // Add the text and split up into span's for more freedom
    var $psstP = $('.psst-bar p')[0];
    var psstText = $psstP.dataset.text;
    var psstHTML = psstText.split('').map(function (char) {
      return '<span class="psst-bar__char">' + char + '</span>';
    }).join('');
    $psstP.innerHTML = psstHTML;
  }
}
