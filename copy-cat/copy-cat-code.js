let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let sounds = {
    "blue" : new Audio("./assets/sounds/blue.wav"),
    "red": new Audio("./assets/sounds/red.wav"),
    "green": new Audio("./assets/sounds/green.wav"),
    "yellow": new Audio("./assets/sounds/yellow.wav"),
    "incorrect": new Audio("./assets/sounds/incorrect.wav")
};


function playSound(color) {
    if (sounds[color]) {
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
    playSound(buttonId);
    let userChosenColour = buttonId;
    userClickedPattern.push(userChosenColour);
    animatePress(buttonId);
}

$(".game-button").on("click", function() {
    handleButtonClick(this.id);
})

$(document).keypress(function() {
    if (level === 0) {
        nextSequence();
        console.log("game started");
    }
});