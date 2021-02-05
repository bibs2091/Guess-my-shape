var radius;
var c;

function setup() {
  var myCanvas = createCanvas(300, 300);
  myCanvas.parent("myCanvas");
  createP();
  // eraser = createButton("clear");
  // eraser.mousePressed(clearPaint);
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


function game() {
  var savedData = new Image();
  var canvas = document.getElementsByTagName('canvas')[0];
  var timer = 0
  var intervalId = window.setInterval(function () {
    $.ajax({
      url: '/',
      type: 'POST',
      data: canvas.toDataURL("image/png").replace('data:image/png;base64,', ''),
      success: function (response) {
        $(".game p").show()
        $("#sketch-name").text(response)
        console.log(response)
      }
    })
    timer += 1;

    if (timer == 4) {
      let word = classes[Math.floor(Math.random() * classes.length)];
      $("#word").text(word);
      background(0)
      timer = 0
    }
  }, 4000);
}

$(document).ready(function () {
  $("#start div.start .btn").click(function () {

    let word = classes[Math.floor(Math.random() * classes.length)];
    $("#word").text(word);

    let start_logo = $("#start div.start img")
    let x = start_logo.offset().left;
    let y = start_logo.offset().top;
    let width = start_logo.width();
    let height = start_logo.height();

    $("body").attr("id", "game");

    let game_logo = $("#game div.game img")
    game_logo.css('top', y);
    game_logo.css('left', x);
    game_logo.css('width', width);
    game_logo.css('height', height);
    game_logo.animate({
      top: "10px",
      left: "10px",
      width: '211px',
      height: '48px'
    });
    game()
  });

});