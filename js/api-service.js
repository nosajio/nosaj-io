/**
 * Send a fetch request to the API
 * 
 * @param {String} endpoint - ex. '/api/thing'
 * @param {String} type? - the type of request. ie. 'get', 'post'
 * @param {String} body? - the payload for requests that accept one
 */
function api(endpoint, type, body) {
  if ( ! ('Headers' in window) || !('Request' in window) || !('fetch' in window)) {
    throw new Error('Fetch isn\'t available in this broweser');
  }
  var options = {
    method: type || 'GET',
    cache: 'default',
  }
  if (body) {
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    options.body = JSON.stringify(body);
  }
  var request = new Request(endpoint, options);
  return fetch(request).then(function(res) { return res.json() });
}
