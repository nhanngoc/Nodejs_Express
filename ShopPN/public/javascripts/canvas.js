var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
context.lineWidth = 2;

var size = window.innerWidth;

canvas.width = size;
canvas.height = size;

var squareSize = 50;
var randomDisplacement = 15;
var rotateMultiplier = 20;

function getRndColor() {
  var r = 255*Math.random()|0,
      g = 255*Math.random()|0,
      b = 255*Math.random()|0;
  return 'rgb(' + r + ',' + g + ',' + b + ', 0.7' +')';
}
  
function draw(width, height) {
  context.beginPath();
  context.rect(-width/2, -height/2, width, height);
  context.fillStyle = getRndColor();
  context.fill();
  context.stroke(); 
}
 
for( var i = squareSize; i <= size - squareSize; i += squareSize) {
  for( var j = squareSize; j <= size - squareSize; j+= squareSize ) {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;
    
    context.save();
    context.translate( i + translateAmt, j);
    context.rotate(rotateAmt);
    draw(squareSize, squareSize);
    context.restore();
  }
}

// Use as background image on main page
var showcase = document.querySelector('body');
showcase.style.background = "url(" + canvas.toDataURL("image/png")+ ")";
showcase.style.backgroundSize = "cover";
showcase.style.backgroundPosition = "center";
showcase.style.backgroundRepeat = "no-repeat";