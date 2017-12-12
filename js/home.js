var two = new Two({
  width: window.innerWidth,
  height: window.innerHeight,
  type: Two.Types.canvas
});
var tl = TweenLite;

var shape = {
  move: 0, 
  width: 0,
  arc: 0,
}

setup();

function setup() {
  var canvas = document.querySelector('.home-canvas');
  two.appendTo(canvas);
  
  // Make the tween run 
  tl.to(shape, 60, { width: 1000, arc: 500, move: two.width });
  
  function render(frame) {
    var color = 'rgb('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 100)+', '+Math.floor(Math.random() * 255)+')';
    var xy = [0, two.height / 2];
    var arc = [500 * Math.cos(shape.arc + Math.random()), Math.random() + 500 * Math.sin(shape.arc)];
    var rect = two.makeRectangle(xy[0], xy[1], 6, 6);
    rect.fill = color;
    rect.noStroke();
    rect.scale = shape.width / 100;
    rect.translation.set(xy[0] + arc[0] + shape.move, xy[1] + arc[1]);
    console.log('--- f: %s, arc: %s', frame, arc);
    console.log(color);
    // console.log(rect);
  }
  
  // Bootstrap the animation
  two.bind('update', render);
  two.play();
  
}
