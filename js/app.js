//Our data
var words = [];

var easyModeArray = ["clerk", "log", "will", "inn", "acid", "child", "field", "jam", "blow", "cool", "tank", "chop", "folk", "plan", "bank", "frog", "poll", "rich", "toll", "home", "call", "toss", "long", "cart", "card", "yell", "real", "pork", "salt", "lace", "rung", "pier", "meat", "pace", "belt", "mail", "rate", "flag", "menu", "roll", "case", "star", "warn", "bean", "lean", "sale", "lift", "fork", "cane", "bear", "gaffe", "alarm", "handy", "close", "grace", "ivory", "pluck", "plane", "forge", "beard", "stick", "exile", "shark"];


var mediumModeArray = ["export", "helmet", "notice", "tactic", "pepper", "review", "waiter", "senior", "reform", "stream", "redeem", "grudge", "credit", "absent", "bottom", "hiccup", "dignity", "discuss", "welfare", "trouble", "bedroom", "cabinet", "bedroom", "dismiss", "comment", "extract", "realize", "mystery", "outline", "radical", "applaud", "equinox", "genuine", "auction", "graphic", "limited", "recruit", "publish"];

var hardModeArray = ["quotation", "privilege", "effective", "undertake", "offspring", "photocopy", "executive", "parameter", "important", "rebellion", "knowledge", "inflation", "promotion", "chemistry", "exception", "cigarette", "liability", "highlight", "communist", "pollution", "fireplace", "recognize", "housewife"];

var mixModeArray = easyModeArray.concat(mediumModeArray, hardModeArray);


// Add a randomElement method so it's available to all arrays.
// Any array that uses this method will print a random word of its own.
Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)]
};

// select the elements of the DOM we are going to use.
var displayWord = document.querySelector('.displayWord');
var input = document.querySelector('#input');
var finalPoints = document.querySelector('.finalPoints');
var timer = document.querySelector('#timer');
var showScore = document.querySelector('#showScore');

var randomWord;
var userPoints;
var timerNumber;
var intervalID;
var buttonClicked;
var score;


function beginGame(e) {
    buttonClicked = e.target.id;
    reset();
    validation();
    input.focus();
    intervalID = setInterval(theCountdown, 600);
    randomize();
}

// If the word the user types in the input field is the 
// same as the random word, the user gets a point and
// a new word is generated
input.addEventListener("input", function(e) {
    var num = this.value;
    if (num == randomWord) {
        userPoints += 100;
        validation();
        clearInterval(intervalID);
        intervalID = setInterval(theCountdown, 600);
        input.value = '';
        randomize();
    }
});

//validate which difficulty was selected according to the button's id.
// it sets which array it's going to be displayed and the time limit
function validation() {
    if (buttonClicked == 'easyMode') {
        words = easyModeArray.slice();
        timerNumber = 2;
    } else if (buttonClicked == 'mediumMode') {
        words = mediumModeArray.slice();
        timerNumber = 3;
    } else if (buttonClicked == 'hardMode') {
        words = hardModeArray.slice();
        timerNumber = 4;
    } else if (buttonClicked == 'mixMode') {
        words = mixModeArray.slice();
        timerNumber = 4;
    }
    timer.innerHTML = timerNumber;
}

// Sets the default initial values
function reset() {
    clearInterval(intervalID);
    input.value = '';
    input.disabled = false;
    userPoints = 0;
    finalPoints.innerHTML = '';
    timer.style.display = "block";
}

// Generates a new random word and writes it on the DOM
function randomize() {
    randomWord = words.randomElement();
    displayWord.innerHTML = randomWord;
}


/* TIMER FUNCTION */
// this function works as a timer, every time it's executed, 
// the timerNumber is evaluated, if it hit zero(0), the timer
// will hide and reset. The final points are going to get displayed
// to the user. Else: it substracts the timerNumber by 1 and displayed
// to ther user
function theCountdown() {
    score = userPoints;
    if (score > window.localStorage.getItem("highscore")) {
        window.localStorage.setItem("highscore", score);
    }
    if (timerNumber == 1) {
        timer.style.display = "none";
        input.disabled = true;
        finalPoints.innerHTML = "Current Score: " + score;
        clearInterval(intervalID);
        saveHighScore();
    } else {
        timerNumber--;
        timer.innerHTML = timerNumber;

    }
}



function saveHighScore() {
    if (window.localStorage.getItem("highscore") != null) {
        showScore.innerHTML = window.localStorage.getItem("highscore");
    } else if (window.localStorage.getItem("highscore") == 0) {
        showScore.innerHTML = 0;
    }
}