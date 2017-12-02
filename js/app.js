
//Our data
var words = [];

var easyArray = ["clerk", "log", "will", "inn", "acid", "child", "field", "jam", "blow", "cool", "tank", "chop", "folk", "plan", "bank", "frog", "poll", "rich", "toll", "home", "call", "toss", "long", "cart", "card", "yell", "real", "pork", "salt", "lace", "rung", "pier", "meat", "pace", "belt", "mail", "rate", "flag", "menu", "roll", "case", "star", "warn", "bean", "lean", "sale", "lift", "fork", "cane", "bear", "gaffe", "alarm", "handy", "close", "grace", "ivory", "pluck", "plane", "forge", "beard", "stick", "exile", "shark"];


var mediumArray = ["export", "helmet", "notice", "tactic", "pepper", "review", "waiter", "senior", "reform", "stream", "redeem", "grudge", "credit", "absent", "bottom", "hiccup", "dignity", "discuss", "welfare", "trouble", "bedroom", "cabinet", "bedroom", "dismiss", "comment", "extract", "realize", "mystery", "outline", "radical", "applaud", "equinox", "genuine", "auction", "graphic", "limited", "recruit", "publish"];

var hardArray = ["quotation", "privilege", "effective", "undertake", "offspring", "photocopy", "executive", "parameter", "important", "rebellion", "knowledge", "inflation", "promotion", "chemistry", "exception", "cigarette", "liability", "highlight", "communist", "pollution", "fireplace", "recognize", "housewife"];

var allArrays = easyArray.concat(mediumArray, hardArray);


// Add a randomElement method so it's available to all arrays.
// Any array that uses this method will print a random word of its own.
Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)]
};

// select the elements of the DOM we are going to use.
var displayWord = document.querySelector('.displayWord');
var input = document.querySelector('#input');
var easyMode = document.querySelector("#easyMode");
var mediumMode = document.querySelector("#mediumMode");
var hardMode = document.querySelector("#hardMode");
var mixMode = document.querySelector('#mixMode');
var finalPoints = document.querySelector('.finalPoints');
var timer = document.querySelector('#timer');

var randomWord;
var userPoints;
var timerNumber;
var intervalID;
var buttonClicked;


function beginGame (e){
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
        userPoints++;
        validation();
        clearInterval(intervalID);
        intervalID = setInterval(theCountdown, 600);
        input.value = '';
        randomize();
    }
});


function validation () {
     if (buttonClicked == 'easyMode') {
            words = easyArray.slice();
            easyResetCountdown();
        } else if (buttonClicked == 'mediumMode') {
            words = mediumArray.slice();
            mediumResetCountdown();
        } else if (buttonClicked == 'hardMode') {
            words = hardArray.slice();
            hardResetCountdown();
        } else if (buttonClicked == 'mixMode') {
            words = allArrays.slice();
            mixResetCountdown();
        }
     timer.innerHTML = timerNumber;
}

// Sets the default initial values
function reset () {
    clearInterval(intervalID);
    input.value = '';
    input.disabled = false;
    userPoints = 0;
    finalPoints.innerHTML = '';
    timer.style.display = "block";
}

// Generates a new random word and writes it on the DOM
function randomize () {
    randomWord = words.randomElement();
    displayWord.innerHTML = randomWord;
}

/*
This functions resets the timer that is displayed to
the user depending on the difficulty*/
function easyResetCountdown() {
    console.log('EASY!');
    timerNumber = 2;
   

}

function mediumResetCountdown() {
    console.log('MEDIUM!');
    timerNumber = 3;

}

function hardResetCountdown() {
    console.log('HARD!');
    timerNumber = 4;

}

function mixResetCountdown() {
    console.log('MIX!');
    timerNumber = 4;

}

/* TIMER FUNCTION */
// this function works as a timer, every time it's executed, 
// the timerNumber is evaluated, if it hit zero(0), the timer
// will hide and reset. The final points are going to get displayed
// to the user. Else: it substracts the timerNumber by 1 and displayed
// to ther user
function theCountdown() {
    if (timerNumber == 1) {
        timer.style.display = "none";
        input.disabled = true;
        finalPoints.innerHTML = "Final Points: " + userPoints;
        clearInterval(intervalID);
    } else {
        timerNumber--;
        timer.innerHTML = timerNumber;
    }
}