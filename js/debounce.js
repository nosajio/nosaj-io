// Debounce the callback
var _debounceTimer;
var debounce = function (ms, cb) {
  if (_debounceTimer) {
    window.clearTimeout(_debounceTimer);
  }
  _debounceTimer = window.setTimeout(cb, ms);
}
