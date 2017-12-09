// --VARIABLES USED-- //
var words = [];

var easyModeArray = ["clerk", "log", "will", "inn", "acid", "child", "field", "jam", "blow", "cool", "tank", "chop", "folk", "plan", "bank", "frog", "poll", "rich", "toll", "home", "call", "toss", "long", "cart", "card", "yell", "real", "pork", "salt", "lace", "rung", "pier", "meat", "pace", "belt", "mail", "rate", "flag", "menu", "roll", "case", "star", "warn", "bean", "lean", "sale", "lift", "fork", "cane", "bear", "gaffe", "alarm", "handy", "close", "grace", "ivory", "pluck", "plane", "forge", "beard", "stick", "exile", "shark"];


var mediumModeArray = ["export", "helmet", "notice", "tactic", "pepper", "review", "waiter", "senior", "reform", "stream", "redeem", "grudge", "credit", "absent", "bottom", "hiccup", "dignity", "discuss", "welfare", "trouble", "bedroom", "cabinet", "bedroom", "dismiss", "comment", "extract", "realize", "mystery", "outline", "radical", "applaud", "equinox", "genuine", "auction", "graphic", "limited", "recruit", "publish"];

var hardModeArray = ["quotation", "privilege", "effective", "undertake", "offspring", "photocopy", "executive", "parameter", "important", "rebellion", "knowledge", "inflation", "promotion", "chemistry", "exception", "cigarette", "liability", "highlight", "communist", "pollution", "fireplace", "recognize", "housewife"];

var mixModeArray = easyModeArray.concat(mediumModeArray, hardModeArray);


// --Add randomElement method for all arrays to use-- //
Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)]
};

// --Word displayed to the user-- //
var displayWord = document.querySelector('.displayWord');
// --The input element-- //
var input = document.querySelector('#input');
// --Total user's points-- //
var finalPoints = document.querySelector('.finalPoints');
// --Stores how many seconds has the user left to write down the word-- //
var timer = document.querySelector('#timer');
// --Stores the highest score achieved by the user-- //
var showScore = document.querySelector('#showScore');
// --Random word to compare to the user's input (displayWord)-- //
var randomWord;
// --Accumulates the points for the round-- //
var userPoints;
// --Stores the initial time the user has for the selected difficulty-- //
var timerNumber;
// --Stores the setInterval method-- //
var intervalID;
// --Stores the id of the button clicked in the view-- //
var buttonClicked;


// --First function to run when the game begins: user clicks on a button. The button's id
// is stored, the game is set to a 'new game state', the validation function checks for
// the array of words that is going to be displayed to the user, the input is focused now, 
// the countdown begins and a new random word is presented-- //
function beginGame(e) {
    buttonClicked = e.target.id;
    reset();
    validation();
    input.focus();
    intervalID = setInterval(theCountdown, 600);
    randomize();
}

// --To validate the user's input we get the value and compare it to the random word
// which if it's correct, new points will be added, it sets the timer to the 
// corresponding initial value of the difficulty, clears the input value and displays
// a random word from the selected array again-- //
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

// --Validates the user's selection and also displays the initial time of the chosen difficulty-- //
function validation() {
    if (buttonClicked == 'easyMode') {
        words = easyModeArray.slice();
        timerNumber = 3;
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

// --Resets the game, input, points, shows the timer-- //
function reset() {
    clearInterval(intervalID);
    input.value = '';
    input.disabled = false;
    userPoints = 0;
    finalPoints.innerHTML = '';
    timer.style.display = "block";
}

// --Generates a new random word and writes it on the DOM-- //
function randomize() {
    randomWord = words.randomElement();
    displayWord.innerHTML = randomWord;
}


/* TIMER FUNCTION */
// this function works as a timer, every time it's executed, 
// the timerNumber is evaluated, if it hits zero(1), the timer
// will hide and reset. The final points are going to get displayed
// to the user. Else: it substracts the timerNumber by 1 and displayed
// to ther user
// If the current points the user has are higher than the actual
// highscore, it will be rewritten every time it's higher.
function theCountdown() {
    
    if (userPoints > window.localStorage.getItem("highscore")) {
        window.localStorage.setItem("highscore", userPoints);
        showScore.innerHTML = window.localStorage.getItem("highscore");
    }
    if (timerNumber == 1) {
        timer.style.display = "none";
        input.disabled = true;
        finalPoints.innerHTML = "Current Score: " + userPoints;
        saveHighScore();
    } else {
        timerNumber--;
        timer.innerHTML = timerNumber;

    }
}


// --Shows the high scores to the user-- //
function saveHighScore() {
    if (window.localStorage.getItem("highscore") != null) {
        showScore.innerHTML = window.localStorage.getItem("highscore");
    } else if (window.localStorage.getItem("highscore") == 0) {
        showScore.innerHTML = 0;
    }
}