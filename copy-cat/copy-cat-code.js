let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
let shaking = false;
let sounds = {
    "blue" : new Audio("./assets/sounds/blue.wav"),
    "red": new Audio("./assets/sounds/red.wav"),
    "green": new Audio("./assets/sounds/green.wav"),
    "yellow": new Audio("./assets/sounds/yellow.wav"),
    "incorrect": new Audio("./assets/sounds/incorrect.wav"),
    "level-completed": new Audio("./assets/sounds/level-completed.wav")
};

function shake(div, interval=100, distance=10, times=4){
    shaking = true;
    $(div).css('position', 'relative');
    for(let iter = 0; iter < (times + 1); iter++){
        $(div).animate({ left: ((iter % 2 === 0 ? distance : distance *- 1))}, interval);
    }//for
    $(div).animate({ left: 0}, interval, function() {
        shaking = false;
    });
}//shake


function playSound(color) {
    if (sounds[color]) {
        sounds[color].currentTime = 0; // Reset sound to the start
        sounds[color].play();
    } else {
        console.error(`Sound for "${color}" not found.`);
    }
}

function animateButton(button) {
    if (button) {
        button.animate({"opacity": "0.1"}, 200).animate({"opacity": "1"}, 200);
    } else {
        console.error(`No button found to animate.`);
    }
}

function animatePress(currentColour) {

    let button = $("#" + currentColour);
    button.addClass("pressed");
    setTimeout(function() {
        button.removeClass("pressed");
    }, 100);
}

function checkAnswer(indexToCheck) {
    if (gamePattern[indexToCheck] === userClickedPattern[indexToCheck]) {
        console.log("correct");
        if (indexToCheck === level - 1)
        {
            userClickedPattern = [];
            $("#game-info-text").text("Correct!");
            //playSound("level-completed");
            setTimeout(function() {
                nextSequence();
            }, 2000);
        }
    } else {
        if (shaking === false) {
            shake($(".button-pad"));
        } 
        playSound("incorrect");
        $("#game-info-text").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    level++;
    $("#game-info-text").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animateButton($("#" + randomChosenColour));
}

function handleButtonClick(buttonId) {
    let userChosenColour = buttonId;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(buttonId);
    animatePress(buttonId);
}

function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}

$(".game-button").on("click", function() {
    handleButtonClick(this.id);
})

$(document).keypress(function() {
    if (!gameStarted) {
        $("#game-info-text").text("Get ready!");
        setTimeout(function() {
            nextSequence();
            gameStarted = true;
        }, 1000);
    }
});