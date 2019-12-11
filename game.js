var buttonColours=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

//Starting the Game
$(document).keypress(function(){
  if(!started){
    level++;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

//Generating the next sequence and resetting user clicked pattern
function nextSequence(){

  userClickedPattern=[];

  $("h1").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(150).fadeIn(300);

  playSound(randomChosenColour);

}

//Playing the Sound of respwctive button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Storing user chosen color in an array
$(".btn").click(function(event){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

//Animating the user pressed button
function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },70);

}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){

  level=0;
  gamePattern=[];
  started=false;

}
