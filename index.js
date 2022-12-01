var btnColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

// to keep a track whether the game has started or not
var started = false;

// to keep track of the level
var level = 0;

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function playSound(color){
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

// to start the game
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// to start the game
$(document).on("click",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// to respond to button click
$(".btn").on("click",function(){
    // the color clicked by the user
    var userColor = this.id;
    // to store the patter of the user
    userPattern.push(userColor);

    // to flash on click
    $("#" + this.id).fadeOut(100).fadeIn(100);
    animatePress(userColor);
    
    // to make sound according to id, on user click
    playSound(userColor);

    // check if the current key matches
    // and if matches check if the current level is completed
    checkAnswer(userPattern.length-1);
});

// to create the actual game sequence
function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // randomNumber to select any random color
    var rand = Math.floor(Math.random()*4);
    randColor = btnColor[rand];

    // to store the correct pattern generated
    gamePattern.push(randColor);

    // to flas while creating the sequence
    $("#" + randColor).fadeOut(100).fadeIn(100);

    // playing sound while creating the actual sequence
    playSound(randColor);
}

// to check the answer
function checkAnswer(currInd){

    // check if the last button pressed was same as the actual
    if(userPattern[currInd] === gamePattern[currInd]){
        
        // to check if the entire sequence has been completed
        // var count = 0;
        // for(var i=0;i<gamePattern.length;i++){
        //     // check if the patter matched at every position
        //     if(userPattern[i] === gamePattern[i])
        //         count++;
        // }

        // // if both are equal then the sequence has been traversed
        // // and now its time to move to the next level
        // if(count==gamePattern.length){
        //     console.log("success");
        //     setTimeout(function(){
        //         nextSequence();
        //     },1000);

        // if the entire sequence for the current level is complete
        if (userPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
    
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        resetGame();
    }
}

function resetGame(){
    gamePattern.length = 0;
    userPattern.length = 0;
    level = 0;
    started=false;
}