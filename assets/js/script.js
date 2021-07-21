

//Data (global variables, things to keep track of)=====================
//made array of objects
var quiz = [
{
    question: "Commonly used data types DO NOT include:",
    choice: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},

{
    question: "The condition in an if/else statement is enclosed within _____.",
    choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},

{
    question: "Arrays in JavaScript can be used to store _____.",
    choice: ["numbers and strings", "other arrays", "booleans", "all the above"],
    answer: "all the above"
},

{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choice: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},

{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}
];

//answer indicator, finished playing, final score message, enter initials
var rightAnswer = "Correct! 20 points added to your score! Next question ..";
var wrongAnswer = "Wrong! 10 seconds have been deducted from your time. Next question ..";
var finishedPlaying = "All done!";
var finalScoreMsg = "Your final score is ";
var enterInitials = "Enter initials:";


//secondsLeft
var secondsLeft = 60;

//seconds penalty for answering wrong
var penalty = 10;

//starting score
var score = 0;

var questionCounter = 0;

var timerInterval;

//highscore
var highScoresMsg = "Highscores";
var highScoresLinkText = "Highscores";

//select element by class
var timeEl = document.querySelector(".time");


//this returns button element, which has an id of #startQuiz and assigns it to a variable called startQuizButton
var startQuizButton = document.querySelector("#startQuiz");


//Functions============================================================

function setTime() {
    //shows starting time
    timeEl.textContent = "Time: " + secondsLeft;

    //trigger hide header, div/p/instructions and startQuizButton
    hideStartElements();

    //sets interval in variable
    timerInterval = setInterval(function() {
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
    quizStartEl.setAttribute("style", "display: none");

    showQuestion(quiz[questionCounter]);
}

function showQuestion(quizItem) {

    //select body element
    var bodyEl = document.querySelector("body");

    var sectionEl = document.createElement("section");
    bodyEl.appendChild(sectionEl);

    console.log(quizItem);
    console.log(quizItem.question);
    console.log(quizItem.choice[0]);

    //create p tag, that's part of section, to hold question
    var pEl = document.createElement("p");
    pEl.textContent = quizItem.question;
    sectionEl.appendChild(pEl);

    //create div, that's part of section, to hold choices
    var divEl = document.createElement("div");
    sectionEl.appendChild(divEl);
    
    //create buttons (not ol with li's) for choices, need click event
    for (var i=0; i < quizItem.choice.length; i++) {
        var quizChoiceButton = document.createElement("button");
        quizChoiceButton.textContent = quizItem.choice[i];
        divEl.appendChild(quizChoiceButton);
        //listen for which choice button is clicked
        quizChoiceButton.addEventListener("click", function() {
            if (event.target.firstChild.data != quizItem.answer) {
                console.log("wrong button selected");
                //user selected wrong choice button
                //show Wrong!
                var wrongHeading = document.createElement("h2");
                wrongHeading.textContent = wrongAnswer;
                sectionEl.appendChild(wrongHeading);
                //apply/subtract penalty from time
                secondsLeft -= penalty;
                //show updated time after penalty applied
                timeEl.textContent = "Time: " + secondsLeft;
            } else {
                console.log("correct answer");
                //user selected correct choice button
                //show Correct!
                var correctHeading = document.createElement("h2");
                correctHeading.textContent = rightAnswer;
                sectionEl.appendChild(correctHeading);
                //add 20 points to score
                score += 20;
            }
            //clear current question/choices in preparation to show next one
            clearQuestionChoices();


        });
    }

}

function clearQuestionChoices() {
    console.log("clearing next");
    //this allows Wrong/Correct info to be displayed for a brief 3 seconds before next question/choices appear
    setTimeout(function(){ 
        
        var existingSectionEl = document.querySelector("section");
        var priorQuestionChoices = document.body.removeChild(existingSectionEl);
        questionCounter += 1;
            
        if (questionCounter < quiz.length) {
            console.log("counter incremented by 1, showQuestion called with next question/choice");
            showQuestion(quiz[questionCounter]);
        } else {
            //show Enter Initials
            console.log("enter initials next");
            allDoneShowEnterInitials();
        }
         
    }, 3000);

}

function allDoneShowEnterInitials() {

    timeEl.textContent = "Time: 0";
    clearInterval(timerInterval);

    //select body element
    var bodyEl = document.querySelector("body");

    var sectionEl = document.createElement("section");
    bodyEl.appendChild(sectionEl);

    //create p tag, that's part of section, to hold All done! text
    var pAllDoneEl = document.createElement("p");
    pAllDoneEl.textContent = finishedPlaying;
    sectionEl.appendChild(pAllDoneEl);

    //create another p tag, that's part of section, to hold Your final score is #. text
    var pFinalScoreEl = document.createElement("p");
    pFinalScoreEl.textContent = finalScoreMsg + score;
    sectionEl.appendChild(pFinalScoreEl);

    //create div, that's part of section, to form for Enter Initials
    var divEl = document.createElement("div");
    sectionEl.appendChild(divEl);

    var enterInitialsDiv = document.querySelector(".enterInitials");
    enterInitialsDiv.setAttribute("style", "display: inline");
}

function showHighScores() {
    var highScoresDiv = document.querySelector(".highscores-container");
    highScoresDiv.setAttribute("style", "display: inline");
}

//User Interactions====================================================
    //enter initials
    var userInitialsBtn = document.querySelector("#userInitials");
    userInitialsBtn.addEventListener("submit", showHighScores)
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

//this adds a listener to variable startQuizButton, listening for "click" event 
//and will trigger/call setTime() function when button is clicked
startQuizButton.addEventListener("click", setTime);