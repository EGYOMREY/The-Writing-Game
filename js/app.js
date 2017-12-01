
//Our data
var words = [];

var easyArray = ["clerk", "log", "will", "inn", "acid", "child", "field", "jam", "blow", "cool", "tank", "chop", "folk", "plan", "bank", "frog", "poll", "rich", "toll", "home", "call", "toss"];

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
var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");
var mix = document.querySelector('#mix');
var finalPoints = document.querySelector('.finalPoints');

var randomWord;
var userPoints;

// Add event listeners to each button.
easy.addEventListener('click', function() {
    reset();
    (function delayedAlert() {
        setTimeout(function slowAlert() {
            input.disabled = true;
            finalPoints.innerHTML = "Final Points: " + userPoints;
        }, 6000);
    })();
    words = easyArray.slice();
    randomize();
});

medium.addEventListener('click', function() {
    reset();
    (function delayedAlert() {
        setTimeout(function slowAlert() {
            input.disabled = true;
            finalPoints.innerHTML = "Final Points: " + userPoints;
        }, 6000);
    })();
    words = mediumArray.slice();
    randomize();
});

hard.addEventListener('click', function() {
    reset();
    (function delayedAlert() {
        setTimeout(function slowAlert() {
            input.disabled = true;
            finalPoints.innerHTML = "Final Points: " + userPoints;
        }, 6000);
    })();
    words = hardArray.slice();
    randomize();
});

mix.addEventListener('click', function() {
    reset();
    (function delayedAlert() {
        setTimeout(function slowAlert() {
            input.disabled = true;
            finalPoints.innerHTML = "Final Points: " + userPoints;
        }, 10000);
    })();
    words = allArrays.slice();
    randomize();
});

// If the word the user types in the input field is the 
// same as the random word, the user gets a point and
// a new word is generated
input.addEventListener("input", function() {
    var num = this.value;
    if (num == randomWord) {
        userPoints++;
        input.value = '';
        randomize();
    }
});

// Sets the default initial values
function reset () {
    input.value = '';
    input.disabled = false;
    userPoints = 0;
    finalPoints.innerHTML = '';
}

// Generates a new random word and writes it on the DOM
function randomize () {
    randomWord = words.randomElement();
    displayWord.innerHTML = randomWord;
}