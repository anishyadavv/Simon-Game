var userClickPattern = []
var gamepattern =[];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;
function nextSequence(){
    userClickPattern = [];
    level += 1;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    
        $('#'+randomChosenColour).fadeOut();
        $('#'+randomChosenColour).fadeIn();
    playSound(randomChosenColour);
    $("h1").text("Level "+level);
}
$(".btn").click(function(){
    var userChosenColour;
    userChosenColour = $(this).attr('id');
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
    
})
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(() => {
    $("."+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
if(!started){
    $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel]===gamepattern[currentLevel])
    {
        console.log("success");
        if(userClickPattern.length === gamepattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
        playSound("wrong");
    }

}

function startOver(){
    level = 0;
    gamepattern = [];
    started  = false;
}



