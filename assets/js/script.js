

//Data (global variables, things to keep track of)=====================
//question1 object
var question1 = {
    question: "Commonly used data types DO NOT include:",
    choice: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
};

var question2 = {
    question: "The condition in an if/else statement is enclosed within _____.",
    choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
};

var question3 = {
    question: "Arrays in JavaScript can be used to store _____.",
    choice: ["numbers and strings", "other arrays", "booleans", "all the above"],
    answer: "all the above"
};

var question4 = {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choice: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
};

var question5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
};

var questionNumber = ["question1", "question2", "question3", "question4", "question5"];

//answer indicator, finished playing, final score message, enter initials
var rightAnswer = "Correct!";
var wrongAnswer = "Wrong!";
var finishedPlaying = "All done!";
var finalScoreMsg = "Your final score is ";
var enterInitials = "Enter initials:";


//secondsLeft
var secondsLeft = 10; //number

//score
var score = 100; //number

//highscore
var highScoresMsg = "Highscores";
var highScoresLinkText = "Highscores";

//select element by class
var timeEl = document.querySelector(".time");

//this returns button element, which has an id of #startQuiz and assigns it to a variable called startQuizButton
var startQuizButton = document.querySelector("#startQuiz");

//this adds a listener to variable startQuizButton, listening for "click" event 
//and will trigger/call setTime() function when button is clicked
startQuizButton.addEventListener("click", setTime);

//Functions============================================================

function setTime() {
    //shows starting time
    timeEl.textContent = "Time: " + secondsLeft;

    //trigger hide header, div/p/instructions and startQuizButton
    hideStartElements();

    //sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        //shows decrementing time
        timeEl.textContent = "Time: " + secondsLeft;
        
        if (secondsLeft === 0) {
            //shows final time of 0
            timeEl.textContent = "Time: " + secondsLeft;
            //stops execution of setInterval's actions
            clearInterval(timerInterval);
            //trigger All done!
        }

    }, 1000); //closes setInterval, triggered every second/1000ms
} //ends setTime()

function hideStartElements() {
    var quizStartEl = document.querySelector("#quizStart");
    //quizStartEl.parentNode.removeChild(quizStartEl); //ask Ben
    quizStartEl.textContent = "";

    //trigger show questions/options chain, start with question1
    showQuestion(questionNumber[0]);
}

function showQuestion(questionNum) {

    //select body element
    var bodyEl = document.querySelector("body");

    var sectionEl = document.createElement("section");
    bodyEl.appendChild(sectionEl);
    var pEl = document.createElement("p");
    //console.log(Object(questionNum).question);
    console.log(question1.question);
    pEl.textContent = question1.question;
    sectionEl.appendChild(pEl);
    var olEl = document.createElement("ol");
    sectionEl.appendChild(olEl);
    for (var i=0; i < question1.choice.length; i++) {
        var liNum = "li" + i + "El";
        var liNum = document.createElement("li");
        olEl.appendChild(liNum);
        liNum.textContent = question1.choice[i];
    }
    var h2El = document.createElement("h2");
    sectionEl.appendChild(h2El);



}

//User Interactions====================================================
    //select choice
    //check if choice is correct
        //make sounds on correct/wrong
        //show rightAnswer/wrongAnswer string with borderline above
    //enter initials
    //click go back button
    //click clear highscores
    //click highscores link

    //display highscores/leaderboard
        //apply styles to leaderboard
        //(ex: 1. Name - ### where ### is score)
        //inlude Go Back button option
        //incluse Clear Highscores button option
    
    //hide highscores link upper left corner
    //hide timer upper right corner

//Initialization=======================================================
    //
    //