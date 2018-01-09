// Debounce the callback
let _debounceTimer;
const debounce = function (ms, cb) {
  if (_debounceTimer) {
    window.clearTimeout(_debounceTimer);
  }
  _debounceTimer = window.setTimeout(cb, ms);
}

export default debounce;
