let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = []; //random pattern
let userClickedPattern = []; //user pattern
let level = 0;
let gameStarted = false; // Flag to check if the game has started

$(document).keydown(function (event) {
  if (event.key === "a" && !gameStarted) { // Start the game only if the key 'a' is pressed and the game hasn't started
    gameStarted = true;
    nextSequence();
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  //the index of the buttonColors Array corresponds to the random number
  let randomChosenColor = buttonColors[randomNumber];
  //we push this color in the game random pattern
  gamePattern.push(randomChosenColor);
  console.log(gamePattern)

  userClickedPattern = []; // Reset user pattern
  level++;
  $('h1').text('Level ' + level);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}


//play audio function - the clicked color as a parameter
function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  if (gameStarted) { // Check if the game has started
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    $("#" + userChosenColor).addClass('pressed');
    setTimeout(function() {
      $("#" + userChosenColor).removeClass('pressed');
    }, 150);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1); // Check the user's answer
  }
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $('h1').text('Game Over, Press A to Restart');
    gameStarted = false;
    gamePattern = [];
    level = 0;
  }
}