const debug = require('debug')('nosaj:favicon');
const Canvas = require('canvas');

module.exports = handleFaviconRoute;

// Return a favicon file as the response
function handleFaviconRoute(req, res) {
  const { d, c } = req.query;
  const color = c ? `#${c}` : '#000000';
  const imgStream = drawCircle(parseInt(d) || 32, color);
  imgStream.pipe(res);
}

/**
 * Draw a circle at 0,0 with node canvas api
 * @param {number} diameter
 * @param {string} color - HEX string with the #
 * @return {ReadStream} 
 */
function drawCircle(diameter, color) {
  // Scales
  const radius = diameter / 2;
  const margin = Math.ceil(radius / 10);
  const line = Math.ceil(radius / 3);
  // Configure the context
  const canvas = new Canvas(diameter, diameter);
  const context = canvas.getContext('2d');
  // Draw the circle
  context.strokeStyle = color;
  context.lineWidth = line;
  context.beginPath();
  context.arc(
    radius,                 // x
    radius,                 // y
    radius - (margin * 2),  // Radius
    0,                      // Start angle (radians)
    Math.PI * 2             // End angle (radians)
  );
  context.stroke();
  // Output as png stream
  return canvas.pngStream();
}
