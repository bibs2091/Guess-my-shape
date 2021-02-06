var radius;
var c;
var StartedDraing = false;

function setup() {
  var myCanvas = createCanvas(300, 300);
  myCanvas.parent("myCanvas");
  createP();
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
  StartedDraing = true
}

function game() {
  var savedData = new Image();
  var canvas = document.getElementsByTagName('canvas')[0];
  var timer = 0
  var foundIt = false
  var intervalId = window.setInterval(function () {
    $.ajax({
      url: '/',
      type: 'POST',
      data: canvas.toDataURL("image/png").replace('data:image/png;base64,', ''),
      success: function (response) {
        $(".game p").show()
        var count = 0
        var handle = setInterval( function() {
           if (response.answers[count] == word.textContent && StartedDraing == true){
              $(".game p #ai").text("AI : I found it !!!, it's ")
              $("#sketch-name").text(response.answers[count])
              foundIt = true
              console.log("right answer")
              nextWord()
              clearInterval(handle)
            }
            else if(!foundIt && StartedDraing){
                console.log("wrong :() answer")
                $('#sketch-name').text(response.answers[count])
            }
          count++;
          if (count>=2) clearInterval(handle);

        }, 2500 );

        
      }
    })

    

    timer += 1;
    if (timer == 4) {
      nextWord()
    }
  }, 5000);
}

function nextWord(){
  word = classes[Math.floor(Math.random() * classes.length)];
  $("#word").text(word);
  $(".game p").hide()
  $(".game p #ai").text("AI : is it ")
  $("#sketch-name").text("")
  background(0)
  timer = 0
  foundIt = false
  StartedDraing = false
}

$(document).ready(function () {
  var word

  $("#next-button").click(function () {
    nextWord()
  })

  $("#start div.start .btn").click(function () {
    word = classes[Math.floor(Math.random() * classes.length)];
    $("#word").text(word);
    let start_logo = $("#start div.start img")
    let x = start_logo.offset().left;
    let y = start_logo.offset().top;
    let width = start_logo.width();
    let height = start_logo.height();

    $("body").attr("id", "game");

    let game_logo = $("#game div.game img#logo")
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