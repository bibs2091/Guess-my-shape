var radius;
var c;

function setup() {
  var myCanvas = createCanvas(300, 300);
  myCanvas.parent("myCanvas");
  createP();
  eraser = createButton("clear");
  eraser.mousePressed(clearPaint);
  c = color(255);
  background(0);
}

function draw() {
  radius = 10;
}

function mouseDragged() {
  stroke(c)
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

