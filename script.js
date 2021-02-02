var radius;
var c;

function setup() {
  var myCanvas = createCanvas(420, 420);
  myCanvas.parent("myCanvas");
  createP();
  eraser = createButton("clear");
  eraser.mousePressed(clearPaint);
  c = color(0);
  background(255);
}

function draw() {
  radius = 10;
}

function mouseDragged() {
  stroke(c)
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function clearPaint() {
  background(255);
}