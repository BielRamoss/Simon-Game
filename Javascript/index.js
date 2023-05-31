var buttonColours = ["red", "blue", "green", "yellow"]; //declara um array de cores dos botões

var gamePattern = []; //array que vai armazenar a sequencia de cores escolhidas na var randomNumber
var userClickedPattern = []; //array que vai armazenar a sequência clicada

var starded = false;
var level = 0;

$(document).keypress(function() {
    if(!starded) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Precione alguma tecla para recomeçar");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); //gera um número aleatório do comprimento do array de cores
    var randomChosenColour = buttonColours[randomNumber]; //retorna a posição aleatória do array da linha 1
    gamePattern.push(randomChosenColour); //retorna o array que armazena as cores aleatórias escolhidas

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //seleciona o id da cor escolhida e anima ele
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    starded = false;
}